<?php

namespace App\Http\Controllers;

use App\Models\Chatbot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ChatbotCrudController extends Controller
{
    /**
     * Exibe uma lista de todos os chatbots do usuário autenticado.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();
        $chatbots = Chatbot::where('user_id', $user->id)->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Chatbots listados com sucesso',
            'data' => $chatbots
        ]);
    }

    /**
     * Armazena um novo chatbot.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'message_type' => 'required|string',
            'name' => 'required|string',
            'message' => 'required|string',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
            'is_default' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Dados inválidos',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        
        // Se o novo chatbot for definido como padrão, desmarcar outros do mesmo tipo
        if ($request->is_default) {
            Chatbot::where('user_id', $user->id)
                ->where('message_type', $request->message_type)
                ->where('is_default', true)
                ->update(['is_default' => false]);
        }

        $chatbot = Chatbot::create([
            'user_id' => $user->id,
            'message_type' => $request->message_type,
            'name' => $request->name,
            'message' => $request->message,
            'order' => $request->order ?? 1,
            'is_active' => $request->is_active ?? true,
            'is_default' => $request->is_default ?? false,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Chatbot criado com sucesso',
            'data' => $chatbot
        ], 201);
    }

    /**
     * Exibe um chatbot específico.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $user = Auth::user();
        $chatbot = Chatbot::where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$chatbot) {
            return response()->json([
                'status' => 'error',
                'message' => 'Chatbot não encontrado'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Chatbot encontrado com sucesso',
            'data' => $chatbot
        ]);
    }

    /**
     * Atualiza um chatbot específico.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'message_type' => 'nullable|string',
            'name' => 'nullable|string',
            'message' => 'nullable|string',
            'order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
            'is_default' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Dados inválidos',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = Auth::user();
        $chatbot = Chatbot::where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$chatbot) {
            return response()->json([
                'status' => 'error',
                'message' => 'Chatbot não encontrado'
            ], 404);
        }

        // Se o chatbot for definido como padrão, desmarcar outros do mesmo tipo
        if ($request->has('is_default') && $request->is_default) {
            Chatbot::where('user_id', $user->id)
                ->where('message_type', $request->message_type ?? $chatbot->message_type)
                ->where('id', '!=', $id)
                ->where('is_default', true)
                ->update(['is_default' => false]);
        }

        $chatbot->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Chatbot atualizado com sucesso',
            'data' => $chatbot
        ]);
    }

    /**
     * Remove um chatbot específico.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $user = Auth::user();
        $chatbot = Chatbot::where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$chatbot) {
            return response()->json([
                'status' => 'error',
                'message' => 'Chatbot não encontrado'
            ], 404);
        }

        $chatbot->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Chatbot removido com sucesso'
        ]);
    }

    /**
     * Obtém chatbots por tipo.
     *
     * @param  string  $type
     * @return \Illuminate\Http\JsonResponse
     */
    public function getByType($type)
    {
        $user = Auth::user();
        $chatbots = Chatbot::where('user_id', $user->id)
            ->where('message_type', $type)
            ->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Chatbots listados com sucesso',
            'data' => $chatbots
        ]);
    }

    /**
     * Obtém o chatbot padrão por tipo.
     *
     * @param  string  $type
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDefaultByType($type)
    {
        $user = Auth::user();
        $chatbot = Chatbot::where('user_id', $user->id)
            ->where('message_type', $type)
            ->where('is_default', true)
            ->first();

        if (!$chatbot) {
            return response()->json([
                'status' => 'error',
                'message' => 'Chatbot padrão não encontrado para este tipo'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Chatbot padrão encontrado com sucesso',
            'data' => $chatbot
        ]);
    }
}
