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
        Schema::create('empresas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 100);
            $table->string('codigo', 6)->unique();
            $table->string('direccion', 255);
            $table->string('nombre_contacto', 100);
            $table->string('telefono', 15);
            $table->string('email', 100)->unique();
            $table->foreignId('rubro_id')->constrained('rubros')->onDelete('cascade');
            $table->decimal('porcentaje_comision', 5, 2);
            $table->timestamp('fecha_registro')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empresas');
    }
};
