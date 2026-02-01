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

  const resetForm = () => {
    setForm({
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
      tujuan: "",
      nama_ayah: "",
      nama_ibu: "",
      nama_anak: "",
      tempat_lahir_anak: "",
      tgl_lahir_anak: "",
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();

    // Kirim semua field form yang tidak kosong
    Object.entries(form).forEach(([key, value]) => {
      if (value !== "") {
        fd.append(key, value);
      }
    });

    // Pastikan field required ada (walaupun kosong)
    const requiredFields = [
      "nama_lengkap", "nik", "no_kk", "jenis_kelamin", 
      "tempat_lahir", "tgl_lahir", "agama", "kewarganegaraan",
      "status_perkawinan", "pekerjaan", "alamat_ktp", "alamat_domisili"
    ];

    requiredFields.forEach((key) => {
      if (!fd.has(key)) {
        fd.append(key, form[key] || "");
      }
    });

    fd.append("id_dokumen", dokumen);

    try {
      console.log("Sending data:", Object.fromEntries(fd));
      
      const res = await fetch(API, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Server error:", data);
        const errorMsg = data.errors 
          ? Object.values(data.errors).flat().join("\n")
          : data.message || "Terjadi kesalahan pada server";
        alert("Gagal:\n" + errorMsg);
        return;
      }

      alert("✅ Pengajuan berhasil dikirim!");
      resetForm();
      setDokumen("");
    } catch (err) {
      console.error("Network error:", err);
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        alert("❌ Tidak dapat terhubung ke server.\n\nPastikan:\n1. Server Laravel sudah berjalan di http://127.0.0.1:8000\n2. Jalankan: php artisan serve");
      } else {
        alert("❌ Terjadi kesalahan jaringan: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          {dokumen === "1" ? "Surat Keterangan Tidak Mampu" : 
           dokumen === "2" ? "Akta Kelahiran" : "Form Layanan Masyarakat"}
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Kolom bertanda (Jika ada) boleh dikosongkan.
        </p>

        <form onSubmit={submit} className="space-y-8">
          {/* DROPDOWN JENIS LAYANAN */}
          <div className="mb-8">
        <select
          value={dokumen}
              onChange={(e) => {
                setDokumen(e.target.value);
                resetForm();
              }}
              className="w-full px-4 py-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-white"
          required
        >
          <option value="">Pilih Jenis Layanan</option>
          <option value="1">Surat Keterangan Tidak Mampu</option>
          <option value="2">Akta Kelahiran</option>
        </select>
          </div>

          {/* FORM BERDASARKAN JENIS LAYANAN */}
          {dokumen && (
            <div className="space-y-8">
              {/* DATA PRIBADI */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    name="nama_lengkap"
                    placeholder="Nama Lengkap"
                    value={form.nama_lengkap}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIK
                  </label>
                  <input
                    name="nik"
                    placeholder="NIK (16 digit)"
                    value={form.nik}
                    onChange={handleChange}
                    type="text"
                    maxLength="16"
                    pattern="[0-9]{16}"
                    onInput={(e) => {
                      // Hanya izinkan angka
                      e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      // Batasi 16 karakter
                      if (e.target.value.length > 16) {
                        e.target.value = e.target.value.slice(0, 16);
                      }
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    No KK
                  </label>
                  <input
                    name="no_kk"
                    placeholder="No KK (16 digit)"
                    value={form.no_kk}
                    onChange={handleChange}
                    type="text"
                    maxLength="16"
                    pattern="[0-9]{16}"
                    onInput={(e) => {
                      // Hanya izinkan angka
                      e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      // Batasi 16 karakter
                      if (e.target.value.length > 16) {
                        e.target.value = e.target.value.slice(0, 16);
                      }
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Kelamin
                  </label>
                  <select
                    name="jenis_kelamin"
                    value={form.jenis_kelamin}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tempat Lahir
                  </label>
                  <input
                    name="tempat_lahir"
                    placeholder="Tempat Lahir"
                    value={form.tempat_lahir}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    name="tgl_lahir"
                    value={form.tgl_lahir}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Agama
                  </label>
                  <input
                    name="agama"
                    placeholder="Agama"
                    value={form.agama}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pekerjaan
                  </label>
                  <input
                    name="pekerjaan"
                    placeholder="Pekerjaan"
                    value={form.pekerjaan}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat KTP
                  </label>
                  <textarea
                    name="alamat_ktp"
                    placeholder="Alamat KTP"
                    value={form.alamat_ktp}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Domisili
                  </label>
                  <textarea
                    name="alamat_domisili"
                    placeholder="Alamat Domisili"
                    value={form.alamat_domisili}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status Perkawinan
                  </label>
                  <select
                    name="status_perkawinan"
                    value={form.status_perkawinan}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Pilih Status Perkawinan</option>
                    <option value="Belum Kawin">Belum Kawin</option>
                    <option value="Sudah Kawin">Sudah Kawin</option>
                    <option value="Cerai Hidup">Cerai Hidup</option>
                    <option value="Cerai Mati">Cerai Mati</option>
                  </select>
                </div>
              </div>

              {/* FORM KHUSUS SKTM */}
        {dokumen === "1" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tujuan Pengajuan
                  </label>
          <textarea
            name="tujuan"
            placeholder="Tujuan Pengajuan"
                    value={form.tujuan}
            onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
                </div>
        )}

              {/* FORM KHUSUS AKTA KELAHIRAN */}
        {dokumen === "2" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Ayah
                    </label>
                    <input
                      name="nama_ayah"
                      placeholder="Nama Ayah"
                      value={form.nama_ayah}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Ibu
                    </label>
                    <input
                      name="nama_ibu"
                      placeholder="Nama Ibu"
                      value={form.nama_ibu}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Anak
                    </label>
                    <input
                      name="nama_anak"
                      placeholder="Nama Anak"
                      value={form.nama_anak}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tempat Lahir Anak
                    </label>
                    <input
                      name="tempat_lahir_anak"
                      placeholder="Tempat Lahir Anak"
                      value={form.tempat_lahir_anak}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Lahir Anak
                    </label>
                    <input
                      type="date"
                      name="tgl_lahir_anak"
                      value={form.tgl_lahir_anak}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              )}

              {/* TOMBOL KIRIM */}
              <div className="flex justify-center pt-6">
        <button
                  type="submit"
          disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-lg text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
        >
          {loading ? "Mengirim..." : "Kirim Pengajuan"}
        </button>
              </div>
            </div>
          )}
      </form>
      </div>
    </div>
  );
};

export default Layanan;
