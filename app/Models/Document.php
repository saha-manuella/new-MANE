<?php

namespace App\Models;

use App\Enums\DocumentStatusEnum;
use App\Enums\FrequenceRenouvellementEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'type_document_id',
        'titre',
        'version',
        'description',
        'fichier_path',
        'contenu',
        'mime_type',
        'est_obligatoire',
        'frequence_renouv',
        'attributs_valeurs',
        'date_publication',
        'date_expiration',
        'statut',
        'created_by_user_id',
        'external_quiz_template_id'
    ];

    protected $casts = [
        'est_obligatoire' => 'boolean',
        'attributs_valeurs' => 'array',
        'date_publication' => 'datetime',
        'date_expiration' => 'datetime',
        'statut' => DocumentStatusEnum::class,
        'frequence_renouv' => FrequenceRenouvellementEnum::class,
    ];

    // Relations
    public function typeDocument(): BelongsTo
    {
        return $this->belongsTo(TypeDocument::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    public function formulaires(): HasMany
    {
        return $this->hasMany(FormulaireAdhesion::class);
    }

    public function adhesions(): HasMany
    {
        return $this->hasMany(Adhesion::class);
    }

    public function autorisations(): HasMany
    {
        return $this->hasMany(Autorisation::class);
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('statut', DocumentStatusEnum::PUBLIE);
    }

    public function scopeValid($query)
    {
        return $query->published()
            ->where(function($q) {
                $q->whereNull('date_expiration')
                    ->orWhere('date_expiration', '>', now());
            });
    }

    public function scopeWithFrequency($query, FrequenceRenouvellementEnum $frequency)
    {
        return $query->where('frequence_renouv', $frequency);
    }

    // Methods
    public function formulaireActif(): ?FormulaireAdhesion
    {
        return $this->formulaires()
            ->where('est_actif', true)
            ->latest()
            ->first();
    }

    public function isPublished(): bool
    {
        return $this->statut === DocumentStatusEnum::PUBLIE;
    }

    public function isExpired(): bool
    {
        return $this->date_expiration && $this->date_expiration->isPast();
    }

    public function isValid(): bool
    {
        return $this->isPublished() && !$this->isExpired();
    }

    public function publish(?Carbon $publicationDate = null, ?Carbon $expirationDate = null): self
    {
        $this->update([
            'statut' => DocumentStatusEnum::PUBLIE,
            'date_publication' => $publicationDate ?? now(),
            'date_expiration' => $expirationDate,
        ]);

        return $this;
    }

    public function archive(): self
    {
        $this->update(['statut' => DocumentStatusEnum::ARCHIVE]);
        return $this;
    }

    public function getAttributValue(string $attributeName): mixed
    {
        return $this->attributs_valeurs[$attributeName] ?? null;
    }

    public function setAttributValue(string $attributeName, mixed $value): self
    {
        $attributs = $this->attributs_valeurs ?? [];
        $attributs[$attributeName] = $value;
        $this->update(['attributs_valeurs' => $attributs]);

        return $this;
    }
}
