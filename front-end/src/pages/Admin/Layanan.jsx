import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000/api/layanan";

const LayananAdmin = () => {
  const [data, setData] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState(null);

  const fetchData = async () => {
    const res = await fetch(API);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Data Layanan Masyarakat</h1>

      <table className="w-full bg-white border">
        <thead className="bg-slate-200">
          <tr>
            <th className="border p-2">No</th>
            <th className="border p-2">Nama</th>
            <th className="border p-2">NIK</th>
            <th className="border p-2">Dokumen</th>
            <th className="border p-2">Tanggal</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((l, i) => (
            <tr key={l.id_layanan}>
              <td className="border p-2 text-center">{i + 1}</td>
              <td className="border p-2">{l.masyarakat?.nama_lengkap}</td>
              <td className="border p-2">{l.masyarakat?.nik}</td>
              <td className="border p-2">{l.dokumen?.nama_dokumen}</td>
              <td className="border p-2 text-center">
                {new Date(l.tgl_pengajuan).toLocaleDateString("id-ID")}
              </td>
              <td className="border p-2 text-center">{l.status}</td>
              <td className="border p-2 text-center space-x-2">
                <button
                  onClick={() => {
                    setDetail(l);
                    setShowDetail(true);
                  }}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Detail
                </button>

                <select
                  value={l.status}
                  onChange={(e) => updateStatus(l.id_layanan, e.target.value)}
                  className="border px-2 py-1"
                >
                  <option>Dalam Proses</option>
                  <option>Terkirim</option>
                  <option>Selesai</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= MODAL DETAIL ================= */}
      {showDetail && detail && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[600px] rounded p-6 space-y-4">
            <h2 className="text-xl font-bold">Detail Pengajuan Layanan</h2>

            {/* DATA MASYARAKAT */}
            <div>
              <h3 className="font-semibold mb-1">Data Masyarakat</h3>
              <p>Nama : {detail.masyarakat?.nama_lengkap}</p>
              <p>NIK : {detail.masyarakat?.nik}</p>
              <p>No KK : {detail.masyarakat?.no_kk}</p>
              <p>Jenis Kelamin : {detail.masyarakat?.jenis_kelamin}</p>
              <p>Alamat KTP : {detail.masyarakat?.alamat_ktp}</p>
              <p>Alamat Domisili : {detail.masyarakat?.alamat_domisili}</p>
            </div>

            {/* DATA LAYANAN */}
            <div>
              <h3 className="font-semibold mb-1">Data Layanan</h3>
              <p>Dokumen : {detail.dokumen?.nama_dokumen}</p>
              <p>Status : {detail.status}</p>
              <p>
                Tanggal :{" "}
                {new Date(detail.tgl_pengajuan).toLocaleDateString("id-ID")}
              </p>
            </div>

            {/* SKTM */}
            {detail.dokumen?.nama_dokumen?.toLowerCase().includes("tidak mampu") && (
              <div>
                <h3 className="font-semibold mb-1">Detail SKTM</h3>
                <p>Tujuan : {detail.dokumen_sktm?.tujuan}</p>
              </div>
            )}

            {/* AKTA */}
            {detail.dokumen?.nama_dokumen?.toLowerCase().includes("akta") && (
              <div>
                <h3 className="font-semibold mb-1">Detail Akta</h3>
                <p>Nama Anak : {detail.dokumen_akte?.nama_anak}</p>
                <p>Nama Ayah : {detail.dokumen_akte?.nama_ayah}</p>
                <p>Nama Ibu : {detail.dokumen_akte?.nama_ibu}</p>
                <p>Tgl Lahir Anak : {detail.dokumen_akte?.tgl_lahir}</p>
              </div>
            )}

            <div className="text-right">
              <button
                onClick={() => setShowDetail(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LayananAdmin;
