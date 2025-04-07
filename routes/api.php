<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfertasController;
use App\Http\Controllers\CuponController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VerifyController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ResetPasswordController;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

// Rutas de Cupones

Route::post('/comprar_cupon', [CuponController::class, 'comprarCupon']);
Route::post('/listar_cupones', [CuponController::class, 'listarCupones']);
Route::post('/filtrar_cupones', [CuponController::class, 'filtrar_cupones']);


//endpoints para obtener ofertas
//Route::get('/list_ofertas', [OfertasController::class, 'list_Ofertas']);
Route::get('/list_ofertas_vigentes', [OfertasController::class, 'list_OfertasVigentes']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

//Obed
Route::post('/register', [AuthController::class, 'register']);
Route::middleware([EnsureFrontendRequestsAreStateful::class])->post('/login', [LoginController::class, 'login']);
Route::get('/verify/{token}', [VerifyController::class, 'verify']);
Route::post('/password/email', [ResetPasswordController::class, 'sendResetLinkEmail']);
Route::post('/password/reset', [ResetPasswordController::class, 'reset']);
