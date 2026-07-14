<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuoteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'regex:/^[6-9][0-9]{9}$/'],
            'email' => ['nullable', 'email', 'max:255'],
            'service_interest' => ['nullable', 'string', 'max:100'],
            'plot_size_sqft' => ['nullable', 'integer', 'min:100'],
            'locality' => ['nullable', 'string', 'max:100'],
            'finish_level' => ['nullable', 'in:budget,standard,premium'],
            'message' => ['nullable', 'string', 'max:2000'],
        ];
    }
}
