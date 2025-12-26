<?php

use App\Http\Middleware\JwtCookieAuthentication;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        api: __DIR__.'/../routes/api.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Adiciona middleware de CORS para API
        $middleware->api(prepend: [
            \Illuminate\Http\Middleware\HandleCors::class,
        ]);

        // Registra alias para o middleware de autenticacao via cookie
        $middleware->alias([
            'jwt.cookie' => JwtCookieAuthentication::class,
        ]);

        // Configura cookies para nao serem encriptados (necessario para JWT)
        $middleware->encryptCookies(except: [
            JwtCookieAuthentication::COOKIE_NAME,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Handler para erros JWT
        $exceptions->render(function (TokenExpiredException $e, Request $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'error' => 'token_expired',
                    'message' => 'Token expirado. Por favor, faca login novamente.',
                ], 401);
            }
        });

        $exceptions->render(function (TokenInvalidException $e, Request $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'error' => 'token_invalid',
                    'message' => 'Token invalido.',
                ], 401);
            }
        });

        $exceptions->render(function (JWTException $e, Request $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'error' => 'token_error',
                    'message' => 'Erro de autenticacao.',
                ], 401);
            }
        });

        // Handler para 404
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'error' => 'not_found',
                    'message' => 'Recurso nao encontrado.',
                ], 404);
            }
        });
    })->create();
