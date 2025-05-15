<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    /**
     * Retorna uma lista de todas as cidades.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $cities = City::all();
        
        return response()->json([
            'success' => true,
            'data' => $cities
        ]);
    }

    /**
     * Retorna uma cidade específica.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $city = City::with('province')->find($id);

        if (!$city) {
            return response()->json([
                'success' => false,
                'message' => 'Cidade não encontrada'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $city
        ]);
    }

    /**
     * Retorna cidades de uma província específica.
     *
     * @param  int  $provinceId
     * @return \Illuminate\Http\JsonResponse
     */
    public function byProvince($provinceId)
    {
        $cities = City::where('province_id', $provinceId)->get();

        return response()->json([
            'success' => true,
            'data' => $cities
        ]);
    }
} 