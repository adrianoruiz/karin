<?php

use App\Http\Controllers\AiConfigController;
use App\Http\Controllers\AiPromptController;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChatLogController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\CompanyEmployeeController;
use App\Http\Controllers\Api\DoctorAvailabilityController;
use App\Http\Controllers\Api\MedicalRecordController;
use App\Http\Controllers\Api\PrescriptionController;
use App\Http\Controllers\Api\PatientAppointmentController;
use App\Http\Controllers\Api\PlanController;
use App\Http\Controllers\Api\ProvinceController;
use App\Http\Controllers\Api\SpecialtyController;
use App\Http\Controllers\Api\ReminderController;
use App\Http\Controllers\Api\TriageRecordController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\UserWorkingHourController;
use App\Http\Controllers\Api\WhatsappController;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\ChatbotCrudController;
use App\Http\Controllers\CompanySettingsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aqui é onde você pode registrar as rotas de API para sua aplicação.
| Estas rotas são carregadas pelo RouteServiceProvider e todas elas
| serão atribuídas ao grupo de middleware "api".
|
*/

// Rotas de autenticação
Route::group([
    'prefix' => 'auth',
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});

// Rotas de verificação de status do bot (sem autenticação)
Route::get('bot/status/{companyId}', [AiConfigController::class, 'checkBotStatus']);

// Rotas de WhatsApp
Route::group([
    'prefix' => 'whatsapp',
    'middleware' => 'auth:api',
], function () {
    // Route::get('list-whats-users', [WhatsappController::class, 'listWhatsappUsers']);
});

Route::group([
    'prefix' => 'whatsapp',

], function () {
    Route::get('status/{companyId}', [AiConfigController::class, 'checkBotStatus']);

    Route::get('list-whats-users', [WhatsappController::class, 'listWhatsappUsers']);
});

// Rotas públicas de usuários (para agente AI)
Route::group([], function () {
    // Rotas específicas de usuários (devem vir antes das rotas com parâmetros)
    Route::get('users/roles', [UserController::class, 'getAllRoles']);
    Route::post('users/complete', [UserController::class, 'storeComplete']);

    // Rotas de recursos para usuários
    Route::get('users', [UserController::class, 'index']);
    Route::post('users', [UserController::class, 'store']);
    Route::get('users/{id}', [UserController::class, 'show']);
    Route::put('users/{id}', [UserController::class, 'update']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);

    // Rotas com parâmetros de ID
    Route::put('users/{id}/complete', [UserController::class, 'updateComplete']);
    Route::post('users/{id}/avatar', [UserController::class, 'uploadAvatar']);
    Route::put('users/{id}/avatar-url', [UserController::class, 'updateAvatarFromUrl']);
});

// Rotas protegidas para gerenciar funcionários da empresa
Route::middleware('auth:api')->group(function () {
    Route::get('companies/{companyId}/employees', [CompanyEmployeeController::class, 'index']);
    Route::post('companies/{companyId}/employees', [CompanyEmployeeController::class, 'store']);
    Route::delete('companies/{companyId}/employees/{userId}', [CompanyEmployeeController::class, 'destroy']);
});

// Rotas para horários de funcionamento
Route::middleware('auth:api')->prefix('users/{user}')->group(function () {
    Route::get('/working-hours', [UserWorkingHourController::class, 'index']);
    Route::post('/working-hours', [UserWorkingHourController::class, 'store']);
});

// Rotas de agendamentos
Route::apiResource('appointments', AppointmentController::class);

// Rotas para pacientes agendarem consultas
Route::prefix('patient')->group(function () {
    Route::get('available-times', [PatientAppointmentController::class, 'getAvailableTimes']);
    Route::post('book-appointment', [PatientAppointmentController::class, 'bookAppointment']);
    Route::post('check-availability', [PatientAppointmentController::class, 'checkAvailability']);
    Route::get('available-plans/{doctor_id}', [PatientAppointmentController::class, 'getAvailablePlans']);
    Route::get('payment-methods/{doctor_id}', [PatientAppointmentController::class, 'getDoctorPaymentMethods']);
    // Consultas em aberto de um paciente por CPF ou telefone
    Route::get('my-appointments', [PatientAppointmentController::class, 'myAppointments']);
    // Confirmar e cancelar consultas
    Route::put('confirm-appointment/{id}', [PatientAppointmentController::class, 'confirmAppointment']);
    Route::put('cancel-appointment/{id}', [PatientAppointmentController::class, 'cancelAppointment']);
});

