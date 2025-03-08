<?php

namespace Database\Seeders;

use App\Enum\ValidRoles;
use App\Models\User;
use App\Services\RoleService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;



class RootSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $role = RoleService::findSlug(ValidRoles::ADMIN);

        $user = User::create([
            "name" => "Super Adriano",
            "email" => "ruiz@7cliques.com.br",
            "password" => Hash::make("admin#94007"),
            'phone' => '0909340192',
        ]);

        $user2 = User::create([
            "name" => "Super karin",
            "email" => "karin@drakarin.com.br",
            "password" => Hash::make("admin#94007"),
            'phone' => '0909340193',
        ]);

        $userData = [
            'image_id' => null,
            'birthday' => '2000-04-04',
            'rg' => '000000',
            'cpf' => '00000000000'
        ];

        $user->userData()->create($userData);
        $user->roles()->sync([$role]);
        
        $userData2 = [
            'image_id' => null,
            'birthday' => '2000-04-04',
            'rg' => '000001',
            'cpf' => '00000000001'
        ];
        
        $user2->userData()->create($userData2);
        $user2->roles()->sync([$role]);
    }
}