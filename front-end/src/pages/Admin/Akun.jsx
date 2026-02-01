import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000/api/admin";
const Warna = { primary: "#2F4156" };

const Akun = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    nama: "",
    nik: "",
    username: "",
    password: "",
    no_telp: "",
    level: "Admin",
  });
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);

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

  const openAdd = () => {
    setEditId(null);
    setForm({ nama: "", nik: "", username: "", password: "", no_telp: "", level: "Admin" });
    setFoto(null);
    setPreview(null);
    setShow(true);
  };

  const openEdit = (a) => {
    setEditId(a.id_admin);
    setForm({
      nama: a.nama,
      nik: a.nik,
      username: a.username,
      password: "",
      no_telp: a.no_telp || "",
      level: a.level,
    });
    setPreview(a.foto ? `http://127.0.0.1:8000/admin/${a.foto}` : null);
    setFoto(null);
    setShow(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v !== "") fd.append(k, v);
    });
    if (foto) fd.append("foto", foto);

    let url = API;
    if (editId) {
      url += `/${editId}`;
      fd.append("_method", "PUT");
    }

    try {
      const res = await fetch(url, { method: "POST", body: fd });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err?.message || "Gagal menyimpan");
        return;
      }
      setShow(false);
      fetchData();
    } catch (e) {
      alert("Gagal menyimpan. Periksa koneksi ke backend.");
    }
  };

  const hapus = async (id) => {
    if (!confirm("Yakin hapus admin ini?")) return;
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchData();
    } catch (e) {
      alert("Gagal menghapus.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Data Admin</h1>
        <button
          onClick={openAdd}
          className="text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:opacity-90"
          style={{ backgroundColor: Warna.primary }}
        >
          + Tambah Admin
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Memuat data...</div>
        ) : data.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            Belum ada data admin. Klik &quot;+ Tambah Admin&quot; atau jalankan seeder:{" "}
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">php artisan db:seed --class=AdminSeeder</code>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-white" style={{ backgroundColor: Warna.primary }}>
                  <th className="px-4 py-3 font-semibold w-12">No</th>
                  <th className="px-4 py-3 font-semibold w-16">Foto</th>
                  <th className="px-4 py-3 font-semibold">Nama</th>
                  <th className="px-4 py-3 font-semibold">NIK</th>
                  <th className="px-4 py-3 font-semibold">Username</th>
                  <th className="px-4 py-3 font-semibold">No Telp</th>
                  <th className="px-4 py-3 font-semibold w-24">Level</th>
                  <th className="px-4 py-3 font-semibold w-36">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((a, i) => (
                  <tr key={a.id_admin} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-gray-600">{i + 1}</td>
                    <td className="px-4 py-3">
                      <img
                        src={a.foto ? `http://127.0.0.1:8000/admin/${a.foto}` : "https://ui-avatars.com/api/?name=" + encodeURIComponent(a.nama || "A")}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{a.nama}</td>
                    <td className="px-4 py-3 text-gray-700">{a.nik}</td>
                    <td className="px-4 py-3 text-gray-700">{a.username}</td>
                    <td className="px-4 py-3 text-gray-600">{a.no_telp || "-"}</td>
                    <td className="px-4 py-3 text-gray-600">{a.level}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={() => openEdit(a)} className="text-amber-700 bg-amber-100 hover:bg-amber-200 text-sm font-medium px-3 py-1.5 rounded-lg">Edit</button>
                      <button onClick={() => hapus(a.id_admin)} className="text-red-700 bg-red-100 hover:bg-red-200 text-sm font-medium px-3 py-1.5 rounded-lg">Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form onSubmit={submit} className="bg-white w-full max-w-md rounded-xl shadow-xl border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-800">{editId ? "Edit" : "Tambah"} Admin</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
              <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Nama lengkap" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">NIK (16 digit)</label>
              <input value={form.nik} onChange={(e) => setForm({ ...form, nik: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" maxLength={16} placeholder="NIK" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Username" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{editId ? "Password (kosongkan jika tidak diubah)" : "Password"}</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Password" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No Telp</label>
              <input value={form.no_telp} onChange={(e) => setForm({ ...form, no_telp: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="No telepon" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option value="Admin">Admin</option>
                <option value="Operator">Operator</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
              <input type="file" accept="image/*" onChange={(e) => { setFoto(e.target.files?.[0]); setPreview(e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : null); }} className="w-full text-sm" />
              {preview && <img src={preview} alt="" className="mt-2 w-24 h-24 rounded-lg object-cover border border-gray-200" />}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShow(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">Batal</button>
              <button type="submit" className="text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90" style={{ backgroundColor: Warna.primary }}>Simpan</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Akun;
