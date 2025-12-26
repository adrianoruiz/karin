<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Middleware\JwtCookieAuthentication;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Cookie;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * Controller de autenticacao com suporte a httpOnly cookies.
 *
 * SECURITY: Implementa autenticacao segura usando:
 * - httpOnly cookies para armazenamento do JWT (previne XSS)
 * - Secure flag em producao (previne MITM)
 * - SameSite=Lax para prevenir CSRF basico
 * - Validacao robusta de entrada
 */
class AuthController extends Controller
{
    /**
     * Duracao do cookie em minutos (deve corresponder ao TTL do JWT).
     */
    protected int $cookieMinutes;

    /**
     * Flag para usar modo legacy (token no body) em vez de cookie.
     * Permite migracao gradual do frontend.
     */
    protected bool $legacyMode = true;

    /**
     * Cria uma nova instancia do controlador.
     */
    public function __construct()
    {
        $this->cookieMinutes = (int) config('jwt.ttl', 60 * 24);
    }

    /**
     * Obter um token JWT via credenciais fornecidas.
     *
     * SECURITY: Retorna token em httpOnly cookie para prevenir XSS.
     * Mantém compatibilidade com modo legacy (token no body) durante migracao.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        if (! $token = Auth::guard('api')->attempt($credentials)) {
            // Log tentativa de login invalida para auditoria
            Log::warning('Tentativa de login falhou', [
                'email' => $request->email,
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json([
                'success' => false,
                'error' => 'invalid_credentials',
                'message' => 'Credenciais invalidas',
            ], 401);
        }

        // Log login bem-sucedido
        Log::info('Login bem-sucedido', [
            'user_id' => Auth::guard('api')->user()->id,
            'ip' => $request->ip(),
        ]);

        // Verifica se deve usar cookie ou modo legacy
        $useCookie = $request->boolean('use_cookie', ! $this->legacyMode);

        return $this->respondWithToken($token, $useCookie);
    }

    /**
     * Registrar um novo usuario.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::create([
            'name' => $request->validated('name'),
            'email' => $request->validated('email'),
            'password' => bcrypt($request->validated('password')),
            'phone' => $request->validated('phone'),
            'is_whatsapp_user' => $request->validated('is_whatsapp_user', false),
        ]);

        Log::info('Novo usuario registrado', [
            'user_id' => $user->id,
            'email' => $user->email,
            'ip' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Usuario registrado com sucesso',
            'data' => [
                'user' => $user,
            ],
        ], 201);
    }

    /**
     * Obter o usuario autenticado.
     */
    public function me(): JsonResponse
    {
        $user = Auth::guard('api')->user();
        if (! $user) {
            return response()->json([
                'success' => false,
                'error' => 'unauthenticated',
                'message' => 'Nao autenticado',
            ], 401);
        }

        // Carrega o usuario com seus roles e userData
        $userWithRoles = User::with(['roles', 'userData'])->find($user->id);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $userWithRoles->id,
                'name' => $userWithRoles->name,
                'email' => $userWithRoles->email,
                'phone' => $userWithRoles->phone,
                'email_verified_at' => $userWithRoles->email_verified_at,
                'is_whatsapp_user' => $userWithRoles->is_whatsapp_user,
                'status' => $userWithRoles->status,
                'avatar' => $userWithRoles->avatar,
                'created_at' => $userWithRoles->created_at,
                'updated_at' => $userWithRoles->updated_at,
                'deleted_at' => $userWithRoles->deleted_at,
                'roles' => $userWithRoles->roles,
                'segment_types' => $userWithRoles->userData?->segment_types,
            ],
        ]);
    }

    /**
     * Deslogar o usuario (invalidar o token).
     *
     * SECURITY: Remove o cookie httpOnly e invalida o token JWT.
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            $userId = Auth::guard('api')->user()?->id;

            Auth::guard('api')->logout();

            Log::info('Logout realizado', [
                'user_id' => $userId,
                'ip' => $request->ip(),
            ]);

            // Remove o cookie httpOnly
            $cookie = $this->createExpiredCookie();

            return response()->json([
                'success' => true,
                'message' => 'Deslogado com sucesso',
            ])->withCookie($cookie);
        } catch (\Exception $e) {
            Log::error('Erro no logout', [
                'error' => $e->getMessage(),
                'ip' => $request->ip(),
            ]);

            // Mesmo com erro, tenta remover o cookie
            $cookie = $this->createExpiredCookie();

            return response()->json([
                'success' => true,
                'message' => 'Deslogado com sucesso',
            ])->withCookie($cookie);
        }
    }

    /**
     * Atualizar o token.
     */
    public function refresh(Request $request): JsonResponse
    {
        try {
            $newToken = JWTAuth::parseToken()->refresh();

            // Verifica se deve usar cookie ou modo legacy
            $useCookie = $request->boolean('use_cookie', ! $this->legacyMode);

            return $this->respondWithToken($newToken, $useCookie);
        } catch (\Exception $e) {
            Log::warning('Falha ao refresh token', [
                'error' => $e->getMessage(),
                'ip' => $request->ip(),
            ]);

            return response()->json([
                'success' => false,
                'error' => 'token_refresh_failed',
                'message' => 'Nao foi possivel atualizar o token',
            ], 401);
        }
    }

    /**
     * Obter a estrutura do array do token.
     *
     * @param  bool  $useCookie  Se true, retorna token em httpOnly cookie
     */
    protected function respondWithToken(string $token, bool $useCookie = false): JsonResponse
    {
        $user = Auth::guard('api')->user();
        $userWithRoles = User::with(['roles', 'userData'])->find($user->id);

        $responseData = [
            'success' => true,
            'data' => [
                'token_type' => 'bearer',
                'expires_in' => config('jwt.ttl') * 60, // TTL em segundos
                'user' => [
                    'id' => $userWithRoles->id,
                    'name' => $userWithRoles->name,
                    'email' => $userWithRoles->email,
                    'phone' => $userWithRoles->phone,
                    'email_verified_at' => $userWithRoles->email_verified_at,
                    'is_whatsapp_user' => $userWithRoles->is_whatsapp_user,
                    'status' => $userWithRoles->status,
                    'avatar' => $userWithRoles->avatar,
                    'created_at' => $userWithRoles->created_at,
                    'updated_at' => $userWithRoles->updated_at,
                    'roles' => $userWithRoles->roles,
                    'segment_types' => $userWithRoles->userData?->segment_types,
                ],
            ],
        ];

        if ($useCookie) {
            // SECURITY: Token em httpOnly cookie
            $cookie = $this->createSecureCookie($token);

            return response()->json($responseData)->withCookie($cookie);
        }

        // Modo legacy: token no body da resposta
        $responseData['data']['access_token'] = $token;

        return response()->json($responseData);
    }

    /**
     * Cria um cookie httpOnly seguro para o token JWT.
     *
     * SECURITY FLAGS:
     * - httpOnly: Previne acesso via JavaScript (XSS protection)
     * - secure: Cookie so enviado via HTTPS em producao
     * - sameSite: None em dev (cross-origin), Lax em producao (CSRF protection)
     *
     * NOTA: Em desenvolvimento, usamos SameSite=None para permitir
     * cross-origin requests entre frontend (0.0.0.0:3000) e backend (localhost:8000).
     * Chrome permite SameSite=None sem Secure para localhost.
     */
    protected function createSecureCookie(string $token): Cookie
    {
        $isProduction = app()->environment('production');

        // Em desenvolvimento: SameSite=None para cross-origin, Secure=false para HTTP
        // Em producao: SameSite=Lax para CSRF protection, Secure=true para HTTPS
        $sameSite = $isProduction ? 'lax' : 'none';
        $secure = $isProduction;

        return cookie(
            name: JwtCookieAuthentication::COOKIE_NAME,
            value: $token,
            minutes: $this->cookieMinutes,
            path: '/',
            domain: null, // null permite qualquer subdominio em dev
            secure: $secure,
            httpOnly: true, // JavaScript nao pode acessar
            raw: false,
            sameSite: $sameSite
        );
    }

    /**
     * Cria um cookie expirado para logout.
     */
    protected function createExpiredCookie(): Cookie
    {
        $isProduction = app()->environment('production');
        $sameSite = $isProduction ? 'lax' : 'none';

        return cookie(
            name: JwtCookieAuthentication::COOKIE_NAME,
            value: '',
            minutes: -1, // Expira imediatamente
            path: '/',
            domain: null,
            secure: $isProduction,
            httpOnly: true,
            raw: false,
            sameSite: $sameSite
        );
    }
}
