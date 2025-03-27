<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;



class PlanSeeder extends Seeder
{
    public function run()
    {
        $doctor_id = 2;
        $plans = [
            [
                'user_id'       => $doctor_id,
                'name'          => 'Consulta Avulsa Online',
                'modality'      => 'online',
                'type'          => 'consulta_avulsa',
                'consultations' => null,
                'price'         => 300.00,
                'installments'  => 3,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'user_id'       => $doctor_id,
                'name'          => 'Consulta Avulsa Presencial',
                'modality'      => 'presencial',
                'type'          => 'consulta_avulsa',
                'consultations' => null,
                'price'         => 350.00,
                'installments'  => 3,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'user_id'       => $doctor_id,
                'name'          => 'Pacote Online - 3 Consultas',
                'modality'      => 'online',
                'type'          => 'pacote',
                'consultations' => 3,
                'price'         => 850.00,
                'installments'  => 3,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'user_id'       => $doctor_id,
                'name'          => 'Pacote Online - 6 Consultas',
                'modality'      => 'online',
                'type'          => 'pacote',
                'consultations' => 6,
                'price'         => 1700.00,
                'installments'  => 10,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'user_id'       => $doctor_id,
                'name'          => 'Pacote Online - 9 Consultas',
                'modality'      => 'online',
                'type'          => 'pacote',
                'consultations' => 9,
                'price'         => 2200.00,
                'installments'  => 12,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'user_id'       => $doctor_id,
                'name'          => 'Pacote Presencial - 5 Sessões',
                'modality'      => 'presencial',
                'type'          => 'pacote',
                'consultations' => 5,
                'price'         => 1650.00,
                'installments'  => 10,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'user_id'       => $doctor_id,
                'name'          => 'Pacote Presencial - 6 Sessões',
                'modality'      => 'presencial',
                'type'          => 'pacote',
                'consultations' => 6,
                'price'         => 1980.00,
                'installments'  => 10,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
            [
                'user_id'       => $doctor_id,
                'name'          => 'Pacote Presencial - 9 Sessões',
                'modality'      => 'presencial',
                'type'          => 'pacote',
                'consultations' => 9,
                'price'         => 2700.00,
                'installments'  => 10,
                'created_at'    => now(),
                'updated_at'    => now(),
            ],
        ];

        DB::table('plans')->insert($plans);
    }
}