<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $fillable = [
        'campaign_name',
        'client_id',
        'budget',
        'start_date',
        'end_date',
        'campaign_status'
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}