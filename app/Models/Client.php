<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'client_name',
        'company_name',
        'email',
        'phone',
        'status'
    ];

    public function campaigns()
    {
        return $this->hasMany(Campaign::class);
    }
}