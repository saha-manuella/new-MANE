<?php

namespace App\Models;

use App\Enums\AutorisationNiveauEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use League\CommonMark\Node\Block\Document;

class Autorisation extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_id',
        'role_id',
        'niveau',
        'date_autorisation',
        'expire_le',
        'accorde_par_user_id',
        'historique_modifications',
    ];

    protected $casts = [
        'niveau' => AutorisationNiveauEnum::class,
        'date_autorisation' => 'datetime',
        'expire_le' => 'datetime',
        'historique_modifications' => 'array',
    ];

    // ----------------------
    // Relations
    // ----------------------

    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function accordeePar(): BelongsTo
    {
        return $this->belongsTo(User::class, 'accorde_par_user_id');
    }

    // ----------------------
    // Scopes
    // ----------------------

    public function scopeActive(Builder $query): Builder
    {
        return $query->where(function($q) {
            $q->whereNull('expire_le')
                ->orWhere('expire_le', '>=', now());
        });
    }

    public function scopeExpired(Builder $query): Builder
    {
        return $query->where('expire_le', '<', now());
    }

    // ----------------------
    // Methods
    // ----------------------

    public function isActive(): bool
    {
        return $this->expire_le === null || $this->expire_le->isFuture();
    }

    public function logModification(string $action, array $details = [], ?User $user = null): void
    {
        $history = $this->historique_modifications ?? [];

        $history[] = [
            'timestamp' => now()->toIso8601String(),
            'action' => $action,
            'details' => $details,
            'user_id' => $user?->id,
            'user_name' => $user?->name,
        ];

        $this->update(['historique_modifications' => $history]);
    }

    public function revoke(?User $user = null): void
    {
        $this->update([
            'expire_le' => now(),
        ]);
        $this->logModification('revoked', ['reason' => 'manual revoke'], $user);
    }

    public function extendExpiration(Carbon $newDate, ?User $user = null): void
    {
        $this->update([
            'expire_le' => $newDate,
        ]);
        $this->logModification('expiration_extended', ['new_expiration' => $newDate->toDateTimeString()], $user);
    }

    public function updateNiveau(AutorisationNiveauEnum $newNiveau, ?User $user = null): void
    {
        $oldNiveau = $this->niveau;

        $this->update([
            'niveau' => $newNiveau,
        ]);

        $this->logModification('niveau_updated', [
            'old' => $oldNiveau->value,
            'new' => $newNiveau->value,
        ], $user);
    }
}
