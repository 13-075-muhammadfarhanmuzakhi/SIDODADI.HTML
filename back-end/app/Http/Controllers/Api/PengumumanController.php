<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pengumuman;

class PengumumanController extends Controller
{
    public function home()
    {
        return Pengumuman::where('status', 'aktif')
            ->whereDate('tanggal_kegiatan', '>=', now())
            ->orderBy('tanggal_kegiatan', 'asc')
            ->limit(1)
            ->get();
    }

    // ================= ADMIN & PUBLIK =================
    // List pengumuman (aktif saja untuk publik)
    public function index()
    {
        return response()->json(
            Pengumuman::where('status', 'aktif')
                ->orderBy('published_at', 'desc')
                ->get()
        );
    }

    // ================= ADMIN =================
    // Semua pengumuman (admin)
    public function adminIndex()
    {
        return response()->json(
            Pengumuman::orderBy('created_at', 'desc')->get()
        );
    }

    // Tambah pengumuman
    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:200',
            'isi' => 'required|string',
            'tanggal_kegiatan' => 'nullable|date',
            'status' => 'required|in:aktif,nonaktif',
        ]);

        $pengumuman = Pengumuman::create([
            'judul' => $request->judul,
            'isi' => $request->isi,
            'tanggal_kegiatan' => $request->tanggal_kegiatan,
            'status' => $request->status,
            'published_at' => now()
        ]);

        return response()->json([
            'message' => 'Pengumuman berhasil ditambahkan',
            'data' => $pengumuman
        ], 201);
    }

    // Detail
    public function show($id)
    {
        return response()->json(
            Pengumuman::findOrFail($id)
        );
    }

    // Update
    public function update(Request $request, $id)
    {
        $request->validate([
            'judul' => 'nullable|string|max:200',
            'isi' => 'nullable|string',
            'tanggal_kegiatan' => 'nullable|date',
            'status' => 'nullable|in:aktif,nonaktif',
        ]);

        $pengumuman = Pengumuman::findOrFail($id);
        $pengumuman->update($request->only([
            'judul',
            'isi',
            'tanggal_kegiatan',
            'status'
        ]));

        return response()->json([
            'message' => 'Pengumuman berhasil diperbarui'
        ]);
    }

    // Hapus
    public function destroy($id)
    {
        Pengumuman::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Pengumuman berhasil dihapus'
        ]);
    }
}
