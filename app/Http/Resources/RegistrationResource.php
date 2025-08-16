<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RegistrationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'name' => $this->name,
            'surname' => $this->surname,
            'email' => $this->email,
            'phone' => $this->phone,
            'alternative_phone' => $this->alternative_phone,
            'location' => $this->location,
            'address' => $this->address,
            'service_details' => $this->getServiceDetails(),
            'installation_date' => $this->installation_date?->format('Y-m-d'),
            'formatted_installation_date' => $this->formatted_installation_date,
            'days_until_installation' => $this->days_until_installation,
            'how_did_you_know' => $this->how_did_you_know,
            'comments' => $this->comments,
            'status' => $this->status,
            'is_overdue' => $this->isOverdue(),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at?->format('Y-m-d H:i:s'),
            'processed_at' => $this->processed_at?->format('Y-m-d H:i:s'),
        ];
    }
}