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
            'name' => 'Adriano Boldarini',
            'email' => 'ruiz@7cliques.com.br',
            'password' => Hash::make('admin#9407'),
            'phone' => '45999110509',
            'avatar' => 'https://media.licdn.com/dms/image/v2/D4D03AQFQTIh0FmPebw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1673705998921?e=2147483647&v=beta&t=Tm8gjYgyLYsaWaMozUaosoAc1OSrDWJD9_W8csZi0qc',
            'status' => 1,
            'is_whatsapp_user' => true,
        ]);

        $user2 = User::create([
            'name' => 'Dra. karin',
            'email' => 'karin@drakarin.com.br',
            'password' => Hash::make('karin#9407'),
            'phone' => '47996947825',
            'status' => 1,
            'avatar' => 'https://drakarin.com.br/images/karin-psiq.png',
            'is_whatsapp_user' => true,
        ]);

        $userData = [
            'birthday' => '2000-04-04',
            'rg' => '000000',
            'cpf' => '00000000000',
            'fantasy' => '7clicks',
        ];

        $user->userData()->create($userData);
        $user->roles()->sync([$role]);

        $userData2 = [
            'birthday' => '2000-04-04',
            'rg' => '000001',
            'cpf' => '00000000001',
            'fantasy' => 'Dra. Karin',
        ];

        $user2->userData()->create($userData2);
        $user2->roles()->sync([$role]);
    }
}
