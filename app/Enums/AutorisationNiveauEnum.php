<?php

namespace App\Enums;

enum AutorisationNiveauEnum: string
{
    case LECTURE = 'lecture';
    case MODIFICATION = 'modification';
    case ADMINISTRATION = 'administration';

    /**
     * Récupère toutes les valeurs sous forme de tableau
     *
     * @return array<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Récupère toutes les valeurs sous forme de tableau pour les règles de validation
     *
     * @return string
     */
    public static function validationRule(): string
    {
        return implode(',', self::values());
    }

    /**
     * Récupère les niveaux d'autorisation inférieurs ou égaux au niveau donné
     *
     * @param self $niveau
     * @return array<string>
     */
    public static function getLowerLevels(self $niveau): array
    {
        return match($niveau) {
            self::LECTURE => [self::LECTURE->value],
            self::MODIFICATION => [self::LECTURE->value, self::MODIFICATION->value],
            self::ADMINISTRATION => [self::LECTURE->value, self::MODIFICATION->value, self::ADMINISTRATION->value],
        };
    }
}
