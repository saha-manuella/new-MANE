<?php

namespace App\Models;

use App\Enums\AdhesionStatusEnum;
use App\Enums\FrequenceRenouvellementEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class Adhesion extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'document_id',
        'date_adhesion',
        'date_expiration',
        'statut',
        'token_signature',
        'external_quiz_validation_id',
        'historique_statuts',
        'validated_by_user_id',
        'commentaire',
        'declaration_conflits_interets',
        'direction',
        'entreprise',
        'fonction',
        'description_titre',
        'firme_courtage',
        'accepte_code_ethique'
    ];

    protected $casts = [
        'date_adhesion' => 'datetime',
        'date_expiration' => 'datetime',
        'historique_statuts' => 'array',
        'accepte_code_ethique' => 'boolean',
        'statut' => AdhesionStatusEnum::class,
    ];

    protected $attributes = [
        'statut' => AdhesionStatusEnum::EN_ATTENTE,
        'historique_statuts' => '[]',
    ];

    // Relations
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }

    public function validatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'validated_by_user_id');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('statut', AdhesionStatusEnum::ACCEPTEE)
            ->where(function($q) {
                $q->whereNull('date_expiration')
                    ->orWhere('date_expiration', '>', now());
            });
    }

    public function scopeExpired($query)
    {
        return $query->where(function($q) {
            $q->where('statut', AdhesionStatusEnum::EXPIRED)
                ->orWhere(function($q) {
                    $q->where('statut', AdhesionStatusEnum::ACCEPTEE)
                        ->where('date_expiration', '<=', now());
                });
        });
    }

    public function scopePending($query)
    {
        return $query->where('statut', AdhesionStatusEnum::EN_ATTENTE);
    }

    // Status checks
    public function isExpired(): bool
    {
        return $this->statut === AdhesionStatusEnum::EXPIRED ||
            ($this->date_expiration && $this->date_expiration->isPast());
    }

    public function isActive(): bool
    {
        return $this->statut === AdhesionStatusEnum::ACCEPTEE && !$this->isExpired();
    }

    public function isPending(): bool
    {
        return $this->statut === AdhesionStatusEnum::EN_ATTENTE;
    }

    // Status management
    public function updateStatus(AdhesionStatusEnum $newStatus, ?int $userId = null, ?string $commentaire = null): self
    {
        $historique = collect($this->historique_statuts)
            ->push([
                'ancien_statut' => $this->statut->value,
                'nouveau_statut' => $newStatus->value,
                'date' => now()->toIso8601String(),
                'user_id' => $userId,
                'commentaire' => $commentaire
            ])
            ->toArray();

        $updates = [
            'statut' => $newStatus,
            'historique_statuts' => $historique,
        ];

        if ($userId && $newStatus->isValidationStatus()) {
            $updates['validated_by_user_id'] = $userId;
        }

        if ($commentaire) {
            $updates['commentaire'] = $commentaire;
        }

        if ($newStatus === AdhesionStatusEnum::ACCEPTEE) {
            $updates['date_adhesion'] = now();
            $updates['date_expiration'] = $this->calculateExpirationDate();
        }

        $this->update($updates);

        return $this;
    }

    protected function calculateExpirationDate(): ?Carbon
    {
        if (!$this->document || !$this->document->frequence_renouv) {
            return null;
        }

        $frequency = FrequenceRenouvellementEnum::tryFrom($this->document->frequence_renouv);

        return match ($frequency) {
            FrequenceRenouvellementEnum::MENSUEL => now()->addMonth(),
            FrequenceRenouvellementEnum::TRIMESTRIEL => now()->addMonths(3),
            FrequenceRenouvellementEnum::SEMESTRIEL => now()->addMonths(6),
            FrequenceRenouvellementEnum::ANNUEL => now()->addYear(),
            default => null,
        };
    }

    // Signature tokens
    public function generateSignatureToken(): string
    {
        return tap(Str::random(64), function ($token) {
            $this->update(['token_signature' => $token]);
        });
    }

    public function verifySignatureToken(?string $token): bool
    {
        return hash_equals($this->token_signature ?? '', $token ?? '');
    }

    // Form data
    public function getFormData(): array
    {
        if (!$this->document || !$formulaire = $this->document->formulaireActif()) {
            return [];
        }

        return collect($formulaire->champs_config)
            ->filter(fn ($champ) => isset($champ['name']) && isset($this->{$champ['name']}))
            ->mapWithKeys(fn ($champ) => [$champ['name'] => $this->{$champ['name']}])
            ->toArray();
    }

    // Helpers
    public function getStatusLabel(): string
    {
        return $this->statut->label();
    }

    public function getFrequencyLabel(): ?string
    {
        if (!$this->document || !$this->document->frequence_renouv) {
            return null;
        }

        return FrequenceRenouvellementEnum::tryFrom($this->document->frequence_renouv)?->label();
    }
}
