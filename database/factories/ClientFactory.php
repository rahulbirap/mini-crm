<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
   public function definition(): array
    {
        return [

            'client_name' => fake()->name(),

            'company_name' => fake()->company(),

            'email' => fake()->unique()->safeEmail(),

            'phone' => fake()->phoneNumber(),

            'status' => 'active',
        ];
    }
}
