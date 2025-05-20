<?php

namespace App\Enums;

enum FrequenceRenouvellementEnum: string
{
    case ANNUEL = 'annuel';
    case SEMESTRIEL = 'semestriel';
    case TRIMESTRIEL = 'trimestriel';
    case MENSUEL = 'mensuel';
    case PONCTUEL = 'ponctuel';

    public function label(): string
    {
        return match($this) {
            self::ANNUEL => 'Annuel',
            self::SEMESTRIEL => 'Semestriel',
            self::TRIMESTRIEL => 'Trimestriel',
            self::MENSUEL => 'Mensuel',
            self::PONCTUEL => 'Ponctuel',
        };
    }

    public static function toSelectArray(): array
    {
        return [
            self::ANNUEL->value => self::ANNUEL->label(),
            self::SEMESTRIEL->value => self::SEMESTRIEL->label(),
            self::TRIMESTRIEL->value => self::TRIMESTRIEL->label(),
            self::MENSUEL->value => self::MENSUEL->label(),
            self::PONCTUEL->value => self::PONCTUEL->label(),
        ];
    }

    public function getInterval(): \DateInterval
    {
        return match($this) {
            self::ANNUEL => new \DateInterval('P1Y'),
            self::SEMESTRIEL => new \DateInterval('P6M'),
            self::TRIMESTRIEL => new \DateInterval('P3M'),
            self::MENSUEL => new \DateInterval('P1M'),
            self::PONCTUEL => new \DateInterval('P0D'),
        };
    }
}
