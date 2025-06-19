<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PlanController extends Controller
{
    public function index(Request $request)
    {
        $doctorId = $request->query('doctor_id');

        if (! $doctorId) {
            return response()->json(['error' => 'doctor_id é obrigatório'], 400);
        }

        $plans = Plan::where('user_id', $doctorId)->paginate(20);

        return response()->json($plans);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'required|integer|min:1',
            'is_active' => 'boolean',
            'user_id' => 'required|exists:users,id',
            'type' => 'required|string|in:consulta_avulsa,pacote',
            'consultations' => 'required_if:type,pacote|nullable|integer|min:1',
            'modality' => 'required|string|in:online,presencial',
            'installments' => 'required|integer|min:1|max:12',
        ]);

        $plan = Plan::create($validated);

        return response()->json($plan, Response::HTTP_CREATED);
    }

    public function publicShow(Request $request, Plan $plan)
    {
        return response()->json($plan);
    }

    public function update(Request $request, Plan $plan)
    {
        if ($plan->user_id != $request->input('user_id')) {
            return response()->json(['error' => 'Não autorizado'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'duration' => 'sometimes|required|integer|min:1',
            'is_active' => 'boolean',
            'type' => 'sometimes|required|string|in:consulta_avulsa,pacote',
            'consultations' => 'required_if:type,pacote|nullable|integer|min:1',
            'modality' => 'sometimes|required|string|in:online,presencial',
            'installments' => 'sometimes|required|integer|min:1|max:12',
        ]);

        $plan->update($validated);

        return response()->json($plan);
    }

    public function destroy(Request $request, Plan $plan)
    {
        if ($plan->user_id != $request->input('user_id')) {
            return response()->json(['error' => 'Não autorizado'], 403);
        }

        $plan->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
