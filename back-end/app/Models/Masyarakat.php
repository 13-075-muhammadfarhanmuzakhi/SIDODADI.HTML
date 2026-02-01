<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Masyarakat extends Model
{
    protected $table = 'masyarakat';
    protected $primaryKey = 'id_masyarakat';

    // ⛔ tabel tidak punya created_at & updated_at
    public $timestamps = false;

    protected $fillable = [
        'nama_lengkap',
        'nik',
        'no_kk',
        'jenis_kelamin',
        'tempat_lahir',
        'tgl_lahir',
        'agama',
        'kewarganegaraan',
        'status_perkawinan',
        'pekerjaan',
        'alamat_ktp',
        'alamat_domisili',
    ];

    public function layanan()
    {
        return $this->hasMany(LayananMasyarakat::class, 'id_masyarakat');
    }
}
