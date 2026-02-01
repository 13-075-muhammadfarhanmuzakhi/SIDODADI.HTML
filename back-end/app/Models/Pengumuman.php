<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengumuman extends Model
{
    protected $table = 'pengumuman';
    protected $primaryKey = 'id_pengumuman';

    protected $fillable = [
        'judul',
        'isi',
        'tanggal_kegiatan',
        'status',
        'published_at'
    ];

    protected $casts = [
        'tanggal_kegiatan' => 'date',
        'published_at' => 'datetime'
    ];
}
