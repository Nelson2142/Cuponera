<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    use HasFactory;

    protected $table = 'Empleados';
    protected $fillable = [
        'empresa_id',
        'nombre',
        'apellido',
        'email',
        'password'
    ];
    protected $dates = ['fecha_registro'];
    protected $hidden = ['password']; //no mostrar cuando se haga una petición get
    
    public $timestamps = false;

    // Relación con Empresa
    public function empresa()
    {
        return $this->belongsTo(Empresas::class, 'empresa_id');
    }
}