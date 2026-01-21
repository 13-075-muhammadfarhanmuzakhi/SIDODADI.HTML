<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    // Nama tabel di database
    protected $table = 'artikel';

    // Primary key custom
    protected $primaryKey = 'id_artikel';

    // Karena tabel tidak pakai created_at & updated_at
    public $timestamps = false;

    // Kolom yang boleh diisi
    protected $fillable = [
        'judul_artikel',
        'deskripsi',
        'tgl_post',
        'img',
    ];
}
