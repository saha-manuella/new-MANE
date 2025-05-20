<?php

namespace App\Models;

use App\Enums\FormStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class FormulaireAdhesion extends Model
{
    use HasFactory;

    protected $table = 'formulaire_adhesions';

    protected $fillable = [
        'document_id',
        'nom',
        'description',
        'est_actif',
        'date_creation',
        'version',
        'champs_config',
        'historique_modifications',
        'created_by_user_id',
        'statut',
    ];

    protected $casts = [
        'est_actif' => 'boolean',
        'date_creation' => 'datetime',
        'champs_config' => 'array',
        'historique_modifications' => 'array',
        'statut' => FormStatusEnum::class,
    ];

    protected $attributes = [
        'est_actif' => true,
        'champs_config' => [],
        'historique_modifications' => [],
        'statut' => FormStatusEnum::DRAFT,
    ];

    // Relations
    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('est_actif', true);
    }

    public function scopePublished($query)
    {
        return $query->where('statut', FormStatusEnum::PUBLISHED);
    }

    public function scopeLatestVersion($query)
    {
        return $query->orderByRaw('LENGTH(version) DESC, version DESC');
    }

    // Gestion des champs
    public function getFieldConfig(string $fieldName): ?array
    {
        return collect($this->champs_config)->firstWhere('name', $fieldName);
    }

    public function setFieldConfig(string $fieldName, array $config): self
    {
        $this->champs_config = collect($this->champs_config)
            ->reject(fn ($item) => ($item['name'] ?? null) === $fieldName)
            ->push(array_merge($config, ['name' => $fieldName]))
            ->values()
            ->all();

        return $this;
    }

    // Historique
    public function addModification(?int $userId, string $description): self
    {
        $this->historique_modifications = collect($this->historique_modifications)
            ->push([
                'user_id' => $userId,
                'date' => now()->toIso8601String(),
                'description' => $description
            ])
            ->all();

        return $this;
    }

    // Gestion des versions
    public function createNewVersion(array $newData, int $userId): self
    {
        $this->update(['est_actif' => false]);

        $newVersion = $this->incrementVersion();

        $newFormulaire = $this->replicate()->fill([
                'version' => $newVersion,
                'est_actif' => true,
                'date_creation' => now(),
                'created_by_user_id' => $userId,
                'historique_modifications' => [],
            ] + $newData);

        $newFormulaire->save();
        $newFormulaire->addModification($userId, "Version $newVersion créée")->save();
        $this->addModification($userId, "Remplacé par version $newVersion")->save();

        return $newFormulaire;
    }

    protected function incrementVersion(): string
    {
        if (!preg_match('/^(\d+)(?:\.(\d+))?$/', $this->version, $matches)) {
            return '1.0';
        }

        $major = $matches[1] ?? 1;
        $minor = $matches[2] ?? 0;

        return $minor > 0 ? "$major." . ($minor + 1) : "$major.1";
    }

    // Validation
    public function validateData(array $data): array
    {
        return Validator::make(
            $data,
            $this->buildValidationRules(),
            $this->buildValidationMessages()
        )->validate();
    }

    protected function buildValidationRules(): array
    {
        $rules = [];

        foreach ($this->champs_config as $field) {
            if (empty($field['name'])) continue;

            $rules[$field['name']] = $this->buildFieldRules($field);
        }

        return $rules;
    }

    protected function buildFieldRules(array $field): string
    {
        $rules = [$field['required'] ?? false ? 'required' : 'nullable'];

        switch ($field['type'] ?? 'text') {
            case 'email': $rules[] = 'email'; break;
            case 'number': $rules[] = 'numeric'; break;
            case 'date': $rules[] = 'date'; break;
            case 'select':
                if (!empty($field['options'])) {
                    $rules[] = 'in:' . implode(',', $field['options']);
                }
                break;
        }

        if (isset($field['minLength'])) {
            $rules[] = 'min:' . $field['minLength'];
        }

        if (isset($field['maxLength'])) {
            $rules[] = 'max:' . $field['maxLength'];
        }

        return implode('|', array_unique($rules));
    }

    protected function buildValidationMessages(): array
    {
        $messages = [];

        foreach ($this->champs_config as $field) {
            if (empty($field['name'])) continue;

            $label = $field['label'] ?? $field['name'];

            if ($field['required'] ?? false) {
                $messages["{$field['name']}.required"] = "Le champ $label est obligatoire";
            }

            switch ($field['type'] ?? 'text') {
                case 'email':
                    $messages["{$field['name']}.email"] = "Le champ $label doit être un email valide";
                    break;
                case 'number':
                    $messages["{$field['name']}.numeric"] = "Le champ $label doit être un nombre";
                    break;
            }
        }

        return $messages;
    }

    // Gestion du statut
    public function publish(): self
    {
        return $this->updateStatut(FormStatusEnum::PUBLISHED);
    }

    public function archive(): self
    {
        return $this->updateStatut(FormStatusEnum::ARCHIVED);
    }

    protected function updateStatut(FormStatusEnum $statut): self
    {
        $this->update(['statut' => $statut]);
        $this->addModification(auth()->id(), "Statut changé à: {$statut->value}")->save();
        return $this;
    }
}
