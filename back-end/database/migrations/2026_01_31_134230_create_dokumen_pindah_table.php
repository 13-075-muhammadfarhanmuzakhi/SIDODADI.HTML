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
        Schema::create('dokumen_pindah', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_layanan');
            $table->string('nama_kepala_keluarga');
            $table->string('nik_kepala_keluarga', 16);
            $table->string('nomor_kk', 16);
            $table->string('nomor_hp', 20)->nullable();
            
            // Alamat Asal
            $table->text('alamat_asal');
            $table->string('rt_asal', 10)->nullable();
            $table->string('rw_asal', 10)->nullable();
            $table->string('desa_asal');
            $table->string('kode_pos_asal', 10)->nullable();
            $table->string('kecamatan_asal');
            $table->string('kabupaten_asal');
            $table->string('provinsi_asal');
            
            // Alamat Tujuan
            $table->text('alamat_tujuan');
            $table->string('rt_tujuan', 10)->nullable();
            $table->string('rw_tujuan', 10)->nullable();
            $table->string('desa_tujuan');
            $table->string('kode_pos_tujuan', 10)->nullable();
            $table->string('kecamatan_tujuan');
            $table->string('kabupaten_tujuan');
            $table->string('provinsi_tujuan');
            
            // Data Kepindahan
            $table->text('alasan_pindah');
            $table->string('klasifikasi_kepindahan');
            $table->string('tanggal_rencana_pindah');
            $table->json('anggota_pindah');
            
            $table->timestamps();

            $table->foreign('id_layanan')->references('id_layanan')->on('layanan_masyarakat')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumen_pindah');
    }
};
