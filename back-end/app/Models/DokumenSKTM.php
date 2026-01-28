<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DokumenSktm extends Model
{
    protected $table = 'dokumen_sktm';
    protected $primaryKey = 'id_sktm';

    public $timestamps = false;

    protected $fillable = [
        'id_layanan',
        'tujuan',
    ];
}
