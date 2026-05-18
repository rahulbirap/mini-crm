<?php

namespace Database\Seeders;

use App\Models\Campaign;
use App\Models\Client;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CampaignSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clients = Client::all();

        foreach ($clients as $client) {
            Campaign::factory(5)->create([
                'client_id' => $client->id
            ]);
        }
    }
}
