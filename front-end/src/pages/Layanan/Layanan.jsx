import { Link } from "react-router-dom";
// Pastikan path gambar ini sudah benar sesuai perbaikan sebelumnya
import logoKKN from "../../assets/images/logokkn.png";

const Layanan = () => {
  const suratKependudukan = [
    {
      no: 1,
      nama: "Surat Keterangan Domisili",
      deskripsi: "Surat keterangan domisili untuk keperluan administrasi",
      path: "/layanan/form",
      id_dokumen: null,
    },
    {
      no: 2,
      nama: "Surat Nikah",
      deskripsi: "Surat Nikah",
      path: "/layanan/form",
      id_dokumen: null,
    },
    {
      no: 3,
      nama: "Surat Pengantar Kartu Keluarga (KK)",
      deskripsi: "Surat pengantar untuk pembuatan atau perubahan KK",
      path: "/layanan/form",
      id_dokumen: null,
    },
    {
      no: 4,
      nama: "Surat Keterangan Pindah",
      deskripsi: "Surat keterangan untuk kepindahan domisili",
      path: "/layanan/form",
      id_dokumen: null,
    },
    {
      no: 5,
      nama: "Surat Akta Kelahiran",
      deskripsi: "Surat Akta Kelahiran",
      path: "/layanan/form",
      id_dokumen: "2",
    },
    {
      no: 6,
      nama: "Surat Kematian",
      deskripsi: "Surat Keterangan/Akta Kematian",
      path: "/layanan/form",
      id_dokumen: null,
    },
  ];

  const suratEkonomi = [
    {
      no: 1,
      nama: "Surat Keterangan Tidak Mampu (SKTM)",
      deskripsi: "SKTM untuk keperluan administrasi umum",
      path: "/layanan/form",
      id_dokumen: "1",
    },
    {
      no: 2,
      nama: "Surat Keterangan Usaha",
      deskripsi: "Surat keterangan untuk usaha mikro dan makro",
      path: "/layanan/form",
      id_dokumen: null,
    },
    {
      no: 3,
      nama: "Surat Keterangan Penghasilan",
      deskripsi: "Surat keterangan penghasilan untuk keperluan kredit",
      path: "/layanan/form",
      id_dokumen: null,
    },
  ];

  const suratSosial = [
    {
      no: 1,
      nama: "Surat Izin Keramaian",
      deskripsi: "Surat izin untuk acara keramaian atau hajatan",
      path: "/layanan/form",
      id_dokumen: null,
    },
    {
      no: 2,
      nama: "Surat Keterangan Janda/Duda",
      deskripsi: "Surat keterangan status cerai atau ditinggal mati",
      path: "/layanan/form",
      id_dokumen: null,
    },
    {
      no: 3,
      nama: "Surat Keterangan Ahli Waris",
      deskripsi: "Surat keterangan untuk keperluan ahli waris",
      path: "/layanan/form",
      id_dokumen: null,
    },
  ];

  const SectionTable = ({ title, items, iconColor }) => (
    <section className="mb-8">
      <h2 className="text-base font-bold text-[#052e1d] mb-3">{title}</h2>
      {/* CARD: Border hijau gelap dengan aksen atas emas */}
      <div className="rounded-lg overflow-hidden border-2 border-[#052e1d] border-t-4 border-t-[#B8860B] shadow-sm">
        <table className="w-full">
          <thead>
            {/* HEADER TABEL: Gradasi hijau ke hitam dengan garis batas emas */}
            <tr className="text-slate-200 bg-gradient-to-r from-[#02140D] via-[#052e1d] to-[#02140D]">
              <th className="px-3 py-2 text-left text-sm font-semibold w-12 border-b border-[#B8860B]/40">
                No
              </th>
              <th className="px-3 py-2 text-left text-sm font-semibold border-b border-[#B8860B]/40">
                Nama Dokumen
              </th>
              <th className="px-3 py-2 text-left text-sm font-semibold w-28 border-b border-[#B8860B]/40">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-3 py-2 text-sm text-gray-700">{item.no}</td>
                <td className="px-3 py-2">
                  <div className="flex items-start gap-2">
                    <div
                      className={`mt-0.5 w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${iconColor}`}
                    >
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {item.nama}
                      </p>
                      <p className="text-xs text-gray-500">{item.deskripsi}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2">
                  {/* TOMBOL: Tema emas */}
                  <Link
                    to={
                      item.path +
                      (item.id_dokumen ? `?dokumen=${item.id_dokumen}` : "")
                    }
                    className="inline-block bg-[#B8860B] hover:bg-[#8B6508] text-white text-xs font-medium px-3 py-1.5 rounded transition-colors"
                  >
                    Telusuri
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10 pt-24 pb-20 min-h-screen">
        <div className="mb-8">
          <h1 className="text-xl font-extrabold text-[#052e1d]">
            Template Dokumen
          </h1>
          <p className="text-sm text-gray-600 mt-0.5">
            Unduh template surat yang anda butuhkan
          </p>
          {/* TOMBOL STATUS: Gradasi Hijau-Hitam dengan border Emas */}
          <Link
            to="/layanan/status-dokumen"
            className="inline-block mt-6 text-[#B8860B] font-medium px-8 py-2 rounded-lg transition-all hover:brightness-110 border border-[#B8860B] bg-gradient-to-r from-[#02140D] to-[#052e1d]"
          >
            Cek Status
          </Link>
        </div>

        {/* Ikon diseragamkan dengan variasi warna emas/hijau */}
        <SectionTable
          title="Surat Kependudukan"
          items={suratKependudukan}
          iconColor="bg-gradient-to-br from-[#02140D] to-[#052e1d]"
        />
        <SectionTable
          title="Surat Ekonomi & Pekerjaan"
          items={suratEkonomi}
          iconColor="bg-[#B8860B]"
        />
        <SectionTable
          title="Surat Sosial & Umum"
          items={suratSosial}
          iconColor="bg-gradient-to-br from-[#02140D] to-[#052e1d]"
        />
      </div>

      {/* ================= 5. FOOTER INLINE (GRADASI HIJAU HITAM & NAVIGASI LAYANAN) ================= */}
      <footer className="w-full bg-gradient-to-b from-[#052e1d] to-[#02140D] text-slate-200 border-t-2 border-[#B8860B]/40 pt-10 pb-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#B8860B]/20">
          {/* Identitas Desa */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src={logoKKN}
                alt="Logo Desa"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h3 className="font-extrabold text-base text-amber-400 tracking-wide">
                  SIDODADI ASRI
                </h3>
                <p className="text-[10px] text-slate-400">
                  Jati Agung, Lampung Selatan
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Portal resmi pelayanan publik dan transparansi informasi
              masyarakat Desa Sidodadi Asri.
            </p>
          </div>

          {/* Navigasi (Layanan Surat Berwarna Emas) */}
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 border-b border-[#B8860B]/30 pb-1 inline-block">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/"
                  className="text-slate-300 hover:text-amber-300 transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                {/* Penanda emas dihilangkan dari Profil Desa */}
                <Link
                  to="/profile"
                  className="text-slate-300 hover:text-amber-300 transition-colors"
                >
                  Profil Desa
                </Link>
              </li>
              <li>
                {/* Penanda emas dipindah ke Layanan Surat */}
                <Link
                  to="/layanan"
                  className="text-[#B8860B] font-extrabold transition-colors"
                >
                  Layanan Surat
                </Link>
              </li>
              <li>
                <Link
                  to="/Kontak"
                  className="text-slate-300 hover:text-amber-300 transition-colors"
                >
                  Kontak
                </Link>
              </li>

              <li>
                <Link
                  to="/galeri"
                  className="text-slate-300 hover:text-amber-300 transition-colors"
                >
                  Galeri & Berita
                </Link>
              </li>
            </ul>
          </div>

          {/* Jam Operasional */}
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 border-b border-[#B8860B]/30 pb-1 inline-block">
              Jam Pelayanan
            </h4>
            <ul className="space-y-1 text-xs text-slate-300">
              <li className="flex justify-between">
                <span>Senin - Kamis:</span>
                <span className="font-semibold text-amber-200">
                  08:00 - 15:30 WIB
                </span>
              </li>
              <li className="flex justify-between">
                <span>Jumat:</span>
                <span className="font-semibold text-amber-200">
                  08:00 - 11:30 WIB
                </span>
              </li>
              <li className="flex justify-between">
                <span>Sabtu - Minggu:</span>
                <span className="font-semibold text-red-400">Tutup</span>
              </li>
            </ul>
          </div>

          {/* Kontak Desa */}
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 border-b border-[#B8860B]/30 pb-1 inline-block">
              Kontak Kantor
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-1.5">
              📍 Jl. Balai Desa No. 01, Sidodadi Asri, Kec. Jati Agung, Kab.
              Lampung Selatan
            </p>
            <p className="text-xs text-slate-300">
              ✉️ pemdes.sidodadiasri@gmail.com
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto pt-4 text-center text-[10px] text-slate-400 flex flex-col md:flex-row justify-between items-center gap-2">
          <p>© 2026 Pemerintah Desa Sidodadi Asri. Hak Cipta Dilindungi.</p>
          <p className="text-amber-400/80 font-medium">
            KKN Desa Sidodadi Asri
          </p>
        </div>
      </footer>
    </>
  );
};

export default Layanan;
