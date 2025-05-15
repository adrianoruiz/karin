<?php

namespace Database\Seeders;

use App\Models\Specialty;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SpecialtySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Especialidades para clínica médica
        $clinicaMedicaSpecialties = [
            'Acupuntura',
            'Alergologia e Imunologia',
            'Anestesiologia',
            'Angiologia',
            'Cardiologia',
            'Cirurgia Cardiovascular',
            'Cirurgia Geral',
            'Cirurgia Plástica',
            'Cirurgia Torácica',
            'Cirurgia Vascular',
            'Clínica Geral',
            'Coloproctologia',
            'Dermatologia',
            'Endocrinologia',
            'Fisiatria',
            'Gastroenterologia',
            'Genética Médica',
            'Geriatria',
            'Ginecologia e Obstetrícia',
            'Hematologia',
            'Hepatologia',
            'Homeopatia',
            'Infectologia',
            'Mastologia',
            'Medicina de Família',
            'Medicina do Trabalho',
            'Medicina Esportiva',
            'Medicina Intensiva',
            'Medicina Nuclear',
            'Nefrologia',
            'Neurocirurgia',
            'Neurologia',
            'Nutrologia',
            'Oftalmologia',
            'Oncologia',
            'Ortopedia e Traumatologia',
            'Otorrinolaringologia',
            'Patologia',
            'Pediatria',
            'Pneumologia',
            'Psiquiatria',
            'Radiologia',
            'Radioterapia',
            'Reumatologia',
            'Saúde Mental',
            'Urologia'
        ];

        foreach ($clinicaMedicaSpecialties as $specialty) {
            Specialty::create([
                'name' => $specialty,
                'segment_type' => 'clinica-medica',
                'status' => true
            ]);
        }

        // Especialidades para clínica odontológica
        $clinicaOdontoSpecialties = [
            'Odontologia Geral',
            'Ortodontia',
            'Endodontia',
            'Periodontia',
            'Implantodontia',
            'Odontopediatria',
            'Prótese Dentária',
            'Cirurgia Bucomaxilofacial',
            'Estética Dental',
            'Radiologia Odontológica'
        ];

        foreach ($clinicaOdontoSpecialties as $specialty) {
            Specialty::create([
                'name' => $specialty,
                'segment_type' => 'clinica-odonto',
                'status' => true
            ]);
        }

        // Especialidades para salão de beleza
        $salaoBelezaSpecialties = [
            'Cabeleireiro',
            'Manicure e Pedicure',
            'Depilação',
            'Estética Facial',
            'Estética Corporal',
            'Maquiagem',
            'Design de Sobrancelhas',
            'Massagem',
            'Alongamento de Cílios',
            'Corte Masculino',
            'Coloração',
            'Tratamentos Capilares',
            'Spa das Mãos e Pés',
            'Podologia'
        ];

        foreach ($salaoBelezaSpecialties as $specialty) {
            Specialty::create([
                'name' => $specialty,
                'segment_type' => 'salao-beleza',
                'status' => true
            ]);
        }
    }
}
