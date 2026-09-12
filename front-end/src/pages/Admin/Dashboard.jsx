import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// KONFIGURASI CONSTANT & WARNA GLOBAL
// ==========================================
const API_LAYANAN = "https://desasidodadiasri.my.id/api/layanan";
const API_ARTIKEL = "https://desasidodadiasri.my.id/api/artikel";
const API_PENGUMUMAN = "https://desasidodadiasri.my.id/api/pengumuman";

const Theme = {
  primary: "#2F4156",
  accent: "#10B981",
  bgLight: "#F8FAFC",
  cardBg: "bg-white",
  border: "border-gray-200",
};

// HELPER GAMBAR UNTUK CEK URL STORAGE LARAVEL
const getImageUrl = (img) => {
  if (!img) return "https://via.placeholder.com/150";
  if (typeof img !== "string") return "https://via.placeholder.com/150";
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  const cleanImg = img.replace(/^storage\//, "");
  return `https://desasidodadiasri.my.id/storage/${cleanImg}`;
};

// ==========================================
// 1. KOMPONEN LAYANAN DESA (AMBIL FULL)
// ==========================================
const LayananAdminSection = () => {
  const [data, setData] = useState([]);
  const [catatan, setCatatan] = useState("");
  const [loading, setLoading] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [showCatatan, setShowCatatan] = useState(false);
  const [detail, setDetail] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_LAYANAN);
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

  const updateKeterangan = async (id, keterangan) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${API_LAYANAN}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ keterangan }),
      });

      const json = await res.json();

      if (!res.ok) {
        alert(json?.message || "Gagal menyimpan catatan");
        return;
      }

      if (detail?.id_layanan === id) {
        setDetail((d) => ({ ...d, keterangan }));
      }

      fetchData();
    } catch {
      alert("Server error saat menyimpan catatan");
    } finally {
      setUpdatingId(null);
    }
  };

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${API_LAYANAN}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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
        <div>
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
            Data Layanan Masyarakat
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Verifikasi dan kelola permohonan surat dokumen warga
          </p>
        </div>
      </div>

      <div
        className={`rounded-2xl shadow-sm border ${Theme.border} overflow-hidden ${Theme.cardBg}`}
      >
        {loading ? (
          <div className="p-12 text-center text-gray-500 font-medium">
            Memuat data...
          </div>
        ) : data.length === 0 ? (
          <div className="p-12 text-center text-gray-500 font-medium italic">
            Belum ada data pengajuan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr
                  className="text-white text-xs uppercase tracking-wider"
                  style={{ backgroundColor: Theme.primary }}
                >
                  <th className="px-4 py-3 font-semibold w-12">No</th>
                  <th className="px-4 py-3 font-semibold">Nama</th>
                  <th className="px-4 py-3 font-semibold">No. Telepon</th>
                  <th className="px-4 py-3 font-semibold">Dokumen</th>
                  <th className="px-4 py-3 font-semibold w-28">Tanggal</th>
                  <th className="px-4 py-3 font-semibold w-36">Status</th>
                  <th className="px-4 py-3 font-semibold w-36">Keterangan</th>
                  <th className="px-4 py-3 font-semibold w-32">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((l, i) => (
                  <tr
                    key={l.id_layanan}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-600 font-bold">
                      {i + 1}
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-900">
                      {l.masyarakat?.nama_lengkap}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {l.masyarakat?.no_telepon || "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-700 font-medium">
                      {l.dokumen?.nama_dokumen}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {new Date(l.tgl_pengajuan).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={l.status}
                        onChange={(e) =>
                          updateStatus(l.id_layanan, e.target.value)
                        }
                        disabled={updatingId === l.id_layanan}
                        className="text-xs font-semibold border border-gray-300 rounded-lg px-2 py-1.5 bg-white focus:ring-2 focus:ring-[#2F4156] outline-none disabled:opacity-50"
                      >
                        {statusOption.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <button
                        onClick={() => {
                          setDetail(l);
                          setCatatan(l.keterangan || "");
                          setShowCatatan(true);
                        }}
                        className="text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: Theme.primary }}
                      >
                        Catatan
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          setDetail(l);
                          setShowDetail(true);
                        }}
                        className="text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: Theme.primary }}
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

      {/* MODAL DETAIL FULL */}
      {showDetail && detail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div
            className={`${Theme.cardBg} w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border ${Theme.border}`}
          >
            <div className="sticky top-0 px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50 z-10">
              <h2 className="text-lg font-black text-gray-800 uppercase tracking-tight">
                Detail Pengajuan Layanan
              </h2>
              <button
                onClick={() => setShowDetail(false)}
                className="text-gray-400 hover:text-gray-800 p-1 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <section className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <h3 className="text-xs font-black text-[#2F4156] uppercase tracking-wider mb-3">
                  Data Masyarakat
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <p>
                    <span className="text-gray-500 font-medium">Nama</span> :{" "}
                    <strong className="text-gray-800">
                      {detail.masyarakat?.nama_lengkap}
                    </strong>
                  </p>
                  {detail.masyarakat?.no_telepon && (
                    <p>
                      <span className="text-gray-500 font-medium">
                        No. Telepon
                      </span>{" "}
                      : {detail.masyarakat.no_telepon}
                    </p>
                  )}
                  <p>
                    <span className="text-gray-500 font-medium">NIK</span> :{" "}
                    {detail.masyarakat?.nik}
                  </p>
                  <p>
                    <span className="text-gray-500 font-medium">No KK</span> :{" "}
                    {detail.masyarakat?.no_kk}
                  </p>
                  <p>
                    <span className="text-gray-500 font-medium">
                      Jenis Kelamin
                    </span>{" "}
                    : {detail.masyarakat?.jenis_kelamin}
                  </p>
                  <p className="sm:col-span-2">
                    <span className="text-gray-500 font-medium">
                      Alamat KTP
                    </span>{" "}
                    : {detail.masyarakat?.alamat_ktp || "-"}
                  </p>
                  <p className="sm:col-span-2">
                    <span className="text-gray-500 font-medium">
                      Alamat Domisili
                    </span>{" "}
                    : {detail.masyarakat?.alamat_domisili || "-"}
                  </p>
                </div>
              </section>

              <section className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <h3 className="text-xs font-black text-[#2F4156] uppercase tracking-wider mb-3">
                  Data Layanan
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <p>
                    <span className="text-gray-500 font-medium">Dokumen</span> :{" "}
                    <strong className="text-gray-800">
                      {detail.dokumen?.nama_dokumen}
                    </strong>
                  </p>
                  <p>
                    <span className="text-gray-500 font-medium">Tanggal</span> :{" "}
                    {new Date(detail.tgl_pengajuan).toLocaleDateString("id-ID")}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 font-medium">Status</span>
                    <select
                      value={detail.status}
                      onChange={(e) =>
                        updateStatus(detail.id_layanan, e.target.value)
                      }
                      disabled={updatingId === detail.id_layanan}
                      className="text-xs font-bold border border-gray-300 rounded-lg px-3 py-1.5 bg-white focus:ring-2 focus:ring-[#2F4156]"
                    >
                      {statusOption.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="w-full">
                    <span className="text-gray-500 font-medium">
                      Keterangan
                    </span>{" "}
                    : {detail.keterangan || "-"}
                  </p>
                </div>
              </section>

              {detail.dokumen?.nama_dokumen
                ?.toLowerCase()
                .includes("tidak mampu") && (
                <section className="bg-emerald-50/30 p-4 rounded-xl border border-emerald-100">
                  <h3 className="text-xs font-black text-emerald-800 uppercase tracking-wider mb-2">
                    Detail SKTM
                  </h3>
                  <p className="text-sm">
                    <span className="text-gray-500 font-medium">Tujuan</span> :{" "}
                    {detail.dokumen_sktm?.tujuan}
                  </p>
                </section>
              )}

              {detail.dokumen?.nama_dokumen?.toLowerCase().includes("akta") &&
                !detail.dokumen?.nama_dokumen
                  ?.toLowerCase()
                  .includes("keramaian") && (
                  <section className="bg-blue-50/30 p-4 rounded-xl border border-blue-100">
                    <h3 className="text-xs font-black text-blue-800 uppercase tracking-wider mb-2">
                      Detail Akta
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <p>
                        Nama Anak :{" "}
                        <strong>{detail.dokumen_akte?.nama_anak}</strong>
                      </p>
                      <p>Nama Ayah : {detail.dokumen_akte?.nama_ayah}</p>
                      <p>Nama Ibu : {detail.dokumen_akte?.nama_ibu}</p>
                      <p>Tgl Lahir Anak : {detail.dokumen_akte?.tgl_lahir}</p>
                    </div>
                  </section>
                )}

              {(detail.dokumen_keramaian || detail.dokumenKeramaian) &&
                (() => {
                  const k = detail.dokumen_keramaian || detail.dokumenKeramaian;
                  return (
                    <div className="bg-purple-50/30 p-4 rounded-xl border border-purple-100 space-y-4">
                      <h3 className="text-xs font-black text-purple-800 uppercase tracking-wider">
                        Detail Surat Izin Keramaian
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <h4 className="sm:col-span-2 font-bold text-gray-800 border-b border-purple-100 pb-1">
                          Pemilik Acara
                        </h4>
                        <p>Nama : {k.pemilik_acara_nama || "-"}</p>
                        <p>Umur : {k.umur || "-"}</p>
                        <p>Acara : {k.acara || "-"}</p>
                        <p>Jenis hiburan : {k.jenis_hiburan || "-"}</p>
                        <p>Nama hiburan : {k.nama_hiburan || "-"}</p>
                        <p>Nama pimpinan : {k.nama_pimpinan || "-"}</p>
                        <p>
                          Undang berapa orang : {k.undang_berapa_orang || "-"}
                        </p>
                        <p className="sm:col-span-2">
                          Bertempat di : {k.bertempat_di || "-"}
                        </p>

                        <h4 className="sm:col-span-2 font-bold text-gray-800 border-b border-purple-100 pb-1 mt-2">
                          Pemilik Hiburan
                        </h4>
                        <p>Nama : {k.pemilik_hiburan_nama || "-"}</p>
                        <p>Acara : {k.acara_hiburan || "-"}</p>
                        <p>Jenis hiburan : {k.jenis_hiburan_hiburan || "-"}</p>
                        <p>Nama hiburan : {k.nama_hiburan_hiburan || "-"}</p>
                        <p>Nama pimpinan : {k.nama_pimpinan_hiburan || "-"}</p>
                        <p>
                          Undang berapa orang :{" "}
                          {k.undang_berapa_orang_hiburan || "-"}
                        </p>
                        <p className="sm:col-span-2">
                          Bertempat di : {k.bertempat_di_hiburan || "-"}
                        </p>
                      </div>
                    </div>
                  );
                })()}

              {detail.dokumen?.nama_dokumen
                ?.toLowerCase()
                .includes("penghasilan") && (
                <section className="bg-amber-50/30 p-4 rounded-xl border border-amber-100">
                  {detail.dokumen_penghasilan || detail.dokumenPenghasilan ? (
                    (() => {
                      const p =
                        detail.dokumen_penghasilan || detail.dokumenPenghasilan;
                      return (
                        <div className="space-y-4">
                          <h3 className="text-xs font-black text-amber-800 uppercase tracking-wider">
                            Detail Surat Keterangan Penghasilan
                          </h3>
                          <div>
                            <h4 className="font-bold text-gray-700 mb-1 text-xs">
                              Data Wali
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              <p>Nama Lengkap : {p.nama_lengkap_wali || "-"}</p>
                              <p>NIK : {p.nik_wali || "-"}</p>
                              <p>TTL : {p.tempat_tanggal_lahir_wali || "-"}</p>
                              <p>Pekerjaan : {p.pekerjaan_wali || "-"}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-bold text-gray-700 mb-1 text-xs">
                              Data Anak
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              <p>Nama Lengkap : {p.nama_lengkap_anak || "-"}</p>
                              <p>NIK : {p.nik_anak || "-"}</p>
                              <p>TTL : {p.tempat_tanggal_lahir_anak || "-"}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-bold text-gray-700 mb-1 text-xs">
                              Informasi Penghasilan
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              <p className="sm:col-span-2">
                                Keperluan : {p.keperluan || "-"}
                              </p>
                              <p>
                                Penghasilan/Bulan :{" "}
                                <strong>
                                  {p.penghasilan_per_bulan || "-"}
                                </strong>
                              </p>
                              <p>Prodi/Jurusan : {p.jurusan_prodi || "-"}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="bg-amber-100/50 p-3 rounded-lg text-xs text-amber-800">
                      ⚠️ Data detail tidak tersedia. Pengajuan ini dibuat
                      sebelum sistem detail penghasilan diaktifkan.
                    </div>
                  )}
                </section>
              )}

              {detail.dokumen?.nama_dokumen
                ?.toLowerCase()
                .includes("nikah") && (
                <section className="bg-rose-50/30 p-4 rounded-xl border border-rose-100">
                  {detail.dokumen_nikah || detail.dokumenNikah ? (
                    (() => {
                      const n = detail.dokumen_nikah || detail.dokumenNikah;
                      return (
                        <div className="space-y-4">
                          <h3 className="text-xs font-black text-rose-800 uppercase tracking-wider">
                            Detail Surat Nikah
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
                            <h4 className="sm:col-span-2 font-bold text-gray-700">
                              Calon Pasangan
                            </h4>
                            <p>Nama : {n.calon_nama || "-"}</p>
                            <p>NIK : {n.calon_nik || "-"}</p>
                            <p>TTL : {n.calon_ttl || "-"}</p>
                            <p>Status : {n.calon_status_perkawinan || "-"}</p>
                            <p className="sm:col-span-2">
                              Alamat : {n.calon_alamat || "-"}
                            </p>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="bg-amber-100/50 p-3 rounded-lg text-xs text-amber-800">
                      ⚠️ Data detail nikah tidak tersedia.
                    </div>
                  )}
                </section>
              )}

              {detail.dokumen?.nama_dokumen
                ?.toLowerCase()
                .includes("pengantar") &&
                detail.dokumen?.nama_dokumen
                  ?.toLowerCase()
                  .includes("kartu keluarga") && (
                  <section className="bg-indigo-50/30 p-4 rounded-xl border border-indigo-100">
                    {detail.dokumen_pengantar_k_k ||
                    detail.dokumen_pengantar_kk ||
                    detail.dokumenPengantarKK ? (
                      (() => {
                        const pkk =
                          detail.dokumen_pengantar_k_k ||
                          detail.dokumen_pengantar_kk ||
                          detail.dokumenPengantarKK;
                        return (
                          <div className="space-y-3 text-xs">
                            <h3 className="text-xs font-black text-indigo-800 uppercase tracking-wider">
                              Detail Pengantar KK
                            </h3>
                            <p>
                              Kepala Keluarga :{" "}
                              <strong>{pkk.nama_kepala_keluarga || "-"}</strong>
                            </p>
                            <p>
                              Alamat : {pkk.alamat || "-"}, RT {pkk.rt || "-"},{" "}
                              {pkk.desa || "-"}
                            </p>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="bg-amber-100/50 p-3 rounded-lg text-xs text-amber-800">
                        ⚠️ Detail pengantar KK tidak tersedia.
                      </div>
                    )}
                  </section>
                )}

              {(detail.dokumen?.nama_dokumen
                ?.toLowerCase()
                .includes("ahli waris") ||
                detail.dokumen?.nama_dokumen
                  ?.toLowerCase()
                  .includes("waris")) && (
                <section className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                  {detail.dokumen_ahli_waris || detail.dokumenAhliWaris ? (
                    (() => {
                      const aw =
                        detail.dokumen_ahli_waris || detail.dokumenAhliWaris;
                      return (
                        <div className="space-y-2 text-xs">
                          <h3 className="font-black text-slate-800 uppercase">
                            Detail Ahli Waris
                          </h3>
                          <p>Pewaris : {aw.nama_pemberi_warisan || "-"}</p>
                          <p>
                            Ahli Waris Ditunjuk :{" "}
                            {aw.ahli_waris_ditunjuk || "-"}
                          </p>
                          <p>Warisan : {aw.warisan_ditinggalkan || "-"}</p>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="bg-amber-100/50 p-3 rounded-lg text-xs text-amber-800">
                      ⚠️ Detail ahli waris tidak tersedia.
                    </div>
                  )}
                </section>
              )}

              {detail.dokumen?.nama_dokumen
                ?.toLowerCase()
                .includes("kematian") && (
                <section className="bg-gray-100 p-4 rounded-xl border border-gray-200">
                  {detail.dokumen_kematian || detail.dokumenKematian ? (
                    (() => {
                      const km =
                        detail.dokumen_kematian || detail.dokumenKematian;
                      return (
                        <div className="space-y-2 text-xs">
                          <h3 className="font-black text-gray-800 uppercase">
                            Detail Surat Kematian
                          </h3>
                          <p>
                            Almarhum/ah :{" "}
                            <strong>{km.nama_almarhum || "-"}</strong>
                          </p>
                          <p>
                            Tanggal Meninggal :{" "}
                            {km.hari_tanggal_meninggal || "-"}
                          </p>
                          <p>Penyebab : {km.penyebab_meninggal || "-"}</p>
                          <p>Pelapor : {km.nama_pelapor || "-"}</p>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="bg-amber-100/50 p-3 rounded-lg text-xs text-amber-800">
                      ⚠️ Detail kematian tidak tersedia.
                    </div>
                  )}
                </section>
              )}

              {detail.dokumen?.nama_dokumen
                ?.toLowerCase()
                .includes("usaha") && (
                <section className="bg-teal-50/30 p-4 rounded-xl border border-teal-100">
                  {detail.dokumen_s_k_u ||
                  detail.dokumen_sku ||
                  detail.dokumenSKU ? (
                    (() => {
                      const s =
                        detail.dokumen_s_k_u ||
                        detail.dokumen_sku ||
                        detail.dokumenSKU;
                      return (
                        <div className="space-y-2 text-xs">
                          <h3 className="font-black text-teal-800 uppercase">
                            Detail Surat Keterangan Usaha (SKU)
                          </h3>
                          <p>
                            Nama Usaha :{" "}
                            <strong>{s.nama_instansi || "-"}</strong>
                          </p>
                          <p>
                            Jenis Kegiatan : {s.jenis_kegiatan_usaha || "-"}
                          </p>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="bg-amber-100/50 p-3 rounded-lg text-xs text-amber-800">
                      ⚠️ Detail SKU tidak tersedia.
                    </div>
                  )}
                </section>
              )}

              {detail.dokumen?.nama_dokumen
                ?.toLowerCase()
                .includes("pindah") && (
                <section className="bg-orange-50/30 p-4 rounded-xl border border-orange-100">
                  {detail.dokumen_pindah || detail.dokumenPindah ? (
                    (() => {
                      const p = detail.dokumen_pindah || detail.dokumenPindah;
                      return (
                        <div className="space-y-2 text-xs">
                          <h3 className="font-black text-orange-800 uppercase">
                            Detail Keterangan Pindah
                          </h3>
                          <p>
                            Kepala Keluarga : {p.nama_kepala_keluarga || "-"}
                          </p>
                          <p>Alasan Pindah : {p.alasan_pindah || "-"}</p>
                          <p>Alamat Tujuan : {p.alamat_tujuan || "-"}</p>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="bg-amber-100/50 p-3 rounded-lg text-xs text-amber-800">
                      ⚠️ Detail pindah tidak tersedia.
                    </div>
                  )}
                </section>
              )}
            </div>

            <div className="sticky bottom-0 px-6 py-4 border-t border-gray-100 flex justify-end bg-slate-50">
              <button
                onClick={() => setShowDetail(false)}
                className="text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                style={{ backgroundColor: Theme.primary }}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CATATAN */}
      {showCatatan && detail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div
            className={`${Theme.cardBg} w-full max-w-lg rounded-2xl shadow-2xl border ${Theme.border}`}
          >
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-base font-black text-gray-800 uppercase tracking-tight">
                Catatan Permohonan
              </h2>
              <button
                onClick={() => setShowCatatan(false)}
                className="text-gray-400 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-xs text-gray-500 font-medium">
                Berikan catatan penting jika berkas pemohon perlu perbaikan atau
                terdapat kekurangan.
              </p>
              <textarea
                rows={4}
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#2F4156] outline-none"
                placeholder="Contoh: Lampiran KTP kurang jelas, mohon diunggah ulang..."
              />
            </div>
            <div className="px-6 py-4 border-t flex justify-end gap-3 bg-gray-50/50">
              <button
                onClick={() => setShowCatatan(false)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  updateKeterangan(detail.id_layanan, catatan);
                  setShowCatatan(false);
                }}
                disabled={updatingId === detail.id_layanan}
                className="px-5 py-2 rounded-xl text-white text-xs font-bold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: Theme.primary }}
              >
                Simpan Catatan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. KOMPONEN GALERI & ARTIKEL (PERBAIKAN API & IMAGE)
// ==========================================
const ArtikelAdminSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tglPost, setTglPost] = useState("");
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_ARTIKEL);
      const json = await res.json();
      const finalData = Array.isArray(json) ? json : json.data || [];
      setData(finalData);
    } catch (e) {
      console.error("Gagal memuat data:", e);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    (item.judul_artikel || item.judul || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const openAdd = () => {
    setEditId(null);
    setJudul("");
    setDeskripsi("");
    setTglPost(new Date().toISOString().split("T")[0]);
    setImg(null);
    setPreview(null);
    setShow(true);
  };

  const openEdit = (a) => {
    setEditId(a.id_artikel || a.id);
    setJudul(a.judul_artikel || a.judul || "");
    setDeskripsi(a.deskripsi || a.isi || "");
    setTglPost(
      a.tgl_post
        ? a.tgl_post.split("T")[0]
        : a.created_at
          ? a.created_at.split("T")[0]
          : new Date().toISOString().split("T")[0],
    );
    setImg(null);
    setPreview(getImageUrl(a.img));
    setShow(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImg(file);
    setPreview(URL.createObjectURL(file));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      let response;

      // JIKA EDIT & TANPA FOTO BARU -> Kirim JSON PUT langsung (Bebas 405)
      if (editId && !img) {
        response = await fetch(`${API_ARTIKEL}/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            judul_artikel: judul,
            judul: judul,
            deskripsi: deskripsi,
            isi: deskripsi,
            tgl_post: tglPost,
            tanggal_kegiatan: tglPost,
          }),
        });
      } else {
        // TAMBAH BARU / EDIT DENGAN UPLOAD FOTO -> Gunakan FormData
        const fd = new FormData();
        fd.append("judul_artikel", judul);
        fd.append("judul", judul);
        fd.append("deskripsi", deskripsi);
        fd.append("isi", deskripsi);
        if (tglPost) {
          fd.append("tgl_post", tglPost);
          fd.append("tanggal_kegiatan", tglPost);
        }
        if (img) fd.append("img", img);

        let url = API_ARTIKEL;
        if (editId) {
          url += `/${editId}`;
          fd.append("_method", "PUT");
        }

        response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: fd,
        });
      }

      const resData = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (resData.errors) {
          const detailError = Object.values(resData.errors).flat().join("\n");
          alert(`Gagal Menyimpan Artikel:\n${detailError}`);
        } else {
          alert(resData.message || "Gagal menyimpan artikel.");
        }
        return;
      }

      setShow(false);
      fetchData();
    } catch (e) {
      alert("Terjadi kesalahan koneksi saat menyimpan artikel.");
    }
  };

  const hapus = async (id) => {
    if (!confirm("Hapus artikel/galeri ini secara permanen?")) return;
    try {
      const res = await fetch(`${API_ARTIKEL}/${id}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        fetchData();
      } else {
        alert("Gagal menghapus artikel.");
      }
    } catch (e) {
      alert("Gagal menghapus.");
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
            Galeri & <span className="text-[#2F4156]">Artikel</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Kelola publikasi berita, galeri foto, dan artikel desa
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Cari judul..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#2F4156] outline-none w-full md:w-64 shadow-xs"
          />
          <button
            onClick={openAdd}
            className="shrink-0 text-white text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-xl hover:shadow-lg transition-all active:scale-95"
            style={{ backgroundColor: Theme.primary }}
          >
            + Rilis Artikel
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2F4156] rounded-full animate-spin"></div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Sinkronisasi Data...
            </p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="p-20 text-center text-gray-400 italic font-medium">
            Tidak ada artikel yang ditemukan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className="text-[11px] uppercase tracking-wider text-white"
                  style={{ backgroundColor: Theme.primary }}
                >
                  <th className="px-6 py-4 font-black">No</th>
                  <th className="px-6 py-4 font-black">Visual</th>
                  <th className="px-6 py-4 font-black">Judul & Konten</th>
                  <th className="px-6 py-4 font-black text-center">
                    Tanggal Rilis
                  </th>
                  <th className="px-6 py-4 font-black text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredData.map((a, i) => (
                  <tr
                    key={a.id_artikel || a.id || i}
                    className="hover:bg-gray-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4 text-xs font-bold text-gray-400">
                      {(i + 1).toString().padStart(2, "0")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-20 h-14 rounded-xl overflow-hidden shadow-xs border border-gray-100 group-hover:scale-105 transition-transform">
                        <img
                          src={getImageUrl(a.img)}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <h4 className="font-bold text-gray-800 text-sm leading-tight line-clamp-1">
                        {a.judul_artikel || a.judul}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                        {a.deskripsi || a.isi}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block bg-slate-100 px-3 py-1 rounded-lg text-xs font-bold text-[#2F4156]">
                        {new Date(
                          a.tgl_post || a.created_at || Date.now(),
                        ).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openEdit(a)}
                          className="p-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white transition-all shadow-xs"
                          title="Edit Artikel"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => hapus(a.id_artikel || a.id)}
                          className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-xs"
                          title="Hapus Artikel"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL FORM EDIT & ADD */}
      <AnimatePresence>
        {show && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.form
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={submit}
              className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 md:p-8 space-y-5 relative"
            >
              <button
                type="button"
                onClick={() => setShow(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
              >
                ✕
              </button>

              <div className="border-b border-gray-100 pb-3">
                <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">
                  {editId ? "Perbarui" : "Buat"}{" "}
                  <span className="text-[#2F4156]">Artikel</span>
                </h2>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-gray-500 uppercase block mb-1">
                    Judul Artikel
                  </label>
                  <input
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    placeholder="Judul publikasi..."
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm font-semibold focus:border-[#2F4156] outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-500 uppercase block mb-1">
                    Tanggal Publikasi
                  </label>
                  <input
                    type="date"
                    value={tglPost}
                    onChange={(e) => setTglPost(e.target.value)}
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm font-semibold focus:border-[#2F4156] outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-500 uppercase block mb-1">
                    Deskripsi & Isi Konten
                  </label>
                  <textarea
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Tulis deskripsi atau isi publikasi secara rinci..."
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm h-36 resize-none font-medium focus:border-[#2F4156] outline-none transition-all leading-relaxed"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-500 uppercase block mb-1">
                    Foto / Sampul Artikel
                  </label>
                  <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-[#2F4156] transition-all cursor-pointer bg-gray-50/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {preview ? (
                      <img
                        src={preview}
                        alt=""
                        className="w-full max-h-48 object-cover rounded-lg shadow-xs"
                      />
                    ) : (
                      <div className="py-6 space-y-1">
                        <p className="text-xl">📸</p>
                        <p className="text-xs font-bold text-gray-400 uppercase">
                          Klik untuk upload foto
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShow(false)}
                  className="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-gray-400 hover:bg-gray-50 rounded-xl transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-[2] text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:shadow-lg active:scale-95 transition-all"
                  style={{ backgroundColor: Theme.primary }}
                >
                  {editId ? "Simpan Perubahan" : "Publikasikan"}
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// 3. KOMPONEN PENGUMUMAN (DENGAN PENYESUAIAN PAYLOAD DUAL-FIELD)
// ==========================================
const PengumumanAdminSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [tglPengumuman, setTglPengumuman] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_PENGUMUMAN);
      const json = await res.json();
      const finalData = Array.isArray(json) ? json : json.data || [];
      setData(finalData);
    } catch (e) {
      console.error("Gagal memuat pengumuman:", e);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    (item.judul_pengumuman || item.judul || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const openAdd = () => {
    setJudul("");
    setIsi("");
    setTglPengumuman(new Date().toISOString().split("T")[0]);
    setShow(true);
  };

  const submit = async (e) => {
    e.preventDefault();

    // Payload dikirim lengkap dalam 2 format agar Lolos Validasi Laravel
    const payload = {
      judul: judul,
      judul_pengumuman: judul,
      isi: isi,
      isi_pengumuman: isi,
      status: "aktif",
      tanggal_kegiatan: tglPengumuman,
      tgl_pengumuman: tglPengumuman,
    };

    try {
      const response = await fetch(API_PENGUMUMAN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (resData.errors) {
          const detailError = Object.values(resData.errors).flat().join("\n");
          alert(`Gagal Menambah Pengumuman:\n${detailError}`);
        } else {
          alert(resData.message || "Gagal menambah pengumuman");
        }
        return;
      }

      setShow(false);
      fetchData();
    } catch (e) {
      alert("Terjadi kesalahan koneksi saat menambah pengumuman.");
    }
  };

  const hapus = async (id) => {
    if (!confirm("Hapus pengumuman ini dari tampilan depan?")) return;
    try {
      const res = await fetch(`${API_PENGUMUMAN}/${id}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        fetchData();
      } else {
        alert("Gagal menghapus pengumuman dari server.");
      }
    } catch (e) {
      alert("Gagal menghapus pengumuman.");
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
            Kelola <span className="text-[#2F4156]">Pengumuman</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Pengumuman penting yang akan dipublikasikan di halaman depan web
            desa
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Cari pengumuman..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-[#2F4156] outline-none w-full md:w-64 shadow-xs"
          />
          <button
            onClick={openAdd}
            className="shrink-0 text-white text-xs font-black uppercase tracking-widest px-5 py-2.5 rounded-xl hover:shadow-lg transition-all active:scale-95"
            style={{ backgroundColor: Theme.primary }}
          >
            + Buat Pengumuman
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-full p-12 text-center text-gray-400 font-medium">
            Memuat data pengumuman...
          </div>
        ) : filteredData.length === 0 ? (
          <div className="col-span-full p-12 text-center text-gray-400 font-medium italic bg-white rounded-2xl border border-gray-100">
            Belum ada pengumuman yang ditambahkan.
          </div>
        ) : (
          filteredData.map((p, i) => (
            <div
              key={p.id_pengumuman || p.id || i}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                    📌{" "}
                    {new Date(
                      p.tgl_pengumuman ||
                        p.tanggal_kegiatan ||
                        p.created_at ||
                        Date.now(),
                    ).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    onClick={() => hapus(p.id_pengumuman || p.id)}
                    className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    title="Hapus Pengumuman"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
                <h3 className="font-bold text-gray-800 text-base mb-2 leading-snug">
                  {p.judul_pengumuman || p.judul}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                  {p.isi_pengumuman || p.isi}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL FORM TAMBAH PENGUMUMAN */}
      <AnimatePresence>
        {show && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.form
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={submit}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 space-y-4 relative"
            >
              <button
                type="button"
                onClick={() => setShow(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-black transition-colors"
              >
                ✕
              </button>

              <div className="border-b border-gray-100 pb-3">
                <h2 className="text-lg font-black text-gray-800 uppercase tracking-tight">
                  Buat <span className="text-[#2F4156]">Pengumuman Baru</span>
                </h2>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-gray-500 uppercase block mb-1">
                    Judul Pengumuman
                  </label>
                  <input
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    placeholder="Tulis judul pengumuman..."
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm font-semibold focus:border-[#2F4156] outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-500 uppercase block mb-1">
                    Tanggal Pengumuman
                  </label>
                  <input
                    type="date"
                    value={tglPengumuman}
                    onChange={(e) => setTglPengumuman(e.target.value)}
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm font-semibold focus:border-[#2F4156] outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-500 uppercase block mb-1">
                    Isi Pengumuman
                  </label>
                  <textarea
                    value={isi}
                    onChange={(e) => setIsi(e.target.value)}
                    placeholder="Pesan pengumuman lengkap..."
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-2.5 text-sm h-32 resize-none font-medium focus:border-[#2F4156] outline-none transition-all leading-relaxed"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShow(false)}
                  className="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-gray-400 hover:bg-gray-50 rounded-xl transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-[2] text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:shadow-lg active:scale-95 transition-all"
                  style={{ backgroundColor: Theme.primary }}
                >
                  Terbitkan
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// MAIN DASHBOARD LAYOUT WITH HAMBURGER MENU
// ==========================================
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("layanan");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: "layanan", label: "1. Layanan Desa", icon: "📄" },
    { id: "artikel", label: "2. Galeri & Artikel", icon: "🖼️" },
    { id: "pengumuman", label: "3. Pengumuman", icon: "📢" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-gray-800">
      {/* TOP HEADER / NAVBAR */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            {/* HAMBURGER BUTTON */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
              title="Toggle Sidebar Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xl">🏛️</span>
              <span className="font-black text-lg uppercase tracking-tight text-[#2F4156]">
                Admin Panel Desa
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
              Status: Online
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* SIDEBAR NAVIGATION */}
        <aside
          className={`bg-white border-r border-gray-200 w-64 shrink-0 transition-all duration-300 z-20 ${
            sidebarOpen
              ? "translate-x-0 block"
              : "-translate-x-full hidden md:block md:w-20"
          }`}
        >
          <div className="p-4 space-y-2">
            <div className="px-3 py-2 text-[10px] font-black uppercase text-gray-400 tracking-wider">
              {sidebarOpen ? "Navigasi Utama" : "Menu"}
            </div>
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? "text-white shadow-md scale-[1.02]"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                  style={{
                    backgroundColor: isActive ? Theme.primary : "transparent",
                  }}
                >
                  <span className="text-base">{item.icon}</span>
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>
        </aside>

        {/* MAIN VIEWPORT */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {activeTab === "layanan" && <LayananAdminSection />}
            {activeTab === "artikel" && <ArtikelAdminSection />}
            {activeTab === "pengumuman" && <PengumumanAdminSection />}
          </div>
        </main>
      </div>
    </div>
  );
}
