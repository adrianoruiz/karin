<?php

use App\Http\Controllers\ExampleController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Rotas de Exemplo para Imagens Polimórficas
|--------------------------------------------------------------------------
|
| Estas rotas são apenas exemplos de como utilizar o relacionamento
| polimórfico de imagens com usuários. Você pode adaptá-las conforme
| necessário para seu projeto.
|
*/

Route::middleware('auth:api')->group(function () {
    // Rotas para manipulação de imagens de usuários
    Route::post('users/{userId}/image', [ExampleController::class, 'uploadUserImage']);
    Route::get('users/{userId}/image', [ExampleController::class, 'getUserImage']);
});
