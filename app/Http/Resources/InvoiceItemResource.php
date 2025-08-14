<?php
// app/Http/Resources/InvoiceItemResource.php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'unit_price' => $this->unit_price,
            'total' => $this->total,
            'sort_order' => $this->sort_order,
            
            // Formatted fields
            'formatted_quantity' => number_format($this->quantity, 2),
            'formatted_unit_price' => '$' . number_format($this->unit_price, 2),
            'formatted_total' => '$' . number_format($this->total, 2),
            
            // Service relationship
            'service' => $this->whenLoaded('service', function () {
                return $this->service ? [
                    'id' => $this->service->id,
                    'name' => $this->service->name,
                    'description' => $this->service->description,
                    'base_price' => $this->service->base_price,
                ] : null;
            }),
            
            'service_id' => $this->service_id,
            
            // Timestamps
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}