<?php

namespace App\Enums;

enum AdhesionStatusEnum: string
{
    case EN_ATTENTE = 'en_attente';
    case ACCEPTEE = 'acceptée';
    case REFUSEE = 'refusée';
    case EXPIRED = 'expirée';

    public function label(): string
    {
        return match($this) {
            self::EN_ATTENTE => 'En attente',
            self::ACCEPTEE => 'Acceptée',
            self::REFUSEE => 'Refusée',
            self::EXPIRED => 'Expirée',
        };
    }

    public function isValidationStatus(): bool
    {
        return in_array($this, [self::ACCEPTEE, self::REFUSEE]);
    }
}
