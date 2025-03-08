<?php

namespace Database\Seeders;

use App\Enum\ValidRoles;
use App\Models\Role;
use Illuminate\Database\Seeder;



class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            "description" => "Administrador",
            "slug" => ValidRoles::ADMIN,
        ]);

        Role::create([
            "description" => "Tutor",
            "slug" => ValidRoles::CLIENT,
        ]);

        Role::create([
            "description" => "Clinic",
            "slug" => ValidRoles::CLINIC,
        ]);

        Role::create([
            "description" => "Doctor",
            "slug" => ValidRoles::DOCTOR,
        ]);

        Role::create([
            "description" => "Serviços",
            "slug" => ValidRoles::SERVICE,
        ]);

        // roles internos
        Role::create([
            "description" => "Comercial",
            "slug" => ValidRoles::COMMERCIAL,
        ]);

        Role::create([
            "description" => "Contato",
            "slug" => ValidRoles::CONTACT,
        ]);

        Role::create([
            "description" => "Suporte",
            "slug" => ValidRoles::SUPPORT,
        ]);

        Role::create([
            "description" => "Avaliador de produtos",
            "slug" => ValidRoles::PRODUCT_VALIDATOR,
        ]);

        Role::create([
            "description" => "Financeiro",
            "slug" => ValidRoles::FINANCIAL,
        ]);

        Role::create([
            "description" => "Expeditor",
            "slug" => ValidRoles::EXPEDITOR,
        ]);
    }
}
