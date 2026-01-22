<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    protected $table = 'admin';
    protected $primaryKey = 'id_admin';

    protected $fillable = [
        'nama',
        'nik',
        'username',
        'password',
        'no_telp',
        'level'
    ];

    protected $hidden = ['password'];
}
