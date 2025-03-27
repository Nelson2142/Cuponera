<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cupones extends Model
{
    use HasFactory;

    protected $table = 'Cupones';
    protected $fillable = [
        'oferta_id',
        'cliente_id',
        'codigo',
        'estado',
        'fecha_canje',
        'monto'
    ];
    protected $dates = ['fecha_compra', 'fecha_canje']; //para ser manejadas como fechas por Carbon de laravel
    
    public $timestamps = false;

    // Relación con Oferta
    public function oferta()
    {
        return $this->belongsTo(Ofertas::class, 'oferta_id');
    }

    // Relación con Cliente (Usuario)
    public function cliente()
    {
        return $this->belongsTo(Usuario::class, 'cliente_id');
    }
}