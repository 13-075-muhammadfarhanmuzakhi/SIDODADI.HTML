<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Masyarakat;
use App\Models\LayananMasyarakat;
use App\Models\DokumenSktm;
use App\Models\DokumenAkte;
use App\Models\DokumenKeramaian;
use App\Models\DokumenPengantarKK;
use App\Models\DokumenPindah;
use App\Models\DokumenSKU;
use App\Models\DokumenKematian;
use App\Models\DokumenAhliWaris;
use App\Models\DokumenNikah;
use App\Models\DokumenPenghasilan;
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
            // Hanya validasi dan simpan "tujuan" jika dokumen adalah SKTM (bukan SKU)
            $isSKTM = (str_contains($namaDokumen, 'SKTM') || str_contains($namaDokumen, 'TIDAK MAMPU')) 
                      && !str_contains($namaDokumen, 'SKU') 
                      && !str_contains($namaDokumen, 'USAHA');
            
            if ($isSKTM) {
                $request->validate([
                    'tujuan' => 'required|string'
                ]);

                DokumenSktm::create([
                    'id_layanan' => $layanan->id_layanan,
                    'tujuan' => $request->tujuan,
                ]);
            }
            // Untuk dokumen lain (Nikah, SKU, Kematian, dll), tidak perlu validasi "tujuan"

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

            // ===== SURAT PENGANTAR KARTU KELUARGA =====
            if (str_contains($namaDokumen, 'PENGANTAR') && str_contains($namaDokumen, 'KARTU KELUARGA')) {
                $request->validate([
                    'nama_kepala_keluarga' => 'required|string',
                    'alamat' => 'required|string',
                    'rt' => 'required|string',
                    'desa' => 'required|string',
                    'kabupaten' => 'required|string',
                    'kecamatan' => 'required|string',
                    'kode_pos' => 'required|string',
                    'provinsi' => 'required|string',
                    'anggota_keluarga' => 'required|json',
                ]);

                $anggotaKeluarga = json_decode($request->anggota_keluarga, true);

                DokumenPengantarKK::create([
                    'id_layanan' => $layanan->id_layanan,
                    'nama_kepala_keluarga' => $request->nama_kepala_keluarga,
                    'alamat' => $request->alamat,
                    'rt' => $request->rt,
                    'desa' => $request->desa,
                    'kabupaten' => $request->kabupaten,
                    'kecamatan' => $request->kecamatan,
                    'kode_pos' => $request->kode_pos,
                    'provinsi' => $request->provinsi,
                    'anggota_keluarga' => $anggotaKeluarga,
                ]);
            }

            // ===== SURAT KETERANGAN PINDAH =====
            if (str_contains($namaDokumen, 'PINDAH')) {
                $request->validate([
                    'nama_kepala_keluarga' => 'required|string',
                    'nik_kepala_keluarga' => 'required|string|min:16|max:16',
                    'nomor_kk' => 'required|string|min:16|max:16',
                    'alamat_asal' => 'required|string',
                    'desa_asal' => 'required|string',
                    'kecamatan_asal' => 'required|string',
                    'kabupaten_asal' => 'required|string',
                    'provinsi_asal' => 'required|string',
                    'alamat_tujuan' => 'required|string',
                    'desa_tujuan' => 'required|string',
                    'kecamatan_tujuan' => 'required|string',
                    'kabupaten_tujuan' => 'required|string',
                    'provinsi_tujuan' => 'required|string',
                    'alasan_pindah' => 'required|string',
                    'klasifikasi_kepindahan' => 'required|string',
                    'tanggal_rencana_pindah' => 'required|string',
                    'anggota_pindah' => 'required|json',
                ]);

                $anggotaPindah = json_decode($request->anggota_pindah, true);

                DokumenPindah::create([
                    'id_layanan' => $layanan->id_layanan,
                    'nama_kepala_keluarga' => $request->nama_kepala_keluarga,
                    'nik_kepala_keluarga' => $request->nik_kepala_keluarga,
                    'nomor_kk' => $request->nomor_kk,
                    'nomor_hp' => $request->nomor_hp,
                    'alamat_asal' => $request->alamat_asal,
                    'rt_asal' => $request->rt_asal,
                    'rw_asal' => $request->rw_asal,
                    'desa_asal' => $request->desa_asal,
                    'kode_pos_asal' => $request->kode_pos_asal,
                    'kecamatan_asal' => $request->kecamatan_asal,
                    'kabupaten_asal' => $request->kabupaten_asal,
                    'provinsi_asal' => $request->provinsi_asal,
                    'alamat_tujuan' => $request->alamat_tujuan,
                    'rt_tujuan' => $request->rt_tujuan,
                    'rw_tujuan' => $request->rw_tujuan,
                    'desa_tujuan' => $request->desa_tujuan,
                    'kode_pos_tujuan' => $request->kode_pos_tujuan,
                    'kecamatan_tujuan' => $request->kecamatan_tujuan,
                    'kabupaten_tujuan' => $request->kabupaten_tujuan,
                    'provinsi_tujuan' => $request->provinsi_tujuan,
                    'alasan_pindah' => $request->alasan_pindah,
                    'klasifikasi_kepindahan' => $request->klasifikasi_kepindahan,
                    'tanggal_rencana_pindah' => $request->tanggal_rencana_pindah,
                    'anggota_pindah' => $anggotaPindah,
                ]);
            }

            // ===== SURAT KETERANGAN USAHA (SKU) =====
            if (str_contains($namaDokumen, 'USAHA') || str_contains($namaDokumen, 'SKU')) {
                $request->validate([
                    'nama_instansi' => 'required|string',
                    'jenis_kegiatan_usaha' => 'required|string',
                    'tanggal_berdiri_usaha' => 'required|string',
                ]);

                DokumenSKU::create([
                    'id_layanan' => $layanan->id_layanan,
                    'nama_instansi' => $request->nama_instansi,
                    'jenis_kegiatan_usaha' => $request->jenis_kegiatan_usaha,
                    'nomor_badan_hukum' => $request->nomor_badan_hukum,
                    'nama_lembaga' => $request->nama_lembaga,
                    'tanggal_berdiri_usaha' => $request->tanggal_berdiri_usaha,
                ]);
            }

            // ===== SURAT KEMATIAN =====
            if (str_contains($namaDokumen, 'KEMATIAN')) {
                $request->validate([
                    'nama_almarhum' => 'required|string',
                    'jenis_kelamin_almarhum' => 'required|string',
                    'waktu_meninggal' => 'required|string',
                    'agama_almarhum' => 'required|string',
                    'tempat_tanggal_lahir_almarhum' => 'required|string',
                    'pekerjaan_almarhum' => 'required|string',
                    'penyebab_meninggal' => 'required|string',
                    'nama_pelapor' => 'required|string',
                    'alamat_almarhum' => 'required|string',
                    'tempat_meninggal' => 'required|string',
                    'hari_tanggal_meninggal' => 'required|string',
                    'status_hubungan_pelapor' => 'required|string',
                    'tempat_dimakamkan' => 'required|string',
                ]);

                DokumenKematian::create([
                    'id_layanan' => $layanan->id_layanan,
                    'nama_almarhum' => $request->nama_almarhum,
                    'jenis_kelamin_almarhum' => $request->jenis_kelamin_almarhum,
                    'waktu_meninggal' => $request->waktu_meninggal,
                    'agama_almarhum' => $request->agama_almarhum,
                    'tempat_tanggal_lahir_almarhum' => $request->tempat_tanggal_lahir_almarhum,
                    'pekerjaan_almarhum' => $request->pekerjaan_almarhum,
                    'penyebab_meninggal' => $request->penyebab_meninggal,
                    'nama_pelapor' => $request->nama_pelapor,
                    'alamat_almarhum' => $request->alamat_almarhum,
                    'tempat_meninggal' => $request->tempat_meninggal,
                    'hari_tanggal_meninggal' => $request->hari_tanggal_meninggal,
                    'status_hubungan_pelapor' => $request->status_hubungan_pelapor,
                    'tempat_dimakamkan' => $request->tempat_dimakamkan,
                ]);
            }

            // ===== SURAT KETERANGAN AHLI WARIS =====
            if (str_contains($namaDokumen, 'AHLI WARIS') || str_contains($namaDokumen, 'WARIS')) {
                $request->validate([
                    'tempat_tanggal_kematian' => 'required|string',
                    'nama_pemberi_warisan' => 'required|string',
                    'nama_pasangan_pewaris' => 'required|string',
                    'nama_para_ahli_waris' => 'required|string',
                    'ahli_waris_ditunjuk' => 'required|string',
                    'warisan_ditinggalkan' => 'required|string',
                ]);

                DokumenAhliWaris::create([
                    'id_layanan' => $layanan->id_layanan,
                    'tempat_tanggal_kematian' => $request->tempat_tanggal_kematian,
                    'nama_pemberi_warisan' => $request->nama_pemberi_warisan,
                    'nama_pasangan_pewaris' => $request->nama_pasangan_pewaris,
                    'nama_para_ahli_waris' => $request->nama_para_ahli_waris,
                    'ahli_waris_ditunjuk' => $request->ahli_waris_ditunjuk,
                    'warisan_ditinggalkan' => $request->warisan_ditinggalkan,
                ]);
            }

            // ===== SURAT NIKAH =====
            if (str_contains($namaDokumen, 'NIKAH')) {
                $request->validate([
                    'ortu_ayah_nama' => 'required|string',
                    'ortu_ayah_nik' => 'required|string',
                    'ortu_ibu_nama' => 'required|string',
                    'ortu_ibu_nik' => 'required|string',
                    'calon_nama' => 'required|string',
                    'calon_nik' => 'required|string',
                    'ortu_calon_ayah_nama' => 'required|string',
                    'ortu_calon_ayah_nik' => 'required|string',
                    'ortu_calon_ibu_nama' => 'required|string',
                    'ortu_calon_ibu_nik' => 'required|string',
                ]);

                DokumenNikah::create([
                    'id_layanan' => $layanan->id_layanan,
                    'ortu_ayah_nama' => $request->ortu_ayah_nama,
                    'ortu_ayah_nik' => $request->ortu_ayah_nik,
                    'ortu_ayah_kk' => $request->ortu_ayah_kk,
                    'ortu_ayah_ttl' => $request->ortu_ayah_ttl,
                    'ortu_ayah_agama' => $request->ortu_ayah_agama,
                    'ortu_ayah_kewarganegaraan' => $request->ortu_ayah_kewarganegaraan,
                    'ortu_ayah_status_perkawinan' => $request->ortu_ayah_status_perkawinan,
                    'ortu_ayah_pekerjaan' => $request->ortu_ayah_pekerjaan,
                    'ortu_ayah_alamat' => $request->ortu_ayah_alamat,
                    'ortu_ibu_nama' => $request->ortu_ibu_nama,
                    'ortu_ibu_nik' => $request->ortu_ibu_nik,
                    'ortu_ibu_kk' => $request->ortu_ibu_kk,
                    'ortu_ibu_ttl' => $request->ortu_ibu_ttl,
                    'ortu_ibu_agama' => $request->ortu_ibu_agama,
                    'ortu_ibu_kewarganegaraan' => $request->ortu_ibu_kewarganegaraan,
                    'ortu_ibu_status_perkawinan' => $request->ortu_ibu_status_perkawinan,
                    'ortu_ibu_pekerjaan' => $request->ortu_ibu_pekerjaan,
                    'ortu_ibu_alamat' => $request->ortu_ibu_alamat,
                    'calon_nama' => $request->calon_nama,
                    'calon_nik' => $request->calon_nik,
                    'calon_kk' => $request->calon_kk,
                    'calon_jenis_kelamin' => $request->calon_jenis_kelamin,
                    'calon_ttl' => $request->calon_ttl,
                    'calon_agama' => $request->calon_agama,
                    'calon_kewarganegaraan' => $request->calon_kewarganegaraan,
                    'calon_status_perkawinan' => $request->calon_status_perkawinan,
                    'calon_pekerjaan' => $request->calon_pekerjaan,
                    'calon_alamat' => $request->calon_alamat,
                    'ortu_calon_ayah_nama' => $request->ortu_calon_ayah_nama,
                    'ortu_calon_ayah_nik' => $request->ortu_calon_ayah_nik,
                    'ortu_calon_ayah_kk' => $request->ortu_calon_ayah_kk,
                    'ortu_calon_ayah_ttl' => $request->ortu_calon_ayah_ttl,
                    'ortu_calon_ayah_agama' => $request->ortu_calon_ayah_agama,
                    'ortu_calon_ayah_kewarganegaraan' => $request->ortu_calon_ayah_kewarganegaraan,
                    'ortu_calon_ayah_status_perkawinan' => $request->ortu_calon_ayah_status_perkawinan,
                    'ortu_calon_ayah_pekerjaan' => $request->ortu_calon_ayah_pekerjaan,
                    'ortu_calon_ayah_alamat' => $request->ortu_calon_ayah_alamat,
                    'ortu_calon_ibu_nama' => $request->ortu_calon_ibu_nama,
                    'ortu_calon_ibu_nik' => $request->ortu_calon_ibu_nik,
                    'ortu_calon_ibu_kk' => $request->ortu_calon_ibu_kk,
                    'ortu_calon_ibu_ttl' => $request->ortu_calon_ibu_ttl,
                    'ortu_calon_ibu_agama' => $request->ortu_calon_ibu_agama,
                    'ortu_calon_ibu_kewarganegaraan' => $request->ortu_calon_ibu_kewarganegaraan,
                    'ortu_calon_ibu_status_perkawinan' => $request->ortu_calon_ibu_status_perkawinan,
                    'ortu_calon_ibu_pekerjaan' => $request->ortu_calon_ibu_pekerjaan,
                    'ortu_calon_ibu_alamat' => $request->ortu_calon_ibu_alamat,
                ]);
            }

            // ===== SURAT KETERANGAN PENGHASILAN =====
            if (str_contains($namaDokumen, 'PENGHASILAN')) {
                $request->validate([
                    'nama_lengkap_wali' => 'required|string',
                    'nik_wali' => 'required|string',
                    'nama_lengkap_anak' => 'required|string',
                    'nik_anak' => 'required|string',
                    'keperluan' => 'required|string',
                    'penghasilan_per_bulan' => 'required|string',
                ]);

                DokumenPenghasilan::create([
                    'id_layanan' => $layanan->id_layanan,
                    'nama_lengkap_wali' => $request->nama_lengkap_wali,
                    'nik_wali' => $request->nik_wali,
                    'tempat_tanggal_lahir_wali' => $request->tempat_tanggal_lahir_wali,
                    'jenis_kelamin_wali' => $request->jenis_kelamin_wali,
                    'agama_wali' => $request->agama_wali,
                    'pekerjaan_wali' => $request->pekerjaan_wali,
                    'nama_lengkap_anak' => $request->nama_lengkap_anak,
                    'nik_anak' => $request->nik_anak,
                    'tempat_tanggal_lahir_anak' => $request->tempat_tanggal_lahir_anak,
                    'jenis_kelamin_anak' => $request->jenis_kelamin_anak,
                    'agama_anak' => $request->agama_anak,
                    'pekerjaan_anak' => $request->pekerjaan_anak,
                    'keperluan' => $request->keperluan,
                    'penghasilan_per_bulan' => $request->penghasilan_per_bulan,
                    'jurusan_prodi' => $request->jurusan_prodi,
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

    // ================= SURAT PENGANTAR KARTU KELUARGA =================
    public function storePengantarKK(Request $request)
    {
        try {
            $request->validate([
                'nama' => 'required|string|max:150',
                'nomer_telepon' => 'required|string|max:20',
                'nama_kepala_keluarga' => 'required|string|max:150',
                'alamat' => 'required|string',
                'rt' => 'required|string|max:10',
                'desa' => 'required|string|max:100',
                'kabupaten' => 'required|string|max:100',
                'kecamatan' => 'required|string|max:100',
                'kode_pos' => 'required|string|max:10',
                'provinsi' => 'required|string|max:100',
                'anggota_keluarga' => 'required|json',
            ]);

            // Decode dan validasi anggota keluarga
            $anggotaKeluarga = json_decode($request->anggota_keluarga, true);
            
            if (!is_array($anggotaKeluarga) || empty($anggotaKeluarga)) {
                return response()->json([
                    'message' => 'Validasi gagal',
                    'errors' => ['anggota_keluarga' => ['Data anggota keluarga tidak valid atau kosong']]
                ], 422);
            }

            // Validasi setiap anggota keluarga
            foreach ($anggotaKeluarga as $index => $anggota) {
                $requiredFields = [
                    'nama_lengkap', 'jenis_kelamin', 'nik', 'tempat_lahir', 
                    'tanggal_lahir', 'agama', 'pendidikan_terakhir', 'jenis_pekerjaan',
                    'status_perkawinan', 'status_hubungan', 'golongan_darah', 
                    'nama_ayah', 'nama_ibu'
                ];

                foreach ($requiredFields as $field) {
                    if (empty($anggota[$field])) {
                        $fieldLabel = str_replace('_', ' ', $field);
                        return response()->json([
                            'message' => 'Validasi gagal',
                            'errors' => ["anggota_keluarga.{$index}.{$field}" => ["The {$fieldLabel} field is required."]]
                        ], 422);
                    }
                }
            }

            // Simpan data masyarakat
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
                'alamat_ktp' => $request->alamat,
                'alamat_domisili' => $request->alamat,
            ]);

            // Cari ID dokumen untuk Pengantar KK
            $dokumenPengantarKK = Dokumen::where('nama_dokumen', 'like', '%Pengantar%KK%')
                ->orWhere('nama_dokumen', 'like', '%Kartu Keluarga%')
                ->first();
            $idDokumenPengantarKK = $dokumenPengantarKK ? $dokumenPengantarKK->id_dokumen : 1;

            // Simpan layanan
            $layanan = LayananMasyarakat::create([
                'id_masyarakat' => $masyarakat->id_masyarakat,
                'id_dokumen' => $idDokumenPengantarKK,
                'tgl_pengajuan' => now()->format('Y-m-d'),
                'status' => 'Diproses',
                'keterangan' => null,
            ]);

            // Simpan dokumen pengantar KK
            DokumenPengantarKK::create([
                'id_layanan' => $layanan->id_layanan,
                'nama_kepala_keluarga' => $request->nama_kepala_keluarga,
                'alamat' => $request->alamat,
                'rt' => $request->rt,
                'desa' => $request->desa,
                'kabupaten' => $request->kabupaten,
                'kecamatan' => $request->kecamatan,
                'kode_pos' => $request->kode_pos,
                'provinsi' => $request->provinsi,
                'anggota_keluarga' => $anggotaKeluarga,
            ]);

            return response()->json([
                'message' => 'Pengajuan Surat Pengantar Kartu Keluarga berhasil',
                'id_layanan' => $layanan->id_layanan,
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error in LayananController@storePengantarKK: ' . $e->getMessage());
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
            'dokumenKeramaian',
            'dokumenPengantarKK',
            'dokumenPindah',
            'dokumenSKU',
            'dokumenKematian',
            'dokumenAhliWaris',
            'dokumenNikah',
            'dokumenPenghasilan'
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
            'dokumenKeramaian',
            'dokumenPengantarKK',
            'dokumenPindah',
            'dokumenSKU',
            'dokumenKematian',
            'dokumenAhliWaris',
            'dokumenNikah',
            'dokumenPenghasilan'
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
            'dokumenKeramaian',
            'dokumenPengantarKK',
            'dokumenPindah',
            'dokumenSKU',
            'dokumenKematian',
            'dokumenAhliWaris',
            'dokumenNikah',
            'dokumenPenghasilan'
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
