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
        Schema::create('dokumen_nikah', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_layanan');
            
            // Data Orang Tua Pemohon (Ayah)
            $table->string('ortu_ayah_nama');
            $table->string('ortu_ayah_nik', 16);
            $table->string('ortu_ayah_kk', 16);
            $table->string('ortu_ayah_ttl');
            $table->string('ortu_ayah_agama');
            $table->string('ortu_ayah_kewarganegaraan');
            $table->string('ortu_ayah_status_perkawinan');
            $table->string('ortu_ayah_pekerjaan');
            $table->text('ortu_ayah_alamat');
            
            // Data Orang Tua Pemohon (Ibu)
            $table->string('ortu_ibu_nama');
            $table->string('ortu_ibu_nik', 16);
            $table->string('ortu_ibu_kk', 16);
            $table->string('ortu_ibu_ttl');
            $table->string('ortu_ibu_agama');
            $table->string('ortu_ibu_kewarganegaraan');
            $table->string('ortu_ibu_status_perkawinan');
            $table->string('ortu_ibu_pekerjaan');
            $table->text('ortu_ibu_alamat');
            
            // Data Calon Pasangan
            $table->string('calon_nama');
            $table->string('calon_nik', 16);
            $table->string('calon_kk', 16);
            $table->string('calon_jenis_kelamin');
            $table->string('calon_ttl');
            $table->string('calon_agama');
            $table->string('calon_kewarganegaraan');
            $table->string('calon_status_perkawinan');
            $table->string('calon_pekerjaan');
            $table->text('calon_alamat');
            
            // Data Orang Tua Calon Pasangan (Ayah)
            $table->string('ortu_calon_ayah_nama');
            $table->string('ortu_calon_ayah_nik', 16);
            $table->string('ortu_calon_ayah_kk', 16);
            $table->string('ortu_calon_ayah_ttl');
            $table->string('ortu_calon_ayah_agama');
            $table->string('ortu_calon_ayah_kewarganegaraan');
            $table->string('ortu_calon_ayah_status_perkawinan');
            $table->string('ortu_calon_ayah_pekerjaan');
            $table->text('ortu_calon_ayah_alamat');
            
            // Data Orang Tua Calon Pasangan (Ibu)
            $table->string('ortu_calon_ibu_nama');
            $table->string('ortu_calon_ibu_nik', 16);
            $table->string('ortu_calon_ibu_kk', 16);
            $table->string('ortu_calon_ibu_ttl');
            $table->string('ortu_calon_ibu_agama');
            $table->string('ortu_calon_ibu_kewarganegaraan');
            $table->string('ortu_calon_ibu_status_perkawinan');
            $table->string('ortu_calon_ibu_pekerjaan');
            $table->text('ortu_calon_ibu_alamat');
            
            $table->timestamps();

            $table->foreign('id_layanan')->references('id_layanan')->on('layanan_masyarakat')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumen_nikah');
    }
};
