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
        Schema::create('dokumen_akte', function (Blueprint $table) {
            $table->id('id_akte');
            $table->unsignedBigInteger('id_layanan');
            $table->string('nama_ayah',150);
            $table->string('nama_ibu',150);
            $table->string('nama_anak',150);
            $table->string('tempat_lahir',200);
            $table->date('tgl_lahir');
            $table->timestamps();
        
            $table->foreign('id_layanan')->references('id_layanan')->on('layanan_masyarakat')->onDelete('cascade');
        });
        
        
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumen_akte');
    }
};
