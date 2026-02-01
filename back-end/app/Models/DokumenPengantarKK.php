<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DokumenPengantarKK extends Model
{
    use HasFactory;

    protected $table = 'dokumen_pengantar_kk';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'id_layanan',
        'nama_kepala_keluarga',
        'alamat',
        'rt',
        'desa',
        'kabupaten',
        'kecamatan',
        'kode_pos',
        'provinsi',
        'anggota_keluarga',
    ];

    protected $casts = [
        'anggota_keluarga' => 'array',
    ];

    public function layanan()
    {
        return $this->belongsTo(LayananMasyarakat::class, 'id_layanan', 'id_layanan');
    }
}
