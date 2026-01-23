<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = 'admin';
    protected $primaryKey = 'id_admin';

    protected $fillable = [
        'nama',
        'nik',
        'username',
        'foto',
        'password',
        'no_telp',
        'level'
    ];

    protected $hidden = ['password'];
}
