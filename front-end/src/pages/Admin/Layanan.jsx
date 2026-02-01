import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000/api/layanan";
const Warna = { primary: "#2F4156", card: "bg-white", border: "border-gray-200" };

const LayananAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } catch (e) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err?.message || "Gagal mengubah status");
        return;
      }
      if (detail?.id_layanan === id) setDetail((d) => ({ ...d, status }));
      await fetchData();
    } catch (e) {
      alert("Gagal mengubah status. Periksa koneksi atau jalankan backend.");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusOption = ["Diproses", "Ditolak", "Disetujui"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Data Layanan Masyarakat</h1>
      </div>

      <div className={`rounded-xl shadow-sm border ${Warna.border} overflow-hidden ${Warna.card}`}>
        {loading ? (
          <div className="p-12 text-center text-gray-500">Memuat data...</div>
        ) : data.length === 0 ? (
          <div className="p-12 text-center text-gray-500">Belum ada data pengajuan.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-white" style={{ backgroundColor: Warna.primary }}>
                  <th className="px-4 py-3 font-semibold w-12">No</th>
                  <th className="px-4 py-3 font-semibold">Nama</th>
                  <th className="px-4 py-3 font-semibold">No. Telepon</th>
                  <th className="px-4 py-3 font-semibold">Dokumen</th>
                  <th className="px-4 py-3 font-semibold w-28">Tanggal</th>
                  <th className="px-4 py-3 font-semibold w-36">Status</th>
                  <th className="px-4 py-3 font-semibold w-32">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((l, i) => (
                  <tr key={l.id_layanan} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-gray-600">{i + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{l.masyarakat?.nama_lengkap}</td>
                    <td className="px-4 py-3 text-gray-700">{l.masyarakat?.no_telepon || "-"}</td>
                    <td className="px-4 py-3 text-gray-700">{l.dokumen?.nama_dokumen}</td>
                    <td className="px-4 py-3 text-gray-600">{new Date(l.tgl_pengajuan).toLocaleDateString("id-ID")}</td>
                    <td className="px-4 py-3">
                      <select
                        value={l.status}
                        onChange={(e) => updateStatus(l.id_layanan, e.target.value)}
                        disabled={updatingId === l.id_layanan}
                        className="text-sm border border-gray-300 rounded-lg px-2 py-1.5 bg-white focus:ring-2 focus:ring-offset-1 focus:ring-[#2F4156] disabled:opacity-50"
                      >
                        {statusOption.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => { setDetail(l); setShowDetail(true); }}
                        className="text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:opacity-90"
                        style={{ backgroundColor: Warna.primary }}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Detail */}
      {showDetail && detail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${Warna.card} w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl border ${Warna.border}`}>
            <div className="sticky top-0 px-6 py-4 border-b border-gray-100 flex items-center justify-between" style={{ backgroundColor: "#f8fafc" }}>
              <h2 className="text-lg font-bold text-gray-800">Detail Pengajuan Layanan</h2>
              <button
                onClick={() => setShowDetail(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <section>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Data Masyarakat</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                  <p><span className="text-gray-500">Nama</span> : {detail.masyarakat?.nama_lengkap}</p>
                  {detail.masyarakat?.no_telepon && <p><span className="text-gray-500">No. Telepon</span> : {detail.masyarakat.no_telepon}</p>}
                  <p><span className="text-gray-500">NIK</span> : {detail.masyarakat?.nik}</p>
                  <p><span className="text-gray-500">No KK</span> : {detail.masyarakat?.no_kk}</p>
                  <p><span className="text-gray-500">Jenis Kelamin</span> : {detail.masyarakat?.jenis_kelamin}</p>
                  <p className="sm:col-span-2"><span className="text-gray-500">Alamat KTP</span> : {detail.masyarakat?.alamat_ktp || "-"}</p>
                  <p className="sm:col-span-2"><span className="text-gray-500">Alamat Domisili</span> : {detail.masyarakat?.alamat_domisili || "-"}</p>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Data Layanan</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <p><span className="text-gray-500">Dokumen</span> : {detail.dokumen?.nama_dokumen}</p>
                  <p><span className="text-gray-500">Tanggal</span> : {new Date(detail.tgl_pengajuan).toLocaleDateString("id-ID")}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Status</span>
                    <select
                      value={detail.status}
                      onChange={(e) => updateStatus(detail.id_layanan, e.target.value)}
                      disabled={updatingId === detail.id_layanan}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-[#2F4156]"
                    >
                      {statusOption.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {detail.dokumen?.nama_dokumen?.toLowerCase().includes("tidak mampu") && (
                <section>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Detail SKTM</h3>
                  <p className="text-sm"><span className="text-gray-500">Tujuan</span> : {detail.dokumen_sktm?.tujuan}</p>
                </section>
              )}

              {detail.dokumen?.nama_dokumen?.toLowerCase().includes("akta") && !detail.dokumen?.nama_dokumen?.toLowerCase().includes("keramaian") && (
                <section>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Detail Akta</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                    <p>Nama Anak : {detail.dokumen_akte?.nama_anak}</p>
                    <p>Nama Ayah : {detail.dokumen_akte?.nama_ayah}</p>
                    <p>Nama Ibu : {detail.dokumen_akte?.nama_ibu}</p>
                    <p>Tgl Lahir Anak : {detail.dokumen_akte?.tgl_lahir}</p>
                  </div>
                </section>
              )}

              {(detail.dokumen_keramaian || detail.dokumenKeramaian) && (() => {
                const k = detail.dokumen_keramaian || detail.dokumenKeramaian;
                return (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Detail Surat Izin Keramaian</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      <h4 className="sm:col-span-2 font-medium text-gray-700">Pemilik Acara</h4>
                      <p>Nama : {k.pemilik_acara_nama || "-"}</p>
                      <p>Umur : {k.umur || "-"}</p>
                      <p>Acara : {k.acara || "-"}</p>
                      <p>Jenis hiburan : {k.jenis_hiburan || "-"}</p>
                      <p>Nama hiburan : {k.nama_hiburan || "-"}</p>
                      <p>Nama pimpinan : {k.nama_pimpinan || "-"}</p>
                      <p>Undang berapa orang : {k.undang_berapa_orang || "-"}</p>
                      <p className="sm:col-span-2">Bertempat di : {k.bertempat_di || "-"}</p>
                      <h4 className="sm:col-span-2 font-medium text-gray-700 mt-2">Pemilik Hiburan</h4>
                      <p>Nama : {k.pemilik_hiburan_nama || "-"}</p>
                      <p>Acara : {k.acara_hiburan || "-"}</p>
                      <p>Jenis hiburan : {k.jenis_hiburan_hiburan || "-"}</p>
                      <p>Nama hiburan : {k.nama_hiburan_hiburan || "-"}</p>
                      <p>Nama pimpinan : {k.nama_pimpinan_hiburan || "-"}</p>
                      <p>Undang berapa orang : {k.undang_berapa_orang_hiburan || "-"}</p>
                      <p className="sm:col-span-2">Bertempat di : {k.bertempat_di_hiburan || "-"}</p>
                    </div>
                  </div>
                );
              })()}

              {detail.dokumen?.nama_dokumen?.toLowerCase().includes("nikah") && (
                <section>
                  {(detail.dokumen_nikah || detail.dokumenNikah) ? (() => {
                    const n = detail.dokumen_nikah || detail.dokumenNikah;
                    return (
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Detail Surat Nikah</h3>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Data Orang Tua Pemohon</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                            <p className="sm:col-span-2 font-medium text-gray-600 mt-1">Ayah</p>
                            <p>Nama : {n.ortu_ayah_nama || "-"}</p>
                            <p>NIK : {n.ortu_ayah_nik || "-"}</p>
                            <p>No KK : {n.ortu_ayah_kk || "-"}</p>
                            <p>TTL : {n.ortu_ayah_ttl || "-"}</p>
                            <p>Agama : {n.ortu_ayah_agama || "-"}</p>
                            <p>Kewarganegaraan : {n.ortu_ayah_kewarganegaraan || "-"}</p>
                            <p>Status Perkawinan : {n.ortu_ayah_status_perkawinan || "-"}</p>
                            <p>Pekerjaan : {n.ortu_ayah_pekerjaan || "-"}</p>
                            <p className="sm:col-span-2">Alamat : {n.ortu_ayah_alamat || "-"}</p>
                            
                            <p className="sm:col-span-2 font-medium text-gray-600 mt-2">Ibu</p>
                            <p>Nama : {n.ortu_ibu_nama || "-"}</p>
                            <p>NIK : {n.ortu_ibu_nik || "-"}</p>
                            <p>No KK : {n.ortu_ibu_kk || "-"}</p>
                            <p>TTL : {n.ortu_ibu_ttl || "-"}</p>
                            <p>Agama : {n.ortu_ibu_agama || "-"}</p>
                            <p>Kewarganegaraan : {n.ortu_ibu_kewarganegaraan || "-"}</p>
                            <p>Status Perkawinan : {n.ortu_ibu_status_perkawinan || "-"}</p>
                            <p>Pekerjaan : {n.ortu_ibu_pekerjaan || "-"}</p>
                            <p className="sm:col-span-2">Alamat : {n.ortu_ibu_alamat || "-"}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Data Calon Pasangan</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                            <p>Nama : {n.calon_nama || "-"}</p>
                            <p>NIK : {n.calon_nik || "-"}</p>
                            <p>No KK : {n.calon_kk || "-"}</p>
                            <p>Jenis Kelamin : {n.calon_jenis_kelamin || "-"}</p>
                            <p>TTL : {n.calon_ttl || "-"}</p>
                            <p>Agama : {n.calon_agama || "-"}</p>
                            <p>Kewarganegaraan : {n.calon_kewarganegaraan || "-"}</p>
                            <p>Status Perkawinan : {n.calon_status_perkawinan || "-"}</p>
                            <p>Pekerjaan : {n.calon_pekerjaan || "-"}</p>
                            <p className="sm:col-span-2">Alamat : {n.calon_alamat || "-"}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Data Orang Tua Calon Pasangan</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                            <p className="sm:col-span-2 font-medium text-gray-600 mt-1">Ayah</p>
                            <p>Nama : {n.ortu_calon_ayah_nama || "-"}</p>
                            <p>NIK : {n.ortu_calon_ayah_nik || "-"}</p>
                            <p>No KK : {n.ortu_calon_ayah_kk || "-"}</p>
                            <p>TTL : {n.ortu_calon_ayah_ttl || "-"}</p>
                            <p>Agama : {n.ortu_calon_ayah_agama || "-"}</p>
                            <p>Kewarganegaraan : {n.ortu_calon_ayah_kewarganegaraan || "-"}</p>
                            <p>Status Perkawinan : {n.ortu_calon_ayah_status_perkawinan || "-"}</p>
                            <p>Pekerjaan : {n.ortu_calon_ayah_pekerjaan || "-"}</p>
                            <p className="sm:col-span-2">Alamat : {n.ortu_calon_ayah_alamat || "-"}</p>
                            
                            <p className="sm:col-span-2 font-medium text-gray-600 mt-2">Ibu</p>
                            <p>Nama : {n.ortu_calon_ibu_nama || "-"}</p>
                            <p>NIK : {n.ortu_calon_ibu_nik || "-"}</p>
                            <p>No KK : {n.ortu_calon_ibu_kk || "-"}</p>
                            <p>TTL : {n.ortu_calon_ibu_ttl || "-"}</p>
                            <p>Agama : {n.ortu_calon_ibu_agama || "-"}</p>
                            <p>Kewarganegaraan : {n.ortu_calon_ibu_kewarganegaraan || "-"}</p>
                            <p>Status Perkawinan : {n.ortu_calon_ibu_status_perkawinan || "-"}</p>
                            <p>Pekerjaan : {n.ortu_calon_ibu_pekerjaan || "-"}</p>
                            <p className="sm:col-span-2">Alamat : {n.ortu_calon_ibu_alamat || "-"}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })() : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Detail Surat Nikah</h3>
                      <p className="text-sm text-yellow-700">
                        ⚠️ Data detail tidak tersedia. Pengajuan ini dibuat sebelum sistem detail nikah diaktifkan. 
                        Silakan minta pemohon untuk mengirim ulang pengajuan jika detail diperlukan.
                      </p>
                    </div>
                  )}
                </section>
              )}

              {(detail.dokumen?.nama_dokumen?.toLowerCase().includes("pengantar") && detail.dokumen?.nama_dokumen?.toLowerCase().includes("kartu keluarga")) && (
                <section>
                  {(detail.dokumen_pengantar_k_k || detail.dokumen_pengantar_kk || detail.dokumenPengantarKK) ? (() => {
                    const pkk = detail.dokumen_pengantar_k_k || detail.dokumen_pengantar_kk || detail.dokumenPengantarKK;
                    return (
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Detail Surat Pengantar Kartu Keluarga</h3>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Data Kepala Keluarga</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                            <p>Nama Kepala Keluarga : {pkk.nama_kepala_keluarga || "-"}</p>
                            <p className="sm:col-span-2">Alamat : {pkk.alamat || "-"}</p>
                            <p>RT : {pkk.rt || "-"}</p>
                            <p>Desa : {pkk.desa || "-"}</p>
                            <p>Kecamatan : {pkk.kecamatan || "-"}</p>
                            <p>Kabupaten : {pkk.kabupaten || "-"}</p>
                            <p>Provinsi : {pkk.provinsi || "-"}</p>
                            <p>Kode Pos : {pkk.kode_pos || "-"}</p>
                          </div>
                        </div>

                        {pkk.anggota_keluarga && Array.isArray(pkk.anggota_keluarga) && pkk.anggota_keluarga.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Anggota Keluarga</h4>
                            <div className="space-y-2">
                              {pkk.anggota_keluarga.map((anggota, idx) => (
                                <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                                  <p className="text-sm font-medium text-gray-800 mb-1">Anggota {idx + 1}</p>
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1 text-xs text-gray-600">
                                    <p>Nama : {anggota.nama_lengkap || "-"}</p>
                                    <p>NIK : {anggota.nik || "-"}</p>
                                    <p>Jenis Kelamin : {anggota.jenis_kelamin || "-"}</p>
                                    <p>Tempat Lahir : {anggota.tempat_lahir || "-"}</p>
                                    <p>Tanggal Lahir : {anggota.tanggal_lahir || "-"}</p>
                                    <p>Agama : {anggota.agama || "-"}</p>
                                    <p>Pendidikan : {anggota.pendidikan_terakhir || "-"}</p>
                                    <p>Pekerjaan : {anggota.jenis_pekerjaan || "-"}</p>
                                    <p>Status Perkawinan : {anggota.status_perkawinan || "-"}</p>
                                    <p>Status Hubungan : {anggota.status_hubungan || "-"}</p>
                                    <p>Golongan Darah : {anggota.golongan_darah || "-"}</p>
                                    <p>Nama Ayah : {anggota.nama_ayah || "-"}</p>
                                    <p>Nama Ibu : {anggota.nama_ibu || "-"}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })() : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Detail Surat Pengantar Kartu Keluarga</h3>
                      <p className="text-sm text-yellow-700">
                        ⚠️ Data detail tidak tersedia. Pengajuan ini dibuat sebelum sistem detail pengantar KK diaktifkan. 
                        Silakan minta pemohon untuk mengirim ulang pengajuan jika detail diperlukan.
                      </p>
                    </div>
                  )}
                </section>
              )}

              {(detail.dokumen?.nama_dokumen?.toLowerCase().includes("ahli waris") || detail.dokumen?.nama_dokumen?.toLowerCase().includes("waris")) && (
                <section>
                  {(detail.dokumen_ahli_waris || detail.dokumenAhliWaris) ? (() => {
                    const aw = detail.dokumen_ahli_waris || detail.dokumenAhliWaris;
                    return (
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Detail Surat Keterangan Ahli Waris</h3>
                        <div className="grid grid-cols-1 gap-y-2 text-sm">
                          <p><span className="text-gray-500">Tempat/Tanggal Kematian</span> : {aw.tempat_tanggal_kematian || "-"}</p>
                          <p><span className="text-gray-500">Nama Pemberi Warisan (Pewaris)</span> : {aw.nama_pemberi_warisan || "-"}</p>
                          <p><span className="text-gray-500">Nama Pasangan Pewaris</span> : {aw.nama_pasangan_pewaris || "-"}</p>
                          <p><span className="text-gray-500">Nama Para Ahli Waris</span> : {aw.nama_para_ahli_waris || "-"}</p>
                          <p><span className="text-gray-500">Ahli Waris yang Ditunjuk</span> : {aw.ahli_waris_ditunjuk || "-"}</p>
                          <p><span className="text-gray-500">Warisan yang Ditinggalkan</span> : {aw.warisan_ditinggalkan || "-"}</p>
                        </div>
                      </div>
                    );
                  })() : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Detail Surat Keterangan Ahli Waris</h3>
                      <p className="text-sm text-yellow-700">
                        ⚠️ Data detail tidak tersedia. Pengajuan ini dibuat sebelum sistem detail ahli waris diaktifkan. 
                        Silakan minta pemohon untuk mengirim ulang pengajuan jika detail diperlukan.
                      </p>
                    </div>
                  )}
                </section>
              )}

              {detail.dokumen?.nama_dokumen?.toLowerCase().includes("kematian") && (
                <section>
                  {(detail.dokumen_kematian || detail.dokumenKematian) ? (() => {
                    const km = detail.dokumen_kematian || detail.dokumenKematian;
                    return (
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Detail Surat Kematian</h3>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Data Almarhum/Almarhumah</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                            <p>Nama : {km.nama_almarhum || "-"}</p>
                            <p>Jenis Kelamin : {km.jenis_kelamin_almarhum || "-"}</p>
                            <p>Tempat/Tanggal Lahir : {km.tempat_tanggal_lahir_almarhum || "-"}</p>
                            <p>Agama : {km.agama_almarhum || "-"}</p>
                            <p>Pekerjaan : {km.pekerjaan_almarhum || "-"}</p>
                            <p className="sm:col-span-2">Alamat : {km.alamat_almarhum || "-"}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Data Kematian</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                            <p>Hari/Tanggal Meninggal : {km.hari_tanggal_meninggal || "-"}</p>
                            <p>Waktu Meninggal : {km.waktu_meninggal || "-"}</p>
                            <p>Tempat Meninggal : {km.tempat_meninggal || "-"}</p>
                            <p>Tempat Dimakamkan : {km.tempat_dimakamkan || "-"}</p>
                            <p className="sm:col-span-2">Penyebab Meninggal : {km.penyebab_meninggal || "-"}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Data Pelapor</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                            <p>Nama Pelapor : {km.nama_pelapor || "-"}</p>
                            <p>Status Hubungan : {km.status_hubungan_pelapor || "-"}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })() : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Detail Surat Kematian</h3>
                      <p className="text-sm text-yellow-700">
                        ⚠️ Data detail tidak tersedia. Pengajuan ini dibuat sebelum sistem detail kematian diaktifkan. 
                        Silakan minta pemohon untuk mengirim ulang pengajuan jika detail diperlukan.
                      </p>
                    </div>
                  )}
                </section>
              )}

              {detail.dokumen?.nama_dokumen?.toLowerCase().includes("usaha") && (
                <section>
                  {(detail.dokumen_s_k_u || detail.dokumen_sku || detail.dokumenSKU) ? (() => {
                    const s = detail.dokumen_s_k_u || detail.dokumen_sku || detail.dokumenSKU;
                    return (
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Detail Surat Keterangan Usaha (SKU)</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <p><span className="text-gray-500">Nama Instansi/Usaha</span> : {s.nama_instansi || "-"}</p>
                          <p><span className="text-gray-500">Jenis Kegiatan Usaha</span> : {s.jenis_kegiatan_usaha || "-"}</p>
                          <p><span className="text-gray-500">Nomor Badan Hukum</span> : {s.nomor_badan_hukum || "-"}</p>
                          <p><span className="text-gray-500">Nama Lembaga/Yayasan</span> : {s.nama_lembaga || "-"}</p>
                          <p className="sm:col-span-2"><span className="text-gray-500">Tanggal Berdiri Usaha</span> : {s.tanggal_berdiri_usaha || "-"}</p>
                        </div>
                      </div>
                    );
                  })() : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Detail Surat Keterangan Usaha (SKU)</h3>
                      <p className="text-sm text-yellow-700">
                        ⚠️ Data detail tidak tersedia. Pengajuan ini dibuat sebelum sistem detail SKU diaktifkan. 
                        Silakan minta pemohon untuk mengirim ulang pengajuan jika detail diperlukan.
                      </p>
                    </div>
                  )}
                </section>
              )}

              {detail.dokumen?.nama_dokumen?.toLowerCase().includes("pindah") && (
                <section>
                  {(detail.dokumen_pindah || detail.dokumenPindah) ? (() => {
                    const p = detail.dokumen_pindah || detail.dokumenPindah;
                    return (
                      <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Detail Surat Keterangan Pindah</h3>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Data Kepala Keluarga</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        <p>Nama : {p.nama_kepala_keluarga || "-"}</p>
                        <p>NIK : {p.nik_kepala_keluarga || "-"}</p>
                        <p>Nomor KK : {p.nomor_kk || "-"}</p>
                        <p>Nomor HP : {p.nomor_hp || "-"}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Alamat Asal</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        <p className="sm:col-span-2">Alamat : {p.alamat_asal || "-"}</p>
                        <p>RT/RW : {p.rt_asal || "-"} / {p.rw_asal || "-"}</p>
                        <p>Desa : {p.desa_asal || "-"}</p>
                        <p>Kecamatan : {p.kecamatan_asal || "-"}</p>
                        <p>Kabupaten : {p.kabupaten_asal || "-"}</p>
                        <p>Provinsi : {p.provinsi_asal || "-"}</p>
                        <p>Kode Pos : {p.kode_pos_asal || "-"}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Alamat Tujuan</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        <p className="sm:col-span-2">Alamat : {p.alamat_tujuan || "-"}</p>
                        <p>RT/RW : {p.rt_tujuan || "-"} / {p.rw_tujuan || "-"}</p>
                        <p>Desa : {p.desa_tujuan || "-"}</p>
                        <p>Kecamatan : {p.kecamatan_tujuan || "-"}</p>
                        <p>Kabupaten : {p.kabupaten_tujuan || "-"}</p>
                        <p>Provinsi : {p.provinsi_tujuan || "-"}</p>
                        <p>Kode Pos : {p.kode_pos_tujuan || "-"}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Data Kepindahan</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        <p>Alasan Pindah : {p.alasan_pindah || "-"}</p>
                        <p>Klasifikasi : {p.klasifikasi_kepindahan || "-"}</p>
                        <p className="sm:col-span-2">Tanggal Rencana Pindah : {p.tanggal_rencana_pindah || "-"}</p>
                      </div>
                    </div>

                    {p.anggota_pindah && Array.isArray(p.anggota_pindah) && p.anggota_pindah.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Anggota Keluarga yang Pindah</h4>
                        <div className="space-y-2">
                          {p.anggota_pindah.map((anggota, idx) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-gray-800 mb-1">Anggota {idx + 1}</p>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1 text-sm text-gray-600">
                                <p>Nama : {anggota.nama_lengkap || "-"}</p>
                                <p>NIK : {anggota.nik || "-"}</p>
                                <p>Hubungan : {anggota.status_hubungan || "-"}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                      </div>
                    );
                  })() : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Detail Surat Keterangan Pindah</h3>
                      <p className="text-sm text-yellow-700">
                        ⚠️ Data detail tidak tersedia. Pengajuan ini dibuat sebelum sistem detail pindah diaktifkan. 
                        Silakan minta pemohon untuk mengirim ulang pengajuan jika detail diperlukan.
                      </p>
                    </div>
                  )}
                </section>
              )}
            </div>

            <div className="sticky bottom-0 px-6 py-4 border-t border-gray-100 flex justify-end" style={{ backgroundColor: "#f8fafc" }}>
              <button
                onClick={() => setShowDetail(false)}
                className="text-white font-medium px-5 py-2 rounded-lg hover:opacity-90"
                style={{ backgroundColor: Warna.primary }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LayananAdmin;
