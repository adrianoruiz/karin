<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{
    Api\AuthController,
    Api\WhatsappController,
    ChatbotController,
    ChatbotCrudController
};



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
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});

// Rotas de WhatsApp
Route::group([
    'prefix' => 'whatsapp',
    'middleware' => 'auth:api'
], function () {
    // Route::get('list-whats-users', [WhatsappController::class, 'listWhatsappUsers']);
});

Route::group([
    'prefix' => 'whatsapp',
   
], function () {
    Route::get('list-whats-users', [WhatsappController::class, 'listWhatsappUsers']);
});

// Rotas de Chatbot - CRUD
Route::group([
    'prefix' => 'chatbots-crud',
    'middleware' => 'auth:api'
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
    'middleware' => 'auth:api'
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
