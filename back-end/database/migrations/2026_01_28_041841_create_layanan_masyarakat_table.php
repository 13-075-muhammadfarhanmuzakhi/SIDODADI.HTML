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
        Schema::create('layanan_masyarakat', function (Blueprint $table) {
            $table->id('id_layanan');
        
            $table->unsignedBigInteger('id_masyarakat');
            $table->unsignedBigInteger('id_dokumen');
        
            $table->date('tgl_pengajuan');
            $table->enum('status',['Selesai','Dalam Proses','Terkirim'])
                  ->default('Dalam Proses');
            $table->text('keterangan')->nullable();
        
            $table->timestamps();
        
            $table->foreign('id_masyarakat')->references('id_masyarakat')->on('masyarakat')->onDelete('cascade');
            $table->foreign('id_dokumen')->references('id_dokumen')->on('dokumen')->onDelete('cascade');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('layanan_masyarakat');
    }
};