// Rotas de Chatbot - CRUD
Route::group([
    'prefix' => 'chatbots-crud',
    'middleware' => 'auth:api',
], function () {
    // Rotas específicas primeiro
    Route::get('/type/{type}', [ChatbotCrudController::class, 'getByType']);
    Route::get('/default/{type}', [ChatbotCrudController::class, 'getDefaultByType']);

    // Rotas genéricas depois
    Route::get('/', [ChatbotCrudController::class, 'index']);
    Route::post('/', [ChatbotCrudController::class, 'store']);
    Route::get('/{id}', [ChatbotCrudController::class, 'show']);
    Route::put('/{id}', [ChatbotCrudController::class, 'update']);
    Route::delete('/{id}', [ChatbotCrudController::class, 'destroy']);
});

// Rotas de Chatbot - Mensagens personalizadas
Route::group([
    'prefix' => 'chatbots',
    'middleware' => 'auth:api',
], function () {
    Route::post('/message-type', [ChatbotController::class, 'getPersonalizedMessageByType']);
    Route::post('/update-message', [ChatbotController::class, 'updateMessage']);
    Route::post('/reset-default', [ChatbotController::class, 'resetToDefault']);
});

Route::group([
    'prefix' => 'chatbots',
], function () {
    Route::post('/message-type', [ChatbotController::class, 'getPersonalizedMessageByType']);
});

// Rotas protegidas por autenticação
Route::middleware('auth:api')->group(function () {
    // Rotas para gerenciamento de disponibilidades
    Route::apiResource('availabilities', DoctorAvailabilityController::class);
    Route::apiResource('plans', PlanController::class);
    Route::prefix('availabilities')->group(function () {
        Route::post('/recurring', [DoctorAvailabilityController::class, 'storeRecurring']);
    });
});

// Rotas para gerenciamento de logs de chat
// Todo voltar a testar com rota autenticada
Route::apiResource('chat-log', ChatLogController::class);
Route::prefix('chat-logs')->group(function () {
    Route::get('/unread/messages', [ChatLogController::class, 'getUnreadMessages']);
    Route::post('/mark-all-as-read', [ChatLogController::class, 'markAllAsRead']);
    Route::post('/active-bot', [ChatLogController::class, 'activeBot']);
});

// Rotas para especialidades
Route::apiResource('specialties', SpecialtyController::class);
Route::prefix('users/{user}')->group(function () {
    Route::get('/specialties', [SpecialtyController::class, 'getUserSpecialties']);
    Route::post('/specialties', [SpecialtyController::class, 'syncUserSpecialties']);
});

// Rota pública para teste de chat-logs
// Route::post('chat-logs-test', [ChatLogController::class, 'store']);

Route::get('availabilities', [DoctorAvailabilityController::class, 'index']);
Route::get('plans', [PlanController::class, 'index']);
Route::get('plans/{plan}', [PlanController::class, 'publicShow']);

// Rotas para configuração da IA
Route::group([
    'prefix' => 'ai-config',
    'middleware' => 'auth:api',
], function () {
    Route::get('/', [AiConfigController::class, 'show']);
    Route::post('/', [AiConfigController::class, 'store']);
    Route::put('/', [AiConfigController::class, 'store']);
    Route::post('/toggle-active', [AiConfigController::class, 'toggleActive']);

    Route::get('/bot-status/{userId}', [AiConfigController::class, 'botStatus']);

    // Rota para gerar o system prompt para IA
    Route::post('/get-system-prompt', [AiPromptController::class, 'getSystemPrompt']);
});

// Rotas para Províncias e Cidades
Route::group([
    'prefix' => 'locations',
], function () {
    // Rotas de Províncias
    Route::get('/provinces', [ProvinceController::class, 'index']);
    Route::get('/provinces/with-cities', [ProvinceController::class, 'withCities']);
    Route::get('/provinces/{id}', [ProvinceController::class, 'show']);

    // Rotas de Cidades
    Route::get('/cities', [CityController::class, 'index']);
    Route::get('/cities/search', [CityController::class, 'search']);
    Route::get('/cities/{id}', [CityController::class, 'show']);
    Route::get('/provinces/{provinceId}/cities', [CityController::class, 'byProvince']);
});

