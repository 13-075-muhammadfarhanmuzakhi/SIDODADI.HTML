<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;

class AdminController extends Controller
{
    // ================= GET ALL ADMIN =================
    public function index()
    {
        // ⛔ JANGAN FILTER LEVEL
        return Admin::orderBy('id_admin', 'desc')->get();
    }

    // ================= STORE =================
    public function store(Request $request)
    {
        $data = $request->validate([
            'nama' => 'required',
            'nik' => 'required|size:16',
            'username' => 'required|unique:admin',
            'password' => 'required|min:6',
            'no_telp' => 'nullable',
            'level' => 'required',
            'foto' => 'nullable|image|mimes:jpg,png,jpeg'
        ]);

        if ($request->hasFile('foto')) {
            $namaFile = time().'.'.$request->foto->extension();
            $request->foto->move(public_path('admin'), $namaFile);
            $data['foto'] = $namaFile;
        }

        $data['password'] = Hash::make($data['password']);

        Admin::create($data);

        return response()->json(['message' => 'Admin berhasil ditambahkan']);
    }

    // ================= UPDATE =================
    public function update(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);

        $data = $request->validate([
            'nama' => 'required',
            'nik' => 'required|size:16',
            'username' => 'required|unique:admin,username,' . $id . ',id_admin',
            'password' => 'nullable|min:6',
            'no_telp' => 'nullable',
            'level' => 'required',
            'foto' => 'nullable|image|mimes:jpg,png,jpeg'
        ]);

        if ($request->hasFile('foto')) {
            if ($admin->foto && File::exists(public_path('admin/'.$admin->foto))) {
                File::delete(public_path('admin/'.$admin->foto));
            }

            $namaFile = time().'.'.$request->foto->extension();
            $request->foto->move(public_path('admin'), $namaFile);
            $data['foto'] = $namaFile;
        }

        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        } else {
            unset($data['password']);
        }

        $admin->update($data);

        return response()->json(['message' => 'Admin berhasil diupdate']);
    }

    // ================= DELETE =================
    public function destroy($id)
    {
        $admin = Admin::findOrFail($id);

        if ($admin->foto && File::exists(public_path('admin/'.$admin->foto))) {
            File::delete(public_path('admin/'.$admin->foto));
        }

        $admin->delete();

        return response()->json(['message' => 'Admin berhasil dihapus']);
    }
}
