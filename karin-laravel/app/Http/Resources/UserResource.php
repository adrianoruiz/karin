<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'avatar' => $this->avatar,
            'status' => $this->status,
            'is_whatsapp_user' => $this->is_whatsapp_user,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            
            // Relacionamentos opcionais
            'userData' => $this->whenLoaded('userData'),
            'roles' => $this->whenLoaded('roles'),
            'addresses' => $this->whenLoaded('addresses'),
            'specialties' => $this->whenLoaded('specialties'),
        ];
    }
} 