<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'             => ['required', 'string', 'max:255'],
            'phone'            => ['required', 'string', 'regex:/^[0-9+\-\s()]{7,20}$/'],
            'email'            => ['nullable', 'email', 'max:255'],
            'source'           => ['nullable', 'string', 'max:100'],
            'service_interest' => ['nullable', 'string', 'max:255'],
            'locality'         => ['nullable', 'string', 'max:255'],
            'plot_size_sqft'   => ['nullable', 'integer', 'min:100', 'max:1000000'],
            'estimated_budget' => ['nullable', 'numeric', 'min:0'],
            'finish_level'     => ['nullable', 'in:budget,standard,premium'],
            'notes'            => ['nullable', 'string', 'max:2000'],
        ];
    }

    public function messages(): array
    {
        return [
            'phone.regex' => 'Please enter a valid phone number.',
        ];
    }
}
