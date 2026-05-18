<?php

namespace Database\Factories;

use App\Models\Campaign;
use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Campaign>
 */
class CampaignFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('-30 days', 'now');
        $endDate = fake()->dateTimeBetween($startDate, '+90 days');

        return [
            'client_id' => Client::factory(),
            'campaign_name' => fake()->catchPhrase(),
            'budget' => fake()->numberBetween(1000, 100000),
            'start_date' => $startDate->format('Y-m-d'),
            'end_date' => $endDate->format('Y-m-d'),
            'campaign_status' => fake()->randomElement(['Live', 'Paused', 'Completed', 'Cancelled']),
        ];
    }
}
