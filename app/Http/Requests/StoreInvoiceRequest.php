<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Adjust based on your authorization logic
    }

    public function rules(): array
    {
        return [
            'client_id' => 'required|exists:clients,id',
            'invoice_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:invoice_date',
            'status' => 'nullable|in:draft,sent,paid,overdue,cancelled',
            'notes' => 'nullable|string|max:1000',
            'terms' => 'nullable|string|max:1000',
            'tax_rate' => 'nullable|numeric|min:0|max:100',
            'discount_rate' => 'nullable|numeric|min:0|max:100',
            
            // Invoice items validation
            'items' => 'required|array|min:1',
            'items.*.service_id' => 'nullable|exists:services,id',
            'items.*.description' => 'required|string|max:255',
            'items.*.quantity' => 'required|numeric|min:0.01',
            'items.*.unit_price' => 'required|numeric|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'client_id.required' => 'Please select a client for this invoice.',
            'client_id.exists' => 'The selected client does not exist.',
            'invoice_date.required' => 'Invoice date is required.',
            'due_date.required' => 'Due date is required.',
            'due_date.after_or_equal' => 'Due date must be on or after the invoice date.',
            'items.required' => 'At least one invoice item is required.',
            'items.min' => 'At least one invoice item is required.',
            'items.*.description.required' => 'Item description is required.',
            'items.*.quantity.required' => 'Item quantity is required.',
            'items.*.quantity.min' => 'Item quantity must be greater than 0.',
            'items.*.unit_price.required' => 'Item unit price is required.',
            'items.*.unit_price.min' => 'Item unit price must be 0 or greater.',
            'items.*.service_id.exists' => 'The selected service does not exist.',
            'tax_rate.max' => 'Tax rate cannot exceed 100%.',
            'discount_rate.max' => 'Discount rate cannot exceed 100%.',
        ];
    }

    public function attributes(): array
    {
        $attributes = [];
        
        if ($this->has('items')) {
            foreach ($this->items as $index => $item) {
                $itemNumber = $index + 1;
                $attributes["items.{$index}.description"] = "Item {$itemNumber} description";
                $attributes["items.{$index}.quantity"] = "Item {$itemNumber} quantity";
                $attributes["items.{$index}.unit_price"] = "Item {$itemNumber} unit price";
            }
        }
        
        return $attributes;
    }

    protected function prepareForValidation()
    {
        // Set default values
        $this->merge([
            'status' => $this->status ?? 'draft',
            'tax_rate' => $this->tax_rate ?? 0,
            'discount_rate' => $this->discount_rate ?? 0,
        ]);
    }
}
