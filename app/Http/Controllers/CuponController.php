<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cupones;
use App\Models\Ofertas;
use Carbon\Carbon;
use App\Mail\EmailCompra;
use App\Models\Usuario;
use Illuminate\Support\Facades\Mail;

class CuponController extends Controller
{
    // Comprar un cupón
    public function comprarCupon(Request $request)
    {
        $request->validate([
            'oferta_id' => 'required|exists:ofertas,id',
            'cliente_id' => 'required|exists:usuarios,id'
        ]);
        try {
            $oferta = Ofertas::find($request->oferta_id);
            $cliente = Usuario::find($request->cliente_id);

            //verificando si el usuario esta verificado
            if ($cliente->verificado === 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'El usuario no esta verificado'
                ], 400);
            }
            // Verificando que la oferta esté disponible
            if (
                !$oferta ||
                $oferta->fecha_inicio > Carbon::now() ||
                $oferta->fecha_fin < Carbon::now() ||
                $oferta->estado != 'Oferta aprobada' ||
                $oferta->cantidad_limite_cupones <= 0
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'La oferta no está disponible o no hay cupones.'
                ], 400);
            }

            //generando codigo del cupon
            $codigoEmpresa = $oferta->empresa->codigo;
            $Numeros = str_pad(mt_rand(0, 9999999), 7, '0', STR_PAD_LEFT);
            $codigoCupon = strtoupper($codigoEmpresa) . $Numeros;

            $cupon = Cupones::create([
                'oferta_id' => $request->oferta_id,
                'cliente_id' => $request->cliente_id,
                'codigo' => $codigoCupon,
                'monto' => $oferta->precio_oferta,
                'fecha_compra' => Carbon::now(),
            ]);
            // Actualizando el stock de la oferta
            $oferta->cantidad_limite_cupones -= 1;

            $oferta->save();

            // Enviando el correo de confirmación
            Mail::to($cliente->email)->send(new EmailCompra($cupon, $cliente, $oferta));

            return response()->json([
                'success' => true,
                'data' => $cupon,
                'message' => 'Compra exitosa. Revisa tu correo.'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al procesar la compra: ' . $e->getMessage()
            ], 500);
        }
    }

    // Listando cupones comprados por un usuario
    public function listarCupones(Request $request)
    {
        $request->validate([
            'cliente_id' => 'required|exists:usuarios,id'
        ]);
        $id_cliente = $request->cliente_id;
        $cupones = Cupones::where('cliente_id', $id_cliente)
            ->with('oferta')
            ->orderBy('fecha_compra', 'desc')
            ->get();

        return response()->json(['success' => true, 'data' => $cupones]);
    }

    public function filtrar_cupones(Request $request)
    {
        $request->validate([
            'cliente_id' => 'required|exists:usuarios,id',
            'estado' => 'required'
        ]);
        $id_cliente = $request->cliente_id;
        $estado = $request->estado;
        $cupones = Cupones::where('cliente_id', $id_cliente)->where('estado', $estado)
            ->with('oferta')
            ->orderBy('fecha_compra', 'desc')
            ->get();

        return response()->json(['success' => true, 'data' => $cupones]);
    }
}
