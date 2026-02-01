<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DokumenPindah extends Model
{
    use HasFactory;

    protected $table = 'dokumen_pindah';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'id_layanan',
        'nama_kepala_keluarga',
        'nik_kepala_keluarga',
        'nomor_kk',
        'nomor_hp',
        'alamat_asal',
        'rt_asal',
        'rw_asal',
        'desa_asal',
        'kode_pos_asal',
        'kecamatan_asal',
        'kabupaten_asal',
        'provinsi_asal',
        'alamat_tujuan',
        'rt_tujuan',
        'rw_tujuan',
        'desa_tujuan',
        'kode_pos_tujuan',
        'kecamatan_tujuan',
        'kabupaten_tujuan',
        'provinsi_tujuan',
        'alasan_pindah',
        'klasifikasi_kepindahan',
        'tanggal_rencana_pindah',
        'anggota_pindah',
    ];

    protected $casts = [
        'anggota_pindah' => 'array',
    ];

    public function layanan()
    {
        return $this->belongsTo(LayananMasyarakat::class, 'id_layanan', 'id_layanan');
    }
}
