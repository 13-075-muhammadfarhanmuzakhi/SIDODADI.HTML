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
        Schema::create('dokumen_penghasilan', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_layanan');
            
            // Data Wali
            $table->string('nama_lengkap_wali');
            $table->string('nik_wali', 16);
            $table->string('tempat_tanggal_lahir_wali');
            $table->string('jenis_kelamin_wali');
            $table->string('agama_wali');
            $table->string('pekerjaan_wali');
            
            // Data Anak
            $table->string('nama_lengkap_anak');
            $table->string('nik_anak', 16);
            $table->string('tempat_tanggal_lahir_anak');
            $table->string('jenis_kelamin_anak');
            $table->string('agama_anak');
            $table->string('pekerjaan_anak');
            
            // Keperluan & Penghasilan
            $table->text('keperluan');
            $table->string('penghasilan_per_bulan');
            $table->string('jurusan_prodi')->nullable();
            
            $table->timestamps();

            $table->foreign('id_layanan')->references('id_layanan')->on('layanan_masyarakat')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumen_penghasilan');
    }
};
