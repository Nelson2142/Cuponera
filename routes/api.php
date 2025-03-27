<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfertasController;

Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

//endpoints para obtener ofertas

Route::get('/list_ofertas', [OfertasController::class, 'list_Ofertas']);
Route::get('/list_ofertas_vigentes', [OfertasController::class, 'list_OfertasVigentes']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
