<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\LayananMasyarakat;
use App\Models\Masyarakat;
use App\Models\Dokumen;
use Carbon\Carbon;

class LayananMasyarakatSeeder extends Seeder
{
    public function run(): void
    {
        $masyarakat = Masyarakat::first();
        $dokumen = Dokumen::where('nama_dokumen', 'Surat Keterangan Tidak Mampu (SKTM)')->first();

        LayananMasyarakat::create([
            'id_masyarakat' => $masyarakat->id_masyarakat,
            'id_dokumen' => $dokumen->id_dokumen,
            'tgl_pengajuan' => Carbon::now(),
            'status' => 'Dalam Proses',
            'keterangan' => 'Pengajuan awal dari seeder'
        ]);
    }
}
