<?php

namespace App\Http\Controllers\Api;

use App\Enum\ValidRoles;
use App\Http\Controllers\Controller;
use App\Services\RoleService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\{
    Appointment,
    User,
    UserData
};



class AppointmentController extends Controller
{
    /**
     * Listar todos os agendamentos
     */
    public function index()
    {
        $appointments = Appointment::with(['user', 'doctor'])->get();
        
        return response()->json([
            'appointments' => $appointments
        ]);
    }
    
    
    /**
 * Criar um novo agendamento
 */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:users,id',
            'appointment_datetime' => 'required|date',
            'status' => 'sometimes|string|max:50',
            'observations' => 'nullable|string',
            // Campos para verificação do paciente
            'user_id' => 'nullable|exists:users,id',
            'cpf' => 'required_without:user_id|string',
            'phone' => 'required_without:user_id|string',
            // Campos adicionais para caso seja necessário criar um novo usuário
            'name' => 'required_without:user_id|string|max:255',
            'email' => 'nullable|email|max:255|unique:users,email',
            'birthday' => 'nullable|date'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $role = RoleService::findSlug(ValidRoles::PATIENT);

        // Preparar dados para criação ou busca de usuário
        $userId = $request->user_id;
        
        // Se não foi fornecido um user_id, tenta encontrar ou criar o usuário
        if (!$userId) {
            // Limpa CPF e telefone para conter apenas números
            $cpf = preg_replace('/[^0-9]/', '', $request->cpf);
            $phone = preg_replace('/[^0-9]/', '', $request->phone);
            
            // Procura usuário pelo CPF
            $userData = UserData::where('cpf', $cpf)->first();
            
            if ($userData) {
                // Encontrou pelo CPF
                $userId = $userData->user_id;
            } else {
                // Procura usuário pelo telefone
                $user = User::where('phone', $phone)->first();
                
                if ($user) {
                    // Encontrou pelo telefone
                    $userId = $user->id;
                } else {
                    // Não encontrou, então cria um novo usuário
                    $user = User::create([
                        'name' => $request->name,
                        'email' => $request->email,
                        'phone' => $phone,
                        'is_whatsapp_user' => $request->is_whatsapp_user ?? false,
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
                    
                    $userId = $user->id;
                }
            }
        }

        // Cria o agendamento com o user_id encontrado ou criado
        $appointmentData = [
            'user_id' => $userId,
            'doctor_id' => $request->doctor_id,
            'appointment_datetime' => $request->appointment_datetime,
            'status' => $request->status ?? 'agendada',
            'observations' => $request->observations
        ];

        $appointment = Appointment::create($appointmentData);

        return response()->json([
            'message' => 'Consulta agendada com sucesso',
            'appointment' => $appointment->load(['user', 'doctor'])
        ], 201);
    }
    
    /**
     * Exibir um agendamento específico
     */
    public function show($id)
    {
        $appointment = Appointment::with(['user.userData', 'doctor'])->findOrFail($id);
        
        return response()->json([
            'appointment' => $appointment
        ]);
    }
    
    /**
     * Atualizar um agendamento
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'sometimes|exists:users,id',
            'doctor_id' => 'sometimes|exists:users,id',
            'appointment_datetime' => 'sometimes|date',
            'status' => 'sometimes|string|max:50',
            'observations' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $appointment = Appointment::findOrFail($id);
        $appointment->update($request->all());

        return response()->json([
            'message' => 'Consulta atualizada com sucesso',
            'appointment' => $appointment
        ]);
    }
    
    /**
     * Excluir um agendamento
     */
    public function destroy($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();

        return response()->json([
            'message' => 'Consulta excluída com sucesso'
        ]);
    }
}