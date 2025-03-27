<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresas extends Model
{
    use HasFactory;

    protected $table = 'Empresas';
    protected $fillable = [
        'nombre',
        'codigo',
        'direccion',
        'nombre_contacto',
        'telefono',
        'email',
        'rubro_id',
        'porcentaje_comision'
    ];
    protected $dates = ['fecha_registro'];
    
    public $timestamps = false;

    // Relación con Rubro
    public function rubro()
    {
        return $this->belongsTo(Rubro::class, 'rubro_id');
    }

    // Relación con Ofertas
    public function ofertas()
    {
        return $this->hasMany(Ofertas::class, 'empresa_id');
    }

    // Relación con Empleados
    public function empleados()
    {
        return $this->hasMany(Empleado::class, 'empresa_id');
    }
}