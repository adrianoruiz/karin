<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReminderResource extends JsonResource
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
            'title' => $this->title,
            'message' => $this->message,
            'type' => $this->type,
            'priority' => $this->priority,
            'remind_at' => $this->remind_at->format('Y-m-d H:i:s'),
            'remind_at_formatted' => $this->remind_at->format('d/m/Y H:i'),
            'recurrence' => $this->recurrence,
            'is_active' => $this->is_active,
            'is_recurrent' => $this->isRecurrent(),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            
            // Relacionamentos
            'creator' => $this->whenLoaded('creator', function () {
                return [
                    'id' => $this->creator->id,
                    'name' => $this->creator->name,
                    'email' => $this->creator->email,
                ];
            }),
            
            'company' => $this->whenLoaded('company', function () {
                return [
                    'id' => $this->company->id,
                    'name' => $this->company->name,
                    'email' => $this->company->email,
                ];
            }),
            
            'recipients' => $this->whenLoaded('recipients', function () {
                return $this->recipients->map(function ($recipient) {
                    return [
                        'id' => $recipient->id,
                        'name' => $recipient->name,
                        'email' => $recipient->email,
                        'phone' => $recipient->phone,
                        'sent_at' => $recipient->pivot->sent_at ? $recipient->pivot->sent_at->format('Y-m-d H:i:s') : null,
                        'delivered' => $recipient->pivot->delivered,
                        'error_message' => $recipient->pivot->error_message,
                        'read_at' => $recipient->pivot->read_at ? $recipient->pivot->read_at->format('Y-m-d H:i:s') : null,
                    ];
                });
            }),
            
            // Estatísticas dos destinatários
            'recipients_stats' => $this->whenLoaded('recipients', function () {
                $total = $this->recipients->count();
                $sent = $this->recipients->where('pivot.sent_at', '!=', null)->count();
                $delivered = $this->recipients->where('pivot.delivered', true)->count();
                $errors = $this->recipients->where('pivot.error_message', '!=', null)->count();
                
                return [
                    'total' => $total,
                    'sent' => $sent,
                    'delivered' => $delivered,
                    'errors' => $errors,
                    'pending' => $total - $sent,
                ];
            }),
        ];
    }
} 