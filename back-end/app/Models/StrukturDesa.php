<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StrukturDesa extends Model
{
    protected $table = 'struktur_desa';
    protected $primaryKey = 'id_struktur';
    public $timestamps = false;

    protected $fillable = [
        'nama',
        'jabatan',
        'foto'
    ];
}
