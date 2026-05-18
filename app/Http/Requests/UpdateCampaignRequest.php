<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCampaignRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'campaign_name' => 'required|max:255',
            'client_id' => 'required|exists:clients,id',
            'budget' => 'required|numeric|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'campaign_status' => 'required|in:Live,Paused,Completed,Cancelled'
        ];
    }

    public function messages(): array
    {
        return [
            'end_date.after_or_equal' => 'End date must be after or equal to start date.'
        ];
    }
}
