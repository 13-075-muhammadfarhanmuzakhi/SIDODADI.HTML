import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Untuk transisi halus

const API = "http://127.0.0.1:8000/api/artikel";
const Warna = { primary: "#2F4156", accent: "#10b981" };

const Artikel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Fitur Pencarian

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const json = await res.json();
      // Mengambil data dari properti 'data' jika backend menggunakan Resource
      const finalData = Array.isArray(json) ? json : (json.data || []);
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

  // Filter artikel berdasarkan pencarian judul
  const filteredData = data.filter(item => 
    item.judul_artikel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAdd = () => {
    setEditId(null); setJudul(""); setDeskripsi(""); setImg(null); setPreview(null); setShow(true);
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
      const response = await fetch(url, { method: "POST", body: fd });
      if (!response.ok) throw new Error("Gagal menyimpan");
      setShow(false);
      fetchData();
    } catch (e) {
      alert(e.message);
    }
  };

  const hapus = async (id) => {
    if (!confirm("Hapus artikel ini secara permanen?")) return;
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchData();
    } catch (e) {
      alert("Gagal menghapus.");
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Media & <span className="text-[#2F4156]">Artikel</span></h1>
          <p className="text-xs text-gray-500 font-medium">Kelola publikasi dan informasi Desa Sidodadi Asri</p>
        </div>
        
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Cari judul..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[#2F4156] outline-none w-full md:w-64 shadow-sm"
          />
          <button onClick={openAdd} className="shrink-0 text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:shadow-lg transition-all active:scale-95" style={{ backgroundColor: Warna.primary }}>
            + Baru
          </button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-[#2F4156] rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Sinkronisasi Data...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="p-20 text-center text-gray-400 italic font-serif">Tidak ada artikel yang ditemukan.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.2em] text-white" style={{ backgroundColor: Warna.primary }}>
                  <th className="px-6 py-4 font-black">No</th>
                  <th className="px-6 py-4 font-black">Visual</th>
                  <th className="px-6 py-4 font-black">Konten Utama</th>
                  <th className="px-6 py-4 font-black text-center">Waktu Rilis</th>
                  <th className="px-6 py-4 font-black text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredData.map((a, i) => (
                  <tr key={a.id_artikel} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-4 text-xs font-bold text-gray-400">{(i + 1).toString().padStart(2, '0')}</td>
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md border-2 border-white group-hover:scale-105 transition-transform">
                        <img src={a.img ? `http://127.0.0.1:8000/artikel/${a.img}` : "https://via.placeholder.com/150"} alt="" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <h4 className="font-black text-gray-800 text-sm leading-tight line-clamp-1">{a.judul_artikel}</h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2 italic font-serif">{(a.deskripsi || "").slice(0, 100)}...</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex flex-col bg-gray-100 px-3 py-1.5 rounded-xl">
                        <span className="text-[10px] font-black text-[#2F4156]">
                          {new Date(a.tgl_post).toLocaleDateString("id-ID", { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                        {/* Menampilkan JAM agar tidak tertimpa secara visual */}
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                          {new Date(a.tgl_post).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })} WIB
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => openEdit(a)} className="p-2.5 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white transition-all shadow-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button onClick={() => hapus(a.id_artikel)} className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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

      {/* MODAL FORM */}
      <AnimatePresence>
        {show && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <motion.form 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onSubmit={submit} 
              className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl p-8 md:p-10 space-y-6 relative"
            >
              <button type="button" onClick={() => setShow(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors">✕</button>
              
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">
                  {editId ? "Perbarui" : "Rilis"} <span className="text-[#2F4156]">Artikel</span>
                </h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Judul Artikel</label>
                  <input value={judul} onChange={(e) => setJudul(e.target.value)} placeholder="Tulis judul yang menarik..." className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold focus:border-[#2F4156] outline-none transition-all" required />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Deskripsi Lengkap</label>
                  <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} placeholder="Ceritakan detail kegiatannya..." className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-sm h-48 resize-none font-medium focus:border-[#2F4156] outline-none transition-all leading-relaxed" required />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Visual Dokumentasi</label>
                  <div className="relative group border-2 border-dashed border-gray-200 rounded-[2rem] p-4 text-center hover:border-[#2F4156] transition-all cursor-pointer">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    {preview ? (
                      <img src={preview} alt="" className="w-full max-h-60 object-cover rounded-2xl" />
                    ) : (
                      <div className="py-10 space-y-2">
                        <div className="text-2xl">📸</div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Klik untuk pilih gambar</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShow(false)} className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 rounded-2xl transition-all">Batal</button>
                <button type="submit" className="flex-[2] text-white py-4 rounded-2xl text-xs font-black uppercase tracking-[0.3em] hover:shadow-xl active:scale-95 transition-all" style={{ backgroundColor: Warna.primary }}>
                  {editId ? "Simpan Perubahan" : "Publikasikan Sekarang"}
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Artikel;