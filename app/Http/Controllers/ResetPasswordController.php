<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class ResetPasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        try {
            $request->validate(['email' => 'required|email'], [
                'email.required' => 'El campo correo electrónico es obligatorio.',
                'email.email' => 'El formato del correo electrónico no es válido.'
            ]);

            $usuario = Usuario::where('email', $request->email)->first();
            if (!$usuario) {
                return response()->json(['message' => 'No se encontró ningún usuario con ese correo electrónico'], 404);
            }

            $token = Str::random(60);

            DB::table('password_reset_tokens')->updateOrInsert(
                ['email' => $usuario->email],
                ['token' => $token, 'created_at' => now()]
            );


            Mail::raw("Estimado usuario {$usuario->nombre}, para reestablecer tu contraseña copia y pega el siguiente código: " . $token, function ($message) use ($usuario) {
                $message->to($usuario->email);
                $message->subject('Restablecer contraseña');
            });

            return response()->json(['message' => 'Se ha enviado un código de restablecimiento de contraseña a tu correo electrónico'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al enviar el enlace de restablecimiento: ' . $e->getMessage()], 500);
        }
    }

    public function reset(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|min:8',
                'token' => 'required'
            ], [
                'email.required' => 'El campo correo electrónico es obligatorio.',
                'email.email' => 'El formato del correo electrónico no es válido.',
                'password.required' => 'El campo contraseña es obligatorio.',
                'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
                'token.required' => 'El campo token es obligatorio.'
            ]);

            $reset = DB::table('password_reset_tokens')
                ->where('email', $request->email)
                ->where('token', $request->token)
                ->first();

            if (!$reset) {
                return response()->json(['message' => 'Token inválido o expirado'], 400);
            }

            // Buscar usuario y actualizar la contraseña
            $usuario = Usuario::where('email', $request->email)->first();
            if (!$usuario) {
                return response()->json(['message' => 'Usuario no encontrado'], 404);
            }

            $usuario->password = Hash::make($request->password);
            $usuario->save();

            // Eliminar el token usado
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();

            return response()->json(['message' => 'Contraseña restablecida con éxito'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al restablecer la contraseña: ' . $e->getMessage()], 500);
        }
    }
}
