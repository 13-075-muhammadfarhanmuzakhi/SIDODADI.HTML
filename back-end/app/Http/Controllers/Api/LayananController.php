<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Masyarakat;
use App\Models\LayananMasyarakat;
use App\Models\DokumenSktm;
use App\Models\DokumenAkte;
use App\Models\Dokumen;

class LayananController extends Controller
{
    // ================= USER SUBMIT =================
    public function store(Request $request)
    {
        try {
            $request->validate([
                'nama_lengkap' => 'required|string|max:150',
                'nik' => 'required|string|min:16|max:16|regex:/^[0-9]+$/',
                'no_kk' => 'required|string|min:16|max:16|regex:/^[0-9]+$/',
                'jenis_kelamin' => 'required',
                'tempat_lahir' => 'required',
                'tgl_lahir' => 'required|date',
                'agama' => 'required',
                'kewarganegaraan' => 'required',
                'status_perkawinan' => 'required',
                'pekerjaan' => 'required',
                'alamat_ktp' => 'required',
                'alamat_domisili' => 'required',
                'id_dokumen' => 'required|exists:dokumen,id_dokumen',
            ]);

            // ===== SIMPAN MASYARAKAT =====
            $masyarakat = Masyarakat::create($request->only([
                'nama_lengkap',
                'nik',
                'no_kk',
                'jenis_kelamin',
                'tempat_lahir',
                'tgl_lahir',
                'agama',
                'kewarganegaraan',
                'status_perkawinan',
                'pekerjaan',
                'alamat_ktp',
                'alamat_domisili',
            ]));

            // ===== SIMPAN LAYANAN =====
            $layanan = LayananMasyarakat::create([
                'id_masyarakat' => $masyarakat->id_masyarakat,
                'id_dokumen' => $request->id_dokumen,
                'tgl_pengajuan' => now(),
                'status' => 'Dalam Proses',
                'keterangan' => null,
            ]);

            // ===== AMBIL DOKUMEN =====
            $dokumen = Dokumen::find($request->id_dokumen);

            if (!$dokumen) {
                return response()->json(['message' => 'Dokumen tidak ditemukan'], 400);
            }

            $namaDokumen = strtoupper($dokumen->nama_dokumen);

            // ===== SKTM =====
            if (str_contains($namaDokumen, 'SKTM') || str_contains($namaDokumen, 'TIDAK MAMPU')) {
                $request->validate([
                    'tujuan' => 'required|string'
                ]);

                DokumenSktm::create([
                    'id_layanan' => $layanan->id_layanan,
                    'tujuan' => $request->tujuan,
                ]);
            }

            // ===== AKTA =====
            if (str_contains($namaDokumen, 'AKTA')) {
                $request->validate([
                    'nama_ayah' => 'required|string',
                    'nama_ibu' => 'required|string',
                    'nama_anak' => 'required|string',
                    'tempat_lahir_anak' => 'required|string',
                    'tgl_lahir_anak' => 'required|date',
                ]);

                DokumenAkte::create([
                    'id_layanan' => $layanan->id_layanan,
                    'nama_ayah' => $request->nama_ayah,
                    'nama_ibu' => $request->nama_ibu,
                    'nama_anak' => $request->nama_anak,
                    'tempat_lahir' => $request->tempat_lahir_anak,
                    'tgl_lahir' => $request->tgl_lahir_anak,
                ]);
            }

            return response()->json([
                'message' => 'Pengajuan berhasil',
                'id_layanan' => $layanan->id_layanan
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error in LayananController@store: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            
            return response()->json([
                'message' => 'Terjadi kesalahan server',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // ================= ADMIN: LIST =================
    public function index()
    {
        return LayananMasyarakat::with([
            'masyarakat',
            'dokumen',
            'dokumenSktm',
            'dokumenAkte'
        ])
        ->orderBy('tgl_pengajuan', 'desc')
        ->get();
    }

    // ================= ADMIN: DETAIL =================
    public function show($id)
    {
        return LayananMasyarakat::with([
            'masyarakat',
            'dokumen',
            'dokumenSktm',
            'dokumenAkte'
        ])->findOrFail($id);
    }

    // ================= ADMIN: UPDATE STATUS =================
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Dalam Proses,Terkirim,Selesai',
            'keterangan' => 'nullable|string',
        ]);

        $layanan = LayananMasyarakat::findOrFail($id);
        $layanan->update($request->only('status', 'keterangan'));

        return response()->json([
            'message' => 'Status layanan berhasil diperbarui'
        ]);
    }

    // ================= ADMIN: DELETE =================
    public function destroy($id)
    {
        LayananMasyarakat::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Layanan berhasil dihapus'
        ]);
    }
}
