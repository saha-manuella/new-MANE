<?php

namespace App\Enums;

enum TypeCompteEnum: string
{
    case INTERNE = 'interne';
    case EXTERNE = 'externe';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function validationRule(): string
    {
        return implode(',', self::values());
    }
}
