<?php

namespace App\Enum;

class ValidRoles
{
    const CLIENT = 'client';

    const PATIENT = 'patient';

    const SERVICE = 'service';

    const CLINIC = 'clinic';

    const ADMIN = 'admin';

    const SUPPORT = 'support';

    const CONTACT = 'contact';

    const COMMERCIAL = 'commercial';

    const DOCTOR = 'doctor';

    const PRODUCT_VALIDATOR = 'product_validator';

    const FINANCIAL = 'financial';

    const EXPEDITOR = 'expeditor';

    // Array com todos os roles de empresa
    const COMPANY_ROLES = [
        self::CLINIC,
        self::SERVICE,
        self::COMMERCIAL,
        self::DOCTOR,
    ];

    // Array com todos os roles administrativos
    const ADMIN_ROLES = [
        self::ADMIN,
        self::SUPPORT,
    ];

    /**
     * Verifica se um role está na lista de roles de empresa
     *
     * @param  string  $role
     * @return bool
     */
    public static function isCompanyRole($role)
    {
        return in_array($role, self::COMPANY_ROLES);
    }

    /**
     * Verifica se um role está na lista de roles administrativos
     *
     * @param  string  $role
     * @return bool
     */
    public static function isAdminRole($role)
    {
        return in_array($role, self::ADMIN_ROLES);
    }
}
