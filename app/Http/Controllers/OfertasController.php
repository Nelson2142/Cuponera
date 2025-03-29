<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ofertas;
use Carbon\Carbon;

class OfertasController extends Controller
{
  // //obtener todas las ofertas
  // public function list_Ofertas()
  // {
  //   $ofertas = Ofertas::with(['empresa.rubro'])->where('estado', 'En espera de aprobación')->orderBy('fecha_registro', 'desc')->get();

  //   return response()->json([
  //     'success' => true,
  //     'data' => $ofertas
  //   ]);
  // }

  //obtener ofertas vigentes y aprobadas
  public function list_OfertasVigentes()
  {
    //obtener la fecha actual
    $now = Carbon::now();
    try {
      $ofertas = Ofertas::with(['empresa']) //podemos mandar a llamar la relacion de la empresa junto con rubro a la que pertenece 
        ->where('estado', 'Oferta aprobada')
        ->where('fecha_inicio', '<=', $now)
        ->where('fecha_fin', '>=', $now)
        ->orderBy('fecha_registro', 'desc')->get();

      return response()->json([
        'success' => true,
        'data' => $ofertas
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Error al obtener las ofertas vigentes: ' . $e->getMessage()
      ], 500);
    }
  }
}
