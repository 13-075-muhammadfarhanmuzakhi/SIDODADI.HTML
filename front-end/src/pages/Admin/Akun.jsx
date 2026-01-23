import { useEffect, useState } from "react";

const API = "http://127.0.0.1:8000/api/admin";

const Akun = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    nama: "",
    nik: "",
    username: "",
    password: "",
    no_telp: "",
    level: "",
  });

  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);

  // ================= FETCH =================
  const fetchData = async () => {
    const res = await fetch(API);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= FORM =================
  const openAdd = () => {
    setEditId(null);
    setForm({
      nama: "",
      nik: "",
      username: "",
      password: "",
      no_telp: "",
      level: "Admin",
    });
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
    setPreview(
      a.foto ? `http://127.0.0.1:8000/admin/${a.foto}` : null
    );
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

    await fetch(url, { method: "POST", body: fd });

    setShow(false);
    fetchData();
  };

  const hapus = async (id) => {
    if (!confirm("Hapus admin?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Data Admin</h1>
        <button
          onClick={openAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Tambah Admin
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <table className="w-full bg-white border">
        <thead className="bg-slate-200">
          <tr>
            <th className="p-2 border">No</th>
            <th className="p-2 border">Foto</th>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">NIK</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">No Telp</th>
            <th className="p-2 border">Level</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a, i) => (
            <tr key={a.id_admin}>
              <td className="p-2 border text-center">{i + 1}</td>
              <td className="p-2 border text-center">
                <img
                  src={
                    a.foto
                      ? `http://127.0.0.1:8000/admin/${a.foto}`
                      : "https://via.placeholder.com/60"
                  }
                  className="w-14 h-14 rounded object-cover mx-auto"
                />
              </td>
              <td className="p-2 border">{a.nama}</td>
              <td className="p-2 border text-center">{a.nik}</td>
              <td className="p-2 border">{a.username}</td>
              <td className="p-2 border">{a.no_telp || "-"}</td>
              <td className="p-2 border text-center">{a.level}</td>
              <td className="p-2 border text-center space-x-2">
                <button
                  onClick={() => openEdit(a)}
                  className="bg-yellow-500 px-3 py-1 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => hapus(a.id_admin)}
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
            className="bg-white p-6 w-[520px] space-y-3 rounded"
          >
            <h2 className="font-bold text-lg">
              {editId ? "Edit" : "Tambah"} Admin
            </h2>

            <input
              placeholder="Nama"
              value={form.nama}
              onChange={(e) =>
                setForm({ ...form, nama: e.target.value })
              }
              className="w-full border p-2"
              required
            />

            <input
              placeholder="NIK (16 digit)"
              value={form.nik}
              onChange={(e) =>
                setForm({ ...form, nik: e.target.value })
              }
              className="w-full border p-2"
              maxLength={16}
              required
            />

            <input
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              className="w-full border p-2"
              required
            />

            <input
              type="password"
              placeholder={
                editId ? "Password (kosongkan jika tidak diubah)" : "Password"
              }
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full border p-2"
            />

            <input
              placeholder="No Telp"
              value={form.no_telp}
              onChange={(e) =>
                setForm({ ...form, no_telp: e.target.value })
              }
              className="w-full border p-2"
            />

            <select
              value={form.level}
              onChange={(e) =>
                setForm({ ...form, level: e.target.value })
              }
              className="w-full border p-2"
            >
              <option value="Admin">Admin</option>
              <option value="Operator">Operator</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setFoto(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />

            {preview && (
              <img
                src={preview}
                className="w-24 h-24 rounded object-cover"
              />
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShow(false)}>
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

export default Akun;
