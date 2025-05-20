<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TypeDocument extends Model
{
    use HasFactory;

    protected $table = 'type_documents';

    protected $fillable = [
        'code',
        'nom',
        'description',
        'est_actif',
        'attributs_config'
    ];

    protected $casts = [
        'est_actif' => 'boolean',
        'attributs_config' => 'array',
    ];

    protected $attributes = [
        'est_actif' => true,
        'attributs_config' => '[]',
    ];

    /**
     * Relation avec les documents
     */
    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }

    /**
     * Scope pour les types actifs
     */
    public function scopeActifs(Builder $query): Builder
    {
        return $query->where('est_actif', true);
    }

    /**
     * Récupère une configuration d'attribut par son nom
     */
    public function getAttributConfig(string $attributeName): ?array
    {
        return collect($this->attributs_config)
            ->firstWhere('name', $attributeName);
    }

    /**
     * Vérifie si un attribut existe
     */
    public function hasAttributConfig(string $attributeName): bool
    {
        return !is_null($this->getAttributConfig($attributeName));
    }

    /**
     * Ajoute ou met à jour un attribut de configuration
     */
    public function setAttributConfig(string $attributeName, array $config): void
    {
        $attributs = collect($this->attributs_config)
            ->reject(fn ($item) => $item['name'] === $attributeName)
            ->push(array_merge($config, ['name' => $attributeName]))
            ->values()
            ->toArray();

        $this->attributs_config = $attributs;
    }
}
