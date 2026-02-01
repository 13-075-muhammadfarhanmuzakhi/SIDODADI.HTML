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

    public function dokumenPengantarKK()
    {
        return $this->hasOne(DokumenPengantarKK::class, 'id_layanan');
    }

    public function dokumenPindah()
    {
        return $this->hasOne(DokumenPindah::class, 'id_layanan');
    }

    public function dokumenSKU()
    {
        return $this->hasOne(DokumenSKU::class, 'id_layanan');
    }

    public function dokumenKematian()
    {
        return $this->hasOne(DokumenKematian::class, 'id_layanan');
    }

    public function dokumenAhliWaris()
    {
        return $this->hasOne(DokumenAhliWaris::class, 'id_layanan');
    }

    public function dokumenNikah()
    {
        return $this->hasOne(DokumenNikah::class, 'id_layanan');
    }

    public function dokumenPenghasilan()
    {
        return $this->hasOne(DokumenPenghasilan::class, 'id_layanan');
    }
}

