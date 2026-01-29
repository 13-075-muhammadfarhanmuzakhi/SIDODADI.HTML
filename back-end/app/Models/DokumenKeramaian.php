<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DokumenKeramaian extends Model
{
    protected $table = 'dokumen_keramaian';
    protected $primaryKey = 'id_keramaian';

    protected $fillable = [
        'id_layanan',
        'pemilik_acara_nama',
        'umur',
        'acara',
        'jenis_hiburan',
        'nama_hiburan',
        'nama_pimpinan',
        'undang_berapa_orang',
        'bertempat_di',
        'pemilik_hiburan_nama',
        'acara_hiburan',
        'jenis_hiburan_hiburan',
        'nama_hiburan_hiburan',
        'nama_pimpinan_hiburan',
        'undang_berapa_orang_hiburan',
        'bertempat_di_hiburan',
    ];

    public function layanan()
    {
        return $this->belongsTo(LayananMasyarakat::class, 'id_layanan');
    }
}
