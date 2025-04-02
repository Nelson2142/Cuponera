<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Testing\Fluent\Concerns\Has;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use Notifiable;
    use HasFactory, HasApiTokens;

    protected $table = 'Usuarios';
    protected $fillable = [
        'nombre', 
        'apellido', 
        'email', 
        'password',
        'DUI', 
        'tipo',
        'token_verificacion',
        'verificado'
    ];
    protected $dates = ['fecha_registro'];
    protected $hidden = ['password', 'token_verificacion']; //no queremos mostrar estos campos cuando se haga petición get
    
    public $timestamps = false;

    // Relación con Cupones (como cliente)
    public function cupones()
    {
        return $this->hasMany(Cupones::class, 'cliente_id');
    }
}