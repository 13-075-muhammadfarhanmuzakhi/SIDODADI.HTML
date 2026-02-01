<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DokumenKematian extends Model
{
    use HasFactory;

    protected $table = 'dokumen_kematian';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'id_layanan',
        'nama_almarhum',
        'jenis_kelamin_almarhum',
        'waktu_meninggal',
        'agama_almarhum',
        'tempat_tanggal_lahir_almarhum',
        'pekerjaan_almarhum',
        'penyebab_meninggal',
        'nama_pelapor',
        'alamat_almarhum',
        'tempat_meninggal',
        'hari_tanggal_meninggal',
        'status_hubungan_pelapor',
        'tempat_dimakamkan',
    ];

    public function layanan()
    {
        return $this->belongsTo(LayananMasyarakat::class, 'id_layanan', 'id_layanan');
    }
}
