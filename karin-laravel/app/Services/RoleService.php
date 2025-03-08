<?php

namespace App\Services;

use App\Exceptions\RoleNotFound;
use Illuminate\Support\Facades\Auth;
use Throwable;

use App\Models\{
    Role,
    User
};



class RoleService
{
    static function findSlug($slug): int
    {
        try {
            $role = Role::where('slug', $slug)->firstOrFail(['id']);
            return $role->id;
        } catch (Throwable $th) {
            throw new RoleNotFound();
        }
    }

    static function verifyRolesByEmail(string $email, ...$roles)
    {
        return User::where('email', $email)->whereHas('roles', function ($builder) use ($roles) {
            $builder->whereIn('slug', $roles);
        })->count() > 0;
    }

    static function verifyIsAdmin($id = null): bool
    {
        $user = Auth::user();
        if (!$user) return false;

        $userId = $id ?? $user->id;
        return User::where('id', $userId)->whereHas(
            'roles',
            fn ($builder) => $builder->where('slug', 'admin')
        )->count() > 0;
    }

    static function verifyIsTester($id = null): bool
    {
        $user = Auth::user();
        if (!$user) return false;

        $userId = $id ?? $user->id;
        return User::where('id', $userId)->whereHas(
            'roles',
            fn ($builder) => $builder->where('slug', 'client_test')
        )->count() > 0;
    }

    static function verifyIsPetshopTester($id = null): bool
    {
        $user = Auth::user();
        if (!$user) return false;

        $userId = $id ?? $user->id;
        return User::where('id', $userId)->whereHas(
            'roles',
            fn ($builder) => $builder->where('slug', 'petshop_test')
        )->count() > 0;
    }

    static function verifyIsProductValidator(): bool
    {
        $user = Auth::user();
        if (!$user) return false;

        return User::where('id', $user->id)->whereHas(
            'roles',
            fn ($builder) => $builder->where('slug', 'product_validator')
        )->count() > 0;
    }

    static function verifyIsClient(): bool
    {
        $user = Auth::user();
        if (!$user) return false;

        return User::where('id', $user->id)->whereHas(
            'roles',
            fn ($builder) => $builder->where('slug', 'client')
        )->count() > 0;
    }

    static function verifyIsPetshop($id = null): bool
    {
        $user = Auth::user();
        if (!$user) return false;

        $userId = $id ?? $user->id;
        return User::where('id', $userId)->whereHas(
            'roles',
            fn ($builder) => $builder->where('slug', 'petshop')
        )->count() > 0;
    }

    public static function verifyIsSeller(int $userId): bool
    {
        $user = User::find($userId);
        if (!$user) {
            return false;
        }

        return $user->roles()->where('slug', 'petshop')->exists(); 
    }
}
