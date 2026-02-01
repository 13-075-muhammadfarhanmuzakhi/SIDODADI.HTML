<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pengumuman;
use Carbon\Carbon;

class PengumumanSeeder extends Seeder
{
    public function run(): void
    {
        Pengumuman::create([
            'judul' => 'Kerja Bakti Desa',
            'isi' => 'Seluruh warga diharapkan ikut kerja bakti membersihkan lingkungan desa.',
            'tanggal_kegiatan' => Carbon::now()->addDays(3),
            'status' => 'aktif',
            'published_at' => now()
        ]);

        Pengumuman::create([
            'judul' => 'Posyandu Balita',
            'isi' => 'Kegiatan posyandu dilaksanakan di balai desa.',
            'tanggal_kegiatan' => Carbon::now()->addDays(7),
            'status' => 'aktif',
            'published_at' => now()
        ]);
    }
}
