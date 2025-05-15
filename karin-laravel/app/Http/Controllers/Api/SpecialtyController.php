<?php

namespace App\Http\Controllers\Api;

use App\Enum\ValidRoles;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSpecialtyRequest;
use App\Http\Requests\UpdateSpecialtyRequest;
use App\Models\Specialty;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class SpecialtyController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $query = Specialty::query();
        
        // Filtrar por segment_type se fornecido
        if ($request->has('segment_type')) {
            $query->where('segment_type', $request->segment_type);
        }
        
        $specialties = $query->get();
        
        return response()->json($specialties);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param \App\Http\Requests\StoreSpecialtyRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreSpecialtyRequest $request)
    {
        $specialty = Specialty::create($request->validated());
        
        return response()->json([
            'message' => 'Especialidade criada com sucesso',
            'specialty' => $specialty
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id)
    {
        $specialty = Specialty::findOrFail($id);
        
        return response()->json($specialty);
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param \App\Http\Requests\UpdateSpecialtyRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateSpecialtyRequest $request, int $id)
    {
        $specialty = Specialty::findOrFail($id);
        $specialty->update($request->validated());
        
        return response()->json([
            'message' => 'Especialidade atualizada com sucesso',
            'specialty' => $specialty
        ]);
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id)
    {
        $specialty = Specialty::findOrFail($id);
        $specialty->delete();
        
        return response()->json([
            'message' => 'Especialidade removida com sucesso'
        ]);
    }
    
    /**
     * Get specialties for a specific user.
     * 
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserSpecialties(int $userId)
    {
        $user = User::findOrFail($userId);
        $specialties = $user->specialties;
        
        return response()->json($specialties);
    }
    
    /**
     * Sync specialties for a specific user.
     * 
     * @param \Illuminate\Http\Request $request
     * @param int $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function syncUserSpecialties(Request $request, int $userId)
    {
        $request->validate([
            'specialty_ids' => 'required|array',
            'specialty_ids.*' => 'exists:specialties,id'
        ]);
        
        $user = User::findOrFail($userId);
        
        // Verificar se o usuário está atualizando suas próprias especialidades ou tem permissão admin
        if (Auth::id() !== $user->id && !Auth::user()->roles->contains('slug', ValidRoles::ADMIN)) {
            return response()->json([
                'message' => 'Você não tem permissão para atualizar especialidades de outros usuários'
            ], Response::HTTP_FORBIDDEN);
        }
        
        // Verificar se todas as especialidades pertencem ao segment_type do usuário
        $userSegmentType = $user->userData ? $user->userData->segment_types : null;
        
        if ($userSegmentType) {
            $specialties = Specialty::whereIn('id', $request->specialty_ids)->get();
            
            foreach ($specialties as $specialty) {
                if ($specialty->segment_type !== $userSegmentType) {
                    return response()->json([
                        'message' => 'Algumas especialidades não pertencem ao seu segmento',
                        'invalid_specialty' => $specialty->name
                    ], Response::HTTP_BAD_REQUEST);
                }
            }
        }
        
        $user->specialties()->sync($request->specialty_ids);
        
        return response()->json([
            'message' => 'Especialidades atualizadas com sucesso',
            'specialties' => $user->specialties()->get()
        ]);
    }
}
