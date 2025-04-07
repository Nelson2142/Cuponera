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
        Schema::create('cupones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('oferta_id')->constrained('ofertas')->onDelete('cascade');
            $table->foreignId('cliente_id')->constrained('usuarios')->onDelete('cascade');
            $table->string('codigo', 20)->unique();
            $table->decimal('monto', 10, 2);
            $table->enum('estado', ['Disponible', 'Canjeado', 'Vencido'])->default('Disponible');
            $table->timestamp('fecha_compra')->useCurrent();
            $table->dateTime('fecha_canje')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cupones');
    }
};
