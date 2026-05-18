<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */

    public function rules(): array
    {
        return [
            'client_name' => 'required|max:255',

            'company_name' => 'required|max:255',

            'email' => 'required|email',

            'phone' => 'required|max:20',

            'status' => 'required|in:active,inactive'
        ];
    }
}
