<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Dokumen;

class DokumenSeeder extends Seeder
{
    public function run(): void
    {
        // ID 1
        Dokumen::create([
            'nama_dokumen' => 'Surat Keterangan Tidak Mampu (SKTM)',
            'deskripsi' => 'Digunakan untuk keperluan administrasi bantuan'
        ]);

        // ID 2
        Dokumen::create([
            'nama_dokumen' => 'Akta Kelahiran',
            'deskripsi' => 'Pengajuan pembuatan akta kelahiran'
        ]);

        // ID 3
        Dokumen::create([
            'nama_dokumen' => 'Surat Izin Keramaian',
            'deskripsi' => 'Surat izin untuk acara keramaian atau hajatan'
        ]);

        // ID 4
        Dokumen::create([
            'nama_dokumen' => 'Surat Pengantar Kartu Keluarga',
            'deskripsi' => 'Surat pengantar untuk pembuatan Kartu Keluarga baru'
        ]);

        // ID 5
        Dokumen::create([
            'nama_dokumen' => 'Surat Keterangan Pindah',
            'deskripsi' => 'Surat keterangan untuk kepindahan domisili'
        ]);

        // ID 6
        Dokumen::create([
            'nama_dokumen' => 'Surat Keterangan Usaha (SKU)',
            'deskripsi' => 'Surat keterangan untuk usaha/bisnis'
        ]);

        // ID 7
        Dokumen::create([
            'nama_dokumen' => 'Surat Kematian',
            'deskripsi' => 'Surat keterangan kematian'
        ]);

        // ID 8
        Dokumen::create([
            'nama_dokumen' => 'Surat Keterangan Ahli Waris',
            'deskripsi' => 'Surat keterangan ahli waris untuk pembagian warisan'
        ]);

        // ID 9
        Dokumen::create([
            'nama_dokumen' => 'Surat Nikah',
            'deskripsi' => 'Surat pengantar pernikahan'
        ]);
    }
}
