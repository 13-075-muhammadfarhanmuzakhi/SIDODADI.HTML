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
        Schema::create('masyarakat', function (Blueprint $table) {
            $table->id('id_masyarakat');
            $table->string('nama_lengkap',150);
            $table->string('nik',16);
            $table->string('no_kk',16);
            $table->string('jenis_kelamin',25);
            $table->string('tempat_lahir',100);
            $table->date('tgl_lahir');
            $table->string('agama',25);
            $table->string('kewarganegaraan',25);
            $table->string('status_perkawinan',25);
            $table->string('pekerjaan',50);
            $table->text('alamat_ktp');
            $table->text('alamat_domisili');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('masyarakat');
    }
};
