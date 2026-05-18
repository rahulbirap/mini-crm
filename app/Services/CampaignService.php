<?php

namespace App\Services;

use App\Models\Campaign;

class CampaignService
{
    public function store(array $data)
    {
        return Campaign::create($data);
    }

    public function update(Campaign $campaign, array $data)
    {
        $campaign->update($data);
        return $campaign;
    }

    public function delete(Campaign $campaign)
    {
        return $campaign->delete();
    }
}
