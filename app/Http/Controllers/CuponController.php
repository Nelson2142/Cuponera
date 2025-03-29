<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cupon;
use App\Models\Oferta;
use Illuminate\Support\Str;
use Carbon\Carbon;

class CuponController extends Controller
{
    // Comprar un cupón
    public function comprarCupon(Request $request)
    {
        $request->validate([
            'id_oferta' => 'required|exists:ofertas,id_oferta',
            'id_usuario' => 'required|exists:users,id'
        ]);

        $oferta = Oferta::where('id_oferta', $request->id_oferta)
                        ->where('fecha_inicio', '<=', Carbon::now())
                        ->where('fecha_fin', '>=', Carbon::now())
                        ->where('estado', 'Oferta aprobada')
                        ->first();

        if (!$oferta) {
            return response()->json(['success' => false, 'message' => 'La oferta no está disponible.'], 400);
        }

        $cupon = Cupon::create([
            'codigo' => Str::uuid(),
            'id_oferta' => $request->id_oferta,
            'id_usuario' => $request->id_usuario,
            'fecha_compra' => Carbon::now(),
        ]);

        return response()->json(['success' => true, 'data' => $cupon], 201);
    }

    // Listar cupones comprados por un usuario
    public function listarCupones($id_usuario)
    {
        $cupones = Cupon::where('id_usuario', $id_usuario)
                        ->with('oferta')
                        ->orderBy('fecha_compra', 'desc')
                        ->get();

        return response()->json(['success' => true, 'data' => $cupones]);
    }
}
