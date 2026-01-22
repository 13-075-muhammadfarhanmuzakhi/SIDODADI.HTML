<?php

namespace Database\Seeders;

use App\Models\Article;

class ArtikelSeeder extends Seeder
{
    public function run(): void
    {
        Article::create([
            'judul_artikel' => 'Gotong Royong Desa',
            'deskripsi' => 'Warga Desa Sidodadi Asri melaksanakan gotong royong rutin.',
            'tgl_post' => now(),
            'img' => 'gotong-royong.jpg'
        ]);
    }
}
