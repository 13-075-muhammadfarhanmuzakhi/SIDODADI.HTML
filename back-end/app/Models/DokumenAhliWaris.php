<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DokumenAhliWaris extends Model
{
    use HasFactory;

    protected $table = 'dokumen_ahli_waris';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'id_layanan',
        'tempat_tanggal_kematian',
        'nama_pemberi_warisan',
        'nama_pasangan_pewaris',
        'nama_para_ahli_waris',
        'ahli_waris_ditunjuk',
        'warisan_ditinggalkan',
    ];

    public function layanan()
    {
        return $this->belongsTo(LayananMasyarakat::class, 'id_layanan', 'id_layanan');
    }
}
