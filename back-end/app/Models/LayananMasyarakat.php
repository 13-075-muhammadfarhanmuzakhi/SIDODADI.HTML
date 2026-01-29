<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LayananMasyarakat extends Model
{
    protected $table = 'layanan_masyarakat';
    protected $primaryKey = 'id_layanan';

    // ⛔ tabel tidak punya created_at & updated_at
    public $timestamps = false;

    protected $fillable = [
        'id_masyarakat',
        'id_dokumen',
        'tgl_pengajuan',
        'status',
        'keterangan'
    ];

    public function masyarakat()
    {
        return $this->belongsTo(Masyarakat::class, 'id_masyarakat');
    }

    public function dokumen()
    {
        return $this->belongsTo(Dokumen::class, 'id_dokumen');
    }

    public function dokumenSktm()
    {
        return $this->hasOne(DokumenSktm::class, 'id_layanan');
    }

    public function dokumenAkte()
    {
        return $this->hasOne(DokumenAkte::class, 'id_layanan');
    }

    public function dokumenKeramaian()
    {
        return $this->hasOne(DokumenKeramaian::class, 'id_layanan');
    }
}

