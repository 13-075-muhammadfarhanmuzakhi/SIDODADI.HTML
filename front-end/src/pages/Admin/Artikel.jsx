import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000/api/artikel";

const Artikel = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);

  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchData = async () => {
    const res = await fetch(API);
    const json = await res.json();
    setData(json);
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
    setPreview(
      a.img ? `http://127.0.0.1:8000/artikel/${a.img}` : null
    );
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

    await fetch(url, { method: "POST", body: fd });

    setShow(false);
    fetchData();
  };

  const hapus = async (id) => {
    if (!confirm("Hapus artikel?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Artikel</h1>
        <button
          onClick={openAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Tambah
        </button>
      </div>

      <table className="w-full bg-white border">
        <thead className="bg-slate-200">
          <tr>
            <th className="p-2 border">Judul</th>
            <th className="p-2 border">Deskripsi</th>
            <th className="p-2 border">Tanggal</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a) => (
            <tr key={a.id_artikel}>
              <td className="p-2 border font-semibold">
                {a.judul_artikel}
              </td>
              <td className="p-2 border">
                {a.deskripsi.slice(0, 60)}...
              </td>
              <td className="p-2 border text-center">
                {new Date(a.tgl_post).toLocaleDateString("id-ID")}
              </td>
              <td className="p-2 border text-center space-x-2">
                <button
                  onClick={() => openEdit(a)}
                  className="bg-yellow-500 px-3 py-1 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => hapus(a.id_artikel)}
                  className="bg-red-600 px-3 py-1 text-white rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= MODAL ================= */}
      {show && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <form
            onSubmit={submit}
            className="bg-white p-6 w-96 space-y-3 rounded"
          >
            <h2 className="font-bold text-lg">
              {editId ? "Edit" : "Tambah"} Artikel
            </h2>

            <input
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Judul"
              className="w-full border p-2"
              required
            />

            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Deskripsi"
              className="w-full border p-2"
              required
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {/* PREVIEW GAMBAR */}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-40 object-cover rounded border"
              />
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShow(false)}
                className="px-4 py-1 border rounded"
              >
                Batal
              </button>
              <button className="bg-blue-600 text-white px-4 py-1 rounded">
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Artikel;
