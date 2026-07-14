@props([
    'method' => 'post',
])

<form
    method="{{ $method }}"
    x-data="{ isProcessing: false }"
    x-on:submit="if (isProcessing) $event.preventDefault()"
    x-on:form-processing-started="isProcessing = true"
    x-on:form-processing-finished="isProcessing = false"
    {{ $attributes->class(['fi-form grid  mb-6']) }}
>
    {{ $slot }}
</form>
