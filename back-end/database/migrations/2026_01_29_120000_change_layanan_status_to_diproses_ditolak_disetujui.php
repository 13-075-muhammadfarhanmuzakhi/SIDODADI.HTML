<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $driver = Schema::getConnection()->getDriverName();

        if ($driver === 'mysql') {
            DB::statement("ALTER TABLE layanan_masyarakat MODIFY status VARCHAR(20) NOT NULL DEFAULT 'Diproses'");
        } else {
            Schema::table('layanan_masyarakat', function (Blueprint $table) {
                $table->string('status', 20)->default('Diproses')->change();
            });
        }

        DB::table('layanan_masyarakat')->where('status', 'Dalam Proses')->update(['status' => 'Diproses']);
        DB::table('layanan_masyarakat')->whereIn('status', ['Terkirim', 'Selesai'])->update(['status' => 'Disetujui']);
    }

    public function down(): void
    {
        DB::table('layanan_masyarakat')->where('status', 'Diproses')->update(['status' => 'Dalam Proses']);
        DB::table('layanan_masyarakat')->where('status', 'Disetujui')->update(['status' => 'Selesai']);

        $driver = Schema::getConnection()->getDriverName();
        if ($driver === 'mysql') {
            DB::statement("ALTER TABLE layanan_masyarakat MODIFY status ENUM('Selesai','Dalam Proses','Terkirim') NOT NULL DEFAULT 'Dalam Proses'");
        }
    }
};
