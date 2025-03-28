<?php

namespace App\Http\Controllers\Api;

use App\Enum\ValidRoles;
use App\Http\Controllers\Controller;
use App\Services\RoleService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

use App\Models\{
    Appointment,
    DoctorAvailability,
    User,
    UserData
};

class PatientAppointmentController extends Controller
{
    /**
     * Lista os horários disponíveis para agendamento
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getAvailableTimes(Request $request): JsonResponse
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

        if ($request->has('date')) {
            $query->whereDate('date', $request->date);
        }

        $availabilities = $query->orderBy('date')
            ->orderBy('time')
            ->get();

        // Formatar os dados para facilitar o uso no frontend
        $formattedAvailabilities = [];
        foreach ($availabilities as $availability) {
            $date = $availability->date->format('Y-m-d');
            $time = $availability->time->format('H:i');
            
            if (!isset($formattedAvailabilities[$date])) {
                $formattedAvailabilities[$date] = [];
            }
            
            $formattedAvailabilities[$date][] = [
                'id' => $availability->id,
                'time' => $time,
                'datetime' => $date . ' ' . $time . ':00'
            ];
        }

        return response()->json([
            'availabilities' => $formattedAvailabilities
        ]);
    }

    /**
     * Agenda uma consulta para um paciente
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function bookAppointment(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'cpf' => 'required|string',
            'phone' => 'required|string',
            'birthday' => 'required|date',
            'doctor_id' => 'required|exists:users,id',
            'appointment_datetime' => 'required|date',
            'observations' => 'nullable|string',
            'is_online' => 'nullable|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Verifica se o horário está disponível
        $appointmentDate = date('Y-m-d', strtotime($request->appointment_datetime));
        $appointmentTime = date('H:i', strtotime($request->appointment_datetime));

        $availability = DoctorAvailability::where('doctor_id', $request->doctor_id)
            ->whereDate('date', $appointmentDate)
            ->whereTime('time', $appointmentTime)
            ->where('status', 'available')
            ->first();

        if (!$availability) {
            return response()->json([
                'message' => 'Horário indisponível para agendamento',
                'errors' => ['appointment_datetime' => ['O horário selecionado não está disponível']]
            ], 422);
        }

        $role = RoleService::findSlug(ValidRoles::PATIENT);

        // Limpa CPF e telefone para conter apenas números
        $cpf = preg_replace('/[^0-9]/', '', $request->cpf);
        $phone = preg_replace('/[^0-9]/', '', $request->phone);
        
        // Procura usuário pelo CPF
        $userData = UserData::where('cpf', $cpf)->first();
        $user = null;
        
        if ($userData) {
            // Encontrou pelo CPF
            $user = User::find($userData->user_id);
            
            // Atualiza dados do usuário se necessário
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $phone
            ]);
            
            // Atualiza dados adicionais
            $userData->update([
                'birthday' => $request->birthday
            ]);
        } else {
            // Procura usuário pelo telefone
            $user = User::where('phone', $phone)->first();
            
            if ($user) {
                // Atualiza dados do usuário
                $user->update([
                    'name' => $request->name,
                    'email' => $request->email
                ]);
                
                // Cria dados adicionais se não existirem
                if (!$user->userData) {
                    $user->userData()->create([
                        'cpf' => $cpf,
                        'birthday' => $request->birthday
                    ]);
                }
            } else {
                // Não encontrou, então cria um novo usuário
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'phone' => $phone,
                    'is_whatsapp_user' => false,
                    'status' => true,
                    'password' => bcrypt(substr($cpf, -4)) // Usa os 4 últimos dígitos do CPF como senha inicial
                ]);
                
                // Cria os dados adicionais do usuário
                $userData = [
                    'user_id' => $user->id,
                    'cpf' => $cpf,
                    'birthday' => $request->birthday,
                ];
                $user->userData()->create($userData);

                $user->roles()->sync([$role]);
            }
        }

        // Cria o agendamento
        $appointmentData = [
            'user_id' => $user->id,
            'doctor_id' => $request->doctor_id,
            'appointment_datetime' => $request->appointment_datetime,
            'status' => 'agendada',
            'observations' => $request->observations,
            'is_online' => $request->is_online ?? false
        ];

        $appointment = Appointment::create($appointmentData);

        // Marca o horário como reservado
        $availability->markAsBooked();

        return response()->json([
            'message' => 'Consulta agendada com sucesso',
            'appointment' => $appointment
        ], 201);
    }

    /**
     * Verifica a disponibilidade de um horário específico
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function checkAvailability(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:users,id',
            'appointment_datetime' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $appointmentDate = date('Y-m-d', strtotime($request->appointment_datetime));
        $appointmentTime = date('H:i', strtotime($request->appointment_datetime));

        $isAvailable = DoctorAvailability::where('doctor_id', $request->doctor_id)
            ->whereDate('date', $appointmentDate)
            ->whereTime('time', $appointmentTime)
            ->where('status', 'available')
            ->exists();

        return response()->json([
            'is_available' => $isAvailable
        ]);
    }
}
