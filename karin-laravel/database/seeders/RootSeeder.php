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

        $user = User::create([
            "name" => "Super karin",
            "email" => "karin@drakarin.com.br",
            "password" => Hash::make("admin#94007"),
            'phone' => '0909340192',
        ]);

        $userData = [
            'user_id' => 1,
            'image_id' => null,
            'birthday' => '2000-04-04',
            'rg' => '000000',
            'cpf' => '00000000000'
        ];

        $user->userData()->create($userData);
        $user->roles()->sync([$role]);
    }
}