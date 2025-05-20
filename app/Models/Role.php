<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'description',
        'permissions',
        'est_actif',
        'est_system'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'permissions' => 'array',
        'est_actif' => 'boolean',
        'est_system' => 'boolean',
    ];
    private array $permissions;

    /**
     * Get the users that belong to the role.
     */
    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(User::class, 'role_user')
            ->withTimestamps();
    }

    /**
     * Check if the role has a specific permission.
     */
    public function hasPermission($permission): bool
    {
        if (!$this->est_actif) {
            return false;
        }

        if (!$this->permissions) {
            return false;
        }

        return in_array($permission, $this->permissions);
    }

    /**
     * Add a permission to the role.
     */
    public function addPermission($permission): static
    {
        $permissions = $this->permissions ?? [];

        if (!in_array($permission, $permissions)) {
            $permissions[] = $permission;
            $this->permissions = $permissions;
            $this->save();
        }

        return $this;
    }

    /**
     * Remove a permission from the role.
     */
    public function removePermission($permission): static
    {
        if (!$this->permissions) {
            return $this;
        }

        $permissions = array_values(array_filter($this->permissions, function ($p) use ($permission) {
            return $p !== $permission;
        }));

        $this->permissions = $permissions;
        $this->save();

        return $this;
    }

    /**
     * Set all permissions for the role.
     */
    public function setPermissions(array $permissions): static
    {
        $this->permissions = $permissions;
        $this->save();

        return $this;
    }
}
