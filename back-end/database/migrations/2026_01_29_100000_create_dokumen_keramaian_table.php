<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dokumen_keramaian', function (Blueprint $table) {
            $table->id('id_keramaian');
            $table->unsignedBigInteger('id_layanan');
            $table->string('pemilik_acara_nama', 150)->nullable();
            $table->string('umur', 20)->nullable();
            $table->string('acara', 100)->nullable();
            $table->string('jenis_hiburan', 100)->nullable();
            $table->string('nama_hiburan', 100)->nullable();
            $table->string('nama_pimpinan', 100)->nullable();
            $table->string('undang_berapa_orang', 50)->nullable();
            $table->string('bertempat_di', 255)->nullable();
            $table->string('pemilik_hiburan_nama', 150)->nullable();
            $table->string('acara_hiburan', 100)->nullable();
            $table->string('jenis_hiburan_hiburan', 100)->nullable();
            $table->string('nama_hiburan_hiburan', 100)->nullable();
            $table->string('nama_pimpinan_hiburan', 100)->nullable();
            $table->string('undang_berapa_orang_hiburan', 50)->nullable();
            $table->string('bertempat_di_hiburan', 255)->nullable();
            $table->timestamps();

            $table->foreign('id_layanan')->references('id_layanan')->on('layanan_masyarakat')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dokumen_keramaian');
    }
};
