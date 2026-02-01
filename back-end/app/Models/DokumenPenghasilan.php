<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DokumenPenghasilan extends Model
{
    use HasFactory;

    protected $table = 'dokumen_penghasilan';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'id_layanan',
        // Data Wali
        'nama_lengkap_wali',
        'nik_wali',
        'tempat_tanggal_lahir_wali',
        'jenis_kelamin_wali',
        'agama_wali',
        'pekerjaan_wali',
        // Data Anak
        'nama_lengkap_anak',
        'nik_anak',
        'tempat_tanggal_lahir_anak',
        'jenis_kelamin_anak',
        'agama_anak',
        'pekerjaan_anak',
        // Keperluan & Penghasilan
        'keperluan',
        'penghasilan_per_bulan',
        'jurusan_prodi',
    ];

    public function layanan()
    {
        return $this->belongsTo(LayananMasyarakat::class, 'id_layanan', 'id_layanan');
    }
}
