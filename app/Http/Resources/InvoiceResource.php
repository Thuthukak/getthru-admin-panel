<?php
// app/Http/Resources/InvoiceResource.php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'invoice_number' => $this->invoice_number,
            'status' => $this->status,
            'invoice_date' => $this->invoice_date->format('Y-m-d'),
            'due_date' => $this->due_date->format('Y-m-d'),
            'notes' => $this->notes,
            'terms' => $this->terms,
            
            // Financial data
            'subtotal' => $this->subtotal,
            'tax_rate' => $this->tax_rate,
            'tax_amount' => $this->tax_amount,
            'discount_rate' => $this->discount_rate,
            'discount_amount' => $this->discount_amount,
            'total' => $this->total,
            'paid_amount' => $this->paid_amount,
            'balance' => $this->balance,
            
            // Formatted financial data
            'formatted_subtotal' => '$' . number_format($this->subtotal, 2),
            'formatted_tax_amount' => '$' . number_format($this->tax_amount, 2),
            'formatted_discount_amount' => '$' . number_format($this->discount_amount, 2),
            'formatted_total' => '$' . number_format($this->total, 2),
            'formatted_paid_amount' => '$' . number_format($this->paid_amount, 2),
            'formatted_balance' => '$' . number_format($this->balance, 2),
            
            // Payment info
            'paid_date' => $this->paid_date?->format('Y-m-d'),
            'payment_method' => $this->payment_method,
            'payment_notes' => $this->payment_notes,
            
            // Status info
            'is_overdue' => $this->is_overdue,
            'sent_at' => $this->sent_at?->format('Y-m-d H:i:s'),
            
            // Relationships
            'client' => $this->whenLoaded('client', function () {
                return [
                    'id' => $this->client->id,
                    'name' => $this->client->name,
                    'email' => $this->client->email,
                    'phone' => $this->client->phone ?? null,
                    'address' => $this->client->address ?? null,
                ];
            }),
            
            'items' => InvoiceItemResource::collection($this->whenLoaded('items')),
            
            // Timestamps
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            
            // Additional computed fields
            'items_count' => $this->whenLoaded('items', function () {
                return $this->items->count();
            }),
            
            'status_badge' => [
                'color' => $this->getStatusColor(),
                'text' => ucfirst($this->status),
            ],
        ];
    }

    /**
     * Get status color for UI badges
     */
    private function getStatusColor(): string
    {
        return match ($this->status) {
            'draft' => 'gray',
            'sent' => 'blue',
            'paid' => 'green',
            'overdue' => 'red',
            'cancelled' => 'red',
            default => 'gray',
        };
    }
}