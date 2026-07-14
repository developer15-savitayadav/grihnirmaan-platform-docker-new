<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CostCalculatorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'area_unit' => $this->input('area_unit', 'sqft'),
            'floors' => (int) $this->input('floors', 1),
            'addons' => array_values(array_filter((array) $this->input('addons', []))),
        ]);
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'regex:/^[6-9][0-9]{9}$/'],
            'email' => ['nullable', 'email', 'max:255'],
            'plot_size_sqft' => ['required', 'numeric', 'min:1'],
            'area_unit' => ['required', Rule::in(['sqft', 'sqyard'])],
            'floors' => ['required', 'integer', 'min:1', 'max:10'],
            'finish_level' => ['required', Rule::in(['budget', 'standard', 'premium'])],
            'locality' => ['required', 'string', 'exists:localities,slug'],
            'addons' => ['nullable', 'array'],
            'addons.*' => [Rule::in(['modular_kitchen', 'false_ceiling', 'smart_home', 'solar', 'home_theater'])],
        ];
    }

    public function messages(): array
    {
        return [
            'phone.regex' => 'Enter a valid 10 digit Indian mobile number.',
            'locality.exists' => 'Selected locality is not available.',
        ];
    }
}
