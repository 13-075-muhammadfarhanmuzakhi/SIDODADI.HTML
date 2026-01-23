<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Admin::create([
            'nama' => 'Admin Utama',
            'nik' => '1234567890123456',
            'username' => 'admin',
            'password' => Hash::make('admin123'),
            'no_telp' => '081234567890',
            'foto' => null,
            'level' => 'Admin',
        ]);
    }
}
