<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreNriLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:255'],
            'phone' => ['required', 'string', 'min:8', 'max:20'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Please enter your name.',
            'phone.required' => 'Please enter your phone number.',
            'country.required' => 'Please select your country.',
            'timezone.required' => 'Please select your timezone.',
            'preferred_callback_time.required' => 'Please enter your preferred callback time.',
            'preferred_communication.required' => 'Please select preferred communication mode.',
        ];
    }
}
