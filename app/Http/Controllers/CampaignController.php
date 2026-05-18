<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCampaignRequest;
use App\Http\Requests\UpdateCampaignRequest;
use App\Models\Campaign;
use App\Models\Client;
use App\Services\CampaignService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CampaignController extends Controller
{
    public function __construct(
        protected CampaignService $campaignService
    ) {}

    public function index(Request $request)
    {
        $campaigns = Campaign::query()
            ->with('client')
            ->when($request->search, function ($query, $search) {
                $query->where('campaign_name', 'like', "%{$search}%");
            })
            ->when($request->status, function ($query, $status) {
                $query->where('campaign_status', $status);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Campaigns/Index', [
            'campaigns' => $campaigns,
            'filters' => $request->only('search', 'status')
        ]);
    }

    public function create()
    {
        $clients = Client::select('id', 'client_name')->get();

        return Inertia::render('Campaigns/Create', [
            'clients' => $clients
        ]);
    }

    public function store(StoreCampaignRequest $request)
    {
        $this->campaignService->store($request->validated());

        return redirect()
            ->route('campaigns.index')
            ->with('success', 'Campaign created successfully');
    }

    public function edit(Campaign $campaign)
    {
        $clients = Client::select('id', 'client_name')->get();

        return Inertia::render('Campaigns/Edit', [
            'campaign' => $campaign,
            'clients' => $clients
        ]);
    }

    public function update(UpdateCampaignRequest $request, Campaign $campaign)
    {
        $this->campaignService->update($campaign, $request->validated());

        return redirect()
            ->route('campaigns.index')
            ->with('success', 'Campaign updated successfully');
    }

    public function destroy(Campaign $campaign)
    {
        $this->campaignService->delete($campaign);

        return redirect()
            ->back()
            ->with('success', 'Campaign deleted successfully');
    }
}
