<?php

namespace App\Http\Controllers\Api;

use App\Enum\ValidRoles;
use App\Http\Controllers\Controller;
use App\Services\RoleService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\{
    Appointment,
    DoctorAvailability,
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
        $query = Appointment::with(['user', 'doctor', 'plan', 'paymentMethod']);

        if (request()->has('doctor_id')) {
            $query->where('doctor_id', request('doctor_id'));
        }

        if (request()->has('status')) {
            $statuses = request('status');
            if (is_string($statuses)) {
                $statuses = explode(',', $statuses);
            }
            $query->whereIn('status', $statuses);
        }

        if (request()->has('appointment_date')) {
            $operator = request('appointment_date_operator', '=');
            $allowedOperators = ['=', '>', '<', '>=', '<='];
            if (!in_array($operator, $allowedOperators)) {
                $operator = '=';
            }
            $query->whereDate('appointment_datetime', $operator, request('appointment_date'));
        }

        $appointments = $query->paginate(20);

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
        'is_online' => 'nullable|boolean',
        'plan_id' => 'nullable|exists:plans,id',
        'payment_method_id' => 'nullable|exists:payment_methods,id',
        // Campos para verificação do paciente
        'user_id' => 'nullable|exists:users,id',
        'cpf' => 'required_without:user_id|string',
        'phone' => 'required_without:user_id|string',
        // Campos adicionais para caso seja necessário criar um novo usuário
        'name' => 'required_without:user_id|string|max:255',
        'email' => 'nullable|email|max:255|unique:users,email', // agora é opcional
        'birthday' => 'nullable|date'
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }
    
    // Se o email não for informado, atribui o valor do telefone
    if (!$request->filled('email')) {
        $request->merge(['email' => $request->phone]);
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
                    'email' => $request->email, // já terá o telefone se não foi informado
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
        'observations' => $request->observations,
        'is_online' => $request->is_online ?? false,
        'plan_id' => $request->plan_id,
        'payment_method_id' => $request->payment_method_id
    ];

    $appointment = Appointment::create($appointmentData);

    // Marca o horário como reservado
    $availability->markAsBooked();

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
            'observations' => 'nullable|string',
            'is_online' => 'nullable|boolean',
            'plan_id' => 'nullable|exists:plans,id',
            'payment_method_id' => 'nullable|exists:payment_methods,id'
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
        
        // Libera o horário na tabela de disponibilidades
        $appointmentDate = date('Y-m-d', strtotime($appointment->appointment_datetime));
        $appointmentTime = date('H:i', strtotime($appointment->appointment_datetime));

        $availability = DoctorAvailability::where('doctor_id', $appointment->doctor_id)
            ->whereDate('date', $appointmentDate)
            ->whereTime('time', $appointmentTime)
            ->first();

        if ($availability) {
            $availability->markAsAvailable();
        }

        $appointment->delete();

        return response()->json([
            'message' => 'Consulta excluída com sucesso'
        ]);
    }
    
    
}