<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DokumenAkte extends Model
{
    protected $table = 'dokumen_akte';
    protected $primaryKey = 'id_akte';

    protected $fillable = [
        'id_layanan',
        'nama_ayah',
        'nama_ibu',
        'nama_anak',
        'tempat_lahir',
        'tgl_lahir',
    ];
}
