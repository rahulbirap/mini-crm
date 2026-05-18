<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Client;
use App\Models\Campaign;
use App\Http\Requests\StoreCampaignRequest;

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/clients', function () {
        $clients = Client::select('id', 'client_name', 'email', 'status')
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $clients
        ]);
    });

    Route::get('/clients/{client}', function (Client $client) {
        return response()->json([
            'success' => true,
            'data' => $client
        ]);
    });

    Route::post('/campaigns', function (StoreCampaignRequest $request) {
        $campaign = Campaign::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Campaign created successfully',
            'data' => $campaign
        ], 201);
    });

    Route::get('/campaigns', function () {
        $campaigns = Campaign::with('client')
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $campaigns
        ]);
    });

    Route::get('/campaigns/{campaign}', function (Campaign $campaign) {
        $campaign->load('client');

        return response()->json([
            'success' => true,
            'data' => $campaign
        ]);
    });

    Route::get('/dashboard', function () {
        return response()->json([
            'success' => true,
            'data' => [
                'totalClients' => Client::count(),
                'totalCampaigns' => Campaign::count(),
                'liveCampaigns' => Campaign::where('campaign_status', 'Live')->count(),
            ]
        ]);
    });
});
