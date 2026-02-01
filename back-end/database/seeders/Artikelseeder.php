<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use Carbon\Carbon;

class ArtikelSeeder extends Seeder
{
    public function run(): void
    {
        Article::create([
            'judul_artikel' => 'Sosialisasi Pondok',
            'deskripsi' => 'Mahasiswa KKN Itera dan Unila melakukan sosialisasi ke Pondok membawa materi bullying dan PHBS.',
            'tgl_post' => Carbon::now(),
            'img' => 'sosialisasi.jpg',
        ]);

        Article::create([
            'judul_artikel' => 'Wawancara dengan Warga Lokal',
            'deskripsi' => 'Mahasiswa KKN Itera dan Unila melakukan Wawancara ke Warga Lokal.',
            'tgl_post' => Carbon::now(),
            'img' => 'wawancara.jpg',
        ]);
    }
}
