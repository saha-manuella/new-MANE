<?php

namespace App\Models;

use App\Enums\AutorisationNiveauEnum;
use App\Enums\NotificationPreferenceEnum;
use App\Enums\OtpMethodEnum;
use App\Enums\TypeCompteEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Config;
use App\Exceptions\OtpException;
use Random\RandomException;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'code_client',
        'cle',
        'gestionnaire',
        'type_compte',
        'otp_enabled',
        'otp_method',
        'notification_preference',
        'max_failed_otp_attempts'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'otp_secret',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'otp_enabled' => 'boolean',
        'otp_method' => OtpMethodEnum::class,
        'type_compte' => TypeCompteEnum::class,
        'notification_preference' => NotificationPreferenceEnum::class,
        'failed_otp_attempts' => 'integer',
        'max_failed_otp_attempts' => 'integer',
        'otp_history' => 'array',
        'last_otp_sent' => 'datetime',
        'otp_locked_until' => 'datetime',
        'code_client' => 'string',
        'cle' => 'string',
        'gestionnaire' => 'string',
    ];

    /**
     * Route notifications for the mail channel.
     */
    public function routeNotificationForMail()
    {
        return $this->email;
    }

    /**
     * Route notifications for the SMS channel.
     */
    public function routeNotificationForSms()
    {
        return $this->phone;
    }

    /**
     * Get the roles that belong to the user.
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user')
            ->withTimestamps();
    }

    /**
     * Get the adhesions for the user.
     */
    public function adhesions()
    {
        return $this->hasMany(Adhesion::class);
    }

    /**
     * Get the documents created by the user.
     */
    public function documentsCreated()
    {
        return $this->hasMany(Document::class, 'created_by_user_id');
    }

    /**
     * Get the formulaires created by the user.
     */
    public function formulairesCreated()
    {
        return $this->hasMany(FormulaireAdhesion::class, 'created_by_user_id');
    }

    /**
     * Get the adhesions validated by the user.
     */
    public function adhesionsValidated()
    {
        return $this->hasMany(Adhesion::class, 'validated_by_user_id');
    }

    /**
     * Get the autorisations granted by the user.
     */
    public function autorisationsAccordees()
    {
        return $this->hasMany(Autorisation::class, 'accorde_par_user_id');
    }

    /**
     * Check if the user has a specific role.
     */
    public function hasRole($roleName)
    {
        // Si la relation est déjà chargée, utiliser la collection
        if ($this->relationLoaded('roles')) {
            return $this->roles->contains('nom', $roleName);
        }

        // Sinon, faire une requête
        return $this->roles()->where('nom', $roleName)->exists();
    }

    /**
     * Check if the user has any of the given roles.
     */
    public function hasAnyRole($roleNames)
    {
        $roleNames = (array) $roleNames;

        // Si la relation est déjà chargée, utiliser la collection
        if ($this->relationLoaded('roles')) {
            return $this->roles->whereIn('nom', $roleNames)->isNotEmpty();
        }

        // Sinon, faire une requête
        return $this->roles()->whereIn('nom', $roleNames)->exists();
    }

    /**
     * Check if the user has all the given roles.
     */
    public function hasAllRoles($roleNames)
    {
        $roleNames = (array) $roleNames;
        $rolesCount = count($roleNames);

        // Si la relation est déjà chargée, utiliser la collection
        if ($this->relationLoaded('roles')) {
            return $this->roles->whereIn('nom', $roleNames)->count() === $rolesCount;
        }

        // Sinon, faire une requête
        return $this->roles()->whereIn('nom', $roleNames)->count() === $rolesCount;
    }

    /**
     * Check if the user has a specific permission.
     */
    public function hasPermission($permission)
    {
        // Charger les rôles si nécessaire
        if (!$this->relationLoaded('roles')) {
            $this->load('roles');
        }

        foreach ($this->roles as $role) {
            if ($role->hasPermission($permission)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if the user is an admin.
     */
    public function isAdmin()
    {
        return $this->hasRole('admin');
    }

    /**
     * Check if the user can access a document.
     */
    public function canAccessDocument($document, $niveau = AutorisationNiveauEnum::LECTURE)
    {
        if ($this->isAdmin()) {
            return true;
        }

        // Convertir la chaîne en enum si nécessaire
        if (is_string($niveau)) {
            $niveau = AutorisationNiveauEnum::from($niveau);
        }

        $roleIds = $this->roles->pluck('id');
        $niveauxAutorises = AutorisationNiveauEnum::getLowerLevels($niveau);

        return Autorisation::where('document_id', $document->id)
            ->whereIn('role_id', $roleIds)
            ->whereIn('niveau', $niveauxAutorises)
            ->where(function ($query) {
                $query->whereNull('expire_le')
                    ->orWhere('expire_le', '>=', now());
            })
            ->exists();
    }

    /**
     * Check if the user's OTP is locked.
     */
    public function isOtpLocked(): bool
    {
        if ($this->failed_otp_attempts >= $this->max_failed_otp_attempts) {
            if ($this->otp_locked_until && $this->otp_locked_until->isFuture()) {
                return true;
            }

            // Si la période de verrouillage est absente ou expirée, on la remet à jour
            if (!$this->otp_locked_until || $this->otp_locked_until->isPast()) {
                $this->otp_locked_until = now()->addMinutes(30);
                $this->save();
            }

            return true;
        }

        return false;
    }

    /**
     * Generate and save an OTP for the user.
     * @throws RandomException
     */
    public function generateOtp()
    {
        if (!$this->otp_enabled) {
            throw new OtpException("L'authentification OTP n'est pas activée pour cet utilisateur.", OtpException::OTP_DISABLED);
        }

        if ($this->isOtpLocked()) {
            $minutesLeft = now()->diffInMinutes($this->otp_locked_until);
            throw new OtpException("L'authentification OTP est temporairement verrouillée. Réessayez dans {$minutesLeft} minutes.", OtpException::OTP_LOCKED);
        }

        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        $this->otp_secret = bcrypt($otp);
        $this->last_otp_sent = now();
        $this->failed_otp_attempts = 0;

        $otpHistory = $this->otp_history ?? [];
        $otpHistory[] = [
            'sent_at' => now()->toIso8601String(),
            'method' => $this->otp_method->value
        ];
        $this->otp_history = $otpHistory;

        $this->save();

        return $otp;
    }

    /**
     * Verify an OTP code.
     */
    public function verifyOtp($code)
    {
        // Vérifier si l'OTP est activé
        if (!$this->otp_enabled) {
            return false;
        }

        // Vérifier si l'OTP est verrouillé
        if ($this->isOtpLocked()) {
            return false;
        }

        // Si pas de OTP secret ou expiré (plus de 5 minutes)
        if (!$this->otp_secret ||
            !$this->last_otp_sent ||
            $this->last_otp_sent->diffInMinutes(now()) > 5) {

            // Incrémenter les tentatives échouées
            $this->failed_otp_attempts += 1;
            $this->save();

            return false;
        }

        if (password_verify($code, $this->otp_secret)) {
            // OTP valide, réinitialiser
            $this->otp_secret = null;
            $this->failed_otp_attempts = 0;
            $this->otp_locked_until = null;
            $this->save();
            return true;
        }

        // OTP invalide, incrémenter les tentatives échouées
        $this->failed_otp_attempts += 1;

        // Vérifier si le compte doit être verrouillé
        if ($this->failed_otp_attempts >= $this->max_failed_otp_attempts) {
            $this->otp_locked_until = now()->addMinutes(30);
        }

        $this->save();

        return false;
    }

    /**
     * Determine user account type based on business rules.
     * Ne sauvegarde pas automatiquement, contrairement à la version précédente.
     */
    public function determineAccountType()
    {
        // Liste des variations de 'RH' à vérifier
        $rhVariations = ['RH', 'R.H.', 'R.H', 'R H', 'Ressources Humaines'];

        // Si le gestionnaire correspond à l'une des variations de 'RH', c'est un compte interne
        if ($this->gestionnaire && in_array(strtoupper($this->gestionnaire), array_map('strtoupper', $rhVariations))) {
            return TypeCompteEnum::INTERNE;
        }

        // Domaine de l'entreprise configuré dans config/app.php ou .env
        $companyDomain = Config::get('app.company_domain', 'groupecommercialbank.com');

        // Si l'email est du domaine de l'entreprise, c'est un compte interne
        if (strpos($this->email, '@' . $companyDomain) !== false) {
            return TypeCompteEnum::INTERNE;
        }

        // Sinon, c'est un compte externe
        return TypeCompteEnum::EXTERNE;
    }

    /**
     * Save the determined account type.
     */
    public function saveAccountType()
    {
        $this->type_compte = $this->determineAccountType();
        $this->save();

        return $this->type_compte;
    }

    /**
     * Get the preferred notification channel based on user preference.
     */
    public function getPreferredChannel()
    {
        return $this->notification_preference === NotificationPreferenceEnum::SMS ? 'sms' : 'mail';
    }
}
