<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTriageRequest;
use App\Http\Requests\UpdateTriageRequest;
use App\Http\Resources\TriageRecordResource;
use App\Models\TriageRecord;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TriageRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'company_id' => 'required|integer|exists:users,id',
            'patient_id' => 'required|integer|exists:users,id',
            'page' => 'nullable|integer|min:1',
            'per_page' => 'nullable|integer|min:1|max:100',
        ]);

        $triageRecords = TriageRecord::where('company_id', $request->company_id)
            ->where('patient_id', $request->patient_id)
            ->with(['patient', 'professional'])
            ->orderBy('triage_date', 'desc')
            ->orderBy('triage_time', 'desc')
            ->paginate($request->per_page ?? 20);

        return response()->json([
            'data' => TriageRecordResource::collection($triageRecords->items()),
            'meta' => [
                'current_page' => $triageRecords->currentPage(),
                'last_page' => $triageRecords->lastPage(),
                'per_page' => $triageRecords->perPage(),
                'total' => $triageRecords->total(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTriageRequest $request): JsonResponse
    {
        $triageRecord = TriageRecord::create($request->validated());
        $triageRecord->load(['patient', 'professional']);

        return response()->json(new TriageRecordResource($triageRecord), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, TriageRecord $triageRecord): JsonResponse
    {
        $request->validate([
            'company_id' => 'required|integer|exists:users,id',
        ]);

        if ($triageRecord->company_id !== (int) $request->company_id) {
            return response()->json(['message' => 'Acesso negado'], 403);
        }

        $triageRecord->load(['patient', 'professional']);

        return response()->json(new TriageRecordResource($triageRecord));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTriageRequest $request, TriageRecord $triageRecord): JsonResponse
    {
        if (isset($request->validated()['company_id']) &&
            $triageRecord->company_id !== (int) $request->validated()['company_id']) {
            return response()->json(['message' => 'Acesso negado'], 403);
        }

        $triageRecord->update($request->validated());
        $triageRecord->load(['patient', 'professional']);

        return response()->json(new TriageRecordResource($triageRecord));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, TriageRecord $triageRecord): JsonResponse
    {
        $request->validate([
            'company_id' => 'required|integer|exists:users,id',
        ]);

        if ($triageRecord->company_id !== (int) $request->company_id) {
            return response()->json(['message' => 'Acesso negado'], 403);
        }

        $triageRecord->delete();

        return response()->json(['message' => 'Triagem excluída com sucesso'], 200);
    }
}
