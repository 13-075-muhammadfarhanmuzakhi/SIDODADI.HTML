<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DokumenSktm;

class DokumenSktmSeeder extends Seeder
{
    public function run(): void
    {
        DokumenSktm::create([
            'id_layanan' => 1,
            'tujuan' => 'Pengajuan bantuan pendidikan'
        ]);
    }
}
