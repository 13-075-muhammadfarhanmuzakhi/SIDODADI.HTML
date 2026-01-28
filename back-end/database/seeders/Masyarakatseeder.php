<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Masyarakat;
use Carbon\Carbon;

class MasyarakatSeeder extends Seeder
{
    public function run(): void
    {
        Masyarakat::create([
            'nama_lengkap' => 'Budi Santoso',
            'nik' => '1234567890123456',
            'no_kk' => '1234567890123456',
            'jenis_kelamin' => 'Laki-laki',
            'tempat_lahir' => 'Lampung',
            'tgl_lahir' => Carbon::parse('2000-01-01'),
            'agama' => 'Islam',
            'kewarganegaraan' => 'Indonesia',
            'status_perkawinan' => 'Belum Kawin',
            'pekerjaan' => 'Pelajar',
            'alamat_ktp' => 'Jl Mawar',
            'alamat_domisili' => 'Jl Melati',
        ]);
    }
}
