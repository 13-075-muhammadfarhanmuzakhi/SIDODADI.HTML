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
        Schema::create('dokumen_ahli_waris', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_layanan');
            $table->string('tempat_tanggal_kematian');
            $table->string('nama_pemberi_warisan');
            $table->string('nama_pasangan_pewaris');
            $table->text('nama_para_ahli_waris');
            $table->string('ahli_waris_ditunjuk');
            $table->text('warisan_ditinggalkan');
            $table->timestamps();

            $table->foreign('id_layanan')->references('id_layanan')->on('layanan_masyarakat')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumen_ahli_waris');
    }
};
