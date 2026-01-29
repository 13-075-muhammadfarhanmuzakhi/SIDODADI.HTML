import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000/api/artikel";
const Warna = { primary: "#2F4156" };

const Artikel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [img, setImg] = useState(null);
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
    setJudul("");
    setDeskripsi("");
    setImg(null);
    setPreview(null);
    setShow(true);
  };

  const openEdit = (a) => {
    setEditId(a.id_artikel);
    setJudul(a.judul_artikel);
    setDeskripsi(a.deskripsi);
    setImg(null);
    setPreview(a.img ? `http://127.0.0.1:8000/artikel/${a.img}` : null);
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
    const fd = new FormData();
    fd.append("judul_artikel", judul);
    fd.append("deskripsi", deskripsi);
    if (img) fd.append("img", img);

    let url = API;
    if (editId) {
      url += `/${editId}`;
      fd.append("_method", "PUT");
    }

    try {
      await fetch(url, { method: "POST", body: fd });
      setShow(false);
      fetchData();
    } catch (e) {
      alert("Gagal menyimpan.");
    }
  };

  const hapus = async (id) => {
    if (!confirm("Hapus artikel ini?")) return;
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
        <h1 className="text-xl font-bold text-gray-800">Media & Artikel</h1>
        <button onClick={openAdd} className="text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:opacity-90" style={{ backgroundColor: Warna.primary }}>
          + Tambah Artikel
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Memuat data...</div>
        ) : data.length === 0 ? (
          <div className="p-12 text-center text-gray-500">Belum ada artikel.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-white" style={{ backgroundColor: Warna.primary }}>
                  <th className="px-4 py-3 font-semibold w-12">No</th>
                  <th className="px-4 py-3 font-semibold w-24">Gambar</th>
                  <th className="px-4 py-3 font-semibold">Judul</th>
                  <th className="px-4 py-3 font-semibold">Deskripsi</th>
                  <th className="px-4 py-3 font-semibold w-28">Tanggal</th>
                  <th className="px-4 py-3 font-semibold w-36">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((a, i) => (
                  <tr key={a.id_artikel} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-gray-600">{i + 1}</td>
                    <td className="px-4 py-3">
                      <img src={a.img ? `http://127.0.0.1:8000/artikel/${a.img}` : "https://via.placeholder.com/80"} alt="" className="w-16 h-16 rounded-lg object-cover" />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{a.judul_artikel}</td>
                    <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{(a.deskripsi || "").slice(0, 60)}...</td>
                    <td className="px-4 py-3 text-gray-600">{new Date(a.tgl_post).toLocaleDateString("id-ID")}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <button onClick={() => openEdit(a)} className="text-amber-700 bg-amber-100 hover:bg-amber-200 text-sm font-medium px-3 py-1.5 rounded-lg">Edit</button>
                      <button onClick={() => hapus(a.id_artikel)} className="text-red-700 bg-red-100 hover:bg-red-200 text-sm font-medium px-3 py-1.5 rounded-lg">Hapus</button>
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
          <form onSubmit={submit} className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-800">{editId ? "Edit" : "Tambah"} Artikel</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
              <input value={judul} onChange={(e) => setJudul(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm h-40 resize-y" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gambar</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm" />
              {preview && <img src={preview} alt="" className="mt-2 w-full max-h-64 object-cover rounded-lg border border-gray-200" />}
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

export default Artikel;
