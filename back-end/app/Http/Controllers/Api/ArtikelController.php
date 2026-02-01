<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Support\Facades\File;

class ArtikelController extends Controller
{
    /* ================= LIST ================= */
    public function index()
    {
        return response()->json(
            Article::orderBy('tgl_post', 'desc')->get()
        );
    }

    /* ================= CREATE ================= */
    public function store(Request $request)
    {
        $request->validate([
            'judul_artikel' => 'required',
            'deskripsi' => 'required',
            'img' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $namaFile = null;

        if ($request->hasFile('img')) {
            $namaFile = time() . '.' . $request->img->extension();
            $request->img->move(public_path('artikel'), $namaFile);
        }        

        $artikel = Article::create([
            'judul_artikel' => $request->judul_artikel,
            'deskripsi' => $request->deskripsi,
            'tgl_post' => now()->toDateString(), // OTOMATIS
            'img' => $namaFile,
        ]);

        return response()->json([
            'message' => 'Artikel berhasil ditambahkan',
            'data' => $artikel
        ]);
    }

    /* ================= UPDATE ================= */
    public function update(Request $request, $id)
    {
        $artikel = Article::findOrFail($id);

        if ($request->hasFile('img')) {

            if ($artikel->img && File::exists(public_path('artikel/'.$artikel->img))) {
                File::delete(public_path('artikel/'.$artikel->img));
            }
        
            $namaFile = time() . '.' . $request->img->extension();
            $request->img->move(public_path('artikel'), $namaFile);
            $artikel->img = $namaFile;
        }        

        $artikel->judul_artikel = $request->judul_artikel;
        $artikel->deskripsi = $request->deskripsi;
        $artikel->save();

        return response()->json([
            'message' => 'Artikel berhasil diupdate'
        ]);
    }

    /* ================= DELETE ================= */
    public function destroy($id)
    {
        $artikel = Article::findOrFail($id);

        if ($artikel->img && File::exists(public_path('artikel/'.$artikel->img))) {
            File::delete(public_path('artikel/'.$artikel->img));
        }        

        $artikel->delete();

        return response()->json([
            'message' => 'Artikel berhasil dihapus'
        ]);
    }
}
