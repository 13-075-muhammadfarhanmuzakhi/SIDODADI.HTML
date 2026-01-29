<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Masyarakat;
use App\Models\LayananMasyarakat;
use App\Models\DokumenSktm;
use App\Models\DokumenAkte;
use App\Models\DokumenKeramaian;
use App\Models\Dokumen;

class LayananController extends Controller
{
    // ================= USER SUBMIT =================
    public function store(Request $request)
    {
        try {
            $idDokumen = (int) $request->input('id_dokumen');
            $dokumen = $idDokumen ? Dokumen::find($idDokumen) : null;
            $isKeramaian = $dokumen && stripos($dokumen->nama_dokumen, 'Keramaian') !== false;

            if ($isKeramaian) {
                return $this->storeKeramaian($request);
            }

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
                'no_telepon' => 'nullable|string|max:20',
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
                'no_telepon',
            ]));

            // ===== SIMPAN LAYANAN =====
            $layanan = LayananMasyarakat::create([
                'id_masyarakat' => $masyarakat->id_masyarakat,
                'id_dokumen' => $request->id_dokumen,
                'tgl_pengajuan' => now(),
                'status' => 'Diproses',
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
            if (str_contains($namaDokumen, 'AKTA') && ! str_contains($namaDokumen, 'KERAMAIAN')) {
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

    // ================= SURAT IZIN KERAMAIAN =================
    public function storeKeramaianPublic(Request $request)
    {
        return $this->storeKeramaian($request);
    }

    protected function storeKeramaian(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:150',
            'nomer_telepon' => 'required|string|max:20',
        ]);

        $masyarakat = Masyarakat::create([
            'nama_lengkap' => $request->nama,
            'no_telepon' => $request->nomer_telepon,
            'nik' => '0000000000000000',
            'no_kk' => '0000000000000000',
            'jenis_kelamin' => 'Laki-laki',
            'tempat_lahir' => '-',
            'tgl_lahir' => '2000-01-01',
            'agama' => '-',
            'kewarganegaraan' => 'Indonesia',
            'status_perkawinan' => '-',
            'pekerjaan' => '-',
            'alamat_ktp' => '-',
            'alamat_domisili' => '-',
        ]);

        $dokumenKeramaian = Dokumen::where('nama_dokumen', 'like', '%Keramaian%')->first();
        $idDokumenKeramaian = $dokumenKeramaian ? $dokumenKeramaian->id_dokumen : 3;

        $layanan = LayananMasyarakat::create([
            'id_masyarakat' => $masyarakat->id_masyarakat,
            'id_dokumen' => $idDokumenKeramaian,
            'tgl_pengajuan' => now()->format('Y-m-d'),
            'status' => 'Diproses',
            'keterangan' => null,
        ]);

        DokumenKeramaian::create([
            'id_layanan' => $layanan->id_layanan,
            'pemilik_acara_nama' => $request->pemilik_acara_nama,
            'umur' => $request->umur,
            'acara' => $request->acara,
            'jenis_hiburan' => $request->jenis_hiburan,
            'nama_hiburan' => $request->nama_hiburan,
            'nama_pimpinan' => $request->nama_pimpinan,
            'undang_berapa_orang' => $request->undang_berapa_orang,
            'bertempat_di' => $request->bertempat_di,
            'pemilik_hiburan_nama' => $request->pemilik_hiburan_nama,
            'acara_hiburan' => $request->acara_hiburan,
            'jenis_hiburan_hiburan' => $request->jenis_hiburan_hiburan,
            'nama_hiburan_hiburan' => $request->nama_hiburan_hiburan,
            'nama_pimpinan_hiburan' => $request->nama_pimpinan_hiburan,
            'undang_berapa_orang_hiburan' => $request->undang_berapa_orang_hiburan,
            'bertempat_di_hiburan' => $request->bertempat_di_hiburan,
        ]);

        return response()->json([
            'message' => 'Pengajuan Surat Izin Keramaian berhasil',
            'id_layanan' => $layanan->id_layanan,
        ], 201);
    }

    // ================= ADMIN: LIST =================
    public function index()
    {
        return LayananMasyarakat::with([
            'masyarakat',
            'dokumen',
            'dokumenSktm',
            'dokumenAkte',
            'dokumenKeramaian'
        ])
        ->orderBy('tgl_pengajuan', 'desc')
        ->get();
    }

    // ================= PUBLIC: CEK STATUS (filter by nama / no_telepon) =================
    public function cekStatus(Request $request)
    {
        $q = $request->query('q');
        $nama = $request->query('nama', $q);
        $noTelepon = $request->query('no_telepon', $q);

        $hasNama = $nama && $nama !== '';
        $hasTelp = $noTelepon && $noTelepon !== '';
        if (! $hasNama && ! $hasTelp) {
            return [];
        }

        $query = LayananMasyarakat::with([
            'masyarakat',
            'dokumen',
            'dokumenSktm',
            'dokumenAkte',
            'dokumenKeramaian'
        ])->orderBy('tgl_pengajuan', 'desc');

        $query->whereHas('masyarakat', function ($q) use ($nama, $noTelepon, $hasNama, $hasTelp) {
            if ($hasNama && $hasTelp) {
                $q->where(function ($q2) use ($nama, $noTelepon) {
                    $q2->where('nama_lengkap', 'like', '%' . $nama . '%')
                       ->orWhere('no_telepon', 'like', '%' . $noTelepon . '%');
                });
            } elseif ($hasNama) {
                $q->where('nama_lengkap', 'like', '%' . $nama . '%');
            } else {
                $q->where('no_telepon', 'like', '%' . $noTelepon . '%');
            }
        });

        return $query->get();
    }

    // ================= ADMIN: DETAIL =================
    public function show($id)
    {
        return LayananMasyarakat::with([
            'masyarakat',
            'dokumen',
            'dokumenSktm',
            'dokumenAkte',
            'dokumenKeramaian'
        ])->findOrFail($id);
    }

    // ================= ADMIN: UPDATE STATUS =================
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Diproses,Ditolak,Disetujui',
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
