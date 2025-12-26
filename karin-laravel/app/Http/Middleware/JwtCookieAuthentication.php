<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * Middleware para autenticacao JWT via httpOnly cookie.
 *
 * Este middleware extrai o token JWT do cookie httpOnly e injeta
 * no header Authorization para compatibilidade com o guard JWT padrao.
 *
 * SECURITY: Prioriza cookie httpOnly sobre header Authorization para
 * prevenir ataques XSS que poderiam roubar tokens de localStorage.
 */
class JwtCookieAuthentication
{
    /**
     * Nome do cookie que armazena o JWT token.
     */
    public const COOKIE_NAME = 'jwt_token';

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Prioridade: Cookie httpOnly > Authorization Header
        $tokenFromCookie = $request->cookie(self::COOKIE_NAME);

        if ($tokenFromCookie) {
            // Injeta o token do cookie no header para compatibilidade com JWT guard
            $request->headers->set('Authorization', 'Bearer '.$tokenFromCookie);
        }

        // Se nao tem token nem no cookie nem no header, continua
        // O guard JWT vai retornar 401 se a rota requer autenticacao
        if (! $request->bearerToken() && ! $tokenFromCookie) {
            return $next($request);
        }

        try {
            // Valida o token
            $user = JWTAuth::parseToken()->authenticate();

            if (! $user) {
                return $this->unauthorizedResponse('Usuario nao encontrado');
            }
        } catch (TokenExpiredException $e) {
            return $this->unauthorizedResponse('Token expirado', 'token_expired');
        } catch (TokenInvalidException $e) {
            return $this->unauthorizedResponse('Token invalido', 'token_invalid');
        } catch (JWTException $e) {
            return $this->unauthorizedResponse('Token ausente', 'token_absent');
        }

        return $next($request);
    }

    /**
     * Retorna resposta de erro 401 padronizada.
     */
    protected function unauthorizedResponse(string $message, string $error = 'unauthorized'): Response
    {
        return response()->json([
            'success' => false,
            'error' => $error,
            'message' => $message,
        ], 401);
    }
}
