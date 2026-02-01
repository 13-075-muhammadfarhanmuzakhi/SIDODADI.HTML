<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DokumenNikah extends Model
{
    use HasFactory;

    protected $table = 'dokumen_nikah';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'id_layanan',
        // Data Orang Tua Pemohon
        'ortu_ayah_nama',
        'ortu_ayah_nik',
        'ortu_ayah_kk',
        'ortu_ayah_ttl',
        'ortu_ayah_agama',
        'ortu_ayah_kewarganegaraan',
        'ortu_ayah_status_perkawinan',
        'ortu_ayah_pekerjaan',
        'ortu_ayah_alamat',
        'ortu_ibu_nama',
        'ortu_ibu_nik',
        'ortu_ibu_kk',
        'ortu_ibu_ttl',
        'ortu_ibu_agama',
        'ortu_ibu_kewarganegaraan',
        'ortu_ibu_status_perkawinan',
        'ortu_ibu_pekerjaan',
        'ortu_ibu_alamat',
        // Data Calon Pasangan
        'calon_nama',
        'calon_nik',
        'calon_kk',
        'calon_jenis_kelamin',
        'calon_ttl',
        'calon_agama',
        'calon_kewarganegaraan',
        'calon_status_perkawinan',
        'calon_pekerjaan',
        'calon_alamat',
        // Data Orang Tua Calon Pasangan
        'ortu_calon_ayah_nama',
        'ortu_calon_ayah_nik',
        'ortu_calon_ayah_kk',
        'ortu_calon_ayah_ttl',
        'ortu_calon_ayah_agama',
        'ortu_calon_ayah_kewarganegaraan',
        'ortu_calon_ayah_status_perkawinan',
        'ortu_calon_ayah_pekerjaan',
        'ortu_calon_ayah_alamat',
        'ortu_calon_ibu_nama',
        'ortu_calon_ibu_nik',
        'ortu_calon_ibu_kk',
        'ortu_calon_ibu_ttl',
        'ortu_calon_ibu_agama',
        'ortu_calon_ibu_kewarganegaraan',
        'ortu_calon_ibu_status_perkawinan',
        'ortu_calon_ibu_pekerjaan',
        'ortu_calon_ibu_alamat',
    ];

    public function layanan()
    {
        return $this->belongsTo(LayananMasyarakat::class, 'id_layanan', 'id_layanan');
    }
}
