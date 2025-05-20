<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Autoriser toutes les actions pour les super administrateurs
     */
    protected function isSuperAdmin(User $user): bool
    {
        return $user->hasRole('super-admin');
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermission('users.view-any') || $this->isSuperAdmin($user);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $model): bool
    {
        // Autoriser l'accès à son propre profil
        if ($user->is($model)) {
            return true;
        }

        return $user->hasPermission('users.view') || $this->isSuperAdmin($user);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermission('users.create') || $this->isSuperAdmin($user);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model): bool
    {
        // Autoriser la mise à jour de son propre profil
        if ($user->is($model)) {
            return $user->hasPermission('profile.update');
        }

        return $user->hasPermission('users.update') || $this->isSuperAdmin($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model): bool
    {
        // Empêcher l'auto-suppression
        if ($user->is($model)) {
            return false;
        }

        // Empêcher la suppression des super-admins
        if ($model->hasRole('super-admin')) {
            return false;
        }

        return $user->hasPermission('users.delete') || $this->isSuperAdmin($user);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, User $model): bool
    {
        return $user->hasPermission('users.restore') || $this->isSuperAdmin($user);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, User $model): bool
    {
        // Seul un super-admin peut supprimer définitivement
        return $this->isSuperAdmin($user);
    }

    /**
     * Determine whether the user can manage OTP for another user.
     */
    public function manageOtp(User $user, User $model): bool
    {
        if ($user->is($model)) {
            return $user->hasPermission('profile.manage-otp');
        }

        return $user->hasPermission('users.manage-otp') || $this->isSuperAdmin($user);
    }

    /**
     * Determine whether the user can manage roles for another user.
     */
    public function manageRoles(User $user, User $model): bool
    {
        // Empêcher l'auto-modification des rôles
        if ($user->is($model)) {
            return false;
        }

        // Empêcher la modification des super-admins
        if ($model->hasRole('super-admin')) {
            return false;
        }

        return $user->hasPermission('users.manage-roles') || $this->isSuperAdmin($user);
    }

    /**
     * Determine whether the user can impersonate another user.
     */
    public function impersonate(User $user, User $model): bool
    {
        // Ne pas permettre l'usurpation des super-admins
        if ($model->hasRole('super-admin')) {
            return false;
        }

        return $user->hasPermission('users.impersonate') && !$user->is($model);
    }
}
