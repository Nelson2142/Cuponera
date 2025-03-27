<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ofertas extends Model
{
    use HasFactory;

    protected $table = 'ofertas';
    protected $fillable = [
        'empresa_id',
        'titulo',
        'precio_regular',
        'precio_oferta',
        'fecha_inicio',
        'fecha_fin',
        'fecha_limite_cupon',
        'cantidad_limite_cupones',
        'descripcion',
        'otros_detalles',
        'estado',
        'justificacion_rechazo'
    ];

    protected $dates = [
        'fecha_inicio',
        'fecha_fin',
        'fecha_limite_cupon',
        'fecha_registro'
    ];

    public $timestamps = false;

    //relacion con la tabla empresas
    public function empresa()
    {
        return $this->belongsTo(Empresas::class, 'empresa_id');
    }

    //relacion con la tabla cupones
    public function Cupones(){
        return $this->hasMany(Cupones::class, 'oferta_id');
    }
}
