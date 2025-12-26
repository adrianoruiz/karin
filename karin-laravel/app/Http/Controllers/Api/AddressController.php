<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Province;
use Illuminate\Support\Facades\Http;

class AddressController extends Controller
{
    /**
     * Busca endereço pelo CEP usando a API ViaCEP
     * e retorna os dados junto com o city_id correspondente.
     *
     * @param  string  $cep
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchByCep($cep)
    {
        // Remove caracteres não numéricos do CEP
        $cep = preg_replace('/[^0-9]/', '', $cep);

        // Valida o formato do CEP
        if (strlen($cep) !== 8) {
            return response()->json([
                'success' => false,
                'message' => 'CEP inválido. O CEP deve conter 8 dígitos.',
            ], 400);
        }

        try {
            // Busca na API ViaCEP
            $response = Http::get("https://viacep.com.br/ws/{$cep}/json/");

            if ($response->failed()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Erro ao consultar o serviço de CEP.',
                ], 500);
            }

            $data = $response->json();

            // ViaCEP retorna erro quando não encontra o CEP
            if (isset($data['erro']) && $data['erro'] === true) {
                return response()->json([
                    'success' => false,
                    'message' => 'CEP não encontrado.',
                ], 404);
            }

            // Tenta encontrar o city_id correspondente
            $cityId = $this->findCityId($data['localidade'], $data['uf']);

            return response()->json([
                'success' => true,
                'data' => [
                    'cep' => $data['cep'] ?? $cep,
                    'street' => $data['logradouro'] ?? '',
                    'complement' => $data['complemento'] ?? '',
                    'neighborhood' => $data['bairro'] ?? '',
                    'city' => $data['localidade'] ?? '',
                    'state' => $data['uf'] ?? '',
                    'ibge_code' => $data['ibge'] ?? '',
                    'city_id' => $cityId,
                ],
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao consultar o serviço de CEP: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Busca o city_id baseado no nome da cidade e estado.
     *
     * @param  string  $cityName
     * @param  string  $stateInitials
     * @return int|null
     */
    private function findCityId($cityName, $stateInitials)
    {
        // Primeiro encontra o estado pela sigla
        $province = Province::where('initials', strtoupper($stateInitials))->first();

        if (! $province) {
            return null;
        }

        // Busca a cidade pelo nome e estado
        $city = City::where('province_id', $province->id)
            ->whereRaw('LOWER(name) = ?', [strtolower($cityName)])
            ->first();

        return $city ? $city->id : null;
    }
}
