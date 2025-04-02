<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ], [
                'email.required' => 'El campo email es obligatorio',
                'email.email' => 'El campo email debe ser una dirección de correo electrónico válida',
                'password.required' => 'La contraseña es obligatoria',
            ]);

            $usuario = Usuario::where('email', $request->email)->first();
            if (!$usuario || !Hash::check($request->password, $usuario->password)) {
                return response()->json(['message' => 'Credenciales inválidas'], 401);
            }

            if (!$usuario->verificado) {
                return response()->json(['message' => 'Por favor verifica tu cuenta antes de iniciar sesión'], 403);
            }

            $token = $usuario->createToken('auth_token')->plainTextToken;
            return response()->json([
                'message' => 'Inicio de sesión exitoso',
                'access_token' => $token,
                'token_type' => 'Bearer',
                'usuario' => $usuario
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al iniciar sesión: ' . $e->getMessage()], 500);
        }
    }
}
