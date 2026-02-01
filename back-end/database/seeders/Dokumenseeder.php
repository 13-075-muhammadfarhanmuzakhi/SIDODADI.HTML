<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Dokumen;

class DokumenSeeder extends Seeder
{
    public function run(): void
    {
        Dokumen::create([
            'nama_dokumen' => 'Surat Keterangan Tidak Mampu (SKTM)',
            'deskripsi' => 'Digunakan untuk keperluan administrasi bantuan'
        ]);

        Dokumen::create([
            'nama_dokumen' => 'Akta Kelahiran',
            'deskripsi' => 'Pengajuan pembuatan akta kelahiran'
        ]);
    }
}
