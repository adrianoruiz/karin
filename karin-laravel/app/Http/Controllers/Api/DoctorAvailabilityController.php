<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DoctorAvailability;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DoctorAvailabilityController extends Controller
{
    /**
     * Lista os horários disponíveis de um médico
     */
    public function index(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:users,id',
            'date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $query = DoctorAvailability::where('doctor_id', $request->doctor_id)
            ->where('status', 'available');

        if ($request->has('date') && $request->date) {
            $query->whereDate('date', $request->date);
        } else {
            // Se a data não foi informada ou está vazia, filtra por datas >= hoje
            $query->whereDate('date', '>=', now()->toDateString());
        }

        $availabilities = $query->orderBy('date')
            ->orderBy('time')
            ->get();

        return response()->json(['availabilities' => $availabilities]);
    }

    /**
     * Cadastra novos horários disponíveis e remove os que não estão mais na lista
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:users,id',
            'date' => 'required|date|after_or_equal:today',
            'times' => 'required|array',
            'times.*' => 'required|date_format:H:i',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Busca todos os horários existentes para o médico na data especificada
        $existingAvailabilities = DoctorAvailability::where('doctor_id', $request->doctor_id)
            ->whereDate('date', $request->date)
            ->where('status', 'available')
            ->get();

        // Horários que serão removidos (não estão na lista enviada)
        $timesToRemove = [];
        foreach ($existingAvailabilities as $existing) {
            if (! in_array($existing->time, $request->times)) {
                $timesToRemove[] = $existing->id;
            }
        }

        // Remove os horários que não estão mais na lista
        if (! empty($timesToRemove)) {
            DoctorAvailability::whereIn('id', $timesToRemove)->delete();
        }

        // Adiciona novos horários que ainda não existem
        $availabilities = [];
        foreach ($request->times as $time) {
            // Verifica se já existe disponibilidade para este horário
            $exists = DoctorAvailability::where('doctor_id', $request->doctor_id)
                ->whereDate('date', $request->date)
                ->whereTime('time', $time)
                ->exists();

            if (! $exists) {
                $availabilities[] = DoctorAvailability::create([
                    'doctor_id' => $request->doctor_id,
                    'date' => $request->date,
                    'time' => $time,
                    'status' => 'available',
                ]);
            }
        }

        return response()->json([
            'message' => 'Horários atualizados com sucesso!',
            'availabilities' => DoctorAvailability::where('doctor_id', $request->doctor_id)
                ->whereDate('date', $request->date)
                ->where('status', 'available')
                ->orderBy('time')
                ->get(),
        ], 200);
    }

    /**
     * Atualiza o status de um horário
     */
    public function update(Request $request, DoctorAvailability $availability): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:available,booked',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $availability->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Status atualizado com sucesso!',
            'availability' => $availability,
        ]);
    }

    /**
     * Remove um horário disponível
     */
    public function destroy(DoctorAvailability $availability): JsonResponse
    {
        $availability->delete();

        return response()->json([
            'message' => 'Horário removido com sucesso!',
        ]);
    }

    /**
     * Cadastra horários recorrentes para um médico
     */
    public function storeRecurring(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:users,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
            'days_of_week' => 'required|array',
            'days_of_week.*' => 'required|integer|between:0,6',
            'times' => 'required|array',
            'times.*' => 'required|date_format:H:i',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $start = strtotime($request->start_date);
        $end = strtotime($request->end_date);
        $availabilities = [];

        for ($date = $start; $date <= $end; $date = strtotime('+1 day', $date)) {
            $dayOfWeek = date('w', $date);

            if (in_array($dayOfWeek, $request->days_of_week)) {
                foreach ($request->times as $time) {
                    // Verifica se já existe disponibilidade para este horário
                    $exists = DoctorAvailability::where('doctor_id', $request->doctor_id)
                        ->whereDate('date', date('Y-m-d', $date))
                        ->whereTime('time', $time)
                        ->exists();

                    if (! $exists) {
                        $availabilities[] = DoctorAvailability::create([
                            'doctor_id' => $request->doctor_id,
                            'date' => date('Y-m-d', $date),
                            'time' => $time,
                            'status' => 'available',
                        ]);
                    }
                }
            }
        }

        return response()->json([
            'message' => 'Horários recorrentes cadastrados com sucesso!',
            'availabilities' => $availabilities,
        ], 201);
    }
}
