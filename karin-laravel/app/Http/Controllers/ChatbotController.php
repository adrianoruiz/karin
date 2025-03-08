<?php

namespace App\Http\Controllers;

use App\Models\Chatbot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ChatbotController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();
        $chatbots = Chatbot::where('user_id', $user->id)
            ->orderBy('message_type')
            ->orderBy('order')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $chatbots
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'message_type' => 'required|string|max:255',
            'name' => 'required|string|max:255',
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
        if ($request->input('is_default', false)) {
            Chatbot::where('user_id', $user->id)
                ->where('message_type', $request->message_type)
                ->where('is_default', true)
                ->update(['is_default' => false]);
        }

        $chatbot = new Chatbot();
        $chatbot->user_id = $user->id;
        $chatbot->message_type = $request->message_type;
        $chatbot->name = $request->name;
        $chatbot->message = $request->message;
        $chatbot->order = $request->input('order', 0);
        $chatbot->is_active = $request->input('is_active', true);
        $chatbot->is_default = $request->input('is_default', false);
        $chatbot->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Mensagem de chatbot criada com sucesso',
            'data' => $chatbot
        ], 201);
    }

    /**
     * Display the specified resource.
     * 
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id)
    {
        $user = Auth::user();
        $chatbot = Chatbot::where('user_id', $user->id)
            ->where('id', $id)
            ->first();

        if (!$chatbot) {
            return response()->json([
                'status' => 'error',
                'message' => 'Mensagem de chatbot não encontrada'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $chatbot
        ]);
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'message_type' => 'nullable|string|max:255',
            'name' => 'nullable|string|max:255',
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
        $chatbot = Chatbot::where('user_id', $user->id)
            ->where('id', $id)
            ->first();

        if (!$chatbot) {
            return response()->json([
                'status' => 'error',
                'message' => 'Mensagem de chatbot não encontrada'
            ], 404);
        }

        // Se o chatbot for definido como padrão, desmarcar outros do mesmo tipo
        if ($request->has('is_default') && $request->is_default) {
            Chatbot::where('user_id', $user->id)
                ->where('message_type', $request->input('message_type', $chatbot->message_type))
                ->where('id', '!=', $chatbot->id)
                ->where('is_default', true)
                ->update(['is_default' => false]);
        }

        if ($request->has('message_type')) {
            $chatbot->message_type = $request->message_type;
        }
        
        if ($request->has('name')) {
            $chatbot->name = $request->name;
        }
        
        if ($request->has('message')) {
            $chatbot->message = $request->message;
        }
        
        if ($request->has('order')) {
            $chatbot->order = $request->order;
        }
        
        if ($request->has('is_active')) {
            $chatbot->is_active = $request->is_active;
        }
        
        if ($request->has('is_default')) {
            $chatbot->is_default = $request->is_default;
        }
        
        $chatbot->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Mensagem de chatbot atualizada com sucesso',
            'data' => $chatbot
        ]);
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id)
    {
        $user = Auth::user();
        $chatbot = Chatbot::where('user_id', $user->id)
            ->where('id', $id)
            ->first();

        if (!$chatbot) {
            return response()->json([
                'status' => 'error',
                'message' => 'Mensagem de chatbot não encontrada'
            ], 404);
        }

        $chatbot->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Mensagem de chatbot excluída com sucesso'
        ]);
    }

    /**
     * Retorna as mensagens de chatbot por tipo.
     * 
     * @param  string  $type
     * @return \Illuminate\Http\JsonResponse
     */
    public function getByType(string $type)
    {
        $user = Auth::user();
        $chatbots = Chatbot::where('user_id', $user->id)
            ->where('message_type', $type)
            ->where('is_active', true)
            ->orderBy('order')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $chatbots
        ]);
    }

    /**
     * Retorna a mensagem padrão para um determinado tipo.
     * 
     * @param  string  $type
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDefaultByType(string $type)
    {
        $user = Auth::user();
        $chatbot = Chatbot::where('user_id', $user->id)
            ->where('message_type', $type)
            ->where('is_active', true)
            ->where('is_default', true)
            ->first();

        if (!$chatbot) {
            return response()->json([
                'status' => 'error',
                'message' => 'Mensagem padrão não encontrada para este tipo'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $chatbot
        ]);
    }
}
