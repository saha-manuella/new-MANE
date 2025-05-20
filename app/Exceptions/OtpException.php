<?php

namespace App\Exceptions;

use Exception;

class OtpException extends Exception
{
    // codes d'erreur spécifiques
    public const int OTP_DISABLED = 1;
    public const int OTP_LOCKED = 2;

    public function __construct(string $message = "", int $code = 0)
    {
        parent::__construct($message, $code);
    }
}
