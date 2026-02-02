<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StrukturDesa;
use Carbon\Carbon;

class StrukturDesaSeeder extends Seeder
{
    public function run(): void
    {
        StrukturDesa::create([
            'nama' => 'Didik Marhadi S.H.',
            'jabatan' => 'Kepala Desa',
            'img' => 'DidikMarhadi.jpg',
        ]);
    }
}
