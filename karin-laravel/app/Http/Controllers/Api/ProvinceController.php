<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Province;

class ProvinceController extends Controller
{
    /**
     * Retorna uma lista de todas as províncias.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $provinces = Province::all();

        return response()->json([
            'success' => true,
            'data' => $provinces,
        ]);
    }

    /**
     * Retorna uma província específica com suas cidades.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $province = Province::with('cities')->find($id);

        if (! $province) {
            return response()->json([
                'success' => false,
                'message' => 'Província não encontrada',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $province,
        ]);
    }

    /**
     * Retorna todas as províncias com suas cidades.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function withCities()
    {
        $provinces = Province::with('cities')->get();

        return response()->json([
            'success' => true,
            'data' => $provinces,
        ]);
    }
}
