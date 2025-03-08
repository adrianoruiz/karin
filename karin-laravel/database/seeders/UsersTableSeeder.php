<?php

namespace Database\Seeders;

use App\Enum\ValidRoles;
use App\Models\User;
use App\Services\RoleService;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;



class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $role = RoleService::findSlug(ValidRoles::CLIENT);

        $user =  User::create([
            'name' => 'Amanda Lube',
            'email' => 'amanda@gmail.com',
            'password' => Hash::make('kar3fy007'), 
            'status' => 1,
            'avatar' => $faker->imageUrl(200, 200, 'people'),
            'phone' => $faker->phoneNumber,
            'is_whatsapp_user' => false
        ]);
        $userData = [
            'birthday' => '2000-12-04',
            'rg' => $faker->unique()->numerify('######'), // unique 6 digit rg
            'cpf' => $faker->unique()->numerify('###########') // unique 11 digit cpf
        ];

        $user->userData()->create($userData);
        $user->roles()->sync([$role]);

        for ($i = 0; $i < 10; $i++) {
            $user =  User::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => Hash::make('kar3fy007'), // all users will have the same password
                'status' => $faker->randomElement(['0', '1']),
                'avatar' => $faker->imageUrl(200, 200, 'people'),
                'phone' => $faker->phoneNumber,
                'is_whatsapp_user' => false
            ]);
            $userData = [
                'birthday' => '2000-04-04',
                'rg' => $faker->unique()->numerify('######'), // unique 6 digit rg
                'cpf' => $faker->unique()->numerify('###########') // unique 11 digit cpf
            ];
            

            $user->userData()->create($userData);
            $user->roles()->sync([$role]);
        }

    }
}
