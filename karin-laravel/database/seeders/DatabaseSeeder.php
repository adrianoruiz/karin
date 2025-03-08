<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;



class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        
        $this->call([
            RolesTableSeeder::class,
            ProvincesTableSeeder::class,
            CitiesTableSeeder::class,
            RootSeeder::class,
            UsersTableSeeder::class,
            ChatbotsTableSeeder::class,
        ]);
    }
}
