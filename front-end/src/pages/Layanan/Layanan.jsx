import { useState } from "react";

const API = "http://127.0.0.1:8000/api/layanan";

const Layanan = () => {
  const [loading, setLoading] = useState(false);
  const [dokumen, setDokumen] = useState("");

  const [form, setForm] = useState({
    nama_lengkap: "",
    nik: "",
    no_kk: "",
    jenis_kelamin: "",
    tempat_lahir: "",
    tgl_lahir: "",
    agama: "",
    kewarganegaraan: "Indonesia",
    status_perkawinan: "",
    pekerjaan: "",
    alamat_ktp: "",
    alamat_domisili: "",

    // SKTM
    tujuan: "",

    // AKTE
    nama_ayah: "",
    nama_ibu: "",
    nama_anak: "",
    tempat_lahir_anak: "",
    tgl_lahir_anak: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();

    // kirim semua field
    Object.entries(form).forEach(([key, value]) => {
      if (value !== "") fd.append(key, value);
    });

    fd.append("id_dokumen", dokumen);

    try {
      const res = await fetch(API, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        alert("Gagal:\n" + JSON.stringify(data.errors ?? data.message));
        return;
      }

      alert("✅ Pengajuan berhasil dikirim!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Form Layanan Masyarakat</h1>

      <form onSubmit={submit} className="space-y-4">
        <input name="nama_lengkap" placeholder="Nama Lengkap" onChange={handleChange} className="input" required />
        <input name="nik" placeholder="NIK" onChange={handleChange} className="input" required />
        <input name="no_kk" placeholder="No KK" onChange={handleChange} className="input" required />

        <select name="jenis_kelamin" onChange={handleChange} className="input" required>
          <option value="">Jenis Kelamin</option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>

        <input name="tempat_lahir" placeholder="Tempat Lahir" onChange={handleChange} className="input" />
        <input type="date" name="tgl_lahir" onChange={handleChange} className="input" />

        <input name="agama" placeholder="Agama" onChange={handleChange} className="input" />
        <input name="pekerjaan" placeholder="Pekerjaan" onChange={handleChange} className="input" />
        <input name="status_perkawinan" placeholder="Status Perkawinan" onChange={handleChange} className="input" />

        <textarea name="alamat_ktp" placeholder="Alamat KTP" onChange={handleChange} className="input" />
        <textarea name="alamat_domisili" placeholder="Alamat Domisili" onChange={handleChange} className="input" />

        {/* JENIS LAYANAN */}
        <select
          value={dokumen}
          onChange={(e) => setDokumen(e.target.value)}
          className="input"
          required
        >
          <option value="">Pilih Jenis Layanan</option>
          <option value="1">Surat Keterangan Tidak Mampu</option>
          <option value="2">Akta Kelahiran</option>
        </select>

        {/* SKTM */}
        {dokumen === "1" && (
          <textarea
            name="tujuan"
            placeholder="Tujuan Pengajuan"
            onChange={handleChange}
            className="input"
            required
          />
        )}

        {/* AKTE */}
        {dokumen === "2" && (
          <>
            <input name="nama_ayah" placeholder="Nama Ayah" onChange={handleChange} className="input" required />
            <input name="nama_ibu" placeholder="Nama Ibu" onChange={handleChange} className="input" required />
            <input name="nama_anak" placeholder="Nama Anak" onChange={handleChange} className="input" required />
            <input name="tempat_lahir_anak" placeholder="Tempat Lahir Anak" onChange={handleChange} className="input" required />
            <input type="date" name="tgl_lahir_anak" onChange={handleChange} className="input" required />
          </>
        )}

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          {loading ? "Mengirim..." : "Kirim Pengajuan"}
        </button>
      </form>
    </div>
  );
};

export default Layanan;
