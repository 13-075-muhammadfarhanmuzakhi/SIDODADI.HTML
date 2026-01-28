<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            ArtikelSeeder::class,

            DokumenSeeder::class,
            MasyarakatSeeder::class,
            LayananMasyarakatSeeder::class,
            DokumenSktmSeeder::class, // optional
        ]);
    }
}
