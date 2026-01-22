<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

        $admin = Admin::where('username', $request->username)->first();

        if (!$admin) {
            return response()->json([
                'message' => 'Username tidak ditemukan'
            ], 401);
        }

        if (!Hash::check($request->password, $admin->password)) {
            return response()->json([
                'message' => 'Password salah'
            ], 401);
        }

        return response()->json([
            'message' => 'Login berhasil',
            'admin' => [
                'id' => $admin->id_admin,
                'nama' => $admin->nama,
                'username' => $admin->username,
                'level' => $admin->level
            ]
        ]);
    }
}
