<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfertasController;
use App\Http\Controllers\CuponController;

Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

// Rutas de Cupones

Route::post('/comprar_cupon', [CuponController::class, 'comprarCupon']);
Route::post('/listar_cupones', [CuponController::class, 'listarCupones']);


//endpoints para obtener ofertas
//Route::get('/list_ofertas', [OfertasController::class, 'list_Ofertas']);
Route::get('/list_ofertas_vigentes', [OfertasController::class, 'list_OfertasVigentes']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');



