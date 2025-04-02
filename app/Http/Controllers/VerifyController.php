<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;

class VerifyController extends Controller
{
    public function verify($token)
    {
        try {
            $usuario = Usuario::where('token_verificacion', $token)->first();

            if (!$usuario) {
                return response()->json(['message' => 'Token de verificación inválido o ya utilizado'], 400);
            }

            $usuario->verificado = true;
            $usuario->token_verificacion = null;
            $usuario->save();

            return response()->json(['message' => 'Cuenta verificada con éxito, ya puedes iniciar sesión'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al verificar la cuenta: ' . $e->getMessage()], 500);
        }
    }
}
