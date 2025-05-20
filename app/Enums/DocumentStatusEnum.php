<?php

namespace App\Enums;

enum DocumentStatusEnum: string
{
    case PUBLIE = 'publié';
    case ARCHIVE = 'archivé';
    case BROUILLON = 'brouillon';

    public function label(): string
    {
        return match($this) {
            self::PUBLIE => 'Publié',
            self::ARCHIVE => 'Archivé',
            self::BROUILLON => 'Brouillon',
        };
    }

    public static function toSelectArray(): array
    {
        return [
            self::PUBLIE->value => self::PUBLIE->label(),
            self::ARCHIVE->value => self::ARCHIVE->label(),
            self::BROUILLON->value => self::BROUILLON->label(),
        ];
    }
}
