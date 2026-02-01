import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000/api/pengumuman";
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openCreate = () => {
    setEditing(null);
    setForm({
      judul: "",
      isi: "",
      tanggal_kegiatan: "",
      status: "aktif",
    });
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditing(item.id_pengumuman);
    setForm({
      judul: item.judul,
      isi: item.isi,
      tanggal_kegiatan: item.tanggal_kegiatan ?? "",
      status: item.status,
    });
    setShowForm(true);
  };

  // ================= SAVE =================
  const submit = async (e) => {
    e.preventDefault();

    const method = editing ? "PUT" : "POST";
    const url = editing ? `${API}/${editing}` : API;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Gagal menyimpan pengumuman");
        return;
      }

      setShowForm(false);
      fetchData();
    } catch (e) {
      alert("Server error");
    }
  };

  // ================= DELETE =================
  const remove = async (id) => {
    if (!confirm("Yakin ingin menghapus pengumuman ini?")) return;

    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchData();
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
          className="px-4 py-2 rounded-lg text-white text-sm font-medium"
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
          <div className="p-8 text-center text-gray-500">Belum ada pengumuman.</div>
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
                <tr key={p.id_pengumuman} className="border-t">
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
                      className="px-3 py-1 text-sm rounded bg-blue-600 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(p.id_pengumuman)}
                      className="px-3 py-1 text-sm rounded text-white"
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

            <input
              name="judul"
              value={form.judul}
              onChange={handleChange}
              placeholder="Judul Pengumuman"
              className="w-full border rounded px-3 py-2"
              required
            />

            <textarea
              name="isi"
              value={form.isi}
              onChange={handleChange}
              placeholder="Isi Pengumuman"
              className="w-full border rounded px-3 py-2 min-h-[120px]"
              required
            />

            <input
              type="date"
              name="tanggal_kegiatan"
              value={form.tanggal_kegiatan}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Nonaktif</option>
            </select>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded border"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded text-white"
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
