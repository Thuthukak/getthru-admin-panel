<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInvoiceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Adjust based on your authorization logic
    }

    public function rules(): array
    {
        return [
            'client_id' => 'sometimes|required|exists:clients,id',
            'invoice_date' => 'sometimes|required|date',
            'due_date' => 'sometimes|required|date|after_or_equal:invoice_date',
            'status' => 'sometimes|in:draft,sent,paid,overdue,cancelled',
            'notes' => 'nullable|string|max:1000',
            'terms' => 'nullable|string|max:1000',
            'tax_rate' => 'nullable|numeric|min:0|max:100',
            'discount_rate' => 'nullable|numeric|min:0|max:100',
            
            // Payment fields (for partial updates)
            'paid_amount' => 'nullable|numeric|min:0',
            'payment_method' => 'nullable|string|max:255',
            'payment_notes' => 'nullable|string|max:1000',
            
            // Invoice items validation (optional for updates)
            'items' => 'sometimes|array|min:1',
            'items.*.service_id' => 'nullable|exists:services,id',
            'items.*.description' => 'required_with:items|string|max:255',
            'items.*.quantity' => 'required_with:items|numeric|min:0.01',
            'items.*.unit_price' => 'required_with:items|numeric|min:0',
            
            // Force update flag (for updating paid invoices)
            'force_update' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'client_id.exists' => 'The selected client does not exist.',
            'due_date.after_or_equal' => 'Due date must be on or after the invoice date.',
            'items.min' => 'At least one invoice item is required when updating items.',
            'items.*.description.required_with' => 'Item description is required.',
            'items.*.quantity.required_with' => 'Item quantity is required.',
            'items.*.quantity.min' => 'Item quantity must be greater than 0.',
            'items.*.unit_price.required_with' => 'Item unit price is required.',
            'items.*.unit_price.min' => 'Item unit price must be 0 or greater.',
            'items.*.service_id.exists' => 'The selected service does not exist.',
            'tax_rate.max' => 'Tax rate cannot exceed 100%.',
            'discount_rate.max' => 'Discount rate cannot exceed 100%.',
            'paid_amount.min' => 'Paid amount must be 0 or greater.',
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
}