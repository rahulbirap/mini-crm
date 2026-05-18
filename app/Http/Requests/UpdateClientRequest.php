<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateClientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_name' => 'required|max:255',
            'company_name' => 'required|max:255',
            'email' => 'required|email|unique:clients,email,' . $this->client?->id,
            'phone' => 'required|max:20',
            'status' => 'required|in:active,inactive'
        ];
    }
}
