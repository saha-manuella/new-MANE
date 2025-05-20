<?php

namespace App\Enums;

enum NotificationPreferenceEnum: string
{
    case EMAIL = 'email';
    case SMS = 'sms';

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
}
