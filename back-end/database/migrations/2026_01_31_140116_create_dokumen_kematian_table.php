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
        Schema::create('dokumen_kematian', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_layanan');
            $table->string('nama_almarhum');
            $table->string('jenis_kelamin_almarhum');
            $table->string('waktu_meninggal');
            $table->string('agama_almarhum');
            $table->string('tempat_tanggal_lahir_almarhum');
            $table->string('pekerjaan_almarhum');
            $table->text('penyebab_meninggal');
            $table->string('nama_pelapor');
            $table->text('alamat_almarhum');
            $table->string('tempat_meninggal');
            $table->string('hari_tanggal_meninggal');
            $table->string('status_hubungan_pelapor');
            $table->string('tempat_dimakamkan');
            $table->timestamps();

            $table->foreign('id_layanan')->references('id_layanan')->on('layanan_masyarakat')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumen_kematian');
    }
};
