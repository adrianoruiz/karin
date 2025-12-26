<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MedicalRecordCollection extends ResourceCollection
{
    /**
     * Transforma a collection em um array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'current_page' => $this->currentPage(),
            'data' => MedicalRecordResource::collection($this->collection),
            'first_page_url' => $this->url(1),
            'from' => $this->firstItem(),
            'last_page' => $this->lastPage(),
            'last_page_url' => $this->url($this->lastPage()),
            'links' => $this->linkCollection(),
            'next_page_url' => $this->nextPageUrl(),
            'path' => $this->path(),
            'per_page' => $this->perPage(),
            'prev_page_url' => $this->previousPageUrl(),
            'to' => $this->lastItem(),
            'total' => $this->total(),
        ];
    }

    /**
     * Obtém informações adicionais que devem ser retornadas com o array de resources.
     *
     * @return array<string, mixed>
     */
    public function with(Request $request): array
    {
        return [
            'success' => true,
            'message' => 'Prontuários médicos recuperados com sucesso.',
        ];
    }

    /**
     * Personaliza a paginação de links.
     */
    protected function linkCollection(): array
    {
        return [
            [
                'url' => $this->previousPageUrl(),
                'label' => '&laquo; Anterior',
                'active' => false,
            ],
            [
                'url' => $this->url($this->currentPage()),
                'label' => (string) $this->currentPage(),
                'active' => true,
            ],
            [
                'url' => $this->nextPageUrl(),
                'label' => 'Próximo &raquo;',
                'active' => false,
            ],
        ];
    }
}
