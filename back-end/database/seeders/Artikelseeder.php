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
            'judul_artikel' => 'Gotong Royong Desa',
            'deskripsi' => 'Warga Desa Sidodadi Asri melaksanakan gotong royong rutin.',
            'tgl_post' => Carbon::now(),
            'img' => 'contoh.jpg',
        ]);
    }
}
