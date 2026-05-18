<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();

            $table->foreignId('client_id')
                ->constrained()
                ->onDelete('cascade');

            $table->string('campaign_name');

            $table->decimal('budget', 10, 2);

            $table->date('start_date');
            $table->date('end_date');

            $table->enum('campaign_status', [
                'Live',
                'Paused',
                'Completed',
                'Cancelled'
            ]);

            $table->timestamps();

            $table->index('campaign_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
