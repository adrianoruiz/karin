<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Cria uma nova instância do controlador.
     *
     * @return void
     */
    public function __construct()
    {
        // Removendo o middleware daqui, será aplicado nas rotas
    }

    /**
     * Obter um token JWT via credenciais fornecidas.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only('email', 'password');

        if (! $token = Auth::guard('api')->attempt($credentials)) {
            return response()->json(['error' => 'Credenciais inválidas'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Registrar um novo usuário.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
            'phone' => 'nullable|string',
            'is_whatsapp_user' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ));

        return response()->json([
            'message' => 'Usuário registrado com sucesso',
            'user' => $user,
        ], 201);
    }

    /**
     * Obter o usuário autenticado.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $user = Auth::guard('api')->user();
        if (! $user) {
            return response()->json(['error' => 'Não autenticado'], 401);
        }

        // Carrega o usuário com seus roles e userData
        $userWithRoles = User::with(['roles', 'userData'])->find($user->id);

        // Cria a resposta
        return response()->json([
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
            'segment_types' => $userWithRoles->userData ? $userWithRoles->userData->segment_types : null,
        ]);
    }

    /**
     * Deslogar o usuário (invalidar o token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::guard('api')->logout();

        return response()->json(['message' => 'Deslogado com sucesso']);
    }

    /**
     * Atualizar o token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        try {
            $newToken = JWTAuth::parseToken()->refresh();

            return $this->respondWithToken($newToken);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Não foi possível atualizar o token'], 401);
        }
    }

    /**
     * Obter a estrutura do array do token.
     *
     * @param  string  $token
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60, // TTL em minutos convertido para segundos
            'user' => Auth::guard('api')->user(),
        ]);
    }
}
