import { useState } from "react";
import { Link } from "react-router-dom";

const API = "http://127.0.0.1:8000/api/layanan";
const API_KERAMAIAN = "http://127.0.0.1:8000/api/layanan/keramaian";

const LayananForm = () => {
  const [loading, setLoading] = useState(false);
  const [jenisLayanan, setJenisLayanan] = useState("");

  // Data Umum Pemohon
  const [form, setForm] = useState({
    nama_lengkap: "",
    no_kk: "",
    nik: "",
    jenis_kelamin: "",
    tempat_tanggal_lahir: "",
    agama: "",
    kewarganegaraan: "",
    status_perkawinan: "",
    pekerjaan: "",
    no_telepon: "",
    alamat_domisili: "",
    alamat_ktp: "",
  });

  // Form Surat Izin Keramaian
  const [formKeramaian, setFormKeramaian] = useState({
    pemilik_acara_nama: "",
    umur: "",
    acara: "",
    jenis_hiburan: "",
    nama_hiburan: "",
    nama_pimpinan: "",
    undang_berapa_orang: "",
    bertempat_di: "",
    pemilik_hiburan_nama: "",
    acara_hiburan: "",
    jenis_hiburan_hiburan: "",
    nama_hiburan_hiburan: "",
    nama_pimpinan_hiburan: "",
    undang_berapa_orang_hiburan: "",
    bertempat_di_hiburan: "",
  });

  // Form Surat Keterangan Tidak Mampu
  const [formSKTM, setFormSKTM] = useState({
    tujuan: "",
  });

  // Form Akta Kelahiran
  const [formAkta, setFormAkta] = useState({
    nama_ayah: "",
    nama_ibu: "",
    nama_anak: "",
    tempat_lahir_anak: "",
    tgl_lahir_anak: "",
  });

  // Form Surat Pengantar KK
  const [formPengantarKK, setFormPengantarKK] = useState({
    nama_kepala_keluarga: "",
    alamat: "",
    rt: "",
    desa: "",
    kabupaten: "",
    kecamatan: "",
    kode_pos: "",
    provinsi: "",
  });

  const [anggotaKeluarga, setAnggotaKeluarga] = useState([
    {
      nama_lengkap: "",
      jenis_kelamin: "",
      nik: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      agama: "",
      pendidikan_terakhir: "",
      jenis_pekerjaan: "",
      status_perkawinan: "",
      status_hubungan: "",
      golongan_darah: "",
      nama_ayah: "",
      nama_ibu: "",
    },
  ]);

  // Form Surat Keterangan Pindah
  const [formPindah, setFormPindah] = useState({
    nama_kepala_keluarga: "",
    nik_kepala_keluarga: "",
    nomor_kk: "",
    nomor_hp: "",
    alamat_asal: "",
    rt_asal: "",
    rw_asal: "",
    desa_asal: "",
    kode_pos_asal: "",
    kecamatan_asal: "",
    kabupaten_asal: "",
    provinsi_asal: "",
    alamat_tujuan: "",
    rt_tujuan: "",
    rw_tujuan: "",
    desa_tujuan: "",
    kode_pos_tujuan: "",
    kecamatan_tujuan: "",
    kabupaten_tujuan: "",
    provinsi_tujuan: "",
    alasan_pindah: "",
    klasifikasi_kepindahan: "",
    tanggal_rencana_pindah: "",
  });

  const [anggotaPindah, setAnggotaPindah] = useState([
    {
      nama_lengkap: "",
      nik: "",
      status_hubungan: "",
    },
  ]);

  // Form Surat Keterangan Usaha (SKU)
  const [formSKU, setFormSKU] = useState({
    nama_instansi: "",
    jenis_kegiatan_usaha: "",
    nomor_badan_hukum: "",
    nama_lembaga: "",
    tanggal_berdiri_usaha: "",
  });

  // Form Surat Kematian
  const [formKematian, setFormKematian] = useState({
    nama_almarhum: "",
    jenis_kelamin_almarhum: "",
    waktu_meninggal: "",
    agama_almarhum: "",
    tempat_tanggal_lahir_almarhum: "",
    pekerjaan_almarhum: "",
    penyebab_meninggal: "",
    nama_pelapor: "",
    alamat_almarhum: "",
    tempat_meninggal: "",
    hari_tanggal_meninggal: "",
    status_hubungan_pelapor: "",
    tempat_dimakamkan: "",
  });

  // Form Surat Keterangan Ahli Waris
  const [formAhliWaris, setFormAhliWaris] = useState({
    tempat_tanggal_kematian: "",
    nama_pemberi_warisan: "",
    nama_pasangan_pewaris: "",
    nama_para_ahli_waris: "",
    ahli_waris_ditunjuk: "",
    warisan_ditinggalkan: "",
  });

  // Form Surat Nikah
  const [formNikah, setFormNikah] = useState({
    // Data Orang Tua Pemohon
    ortu_ayah_nama: "",
    ortu_ayah_nik: "",
    ortu_ayah_kk: "",
    ortu_ayah_ttl: "",
    ortu_ayah_agama: "",
    ortu_ayah_kewarganegaraan: "",
    ortu_ayah_status_perkawinan: "",
    ortu_ayah_pekerjaan: "",
    ortu_ayah_alamat: "",
    ortu_ibu_nama: "",
    ortu_ibu_nik: "",
    ortu_ibu_kk: "",
    ortu_ibu_ttl: "",
    ortu_ibu_agama: "",
    ortu_ibu_kewarganegaraan: "",
    ortu_ibu_status_perkawinan: "",
    ortu_ibu_pekerjaan: "",
    ortu_ibu_alamat: "",
    // Data Calon Pasangan
    calon_nama: "",
    calon_nik: "",
    calon_kk: "",
    calon_jenis_kelamin: "",
    calon_ttl: "",
    calon_agama: "",
    calon_kewarganegaraan: "",
    calon_status_perkawinan: "",
    calon_pekerjaan: "",
    calon_alamat: "",
    // Data Orang Tua Calon Pasangan
    ortu_calon_ayah_nama: "",
    ortu_calon_ayah_nik: "",
    ortu_calon_ayah_kk: "",
    ortu_calon_ayah_ttl: "",
    ortu_calon_ayah_agama: "",
    ortu_calon_ayah_kewarganegaraan: "",
    ortu_calon_ayah_status_perkawinan: "",
    ortu_calon_ayah_pekerjaan: "",
    ortu_calon_ayah_alamat: "",
    ortu_calon_ibu_nama: "",
    ortu_calon_ibu_nik: "",
    ortu_calon_ibu_kk: "",
    ortu_calon_ibu_ttl: "",
    ortu_calon_ibu_agama: "",
    ortu_calon_ibu_kewarganegaraan: "",
    ortu_calon_ibu_status_perkawinan: "",
    ortu_calon_ibu_pekerjaan: "",
    ortu_calon_ibu_alamat: "",
  });

  // Form Surat Keterangan Penghasilan
  const [formPenghasilan, setFormPenghasilan] = useState({
    nama_lengkap_wali: "",
    nik_wali: "",
    tempat_tanggal_lahir_wali: "",
    jenis_kelamin_wali: "",
    agama_wali: "",
    pekerjaan_wali: "",
    nama_lengkap_anak: "",
    nik_anak: "",
    tempat_tanggal_lahir_anak: "",
    jenis_kelamin_anak: "",
    agama_anak: "",
    pekerjaan_anak: "",
    keperluan: "",
    penghasilan_per_bulan: "",
    jurusan_prodi: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleKeramaianChange = (e) => {
    setFormKeramaian({ ...formKeramaian, [e.target.name]: e.target.value });
  };

  const handleSKTMChange = (e) => {
    setFormSKTM({ ...formSKTM, [e.target.name]: e.target.value });
  };

  const handleAktaChange = (e) => {
    setFormAkta({ ...formAkta, [e.target.name]: e.target.value });
  };

  const handlePengantarKKChange = (e) => {
    setFormPengantarKK({ ...formPengantarKK, [e.target.name]: e.target.value });
  };

  const handleAnggotaKeluargaChange = (index, e) => {
    const updatedAnggota = [...anggotaKeluarga];
    updatedAnggota[index][e.target.name] = e.target.value;
    setAnggotaKeluarga(updatedAnggota);
  };

  const tambahAnggotaKeluarga = () => {
    setAnggotaKeluarga([
      ...anggotaKeluarga,
      {
        nama_lengkap: "",
        jenis_kelamin: "",
        nik: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        agama: "",
        pendidikan_terakhir: "",
        jenis_pekerjaan: "",
        status_perkawinan: "",
        status_hubungan: "",
        golongan_darah: "",
        nama_ayah: "",
        nama_ibu: "",
      },
    ]);
  };

  const hapusAnggotaKeluarga = (index) => {
    if (anggotaKeluarga.length > 1) {
      setAnggotaKeluarga(anggotaKeluarga.filter((_, i) => i !== index));
    }
  };

  const handlePindahChange = (e) => {
    setFormPindah({ ...formPindah, [e.target.name]: e.target.value });
  };

  const handleAnggotaPindahChange = (index, e) => {
    const updatedAnggota = [...anggotaPindah];
    updatedAnggota[index][e.target.name] = e.target.value;
    setAnggotaPindah(updatedAnggota);
  };

  const tambahAnggotaPindah = () => {
    setAnggotaPindah([
      ...anggotaPindah,
      {
        nama_lengkap: "",
        nik: "",
        status_hubungan: "",
      },
    ]);
  };

  const hapusAnggotaPindah = (index) => {
    if (anggotaPindah.length > 1) {
      setAnggotaPindah(anggotaPindah.filter((_, i) => i !== index));
    }
  };

  const handleSKUChange = (e) => {
    setFormSKU({ ...formSKU, [e.target.name]: e.target.value });
  };

  const handleKematianChange = (e) => {
    setFormKematian({ ...formKematian, [e.target.name]: e.target.value });
  };

  const handleAhliWarisChange = (e) => {
    setFormAhliWaris({ ...formAhliWaris, [e.target.name]: e.target.value });
  };

  const handleNikahChange = (e) => {
    setFormNikah({ ...formNikah, [e.target.name]: e.target.value });
  };

  const handlePenghasilanChange = (e) => {
    setFormPenghasilan({ ...formPenghasilan, [e.target.name]: e.target.value });
  };

  const resetAllForms = () => {
    setForm({
      nama_lengkap: "",
      no_kk: "",
      nik: "",
      jenis_kelamin: "",
      tempat_tanggal_lahir: "",
      agama: "",
      kewarganegaraan: "",
      status_perkawinan: "",
      pekerjaan: "",
      no_telepon: "",
      alamat_domisili: "",
      alamat_ktp: "",
    });
    setFormKeramaian({
      pemilik_acara_nama: "",
      umur: "",
      acara: "",
      jenis_hiburan: "",
      nama_hiburan: "",
      nama_pimpinan: "",
      undang_berapa_orang: "",
      bertempat_di: "",
      pemilik_hiburan_nama: "",
      acara_hiburan: "",
      jenis_hiburan_hiburan: "",
      nama_hiburan_hiburan: "",
      nama_pimpinan_hiburan: "",
      undang_berapa_orang_hiburan: "",
      bertempat_di_hiburan: "",
    });
    setFormSKTM({ tujuan: "" });
    setFormAkta({
      nama_ayah: "",
      nama_ibu: "",
      nama_anak: "",
      tempat_lahir_anak: "",
      tgl_lahir_anak: "",
    });
    setFormPengantarKK({
      nama_kepala_keluarga: "",
      alamat: "",
      rt: "",
      desa: "",
      kabupaten: "",
      kecamatan: "",
      kode_pos: "",
      provinsi: "",
    });
    setAnggotaKeluarga([
      {
        nama_lengkap: "",
        jenis_kelamin: "",
        nik: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        agama: "",
        pendidikan_terakhir: "",
        jenis_pekerjaan: "",
        status_perkawinan: "",
        status_hubungan: "",
        golongan_darah: "",
        nama_ayah: "",
        nama_ibu: "",
      },
    ]);
    setFormPindah({
      nama_kepala_keluarga: "",
      nik_kepala_keluarga: "",
      nomor_kk: "",
      nomor_hp: "",
      alamat_asal: "",
      rt_asal: "",
      rw_asal: "",
      desa_asal: "",
      kode_pos_asal: "",
      kecamatan_asal: "",
      kabupaten_asal: "",
      provinsi_asal: "",
      alamat_tujuan: "",
      rt_tujuan: "",
      rw_tujuan: "",
      desa_tujuan: "",
      kode_pos_tujuan: "",
      kecamatan_tujuan: "",
      kabupaten_tujuan: "",
      provinsi_tujuan: "",
      alasan_pindah: "",
      klasifikasi_kepindahan: "",
      tanggal_rencana_pindah: "",
    });
    setAnggotaPindah([
      {
        nama_lengkap: "",
        nik: "",
        status_hubungan: "",
      },
    ]);
    setFormSKU({
      nama_instansi: "",
      jenis_kegiatan_usaha: "",
      nomor_badan_hukum: "",
      nama_lembaga: "",
      tanggal_berdiri_usaha: "",
    });
    setFormKematian({
      nama_almarhum: "",
      jenis_kelamin_almarhum: "",
      waktu_meninggal: "",
      agama_almarhum: "",
      tempat_tanggal_lahir_almarhum: "",
      pekerjaan_almarhum: "",
      penyebab_meninggal: "",
      nama_pelapor: "",
      alamat_almarhum: "",
      tempat_meninggal: "",
      hari_tanggal_meninggal: "",
      status_hubungan_pelapor: "",
      tempat_dimakamkan: "",
    });
    setFormAhliWaris({
      tempat_tanggal_kematian: "",
      nama_pemberi_warisan: "",
      nama_pasangan_pewaris: "",
      nama_para_ahli_waris: "",
      ahli_waris_ditunjuk: "",
      warisan_ditinggalkan: "",
    });
    setFormNikah({
      ortu_ayah_nama: "",
      ortu_ayah_nik: "",
      ortu_ayah_kk: "",
      ortu_ayah_ttl: "",
      ortu_ayah_agama: "",
      ortu_ayah_kewarganegaraan: "",
      ortu_ayah_status_perkawinan: "",
      ortu_ayah_pekerjaan: "",
      ortu_ayah_alamat: "",
      ortu_ibu_nama: "",
      ortu_ibu_nik: "",
      ortu_ibu_kk: "",
      ortu_ibu_ttl: "",
      ortu_ibu_agama: "",
      ortu_ibu_kewarganegaraan: "",
      ortu_ibu_status_perkawinan: "",
      ortu_ibu_pekerjaan: "",
      ortu_ibu_alamat: "",
      calon_nama: "",
      calon_nik: "",
      calon_kk: "",
      calon_jenis_kelamin: "",
      calon_ttl: "",
      calon_agama: "",
      calon_kewarganegaraan: "",
      calon_status_perkawinan: "",
      calon_pekerjaan: "",
      calon_alamat: "",
      ortu_calon_ayah_nama: "",
      ortu_calon_ayah_nik: "",
      ortu_calon_ayah_kk: "",
      ortu_calon_ayah_ttl: "",
      ortu_calon_ayah_agama: "",
      ortu_calon_ayah_kewarganegaraan: "",
      ortu_calon_ayah_status_perkawinan: "",
      ortu_calon_ayah_pekerjaan: "",
      ortu_calon_ayah_alamat: "",
      ortu_calon_ibu_nama: "",
      ortu_calon_ibu_nik: "",
      ortu_calon_ibu_kk: "",
      ortu_calon_ibu_ttl: "",
      ortu_calon_ibu_agama: "",
      ortu_calon_ibu_kewarganegaraan: "",
      ortu_calon_ibu_status_perkawinan: "",
      ortu_calon_ibu_pekerjaan: "",
      ortu_calon_ibu_alamat: "",
    });
    setJenisLayanan("");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!jenisLayanan) {
      alert("Silakan pilih jenis layanan terlebih dahulu.");
      return;
    }
    setLoading(true);
    const fd = new FormData();
    
    // Mapping jenis layanan ke id_dokumen (sesuai database aktual)
    const idDokumenMap = {
      "sktm": "1",
      "akta-kelahiran": "2",
      "keramaian": "5",
      "pengantar-kk": "9",
      "keterangan-pindah": "10",
      "sku": "11",
      "kematian": "12",
      "ahli-waris": "13",
      "nikah": "14",
      "penghasilan": "15",
    };
    
    // Fungsi untuk parse tanggal Indonesia ke format YYYY-MM-DD
    const parseIndonesianDate = (dateStr) => {
      const bulanMap = {
        'januari': '01', 'februari': '02', 'maret': '03', 'april': '04',
        'mei': '05', 'juni': '06', 'juli': '07', 'agustus': '08',
        'september': '09', 'oktober': '10', 'november': '11', 'desember': '12'
      };
      
      // Coba parse format "23 mei 1993" atau "23 Mei 1993"
      const match = dateStr.trim().match(/(\d{1,2})\s+(\w+)\s+(\d{4})/i);
      if (match) {
        const day = match[1].padStart(2, '0');
        const month = bulanMap[match[2].toLowerCase()] || '01';
        const year = match[3];
        return `${year}-${month}-${day}`;
      }
      
      // Jika sudah format YYYY-MM-DD, kembalikan langsung
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr.trim())) {
        return dateStr.trim();
      }
      
      // Default: tanggal hari ini
      return new Date().toISOString().split('T')[0];
    };
    
    // Data Umum Pemohon
    fd.append("nama_lengkap", form.nama_lengkap);
    fd.append("nik", form.nik);
    fd.append("no_kk", form.no_kk);
    fd.append("jenis_kelamin", form.jenis_kelamin);
    fd.append("agama", form.agama);
    fd.append("kewarganegaraan", form.kewarganegaraan);
    fd.append("status_perkawinan", form.status_perkawinan);
    fd.append("pekerjaan", form.pekerjaan);
    fd.append("no_telepon", form.no_telepon);
    fd.append("alamat_ktp", form.alamat_ktp);
    fd.append("alamat_domisili", form.alamat_domisili);
    
    // Parse tempat_tanggal_lahir menjadi tempat_lahir dan tgl_lahir
    const ttl = form.tempat_tanggal_lahir;
    if (ttl.includes(",")) {
      const parts = ttl.split(",");
      fd.append("tempat_lahir", parts[0].trim());
      fd.append("tgl_lahir", parseIndonesianDate(parts.slice(1).join(",").trim()));
    } else {
      fd.append("tempat_lahir", ttl);
      fd.append("tgl_lahir", parseIndonesianDate(ttl));
    }
    
    fd.append("id_dokumen", idDokumenMap[jenisLayanan] || "1");
    fd.append("jenis_layanan", jenisLayanan);

    // Data tambahan berdasarkan jenis layanan
    if (jenisLayanan === "keramaian") {
      // Untuk Surat Izin Keramaian, gunakan endpoint khusus dan format khusus
      const fdKeramaian = new FormData();
      fdKeramaian.append("nama", form.nama_lengkap);
      fdKeramaian.append("nomer_telepon", form.no_telepon);
      Object.entries(formKeramaian).forEach(([key, value]) => {
        fdKeramaian.append(key, value);
      });
      
      try {
        const res = await fetch(API_KERAMAIAN, {
          method: "POST",
          headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
          body: fdKeramaian,
        });
        const data = await res.json();
        if (!res.ok) {
          const msg = data.errors ? Object.values(data.errors).flat().join("\n") : data.message || "Gagal mengirim.";
          alert("Gagal:\n" + msg);
          return;
        }
        alert("Pengajuan berhasil dikirim. Anda dapat cek status di halaman Cek Status.");
        resetAllForms();
      } catch (err) {
        console.error(err);
        alert("Tidak dapat terhubung ke server. Pastikan backend berjalan di http://127.0.0.1:8000");
      } finally {
        setLoading(false);
      }
      return; // Keluar dari fungsi, tidak lanjut ke submit biasa
    } else if (jenisLayanan === "sktm") {
      Object.entries(formSKTM).forEach(([key, value]) => {
        fd.append(key, value);
      });
    } else if (jenisLayanan === "akta-kelahiran") {
      fd.append("nama_ayah", formAkta.nama_ayah);
      fd.append("nama_ibu", formAkta.nama_ibu);
      fd.append("nama_anak", formAkta.nama_anak);
      fd.append("tempat_lahir_anak", formAkta.tempat_lahir_anak);
      fd.append("tgl_lahir_anak", parseIndonesianDate(formAkta.tgl_lahir_anak));
    } else if (jenisLayanan === "pengantar-kk") {
      Object.entries(formPengantarKK).forEach(([key, value]) => {
        fd.append(key, value);
      });
      fd.append("anggota_keluarga", JSON.stringify(anggotaKeluarga));
    } else if (jenisLayanan === "keterangan-pindah") {
      Object.entries(formPindah).forEach(([key, value]) => {
        fd.append(key, value);
      });
      fd.append("anggota_pindah", JSON.stringify(anggotaPindah));
    } else if (jenisLayanan === "sku") {
      Object.entries(formSKU).forEach(([key, value]) => {
        fd.append(key, value);
      });
    } else if (jenisLayanan === "kematian") {
      Object.entries(formKematian).forEach(([key, value]) => {
        fd.append(key, value);
      });
    } else if (jenisLayanan === "ahli-waris") {
      Object.entries(formAhliWaris).forEach(([key, value]) => {
        fd.append(key, value);
      });
    } else if (jenisLayanan === "nikah") {
      Object.entries(formNikah).forEach(([key, value]) => {
        fd.append(key, value);
      });
    } else if (jenisLayanan === "penghasilan") {
      Object.entries(formPenghasilan).forEach(([key, value]) => {
        fd.append(key, value);
      });
    }

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
      alert("Pengajuan berhasil dikirim. Anda dapat cek status di halaman Cek Status.");
      resetAllForms();
    } catch (err) {
      console.error(err);
      alert("Tidak dapat terhubung ke server. Pastikan backend berjalan di http://127.0.0.1:8000");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500";
  const labelClass = "block text-xs font-medium text-teal-700 mb-1";
  const labelClassGray = "block text-xs font-medium text-gray-700 mb-1";

  return (
    <div className="min-h-screen bg-gray-200 py-10 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-3">
          <Link to="/layanan" className="text-teal-600 hover:text-teal-700 font-medium text-sm">
            ← Kembali ke Template Dokumen
          </Link>
        </div>

        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Formulir Pengajuan Layanan Administrasi Desa
          </h1>
          <p className="text-gray-600 text-sm">
            Silakan isi data berikut. Berkas persyaratan dibawa langsung ke Balai Desa.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          {/* Data Umum Pemohon */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-base font-semibold text-teal-700 mb-4">Data Umum Pemohon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nama Lengkap</label>
                <input 
                  name="nama_lengkap" 
                  placeholder="Masukkan nama lengkap" 
                  value={form.nama_lengkap} 
                  onChange={handleChange} 
                  className={inputClass} 
                  required 
                />
              </div>
              <div>
                <label className={labelClass}>Nomor Kartu Keluarga (KK)</label>
                <input 
                  name="no_kk" 
                  placeholder="Masukkan nomor KK" 
                  value={form.no_kk} 
                  onChange={handleChange} 
                  className={inputClass} 
                  required 
                />
              </div>
              <div>
                <label className={labelClass}>NIK</label>
                <input 
                  name="nik" 
                  placeholder="Masukkan NIK" 
                  value={form.nik} 
                  onChange={handleChange} 
                  className={inputClass} 
                  required 
                />
                <span className="text-xs text-gray-500">Isi 16 digit</span>
              </div>
              <div>
                <label className={labelClass}>Jenis Kelamin</label>
                <input 
                  name="jenis_kelamin" 
                  placeholder="Laki-laki / Perempuan" 
                  value={form.jenis_kelamin} 
                  onChange={handleChange} 
                  className={inputClass} 
                  required 
                />
              </div>
              <div>
                <label className={labelClass}>Tempat, Tanggal Lahir</label>
                <input 
                  name="tempat_tanggal_lahir" 
                  placeholder="Contoh: Jakarta, 15 Agustus 1990" 
                  value={form.tempat_tanggal_lahir} 
                  onChange={handleChange} 
                  className={inputClass} 
                  required 
                />
              </div>
              <div>
                <label className={labelClass}>Agama</label>
                <input 
                  name="agama" 
                  placeholder="Masukkan agama" 
                  value={form.agama} 
                  onChange={handleChange} 
                  className={inputClass} 
                  required 
                />
              </div>
              <div>
                <label className={labelClass}>Kewarganegaraan</label>
                <input 
                  name="kewarganegaraan" 
                  placeholder="Masukkan kewarganegaraan" 
                  value={form.kewarganegaraan} 
                  onChange={handleChange} 
                  className={inputClass} 
                  required 
                />
              </div>
              <div>
                <label className={labelClass}>Status Perkawinan</label>
                <input 
                  name="status_perkawinan" 
                  placeholder="Lajang/Janda/Duda" 
                  value={form.status_perkawinan} 
                  onChange={handleChange} 
                  className={inputClass} 
                  required 
                />
              </div>
              <div>
                <label className={labelClass}>Pekerjaan</label>
                <input 
                  name="pekerjaan" 
                  placeholder="Masukkan pekerjaan" 
                  value={form.pekerjaan} 
                  onChange={handleChange} 
                  className={inputClass} 
                  required 
                />
              </div>
              <div>
                <label className={labelClass}>Nomor Telepon</label>
                <input 
                  name="no_telepon" 
                  placeholder="Contoh: 081234567890" 
                  value={form.no_telepon} 
                  onChange={handleChange} 
                  className={inputClass} 
                  required 
                />
              </div>
              <div>
                <label className={labelClass}>Alamat Domisili</label>
                <textarea 
                  name="alamat_domisili" 
                  placeholder="Masukkan alamat domisili saat ini" 
                  value={form.alamat_domisili} 
                  onChange={handleChange} 
                  className={inputClass + " min-h-[80px]"} 
                  required 
                />
              </div>
              <div>
                <label className={labelClass}>Alamat sesuai KTP</label>
                <textarea 
                  name="alamat_ktp" 
                  placeholder="Masukkan alamat lengkap sesuai KTP" 
                  value={form.alamat_ktp} 
                  onChange={handleChange} 
                  className={inputClass + " min-h-[80px]"} 
                  required 
                />
              </div>
            </div>
          </div>

          {/* Jenis Layanan */}
          <div className="bg-gray-100 rounded-xl shadow p-8">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Jenis Layanan</h2>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Jenis Layanan</label>
              <select
                value={jenisLayanan}
                onChange={(e) => setJenisLayanan(e.target.value)}
                className={inputClass + " bg-white"}
                required
              >
                <option value="">Pilih jenis layanan</option>
                <option value="keramaian">Surat Izin Keramaian</option>
                <option value="sktm">Surat Keterangan Tidak Mampu</option>
                <option value="akta-kelahiran">Akta Kelahiran</option>
                <option value="pengantar-kk">Surat Pengantar Kartu Keluarga</option>
                <option value="keterangan-pindah">Surat Keterangan Pindah</option>
                <option value="sku">Surat Keterangan Usaha (SKU)</option>
                <option value="kematian">Surat Kematian</option>
                <option value="ahli-waris">Surat Keterangan Ahli Waris</option>
                <option value="nikah">Surat Nikah</option>
                <option value="penghasilan">Surat Keterangan Penghasilan</option>
              </select>
            </div>
          </div>

          {/* Form Surat Izin Keramaian */}
          {jenisLayanan === "keramaian" && (
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
              <h2 className="text-lg font-bold text-teal-700">Surat Izin Keramaian</h2>
              
              {/* Pemilik Acara */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">Pemilik Acara</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClassGray}>Pemilik acara (Nama lengkap)</label>
                    <input name="pemilik_acara_nama" placeholder="Masukkan nama lengkap pemilik acara" value={formKeramaian.pemilik_acara_nama} onChange={handleKeramaianChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClassGray}>Umur</label>
                    <input name="umur" placeholder="Masukkan umur" value={formKeramaian.umur} onChange={handleKeramaianChange} type="number" className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClassGray}>Acara</label>
                    <input name="acara" placeholder="Masukkan jenis acara" value={formKeramaian.acara} onChange={handleKeramaianChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClassGray}>Jenis hiburan</label>
                    <input name="jenis_hiburan" placeholder="Masukkan jenis hiburan" value={formKeramaian.jenis_hiburan} onChange={handleKeramaianChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClassGray}>Nama hiburan</label>
                    <input name="nama_hiburan" placeholder="Masukkan nama hiburan" value={formKeramaian.nama_hiburan} onChange={handleKeramaianChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClassGray}>Nama pimpinan</label>
                    <input name="nama_pimpinan" placeholder="Masukkan nama pimpinan" value={formKeramaian.nama_pimpinan} onChange={handleKeramaianChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClassGray}>Undang berapa orang</label>
                    <input name="undang_berapa_orang" placeholder="Masukkan jumlah undangan" value={formKeramaian.undang_berapa_orang} onChange={handleKeramaianChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClassGray}>Bertempat di</label>
                    <input name="bertempat_di" placeholder="Masukkan lokasi acara" value={formKeramaian.bertempat_di} onChange={handleKeramaianChange} className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Pemilik Hiburan */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">Pemilik Hiburan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClassGray}>Pemilik hiburan (Nama lengkap)</label>
                    <input name="pemilik_hiburan_nama" placeholder="Masukkan nama lengkap pemilik hiburan" value={formKeramaian.pemilik_hiburan_nama} onChange={handleKeramaianChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClassGray}>Acara</label>
                    <input name="acara_hiburan" placeholder="Masukkan jenis acara" value={formKeramaian.acara_hiburan} onChange={handleKeramaianChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClassGray}>Jenis hiburan</label>
                    <input name="jenis_hiburan_hiburan" placeholder="Masukkan jenis hiburan" value={formKeramaian.jenis_hiburan_hiburan} onChange={handleKeramaianChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClassGray}>Nama hiburan</label>
                    <input name="nama_hiburan_hiburan" placeholder="Masukkan nama hiburan" value={formKeramaian.nama_hiburan_hiburan} onChange={handleKeramaianChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClassGray}>Nama pimpinan</label>
                    <input name="nama_pimpinan_hiburan" placeholder="Masukkan nama pimpinan" value={formKeramaian.nama_pimpinan_hiburan} onChange={handleKeramaianChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClassGray}>Undang berapa orang</label>
                    <input name="undang_berapa_orang_hiburan" placeholder="Masukkan jumlah undangan" value={formKeramaian.undang_berapa_orang_hiburan} onChange={handleKeramaianChange} className={inputClass} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClassGray}>Bertempat di</label>
                    <input name="bertempat_di_hiburan" placeholder="Masukkan lokasi acara" value={formKeramaian.bertempat_di_hiburan} onChange={handleKeramaianChange} className={inputClass} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Surat Keterangan Tidak Mampu */}
          {jenisLayanan === "sktm" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-lg font-bold text-teal-700 mb-4">Surat Keterangan Tidak Mampu</h2>
              <div>
                <label className={labelClassGray}>Tujuan Pengajuan</label>
                <textarea 
                  name="tujuan" 
                  placeholder="Contoh: Untuk keperluan beasiswa pendidikan, pengobatan, dll" 
                  value={formSKTM.tujuan} 
                  onChange={handleSKTMChange} 
                  className={inputClass + " min-h-[100px]"} 
                  required 
                />
              </div>
            </div>
          )}

          {/* Form Akta Kelahiran */}
          {jenisLayanan === "akta-kelahiran" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-lg font-bold text-teal-700 mb-4">Akta Kelahiran</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClassGray}>Nama Ayah</label>
                  <input 
                    name="nama_ayah" 
                    placeholder="Masukkan nama ayah" 
                    value={formAkta.nama_ayah} 
                    onChange={handleAktaChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClassGray}>Nama Ibu</label>
                  <input 
                    name="nama_ibu" 
                    placeholder="Masukkan nama ibu" 
                    value={formAkta.nama_ibu} 
                    onChange={handleAktaChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClassGray}>Nama Anak</label>
                  <input 
                    name="nama_anak" 
                    placeholder="Masukkan nama anak" 
                    value={formAkta.nama_anak} 
                    onChange={handleAktaChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClassGray}>Tempat Lahir Anak</label>
                  <input 
                    name="tempat_lahir_anak" 
                    placeholder="Masukkan tempat lahir anak" 
                    value={formAkta.tempat_lahir_anak} 
                    onChange={handleAktaChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClassGray}>Tanggal Lahir Anak</label>
                  <input 
                    name="tgl_lahir_anak" 
                    placeholder="Contoh: 20 Maret 2023" 
                    value={formAkta.tgl_lahir_anak} 
                    onChange={handleAktaChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Surat Pengantar Kartu Keluarga */}
          {jenisLayanan === "pengantar-kk" && (
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
              <h2 className="text-lg font-bold text-teal-700">Surat Pengantar Kartu Keluarga</h2>
              
              {/* Data Kepala Keluarga */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4">Data Kepala Keluarga</h3>
                <div className="space-y-4">
                  <div>
                    <label className={labelClassGray}>Nama Kepala Keluarga</label>
                    <input 
                      name="nama_kepala_keluarga" 
                      placeholder="Masukkan nama lengkap kepala keluarga" 
                      value={formPengantarKK.nama_kepala_keluarga} 
                      onChange={handlePengantarKKChange} 
                      className={inputClass} 
                      required 
                    />
                  </div>
                  <div>
                    <label className={labelClassGray}>Alamat</label>
                    <input 
                      name="alamat" 
                      placeholder="Masukkan alamat lengkap" 
                      value={formPengantarKK.alamat} 
                      onChange={handlePengantarKKChange} 
                      className={inputClass} 
                      required 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClassGray}>RT</label>
                      <input 
                        name="rt" 
                        placeholder="Contoh: 001" 
                        value={formPengantarKK.rt} 
                        onChange={handlePengantarKKChange} 
                        className={inputClass} 
                        required 
                      />
                    </div>
                    <div>
                      <label className={labelClassGray}>Desa</label>
                      <input 
                        name="desa" 
                        placeholder="Masukkan nama desa" 
                        value={formPengantarKK.desa} 
                        onChange={handlePengantarKKChange} 
                        className={inputClass} 
                        required 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Wilayah Administrasi */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4">Data Wilayah Administrasi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClassGray}>Kabupaten</label>
                    <input 
                      name="kabupaten" 
                      placeholder="Masukkan nama kabupaten" 
                      value={formPengantarKK.kabupaten} 
                      onChange={handlePengantarKKChange} 
                      className={inputClass} 
                      required 
                    />
                  </div>
                  <div>
                    <label className={labelClassGray}>Kecamatan</label>
                    <input 
                      name="kecamatan" 
                      placeholder="Masukkan nama kecamatan" 
                      value={formPengantarKK.kecamatan} 
                      onChange={handlePengantarKKChange} 
                      className={inputClass} 
                      required 
                    />
                  </div>
                  <div>
                    <label className={labelClassGray}>Kode Pos</label>
                    <input 
                      name="kode_pos" 
                      placeholder="Contoh: 12345" 
                      value={formPengantarKK.kode_pos} 
                      onChange={handlePengantarKKChange} 
                      className={inputClass} 
                      required 
                    />
                  </div>
                  <div>
                    <label className={labelClassGray}>Provinsi</label>
                    <input 
                      name="provinsi" 
                      placeholder="Masukkan nama provinsi" 
                      value={formPengantarKK.provinsi} 
                      onChange={handlePengantarKKChange} 
                      className={inputClass} 
                      required 
                    />
                  </div>
                </div>
              </div>

              {/* Data Anggota Keluarga */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-semibold text-gray-900">Data Anggota Keluarga</h3>
                  <button
                    type="button"
                    onClick={tambahAnggotaKeluarga}
                    className="flex items-center gap-1 text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors"
                  >
                    <span className="text-lg leading-none">+</span> Tambah Anggota
                  </button>
                </div>

                {anggotaKeluarga.map((anggota, index) => (
                  <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-medium text-gray-800">Anggota Keluarga {index + 1}</h4>
                      {anggotaKeluarga.length > 1 && (
                        <button
                          type="button"
                          onClick={() => hapusAnggotaKeluarga(index)}
                          className="text-red-500 hover:text-red-700 text-xs font-medium"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className={labelClassGray}>Nama Lengkap</label>
                        <input name="nama_lengkap" placeholder="Nama lengkap" value={anggota.nama_lengkap} onChange={(e) => handleAnggotaKeluargaChange(index, e)} className={inputClass} required />
                      </div>
                      <div>
                        <label className={labelClassGray}>L / P</label>
                        <input name="jenis_kelamin" placeholder="L atau P" value={anggota.jenis_kelamin} onChange={(e) => handleAnggotaKeluargaChange(index, e)} className={inputClass} required />
                      </div>
                      <div>
                        <label className={labelClassGray}>NIK</label>
                        <input name="nik" placeholder="16 digit NIK" value={anggota.nik} onChange={(e) => handleAnggotaKeluargaChange(index, e)} className={inputClass} required />
                      </div>
                      <div>
                        <label className={labelClassGray}>Tempat Lahir</label>
                        <input name="tempat_lahir" placeholder="Kota lahir" value={anggota.tempat_lahir} onChange={(e) => handleAnggotaKeluargaChange(index, e)} className={inputClass} required />
                      </div>
                      <div>
                        <label className={labelClassGray}>Tanggal Lahir</label>
                        <input name="tanggal_lahir" placeholder="DD/MM/YYYY" value={anggota.tanggal_lahir} onChange={(e) => handleAnggotaKeluargaChange(index, e)} className={inputClass} required />
                      </div>
                      <div>
                        <label className={labelClassGray}>Agama</label>
                        <input name="agama" placeholder="Agama" value={anggota.agama} onChange={(e) => handleAnggotaKeluargaChange(index, e)} className={inputClass} required />
                      </div>
                      <div>
                        <label className={labelClassGray}>Pendidikan Terakhir</label>
                        <input name="pendidikan_terakhir" placeholder="Pendidikan" value={anggota.pendidikan_terakhir} onChange={(e) => handleAnggotaKeluargaChange(index, e)} className={inputClass} required />
                      </div>
                      <div>
                        <label className={labelClassGray}>Jenis Pekerjaan</label>
                        <input name="jenis_pekerjaan" placeholder="Pekerjaan" value={anggota.jenis_pekerjaan} onChange={(e) => handleAnggotaKeluargaChange(index, e)} className={inputClass} required />
                      </div>
                      <div>
                        <label className={labelClassGray}>Status Perkawinan</label>
                        <input name="status_perkawinan" placeholder="Status kawin" value={anggota.status_perkawinan} onChange={(e) => handleAnggotaKeluargaChange(index, e)} className={inputClass} required />
                      </div>
                      <div>
                        <label className={labelClassGray}>Status Hubungan</label>
                        <input name="status_hubungan" placeholder="Hubungan keluarga" value={anggota.status_hubungan} onChange={(e) => handleAnggotaKeluargaChange(index, e)} className={inputClass} required />
                      </div>
                      <div>
                        <label className={labelClassGray}>Golongan Darah</label>
                        <input name="golongan_darah" placeholder="A/B/AB/O" value={anggota.golongan_darah} onChange={(e) => handleAnggotaKeluargaChange(index, e)} className={inputClass} required />
                      </div>
                      <div>
                        <label className={labelClassGray}>Nama Ayah</label>
                        <input name="nama_ayah" placeholder="Nama ayah" value={anggota.nama_ayah} onChange={(e) => handleAnggotaKeluargaChange(index, e)} className={inputClass} required />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className={labelClassGray}>Nama Ibu</label>
                        <input name="nama_ibu" placeholder="Nama ibu" value={anggota.nama_ibu} onChange={(e) => handleAnggotaKeluargaChange(index, e)} className={inputClass} required />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Surat Keterangan Pindah */}
          {jenisLayanan === "keterangan-pindah" && (
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
              <h2 className="text-lg font-bold text-teal-700">Surat Keterangan Pindah</h2>
              
              {/* Data Pemohon / Kepala Keluarga */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4">Data Pemohon / Kepala Keluarga</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClassGray}>Nama Kepala Keluarga</label>
                      <input name="nama_kepala_keluarga" placeholder="Masukkan nama lengkap" value={formPindah.nama_kepala_keluarga} onChange={handlePindahChange} className={inputClass} required />
                    </div>
                    <div>
                      <label className={labelClassGray}>NIK Kepala Keluarga</label>
                      <input name="nik_kepala_keluarga" placeholder="16 digit NIK" value={formPindah.nik_kepala_keluarga} onChange={handlePindahChange} className={inputClass} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClassGray}>Nomor Kartu Keluarga (No. KK)</label>
                      <input name="nomor_kk" placeholder="16 digit nomor KK" value={formPindah.nomor_kk} onChange={handlePindahChange} className={inputClass} required />
                    </div>
                    <div>
                      <label className={labelClassGray}>Nomor HP Pemohon (Jika ada)</label>
                      <input name="nomor_hp" placeholder="Contoh: 081234567890" value={formPindah.nomor_hp} onChange={handlePindahChange} className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClassGray}>Alamat Asal</label>
                    <input name="alamat_asal" placeholder="Alamat lengkap sesuai KTP" value={formPindah.alamat_asal} onChange={handlePindahChange} className={inputClass} required />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className={labelClassGray}>RT Asal</label>
                      <input name="rt_asal" placeholder="001" value={formPindah.rt_asal} onChange={handlePindahChange} className={inputClass} required />
                    </div>
                    <div>
                      <label className={labelClassGray}>RW Asal (Jika ada)</label>
                      <input name="rw_asal" placeholder="001" value={formPindah.rw_asal} onChange={handlePindahChange} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClassGray}>Desa/Kelurahan Asal</label>
                      <input name="desa_asal" placeholder="Nama kelurahan" value={formPindah.desa_asal} onChange={handlePindahChange} className={inputClass} required />
                    </div>
                    <div>
                      <label className={labelClassGray}>Kode Pos Asal (Jika ada)</label>
                      <input name="kode_pos_asal" placeholder="12345" value={formPindah.kode_pos_asal} onChange={handlePindahChange} className={inputClass} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={labelClassGray}>Kecamatan Asal</label>
                      <input name="kecamatan_asal" placeholder="Nama kecamatan" value={formPindah.kecamatan_asal} onChange={handlePindahChange} className={inputClass} required />
                    </div>
                    <div>
                      <label className={labelClassGray}>Kabupaten/Kota Asal</label>
                      <input name="kabupaten_asal" placeholder="Nama kabupaten/kota" value={formPindah.kabupaten_asal} onChange={handlePindahChange} className={inputClass} required />
                    </div>
                    <div>
                      <label className={labelClassGray}>Provinsi Asal</label>
                      <input name="provinsi_asal" placeholder="Nama provinsi" value={formPindah.provinsi_asal} onChange={handlePindahChange} className={inputClass} required />
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Tujuan Pindah */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4">Data Tujuan Pindah</h3>
                <div className="space-y-4">
                  <div>
                    <label className={labelClassGray}>Alamat Tujuan</label>
                    <input name="alamat_tujuan" placeholder="Alamat lengkap tujuan pindah" value={formPindah.alamat_tujuan} onChange={handlePindahChange} className={inputClass} required />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className={labelClassGray}>RT Tujuan (Jika ada)</label>
                      <input name="rt_tujuan" placeholder="001" value={formPindah.rt_tujuan} onChange={handlePindahChange} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClassGray}>RW Tujuan (Jika ada)</label>
                      <input name="rw_tujuan" placeholder="001" value={formPindah.rw_tujuan} onChange={handlePindahChange} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClassGray}>Desa/Kelurahan Tujuan</label>
                      <input name="desa_tujuan" placeholder="Nama kelurahan" value={formPindah.desa_tujuan} onChange={handlePindahChange} className={inputClass} required />
                    </div>
                    <div>
                      <label className={labelClassGray}>Kode Pos Tujuan (Jika ada)</label>
                      <input name="kode_pos_tujuan" placeholder="12345" value={formPindah.kode_pos_tujuan} onChange={handlePindahChange} className={inputClass} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={labelClassGray}>Kecamatan Tujuan</label>
                      <input name="kecamatan_tujuan" placeholder="Nama kecamatan" value={formPindah.kecamatan_tujuan} onChange={handlePindahChange} className={inputClass} required />
                    </div>
                    <div>
                      <label className={labelClassGray}>Kabupaten/Kota Tujuan</label>
                      <input name="kabupaten_tujuan" placeholder="Nama kabupaten/kota" value={formPindah.kabupaten_tujuan} onChange={handlePindahChange} className={inputClass} required />
                    </div>
                    <div>
                      <label className={labelClassGray}>Provinsi Tujuan</label>
                      <input name="provinsi_tujuan" placeholder="Nama provinsi" value={formPindah.provinsi_tujuan} onChange={handlePindahChange} className={inputClass} required />
                    </div>
                  </div>
                </div>
              </div>

              {/* Informasi Kepindahan */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4">Informasi Kepindahan</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClassGray}>Alasan Pindah</label>
                    <input name="alasan_pindah" placeholder="Contoh: Pekerjaan, Pendidikan" value={formPindah.alasan_pindah} onChange={handlePindahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClassGray}>Klasifikasi Kepindahan</label>
                    <input name="klasifikasi_kepindahan" placeholder="Contoh: Dalam satu desa/antar desa" value={formPindah.klasifikasi_kepindahan} onChange={handlePindahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClassGray}>Tanggal Rencana Pindah</label>
                    <input name="tanggal_rencana_pindah" placeholder="DD/MM/YYYY" value={formPindah.tanggal_rencana_pindah} onChange={handlePindahChange} className={inputClass} required />
                  </div>
                </div>
              </div>

              {/* Anggota Keluarga yang Pindah */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-semibold text-gray-900">Anggota Keluarga yang Pindah</h3>
                  <button
                    type="button"
                    onClick={tambahAnggotaPindah}
                    className="flex items-center gap-1 text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors"
                  >
                    <span className="text-lg leading-none">+</span> Tambah Anggota
                  </button>
                </div>

                {anggotaPindah.map((anggota, index) => (
                  <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-medium text-gray-800">Anggota {index + 1}</h4>
                      {anggotaPindah.length > 1 && (
                        <button
                          type="button"
                          onClick={() => hapusAnggotaPindah(index)}
                          className="text-red-500 hover:text-red-700 text-xs font-medium"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={labelClassGray}>Nama Lengkap</label>
                        <input name="nama_lengkap" placeholder="Nama lengkap anggota keluarga" value={anggota.nama_lengkap} onChange={(e) => handleAnggotaPindahChange(index, e)} className={inputClass} required />
                      </div>
                      <div>
                        <label className={labelClassGray}>NIK</label>
                        <input name="nik" placeholder="16 digit NIK" value={anggota.nik} onChange={(e) => handleAnggotaPindahChange(index, e)} className={inputClass} required />
                      </div>
                      <div>
                        <label className={labelClassGray}>Status Hubungan Dalam Keluarga</label>
                        <input name="status_hubungan" placeholder="Contoh: Istri, Anak, Orang Tua" value={anggota.status_hubungan} onChange={(e) => handleAnggotaPindahChange(index, e)} className={inputClass} required />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Surat Keterangan Usaha (SKU) */}
          {jenisLayanan === "sku" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-lg font-bold text-teal-700 mb-4">Surat Keterangan Usaha (SKU)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Nama Instansi / Usaha</label>
                  <input 
                    name="nama_instansi" 
                    placeholder="Masukkan nama instansi atau usaha" 
                    value={formSKU.nama_instansi} 
                    onChange={handleSKUChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClass}>Jenis Kegiatan Usaha</label>
                  <input 
                    name="jenis_kegiatan_usaha" 
                    placeholder="Masukkan jenis kegiatan usaha" 
                    value={formSKU.jenis_kegiatan_usaha} 
                    onChange={handleSKUChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClass}>Nomor Badan Hukum (jika ada)</label>
                  <input 
                    name="nomor_badan_hukum" 
                    placeholder="Masukkan nomor badan hukum" 
                    value={formSKU.nomor_badan_hukum} 
                    onChange={handleSKUChange} 
                    className={inputClass} 
                  />
                </div>
                <div>
                  <label className={labelClass}>Nama Lembaga / Yayasan (jika ada)</label>
                  <input 
                    name="nama_lembaga" 
                    placeholder="Masukkan nama lembaga atau yayasan" 
                    value={formSKU.nama_lembaga} 
                    onChange={handleSKUChange} 
                    className={inputClass} 
                  />
                </div>
                <div>
                  <label className={labelClass}>Tanggal Berdiri Usaha</label>
                  <input 
                    name="tanggal_berdiri_usaha" 
                    placeholder="Contoh: 10 Januari 2020" 
                    value={formSKU.tanggal_berdiri_usaha} 
                    onChange={handleSKUChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Surat Kematian */}
          {jenisLayanan === "kematian" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-lg font-bold text-teal-700 mb-4">Surat Kematian</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Nama almarhum/almarhumah</label>
                  <input 
                    name="nama_almarhum" 
                    placeholder="Masukkan nama lengkap" 
                    value={formKematian.nama_almarhum} 
                    onChange={handleKematianChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClass}>Jenis kelamin almarhum/almarhumah</label>
                  <input 
                    name="jenis_kelamin_almarhum" 
                    placeholder="Laki-laki / Perempuan" 
                    value={formKematian.jenis_kelamin_almarhum} 
                    onChange={handleKematianChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClass}>Waktu meninggal</label>
                  <input 
                    name="waktu_meninggal" 
                    placeholder="Contoh: 14:30 WIB" 
                    value={formKematian.waktu_meninggal} 
                    onChange={handleKematianChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClass}>Agama almarhum/almarhumah</label>
                  <input 
                    name="agama_almarhum" 
                    placeholder="Masukkan agama" 
                    value={formKematian.agama_almarhum} 
                    onChange={handleKematianChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClass}>Tempat, tanggal lahir almarhum/almarhumah</label>
                  <input 
                    name="tempat_tanggal_lahir_almarhum" 
                    placeholder="Contoh: Jakarta, 15 Agustus 1945" 
                    value={formKematian.tempat_tanggal_lahir_almarhum} 
                    onChange={handleKematianChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClass}>Pekerjaan almarhum/almarhumah</label>
                  <input 
                    name="pekerjaan_almarhum" 
                    placeholder="Masukkan pekerjaan" 
                    value={formKematian.pekerjaan_almarhum} 
                    onChange={handleKematianChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClass}>Penyebab meninggal</label>
                  <input 
                    name="penyebab_meninggal" 
                    placeholder="Masukkan penyebab kematian" 
                    value={formKematian.penyebab_meninggal} 
                    onChange={handleKematianChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClass}>Nama pelapor</label>
                  <input 
                    name="nama_pelapor" 
                    placeholder="Masukkan nama pelapor" 
                    value={formKematian.nama_pelapor} 
                    onChange={handleKematianChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClass}>Alamat almarhum/almarhumah</label>
                  <input 
                    name="alamat_almarhum" 
                    placeholder="Masukkan alamat lengkap" 
                    value={formKematian.alamat_almarhum} 
                    onChange={handleKematianChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClass}>Tempat meninggal</label>
                  <input 
                    name="tempat_meninggal" 
                    placeholder="Masukkan tempat meninggal" 
                    value={formKematian.tempat_meninggal} 
                    onChange={handleKematianChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClass}>Hari, tanggal meninggal</label>
                  <input 
                    name="hari_tanggal_meninggal" 
                    placeholder="Contoh: Senin, 1 Januari 2024" 
                    value={formKematian.hari_tanggal_meninggal} 
                    onChange={handleKematianChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClass}>Status hubungan pelapor</label>
                  <input 
                    name="status_hubungan_pelapor" 
                    placeholder="Contoh: Anak, Istri, Suami" 
                    value={formKematian.status_hubungan_pelapor} 
                    onChange={handleKematianChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClass}>Tempat dimakamkan</label>
                  <input 
                    name="tempat_dimakamkan" 
                    placeholder="Masukkan tempat pemakaman" 
                    value={formKematian.tempat_dimakamkan} 
                    onChange={handleKematianChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Surat Keterangan Ahli Waris */}
          {jenisLayanan === "ahli-waris" && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-lg font-bold text-teal-700 mb-2">Surat Keterangan Ahli Waris</h2>
              <h3 className="text-base font-semibold text-gray-900 mb-4">Input Data Ahli Waris</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className={labelClass}>Tempat, tanggal kematian</label>
                  <input 
                    name="tempat_tanggal_kematian" 
                    placeholder="Contoh: Jakarta, 15 Januari 2023" 
                    value={formAhliWaris.tempat_tanggal_kematian} 
                    onChange={handleAhliWarisChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClass}>Nama lengkap yang memberi warisan</label>
                  <input 
                    name="nama_pemberi_warisan" 
                    placeholder="Masukkan nama lengkap pewaris" 
                    value={formAhliWaris.nama_pemberi_warisan} 
                    onChange={handleAhliWarisChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClass}>Nama pasangan yang memberi warisan <span className="text-gray-500">(Jika ada)</span></label>
                  <input 
                    name="nama_pasangan_pewaris" 
                    placeholder="Masukkan nama pasangan pewaris" 
                    value={formAhliWaris.nama_pasangan_pewaris} 
                    onChange={handleAhliWarisChange} 
                    className={inputClass} 
                  />
                </div>
                <div>
                  <label className={labelClass}>Nama lengkap para ahli waris</label>
                  <input 
                    name="nama_para_ahli_waris" 
                    placeholder="Masukkan nama-nama ahli waris" 
                    value={formAhliWaris.nama_para_ahli_waris} 
                    onChange={handleAhliWarisChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClass}>Ahli waris yang ditunjuk</label>
                  <input 
                    name="ahli_waris_ditunjuk" 
                    placeholder="Masukkan nama ahli waris yang ditunjuk" 
                    value={formAhliWaris.ahli_waris_ditunjuk} 
                    onChange={handleAhliWarisChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
                <div>
                  <label className={labelClass}>Warisan yang ditinggalkan</label>
                  <input 
                    name="warisan_ditinggalkan" 
                    placeholder="Masukkan jenis warisan" 
                    value={formAhliWaris.warisan_ditinggalkan} 
                    onChange={handleAhliWarisChange} 
                    className={inputClass} 
                    required 
                  />
                </div>
              </div>

              {/* Info Box Dokumen */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 text-lg">ℹ</span>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Dokumen yang harus dikumpulkan:</p>
                    <ul className="space-y-1 text-teal-700 text-sm">
                      <li>Fotocopy KK/KTP ahli waris</li>
                      <li>Buku nikah ahli waris (Jika ada)</li>
                      <li>Akte kematian (bukan surat keterangan kematian) dari yang memberikan warisan</li>
                      <li>KTP saksi (2 orang)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Surat Nikah */}
          {jenisLayanan === "nikah" && (
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
              <h2 className="text-lg font-bold text-teal-700">Data Surat Nikah</h2>
              
              {/* Data Orang Tua Pemohon */}
              <div>
                <h3 className="text-base font-semibold text-teal-700 mb-4">Data Orang Tua Pemohon</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Nama Lengkap Ayah</label>
                    <input name="ortu_ayah_nama" placeholder="Masukkan nama lengkap ayah" value={formNikah.ortu_ayah_nama} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Nama Lengkap Ibu</label>
                    <input name="ortu_ibu_nama" placeholder="Masukkan nama lengkap ibu" value={formNikah.ortu_ibu_nama} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>NIK Ayah</label>
                    <input name="ortu_ayah_nik" placeholder="Masukkan NIK ayah" value={formNikah.ortu_ayah_nik} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>NIK Ibu</label>
                    <input name="ortu_ibu_nik" placeholder="Masukkan NIK ibu" value={formNikah.ortu_ibu_nik} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Nomor KK Ayah</label>
                    <input name="ortu_ayah_kk" placeholder="Masukkan nomor KK ayah" value={formNikah.ortu_ayah_kk} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Nomor KK Ibu</label>
                    <input name="ortu_ibu_kk" placeholder="Masukkan nomor KK ibu" value={formNikah.ortu_ibu_kk} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Tempat, Tanggal Lahir Ayah</label>
                    <input name="ortu_ayah_ttl" placeholder="Contoh: Surabaya, 5 Mei 1965" value={formNikah.ortu_ayah_ttl} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Tempat, Tanggal Lahir Ibu</label>
                    <input name="ortu_ibu_ttl" placeholder="Contoh: Bandung, 12 Juni 1970" value={formNikah.ortu_ibu_ttl} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Agama Ayah</label>
                    <input name="ortu_ayah_agama" placeholder="Masukkan agama ayah" value={formNikah.ortu_ayah_agama} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Agama Ibu</label>
                    <input name="ortu_ibu_agama" placeholder="Masukkan agama ibu" value={formNikah.ortu_ibu_agama} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Kewarganegaraan Ayah</label>
                    <input name="ortu_ayah_kewarganegaraan" placeholder="Masukkan kewarganegaraan ayah" value={formNikah.ortu_ayah_kewarganegaraan} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Kewarganegaraan Ibu</label>
                    <input name="ortu_ibu_kewarganegaraan" placeholder="Masukkan kewarganegaraan ibu" value={formNikah.ortu_ibu_kewarganegaraan} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Status Perkawinan Ayah</label>
                    <input name="ortu_ayah_status_perkawinan" placeholder="Masukkan status perkawinan ayah" value={formNikah.ortu_ayah_status_perkawinan} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Status Perkawinan Ibu</label>
                    <input name="ortu_ibu_status_perkawinan" placeholder="Masukkan status perkawinan ibu" value={formNikah.ortu_ibu_status_perkawinan} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Pekerjaan Ayah</label>
                    <input name="ortu_ayah_pekerjaan" placeholder="Masukkan pekerjaan ayah" value={formNikah.ortu_ayah_pekerjaan} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Pekerjaan Ibu</label>
                    <input name="ortu_ibu_pekerjaan" placeholder="Masukkan pekerjaan ibu" value={formNikah.ortu_ibu_pekerjaan} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Alamat Ayah</label>
                    <textarea name="ortu_ayah_alamat" placeholder="Masukkan alamat lengkap ayah" value={formNikah.ortu_ayah_alamat} onChange={handleNikahChange} className={inputClass + " min-h-[80px]"} required />
                  </div>
                  <div>
                    <label className={labelClass}>Alamat Ibu</label>
                    <textarea name="ortu_ibu_alamat" placeholder="Masukkan alamat lengkap ibu" value={formNikah.ortu_ibu_alamat} onChange={handleNikahChange} className={inputClass + " min-h-[80px]"} required />
                  </div>
                </div>
              </div>

              {/* Data Calon Pasangan */}
              <div>
                <h3 className="text-base font-semibold text-teal-700 mb-4">Data Calon Pasangan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Nama Lengkap</label>
                    <input name="calon_nama" placeholder="Masukkan nama lengkap calon pasangan" value={formNikah.calon_nama} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Agama</label>
                    <input name="calon_agama" placeholder="Masukkan agama" value={formNikah.calon_agama} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>NIK</label>
                    <input name="calon_nik" placeholder="Masukkan NIK calon pasangan" value={formNikah.calon_nik} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Kewarganegaraan</label>
                    <input name="calon_kewarganegaraan" placeholder="Masukkan kewarganegaraan" value={formNikah.calon_kewarganegaraan} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Nomor Kartu Keluarga (KK)</label>
                    <input name="calon_kk" placeholder="Masukkan nomor KK calon pasangan" value={formNikah.calon_kk} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Status Perkawinan</label>
                    <input name="calon_status_perkawinan" placeholder="Lajang/Janda/Duda" value={formNikah.calon_status_perkawinan} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Jenis Kelamin</label>
                    <input name="calon_jenis_kelamin" placeholder="Laki-laki / Perempuan" value={formNikah.calon_jenis_kelamin} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Pekerjaan</label>
                    <input name="calon_pekerjaan" placeholder="Masukkan pekerjaan" value={formNikah.calon_pekerjaan} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Tempat, Tanggal Lahir</label>
                    <input name="calon_ttl" placeholder="Contoh: Yogyakarta, 8 Februari 1995" value={formNikah.calon_ttl} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Alamat</label>
                    <textarea name="calon_alamat" placeholder="Masukkan alamat lengkap" value={formNikah.calon_alamat} onChange={handleNikahChange} className={inputClass + " min-h-[80px]"} required />
                  </div>
                </div>
              </div>

              {/* Data Orang Tua Calon Pasangan */}
              <div>
                <h3 className="text-base font-semibold text-teal-700 mb-4">Data Orang Tua Calon Pasangan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Nama Lengkap Ayah</label>
                    <input name="ortu_calon_ayah_nama" placeholder="Masukkan nama lengkap ayah" value={formNikah.ortu_calon_ayah_nama} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Nama Lengkap Ibu</label>
                    <input name="ortu_calon_ibu_nama" placeholder="Masukkan nama lengkap ibu" value={formNikah.ortu_calon_ibu_nama} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>NIK Ayah</label>
                    <input name="ortu_calon_ayah_nik" placeholder="Masukkan NIK ayah" value={formNikah.ortu_calon_ayah_nik} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>NIK Ibu</label>
                    <input name="ortu_calon_ibu_nik" placeholder="Masukkan NIK ibu" value={formNikah.ortu_calon_ibu_nik} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Nomor KK Ayah</label>
                    <input name="ortu_calon_ayah_kk" placeholder="Masukkan nomor KK ayah" value={formNikah.ortu_calon_ayah_kk} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Nomor KK Ibu</label>
                    <input name="ortu_calon_ibu_kk" placeholder="Masukkan nomor KK ibu" value={formNikah.ortu_calon_ibu_kk} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Tempat, Tanggal Lahir Ayah</label>
                    <input name="ortu_calon_ayah_ttl" placeholder="Contoh: Semarang, 15 Juli 1960" value={formNikah.ortu_calon_ayah_ttl} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Tempat, Tanggal Lahir Ibu</label>
                    <input name="ortu_calon_ibu_ttl" placeholder="Contoh: Bandung, 12 Juni 1970" value={formNikah.ortu_calon_ibu_ttl} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Agama Ayah</label>
                    <input name="ortu_calon_ayah_agama" placeholder="Masukkan agama ayah" value={formNikah.ortu_calon_ayah_agama} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Agama Ibu</label>
                    <input name="ortu_calon_ibu_agama" placeholder="Masukkan agama ibu" value={formNikah.ortu_calon_ibu_agama} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Kewarganegaraan Ayah</label>
                    <input name="ortu_calon_ayah_kewarganegaraan" placeholder="Masukkan kewarganegaraan ayah" value={formNikah.ortu_calon_ayah_kewarganegaraan} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Kewarganegaraan Ibu</label>
                    <input name="ortu_calon_ibu_kewarganegaraan" placeholder="Masukkan kewarganegaraan ibu" value={formNikah.ortu_calon_ibu_kewarganegaraan} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Status Perkawinan Ayah</label>
                    <input name="ortu_calon_ayah_status_perkawinan" placeholder="Masukkan status perkawinan ayah" value={formNikah.ortu_calon_ayah_status_perkawinan} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Status Perkawinan Ibu</label>
                    <input name="ortu_calon_ibu_status_perkawinan" placeholder="Masukkan status perkawinan ibu" value={formNikah.ortu_calon_ibu_status_perkawinan} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Pekerjaan Ayah</label>
                    <input name="ortu_calon_ayah_pekerjaan" placeholder="Masukkan pekerjaan ayah" value={formNikah.ortu_calon_ayah_pekerjaan} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Pekerjaan Ibu</label>
                    <input name="ortu_calon_ibu_pekerjaan" placeholder="Masukkan pekerjaan ibu" value={formNikah.ortu_calon_ibu_pekerjaan} onChange={handleNikahChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Alamat Ayah</label>
                    <textarea name="ortu_calon_ayah_alamat" placeholder="Masukkan alamat lengkap ayah" value={formNikah.ortu_calon_ayah_alamat} onChange={handleNikahChange} className={inputClass + " min-h-[80px]"} required />
                  </div>
                  <div>
                    <label className={labelClass}>Alamat Ibu</label>
                    <textarea name="ortu_calon_ibu_alamat" placeholder="Masukkan alamat lengkap ibu" value={formNikah.ortu_calon_ibu_alamat} onChange={handleNikahChange} className={inputClass + " min-h-[80px]"} required />
                  </div>
                </div>
              </div>

              {/* Info Box Dokumen */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 text-lg">ℹ</span>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">Dokumen yang harus dikumpulkan:</p>
                    <ol className="space-y-1 text-teal-700 text-sm list-decimal list-inside">
                      <li>Surat Pengantar Perkawinan dari Desa/kelurahan</li>
                      <li>Persetujuan Calon Mempelai</li>
                      <li>Fotokopi KTP</li>
                      <li>Fotokopi Akta Kelahiran</li>
                      <li>Fotokopi Kartu Keluarga</li>
                      <li>Pasfoto 2×3 cm = 5 Lembar berlatar belakang biru</li>
                      <li>Pasfoto 4×6 cm = 1 Lembar berlatar belakang biru</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Surat Keterangan Penghasilan */}
          {jenisLayanan === "penghasilan" && (
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
              <h2 className="text-lg font-bold text-teal-700">Surat Keterangan Penghasilan</h2>
              <p className="text-sm text-gray-600">Kolom bertanda (Jika ada) boleh dikosongkan.</p>
              
              {/* Data Wali */}
              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-4">Data Wali</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Nama lengkap wali</label>
                    <input name="nama_lengkap_wali" placeholder="Masukkan nama lengkap wali" value={formPenghasilan.nama_lengkap_wali} onChange={handlePenghasilanChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>NIK wali</label>
                    <input name="nik_wali" placeholder="Masukkan NIK wali" value={formPenghasilan.nik_wali} onChange={handlePenghasilanChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Tempat, tanggal lahir wali (Jika ada)</label>
                    <input name="tempat_tanggal_lahir_wali" placeholder="Contoh: Jakarta, 15 Agustus 1975" value={formPenghasilan.tempat_tanggal_lahir_wali} onChange={handlePenghasilanChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Jenis kelamin wali (Jika ada)</label>
                    <input name="jenis_kelamin_wali" placeholder="Laki-laki / Perempuan" value={formPenghasilan.jenis_kelamin_wali} onChange={handlePenghasilanChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Agama wali (Jika ada)</label>
                    <input name="agama_wali" placeholder="Masukkan agama wali" value={formPenghasilan.agama_wali} onChange={handlePenghasilanChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Pekerjaan wali (Jika ada)</label>
                    <input name="pekerjaan_wali" placeholder="Masukkan pekerjaan wali" value={formPenghasilan.pekerjaan_wali} onChange={handlePenghasilanChange} className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Data Anak */}
              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-4">Data Anak</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Nama lengkap anak</label>
                    <input name="nama_lengkap_anak" placeholder="Masukkan nama lengkap anak" value={formPenghasilan.nama_lengkap_anak} onChange={handlePenghasilanChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>NIK anak</label>
                    <input name="nik_anak" placeholder="Masukkan NIK anak" value={formPenghasilan.nik_anak} onChange={handlePenghasilanChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Tempat, tanggal lahir anak (Jika ada)</label>
                    <input name="tempat_tanggal_lahir_anak" placeholder="Contoh: Jakarta, 15 Agustus 2000" value={formPenghasilan.tempat_tanggal_lahir_anak} onChange={handlePenghasilanChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Jenis kelamin anak (Jika ada)</label>
                    <input name="jenis_kelamin_anak" placeholder="Laki-laki / Perempuan" value={formPenghasilan.jenis_kelamin_anak} onChange={handlePenghasilanChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Agama anak (Jika ada)</label>
                    <input name="agama_anak" placeholder="Masukkan agama anak" value={formPenghasilan.agama_anak} onChange={handlePenghasilanChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Pekerjaan anak (Jika ada)</label>
                    <input name="pekerjaan_anak" placeholder="Masukkan pekerjaan anak" value={formPenghasilan.pekerjaan_anak} onChange={handlePenghasilanChange} className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Keperluan & Penghasilan */}
              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-4">Keperluan</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className={labelClass}>Keperluan</label>
                    <textarea name="keperluan" placeholder="Masukkan keperluan surat penghasilan" value={formPenghasilan.keperluan} onChange={handlePenghasilanChange} className={inputClass + " min-h-[80px]"} required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Penghasilan per bulan</label>
                      <input name="penghasilan_per_bulan" placeholder="Contoh: Rp 3.000.000" value={formPenghasilan.penghasilan_per_bulan} onChange={handlePenghasilanChange} className={inputClass} required />
                    </div>
                    <div>
                      <label className={labelClass}>Jurusan/Prodi (Jika ada)</label>
                      <input name="jurusan_prodi" placeholder="Masukkan jurusan/program studi" value={formPenghasilan.jurusan_prodi} onChange={handlePenghasilanChange} className={inputClass} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          {jenisLayanan && (
            <div className="flex justify-center pt-4">
              <button 
                type="submit" 
                disabled={loading} 
                className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-16 py-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Mengirim..." : "Kirim"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LayananForm;
