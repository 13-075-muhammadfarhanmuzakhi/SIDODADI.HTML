<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DokumenSKU extends Model
{
    use HasFactory;

    protected $table = 'dokumen_sku';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'id_layanan',
        'nama_instansi',
        'jenis_kegiatan_usaha',
        'nomor_badan_hukum',
        'nama_lembaga',
        'tanggal_berdiri_usaha',
    ];

    public function layanan()
    {
        return $this->belongsTo(LayananMasyarakat::class, 'id_layanan', 'id_layanan');
    }
}