// Rota para busca de endereço por CEP (ViaCEP)
Route::get('/address/cep/{cep}', [AddressController::class, 'searchByCep']);

// Rotas para Prontuários Médicos
Route::group([
    'prefix' => 'medical-records',
    'middleware' => 'auth:api',
], function () {
    // Rota específica para estatísticas (deve vir antes das rotas com parâmetros)
    Route::get('/stats', [MedicalRecordController::class, 'stats']);

    // Rotas CRUD padrão
    Route::get('/', [MedicalRecordController::class, 'index']);
    Route::post('/', [MedicalRecordController::class, 'store']);
    Route::get('/{id}', [MedicalRecordController::class, 'show']);
    Route::put('/{id}', [MedicalRecordController::class, 'update']);
    Route::patch('/{id}', [MedicalRecordController::class, 'update']);
    Route::delete('/{id}', [MedicalRecordController::class, 'destroy']);
});

// Rotas para Prescrições
Route::group([
    'prefix' => 'prescriptions',
    'middleware' => 'auth:api',
], function () {
    // Rota específica para estatísticas (deve vir antes das rotas com parâmetros)
    Route::get('/stats', [PrescriptionController::class, 'stats']);

    // Rotas CRUD padrão
    Route::get('/', [PrescriptionController::class, 'index']);
    Route::post('/', [PrescriptionController::class, 'store']);
    Route::get('/{id}', [PrescriptionController::class, 'show']);
    Route::put('/{id}', [PrescriptionController::class, 'update']);
    Route::patch('/{id}', [PrescriptionController::class, 'update']);
    Route::delete('/{id}', [PrescriptionController::class, 'destroy']);
});

// Rotas para Triagem Médica
Route::group([
    'prefix' => 'triage-records',
    'middleware' => 'auth:api',
], function () {
    Route::get('/', [TriageRecordController::class, 'index']);
    Route::post('/', [TriageRecordController::class, 'store']);
    Route::get('/{triageRecord}', [TriageRecordController::class, 'show']);
    Route::put('/{triageRecord}', [TriageRecordController::class, 'update']);
    Route::delete('/{triageRecord}', [TriageRecordController::class, 'destroy']);
});

// Rotas para Lembretes
Route::group([
    'prefix' => 'reminders',
    'middleware' => 'auth:api',
], function () {
    // Rota específica para estatísticas (deve vir antes das rotas com parâmetros)
    Route::get('/statistics', [ReminderController::class, 'statistics']);

    // Rota para ativar/desativar lembretes
    Route::patch('/{id}/toggle-active', [ReminderController::class, 'toggleActive']);

    // Rotas CRUD padrão
    Route::get('/', [ReminderController::class, 'index']);
    Route::post('/', [ReminderController::class, 'store']);
    Route::get('/{id}', [ReminderController::class, 'show']);
    Route::put('/{id}', [ReminderController::class, 'update']);
    Route::patch('/{id}', [ReminderController::class, 'update']);
    Route::delete('/{id}', [ReminderController::class, 'destroy']);
});

// Rotas para Notificações
Route::group([
    'prefix' => 'notifications',
    'middleware' => 'auth:api',
], function () {
    Route::get('/', [NotificationController::class, 'index']);
    Route::get('/unread-count', [NotificationController::class, 'unreadCount']);
    Route::put('/mark-all-as-read', [NotificationController::class, 'markAllAsRead']);
    Route::put('/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::delete('/{id}', [NotificationController::class, 'destroy']);
});

// Rotas para Configuracoes da Empresa
Route::group([
    'prefix' => 'company-settings',
    'middleware' => 'auth:api',
], function () {
    Route::get('/', [CompanySettingsController::class, 'index']);
    Route::put('/', [CompanySettingsController::class, 'update']);
});

// Rota publica para verificar status de modulo (sem autenticacao)
Route::get('company-settings/{companyId}/module/{moduleKey}', [CompanySettingsController::class, 'checkModule']);
