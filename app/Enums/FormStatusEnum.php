<?php

namespace App\Enums;

enum FormStatusEnum: string
{
    case DRAFT = 'brouillon';
    case PUBLISHED = 'publie';
    case ARCHIVED = 'archive';

    public function label(): string
    {
        return match($this) {
            self::DRAFT => 'Brouillon',
            self::PUBLISHED => 'Publié',
            self::ARCHIVED => 'Archivé',
        };
    }
}
