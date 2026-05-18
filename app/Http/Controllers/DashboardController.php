<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Campaign;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [

            'totalClients' => Client::count(),

            'totalCampaigns' => Campaign::count(),

            'liveCampaigns' => Campaign::where(
                'campaign_status',
                'Live'
            )->count(),
        ]);
    }
}