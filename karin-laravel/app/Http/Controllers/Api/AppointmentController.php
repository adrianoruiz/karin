<?php

namespace App\Http\Controllers\Api;

use App\Enum\ValidRoles;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\{
    Appointment,
    DoctorAvailability,
    User,
    UserData
};
use App\Services\{
    AppointmentQueryService,
    RoleService
};



class AppointmentController extends Controller
{
    /**
     * @var AppointmentQueryService
     */
    private $appointmentQueryService;

    public function __construct(AppointmentQueryService $appointmentQueryService)
    {
        $this->appointmentQueryService = $appointmentQueryService;
    }

    /**
     * Listar todos os agendamentos
     */
    public function index()
    {
        $query = Appointment::with(['user', 'doctor', 'plan', 'paymentMethod']);
        $indicatorsQuery = clone $query;

        // Aplicar filtros
        $this->appointmentQueryService->applyFilters($query, $indicatorsQuery);
        
        // Calcular indicadores
        $indicators = $this->appointmentQueryService->calculateIndicators($indicatorsQuery);

        // Obter agendamentos paginados
        $appointments = $query->orderBy('appointment_datetime', 'desc')->paginate(20);

        return response()->json([
            'success' => true,
            'data' => [
                'indicators' => $indicators,
                'appointments' => $appointments
            ]
        ]);
    }
    
    /**
     * Criar um novo agendamento
     */
    public function store(Request $request)
    {
        $validator = $this->getStoreValidator($request);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        // Complementa o email quando não informado
        $this->setDefaultEmail($request);

        // Verifica disponibilidade do horário
        $availability = $this->checkAppointmentAvailability($request);
        
        if (!$availability) {
            return response()->json([
                'message' => 'Horário indisponível para agendamento',
                'errors' => ['appointment_datetime' => ['O horário selecionado não está disponível']]
            ], 422);
        }

        // Busca ou cria usuário
        $userId = $this->findOrCreateUser($request);
        
        // Cria o agendamento
        $appointment = $this->createAppointment($request, $userId);

        // Marca o horário como reservado
        $availability->markAsBooked();

        return response()->json([
            'message' => 'Consulta agendada com sucesso',
            'appointment' => $appointment->load(['user', 'doctor'])
        ], 201);
    }
    
    /**
     * Retorna o validador para criação de agendamento
     */
    private function getStoreValidator($request)
    {
        return Validator::make($request->all(), [
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
            'email' => 'nullable|email|max:255|unique:users,email',
            'birthday' => 'nullable|date'
        ]);
    }
    
    /**
     * Define email padrão quando não fornecido
     */
    private function setDefaultEmail(Request $request)
    {
        $hasEmail = $request->filled('email');
        
        !$hasEmail && $request->merge(['email' => $request->phone]);
    }
    
    /**
     * Verifica disponibilidade do horário
     */
    private function checkAppointmentAvailability(Request $request)
    {
        $appointmentDate = date('Y-m-d', strtotime($request->appointment_datetime));
        $appointmentTime = date('H:i', strtotime($request->appointment_datetime));

        return DoctorAvailability::where('doctor_id', $request->doctor_id)
            ->whereDate('date', $appointmentDate)
            ->whereTime('time', $appointmentTime)
            ->where('status', 'available')
            ->first();
    }
    
    /**
     * Busca ou cria um usuário
     */
    private function findOrCreateUser(Request $request)
    {
        // Se já tem ID do usuário, retorna
        $userId = $request->user_id;
        
        if ($userId) {
            return $userId;
        }
        
        // Limpa CPF e telefone
        $cpf = preg_replace('/[^0-9]/', '', $request->cpf);
        $phone = preg_replace('/[^0-9]/', '', $request->phone);
        
        // Busca por CPF
        $userData = UserData::where('cpf', $cpf)->first();
        
        if ($userData) {
            return $userData->user_id;
        }
        
        // Busca por telefone
        $user = User::where('phone', $phone)->first();
        
        if ($user) {
            return $user->id;
        }
        
        // Cria novo usuário
        return $this->createNewUser($request, $cpf, $phone);
    }
    
    /**
     * Cria um novo usuário
     */
    private function createNewUser(Request $request, $cpf, $phone)
    {
        $role = RoleService::findSlug(ValidRoles::PATIENT);
        
        // Cria usuário
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $phone,
            'is_whatsapp_user' => $request->is_whatsapp_user ?? false,
            'status' => true,
            'password' => bcrypt(substr($cpf, -4))
        ]);
        
        // Cria dados do usuário
        $userData = [
            'user_id' => $user->id,
            'cpf' => $cpf,
            'birthday' => $request->birthday,
        ];
        
        $user->userData()->create($userData);
        $user->roles()->sync([$role]);
        
        return $user->id;
    }
    
    /**
     * Cria o agendamento
     */
    private function createAppointment(Request $request, $userId)
    {
        return Appointment::create([
            'user_id' => $userId,
            'doctor_id' => $request->doctor_id,
            'appointment_datetime' => $request->appointment_datetime,
            'status' => $request->status ?? 'agendada',
            'observations' => $request->observations,
            'is_online' => $request->is_online ?? false,
            'plan_id' => $request->plan_id,
            'payment_method_id' => $request->payment_method_id
        ]);
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
        $availability = $this->findAppointmentAvailability($appointment);

        $availability && $availability->markAsAvailable();

        $appointment->delete();

        return response()->json([
            'message' => 'Consulta excluída com sucesso'
        ]);
    }
    
    /**
     * Encontra a disponibilidade relacionada ao agendamento
     */
    private function findAppointmentAvailability($appointment)
    {
        $appointmentDate = date('Y-m-d', strtotime($appointment->appointment_datetime));
        $appointmentTime = date('H:i', strtotime($appointment->appointment_datetime));

        return DoctorAvailability::where('doctor_id', $appointment->doctor_id)
            ->whereDate('date', $appointmentDate)
            ->whereTime('time', $appointmentTime)
            ->first();
    }
}