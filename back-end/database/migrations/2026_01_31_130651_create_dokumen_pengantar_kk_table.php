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
        Schema::create('dokumen_pengantar_kk', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_layanan');
            $table->string('nama_kepala_keluarga');
            $table->text('alamat');
            $table->string('rt', 10);
            $table->string('desa');
            $table->string('kabupaten');
            $table->string('kecamatan');
            $table->string('kode_pos', 10);
            $table->string('provinsi');
            $table->json('anggota_keluarga');
            $table->timestamps();

            $table->foreign('id_layanan')->references('id_layanan')->on('layanan_masyarakat')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumen_pengantar_kk');
    }
};
