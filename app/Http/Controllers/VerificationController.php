<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Mail\VerificationCodeMail;
use App\Services\SmsService;
use Carbon\Carbon;

class VerificationController extends Controller
{
    protected $smsService;

    public function __construct(SmsService $smsService)
    {
        $this->smsService = $smsService;
    }

    /**
     * Afficher la page de vérification OTP
     */
    public function index()
    {
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('auth.login')->with('error', 'Vous devez être connecté pour accéder à cette page.');
        }

        // Si l'utilisateur est déjà vérifié, rediriger vers home
        if ($user->phone_verified_at) {
            return redirect()->route('home');
        }

        // Masquer le numéro de téléphone pour l'affichage
        $maskedPhone = $this->maskPhoneNumber($user->phone);

        return view('verification.index', compact('maskedPhone'));
    }

    /**
     * Vérifier le code OTP soumis
     */
    public function verify(Request $request)
    {
        $request->validate([
            'otp' => 'required|string|size:5'
        ], [
            'otp.required' => 'Le code de vérification est requis.',
            'otp.size' => 'Le code de vérification doit contenir exactement 5 caractères.'
        ]);

        $user = Auth::user();
        $otp = $request->input('otp');

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non authentifié.'
            ], 401);
        }

        // Vérifier si l'utilisateur n'est pas déjà vérifié
        if ($user->phone_verified_at) {
            return response()->json([
                'success' => true,
                'message' => 'Numéro déjà vérifié.',
                'redirect' => route('home')
            ]);
        }

        // Récupérer le code OTP stocké en cache
        $cacheKey = 'otp_' . $user->id;
        $cachedData = Cache::get($cacheKey);

        if (!$cachedData) {
            return response()->json([
                'success' => false,
                'message' => 'Code de vérification expiré. Veuillez demander un nouveau code.'
            ], 400);
        }

        // Vérifier le code OTP
        if ($cachedData['code'] !== $otp) {
            // Incrémenter le compteur de tentatives
            $attempts = $cachedData['attempts'] + 1;
            
            if ($attempts >= 3) {
                // Supprimer le code après 3 tentatives
                Cache::forget($cacheKey);
                
                return response()->json([
                    'success' => false,
                    'message' => 'Trop de tentatives incorrectes. Veuillez demander un nouveau code.'
                ], 400);
            }

            // Mettre à jour le nombre de tentatives
            Cache::put($cacheKey, [
                'code' => $cachedData['code'],
                'attempts' => $attempts,
                'created_at' => $cachedData['created_at']
            ], now()->addMinutes(10));

            return response()->json([
                'success' => false,
                'message' => "Code incorrect. Il vous reste " . (3 - $attempts) . " tentative(s)."
            ], 400);
        }

        // Code correct, marquer comme vérifié
        $user->update([
            'phone_verified_at' => now()
        ]);

        // Supprimer le code du cache
        Cache::forget($cacheKey);

        // Log de l'événement
        Log::info('Phone verification successful', [
            'user_id' => $user->id,
            'phone' => $user->phone
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Numéro de téléphone vérifié avec succès !',
            'redirect' => route('home')
        ]);
    }

    /**
     * Renvoyer un nouveau code OTP
     */
    public function resend(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non authentifié.'
            ], 401);
        }

        if ($user->phone_verified_at) {
            return response()->json([
                'success' => false,
                'message' => 'Numéro déjà vérifié.'
            ], 400);
        }

        // Vérifier la limite de renvoi (max 3 par heure)
        $resendKey = 'otp_resend_' . $user->id;
        $resendCount = Cache::get($resendKey, 0);

        if ($resendCount >= 3) {
            return response()->json([
                'success' => false,
                'message' => 'Limite de renvoi atteinte. Veuillez attendre une heure avant de redemander un code.'
            ], 429);
        }

        // Générer un nouveau code OTP
        $otp = $this->generateOTP();
        $cacheKey = 'otp_' . $user->id;

        // Stocker le nouveau code
        Cache::put($cacheKey, [
            'code' => $otp,
            'attempts' => 0,
            'created_at' => now()
        ], now()->addMinutes(10));

        // Incrémenter le compteur de renvoi
        Cache::put($resendKey, $resendCount + 1, now()->addHour());

        try {
            // Envoyer par SMS
            $this->smsService->sendVerificationSMS($user->phone, $otp);

            Log::info('OTP resent successfully', [
                'user_id' => $user->id,
                'phone' => $user->phone
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Nouveau code envoyé par SMS.'
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to resend OTP', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'envoi du SMS. Veuillez réessayer.'
            ], 500);
        }
    }

    /**
     * Renvoyer le code par email
     */
    public function resendByEmail(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non authentifié.'
            ], 401);
        }

        if ($user->phone_verified_at) {
            return response()->json([
                'success' => false,
                'message' => 'Numéro déjà vérifié.'
            ], 400);
        }

        // Récupérer le code OTP existant ou en générer un nouveau
        $cacheKey = 'otp_' . $user->id;
        $cachedData = Cache::get($cacheKey);

        if (!$cachedData) {
            // Générer un nouveau code si aucun n'existe
            $otp = $this->generateOTP();
            Cache::put($cacheKey, [
                'code' => $otp,
                'attempts' => 0,
                'created_at' => now()
            ], now()->addMinutes(10));
        } else {
            $otp = $cachedData['code'];
        }

        try {
            // Envoyer par email
            Mail::to($user->email)->send(new VerificationCodeMail($otp, $user->name));

            Log::info('OTP sent by email', [
                'user_id' => $user->id,
                'email' => $user->email
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Code de vérification envoyé par email.'
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to send OTP by email', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer.'
            ], 500);
        }
    }

    /**
     * Générer un code OTP de 5 chiffres
     */
    private function generateOTP()
    {
        return str_pad(random_int(0, 99999), 5, '0', STR_PAD_LEFT);
    }

    /**
     * Masquer le numéro de téléphone pour l'affichage
     */
    private function maskPhoneNumber($phone)
    {
        if (strlen($phone) < 4) {
            return $phone;
        }

        return str_repeat('*', strlen($phone) - 2) . substr($phone, -2);
    }

    /**
     * Envoyer le code OTP initial (appelé après l'inscription)
     */
    public function sendInitialOTP(User $user)
    {
        $otp = $this->generateOTP();
        $cacheKey = 'otp_' . $user->id;

        // Stocker le code OTP
        Cache::put($cacheKey, [
            'code' => $otp,
            'attempts' => 0,
            'created_at' => now()
        ], now()->addMinutes(10));

        try {
            // Envoyer par SMS
            $this->smsService->sendVerificationSMS($user->phone, $otp);

            Log::info('Initial OTP sent', [
                'user_id' => $user->id,
                'phone' => $user->phone
            ]);

            return true;

        } catch (\Exception $e) {
            Log::error('Failed to send initial OTP', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);

            return false;
        }
    }
}