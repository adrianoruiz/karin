<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\{
    AuthController,
    WhatsappController
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
