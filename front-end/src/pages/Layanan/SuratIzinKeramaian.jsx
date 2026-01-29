import { useState } from "react";
import { Link } from "react-router-dom";

const API = "http://127.0.0.1:8000/api/layanan/keramaian";

const SuratIzinKeramaian = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    pemilik_acara_nama: "",
    umur: "",
    acara: "",
    jenis_hiburan: "",
    nama_hiburan: "",
    nama_pimpinan: "",
    undang_berapa_orang: "",
    bertempat_di: "",
    nama: "",
    nomer_telepon: "",
    pemilik_hiburan_nama: "",
    acara_hiburan: "",
    jenis_hiburan_hiburan: "",
    nama_hiburan_hiburan: "",
    nama_pimpinan_hiburan: "",
    undang_berapa_orang_hiburan: "",
    bertempat_di_hiburan: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.append("nama", form.nama);
    fd.append("nomer_telepon", form.nomer_telepon);
    fd.append("pemilik_acara_nama", form.pemilik_acara_nama);
    fd.append("umur", form.umur);
    fd.append("acara", form.acara);
    fd.append("jenis_hiburan", form.jenis_hiburan);
    fd.append("nama_hiburan", form.nama_hiburan);
    fd.append("nama_pimpinan", form.nama_pimpinan);
    fd.append("undang_berapa_orang", form.undang_berapa_orang);
    fd.append("bertempat_di", form.bertempat_di);
    fd.append("pemilik_hiburan_nama", form.pemilik_hiburan_nama);
    fd.append("acara_hiburan", form.acara_hiburan);
    fd.append("jenis_hiburan_hiburan", form.jenis_hiburan_hiburan);
    fd.append("nama_hiburan_hiburan", form.nama_hiburan_hiburan);
    fd.append("nama_pimpinan_hiburan", form.nama_pimpinan_hiburan);
    fd.append("undang_berapa_orang_hiburan", form.undang_berapa_orang_hiburan);
    fd.append("bertempat_di_hiburan", form.bertempat_di_hiburan);

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) {
        const msg = data.errors ? Object.values(data.errors).flat().join("\n") : data.message || "Gagal mengirim.";
        alert("Gagal:\n" + msg);
        return;
      }
      alert("Pengajuan Surat Izin Keramaian berhasil dikirim. Anda dapat cek status di halaman Cek Status.");
      setForm({
        pemilik_acara_nama: "", umur: "", acara: "", jenis_hiburan: "", nama_hiburan: "", nama_pimpinan: "",
        undang_berapa_orang: "", bertempat_di: "", nama: "", nomer_telepon: "", pemilik_hiburan_nama: "",
        acara_hiburan: "", jenis_hiburan_hiburan: "", nama_hiburan_hiburan: "", nama_pimpinan_hiburan: "",
        undang_berapa_orang_hiburan: "", bertempat_di_hiburan: "",
      });
    } catch (err) {
      console.error(err);
      alert("Tidak dapat terhubung ke server. Pastikan backend berjalan di http://127.0.0.1:8000");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500";
  const labelClass = "block text-xs font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 pt-24 pb-20 min-h-screen">
      <div className="mb-3">
        <Link to="/layanan" className="text-teal-600 hover:text-teal-700 font-medium text-sm">
          ← Kembali ke Template Dokumen
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-lg font-bold text-center text-gray-900 mb-0.5">
          Surat Izin Keramaian
        </h1>
        <p className="text-center text-gray-600 text-xs mb-6">
          Isi data sesuai pihak yang mengajukan izin keramaian.
        </p>

        <form onSubmit={submit} className="space-y-6">
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Pemilik Acara</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Pemilik acara (Nama lengkap)</label>
                <input name="pemilik_acara_nama" placeholder="Masukkan nama lengkap pemilik acara" value={form.pemilik_acara_nama} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Umur</label>
                <input name="umur" placeholder="Masukkan umur" value={form.umur} onChange={handleChange} type="number" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Acara</label>
                <input name="acara" placeholder="Masukkan jenis acara" value={form.acara} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Jenis hiburan</label>
                <input name="jenis_hiburan" placeholder="Masukkan jenis hiburan" value={form.jenis_hiburan} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Nama hiburan</label>
                <input name="nama_hiburan" placeholder="Masukkan nama hiburan" value={form.nama_hiburan} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Nama pimpinan</label>
                <input name="nama_pimpinan" placeholder="Masukkan nama pimpinan" value={form.nama_pimpinan} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Undang berapa orang</label>
                <input name="undang_berapa_orang" placeholder="Masukkan jumlah undangan" value={form.undang_berapa_orang} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Bertempat di</label>
                <input name="bertempat_di" placeholder="Masukkan lokasi acara" value={form.bertempat_di} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Pemilik Hiburan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Pemilik hiburan (Nama lengkap)</label>
                <input name="pemilik_hiburan_nama" placeholder="Masukkan nama lengkap pemilik hiburan" value={form.pemilik_hiburan_nama} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Acara</label>
                <input name="acara_hiburan" placeholder="Masukkan jenis acara" value={form.acara_hiburan} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Jenis hiburan</label>
                <input name="jenis_hiburan_hiburan" placeholder="Masukkan jenis hiburan" value={form.jenis_hiburan_hiburan} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Nama hiburan</label>
                <input name="nama_hiburan_hiburan" placeholder="Masukkan nama hiburan" value={form.nama_hiburan_hiburan} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Nama pimpinan</label>
                <input name="nama_pimpinan_hiburan" placeholder="Masukkan nama pimpinan" value={form.nama_pimpinan_hiburan} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Undang berapa orang</label>
                <input name="undang_berapa_orang_hiburan" placeholder="Masukkan jumlah undangan" value={form.undang_berapa_orang_hiburan} onChange={handleChange} className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Bertempat di</label>
                <input name="bertempat_di_hiburan" placeholder="Masukkan lokasi acara" value={form.bertempat_di_hiburan} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Yang Bisa Dihubungi (untuk cek status dokumen)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nama</label>
                <input name="nama" placeholder="Masukkan nama lengkap" value={form.nama} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Nomor Telepon</label>
                <input name="nomer_telepon" placeholder="Masukkan nomor telepon" value={form.nomer_telepon} onChange={handleChange} className={inputClass} required />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" disabled={loading} className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {loading ? "Mengirim..." : "Kirim"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuratIzinKeramaian;
