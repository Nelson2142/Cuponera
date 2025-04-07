<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ofertas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('empresa_id')->constrained('empresas')->onDelete('cascade');
            $table->string('titulo', 255);
            $table->decimal('precio_regular', 10, 2);
            $table->decimal('precio_oferta', 10, 2);
            $table->dateTime('fecha_inicio');
            $table->dateTime('fecha_fin');
            $table->dateTime('fecha_limite_cupon');
            $table->integer('cantidad_limite_cupones')->nullable();
            $table->text('descripcion');
            $table->text('otros_detalles')->nullable();
            $table->enum('estado', [
                'En espera de aprobación',
                'Oferta aprobada',
                'Oferta rechazada',
                'Oferta descartada'
            ])->default('En espera de aprobación');
            $table->text('justificacion_rechazo')->nullable();
            $table->timestamp('fecha_registro')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ofertas');
    }
};
