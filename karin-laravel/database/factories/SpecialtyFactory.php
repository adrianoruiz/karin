<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Specialty>
 */
class SpecialtyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $segmentTypes = ['clinica-medica', 'salao-beleza', 'clinica-odonto'];
        $selectedSegment = $this->faker->randomElement($segmentTypes);

        return [
            'name' => $this->faker->unique()->words(2, true),
            'segment_type' => $selectedSegment,
            'status' => $this->faker->boolean(90), // 90% chance de ser true
        ];
    }

    /**
     * Define especialidades para clínicas médicas.
     */
    public function clinicaMedica()
    {
        return $this->state(function (array $attributes) {
            return [
                'segment_type' => 'clinica-medica',
            ];
        });
    }

    /**
     * Define especialidades para salões de beleza.
     */
    public function salaoBeleza()
    {
        return $this->state(function (array $attributes) {
            return [
                'segment_type' => 'salao-beleza',
            ];
        });
    }

    /**
     * Define especialidades para clínicas odontológicas.
     */
    public function clinicaOdonto()
    {
        return $this->state(function (array $attributes) {
            return [
                'segment_type' => 'clinica-odonto',
            ];
        });
    }
}
