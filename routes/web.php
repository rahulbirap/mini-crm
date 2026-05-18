<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\DashboardController;

require __DIR__.'/auth.php';

/*
|--------------------------------------------------------------------------
| ROOT ROUTE (SMART REDIRECT)
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return redirect()->route('login');
});

/*
|--------------------------------------------------------------------------
| PROTECTED APP ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('clients', ClientController::class);
    Route::resource('campaigns', CampaignController::class);
});