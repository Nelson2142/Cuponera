<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rubro extends Model
{
    use HasFactory;

    protected $table = 'rubros';

    protected $fillable = ['nombre'];
    protected $dates = ['fecha_registro'];
    
    public $timestamps = false;

    public function empresas()
    {
        return $this->hasMany(Empresas::class, 'rubro_id');
    }
}
