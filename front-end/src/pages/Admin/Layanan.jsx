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
                  <th className="px-4 py-3 font-semibold">NIK</th>
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
                    <td className="px-4 py-3 text-gray-700">{l.masyarakat?.nik}</td>
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
