<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'nombre' => 'required|string|max:255',
                'apellido' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:usuarios',
                'password' => 'required|string|min:8|confirmed',
                'DUI' => 'required|string|max:10|unique:usuarios|regex:/^\d{8}-\d{1}$/',
                'tipo' => 'required|string'
            ], [
                'nombre.required' => 'El nombre es obligatorio',
                'apellido.required' => 'El apellido es obligatorio',
                'email.required' => 'El correo electrónico es obligatorio',
                'email.email' => 'El formato del correo electrónico es inválido',
                'email.unique' => 'Este correo electrónico ya está en uso',
                'password.required' => 'La contraseña es obligatoria',
                'password.min' => 'La contraseña debe tener al menos 8 caracteres',
                'password.confirmed' => 'Las contraseñas no coinciden',
                'DUI.required' => 'El DUI es obligatorio',
                'DUI.regex' => 'El formato del DUI es inválido',
                'DUI.unique' => 'Este DUI ya está en uso',
                'tipo.required' => 'El tipo de usuario es obligatorio'
            ]);

            $token = Str::random(40);

            $usuario = Usuario::create([
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'DUI' => $request->DUI,
                'tipo' => $request->tipo,
                'token_verificacion' => $token,
                'verificado' => false,
            ]);
            Mail::raw("Estimado usuario {$usuario->nombre}, verifica tu cuenta haciendo click en el siguiente enlace: " . url('/api/verify/' . $token), function ($message) use ($usuario) {
                $message->to($usuario->email);
                $message->subject('La cuponera | Verifica tu cuenta');
            });

            return response()->json(['message' => 'Registro exitoso, verifica tu correo electrónico para activar tu cuenta'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al registrar el usuario: ' . $e->getMessage()], 500);
        }
    }

}
