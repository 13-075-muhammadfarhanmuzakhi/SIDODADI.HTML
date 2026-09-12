import { useEffect, useState } from "react";

const API = "https://desasidodadiasri.my.id/api/pengumuman";
const Warna = {
  primary: "#2F4156",
  danger: "#DC2626",
};

const PengumumanAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    judul: "",
    isi: "",
    tanggal_kegiatan: "",
    status: "aktif",
  });

  // ================= FETCH DATA =================
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } catch (e) {
      console.error(e);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= HANDLE FORM =================
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openCreate = () => {
    setEditing(null);
    setForm({
      judul: "",
      isi: "",
      tanggal_kegiatan: new Date().toISOString().split("T")[0],
      status: "aktif",
    });
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditing(item.id_pengumuman || item.id);
    setForm({
      judul: item.judul || "",
      isi: item.isi || "",
      tanggal_kegiatan: item.tanggal_kegiatan
        ? item.tanggal_kegiatan.split("T")[0]
        : new Date().toISOString().split("T")[0],
      status: item.status || "aktif",
    });
    setShowForm(true);
  };

  // ================= SAVE =================
  const submit = async (e) => {
    e.preventDefault();

    const method = editing ? "PUT" : "POST";
    const url = editing ? `${API}/${editing}` : API;

    // Pastikan data terisi dengan bersih sebelum dikirim ke Laravel
    const payload = {
      judul: form.judul.trim(),
      isi: form.isi.trim(),
      tanggal_kegiatan:
        form.tanggal_kegiatan || new Date().toISOString().split("T")[0],
      status: form.status || "aktif",
    };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();

      if (!res.ok) {
        // Tampilkan rincian spesifik jika validasi Laravel menolak
        if (resData.errors) {
          const detailError = Object.values(resData.errors).flat().join("\n");
          alert(`Gagal Menyimpan:\n${detailError}`);
        } else {
          alert(resData.message || "Gagal menyimpan pengumuman");
        }
        return;
      }

      setShowForm(false);
      fetchData();
    } catch (e) {
      alert("Terjadi kesalahan koneksi ke server.");
    }
  };

  // ================= DELETE =================
  const remove = async (id) => {
    if (!confirm("Yakin ingin menghapus pengumuman ini?")) return;

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        fetchData();
      } else {
        alert("Gagal menghapus pengumuman dari server.");
      }
    } catch (e) {
      alert("Gagal menghapus data");
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Pengumuman Desa</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition"
          style={{ backgroundColor: Warna.primary }}
        >
          + Tambah Pengumuman
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat data...</div>
        ) : data.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Belum ada pengumuman.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">No</th>
                <th className="p-3 text-left">Judul</th>
                <th className="p-3 text-left">Tanggal Kegiatan</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p, i) => (
                <tr key={p.id_pengumuman || p.id || i} className="border-t">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3 font-medium">{p.judul}</td>
                  <td className="p-3">
                    {p.tanggal_kegiatan
                      ? new Date(p.tanggal_kegiatan).toLocaleDateString("id-ID")
                      : "-"}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        p.status === "aktif"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(p.id_pengumuman || p.id)}
                      className="px-3 py-1 text-sm rounded text-white hover:opacity-90 transition"
                      style={{ backgroundColor: Warna.danger }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={submit}
            className="bg-white w-full max-w-xl rounded-xl shadow-xl p-6 space-y-4"
          >
            <h2 className="text-lg font-bold">
              {editing ? "Edit Pengumuman" : "Tambah Pengumuman"}
            </h2>

            <div>
              <label className="block text-xs font-semibold mb-1 text-gray-600">
                Judul Pengumuman
              </label>
              <input
                name="judul"
                value={form.judul}
                onChange={handleChange}
                placeholder="Judul Pengumuman"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-gray-600">
                Isi Pengumuman
              </label>
              <textarea
                name="isi"
                value={form.isi}
                onChange={handleChange}
                placeholder="Isi Pengumuman"
                className="w-full border rounded px-3 py-2 min-h-[120px]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-gray-600">
                Tanggal Kegiatan
              </label>
              <input
                type="date"
                name="tanggal_kegiatan"
                value={form.tanggal_kegiatan}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-gray-600">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="aktif">Aktif</option>
                <option value="nonaktif">Nonaktif</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded border hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded text-white hover:opacity-90 transition"
                style={{ backgroundColor: Warna.primary }}
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PengumumanAdmin;
