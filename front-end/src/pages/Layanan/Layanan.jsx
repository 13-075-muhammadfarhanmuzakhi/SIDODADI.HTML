import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logoKKN from "../../assets/images/logokkn.png";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardItemAnim = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

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
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      className="mb-6 sm:mb-10"
    >
      <motion.h2
        variants={itemVariants}
        className="text-base sm:text-lg font-bold text-[#052e1d] mb-2.5 flex items-center gap-2 px-1"
      >
        <span className="w-2 h-2 rounded-full bg-[#B8860B]"></span>
        {title}
      </motion.h2>

      <motion.div
        variants={itemVariants}
        className="rounded-xl overflow-hidden border border-[#052e1d]/20 border-t-4 border-t-[#B8860B] shadow-sm bg-white"
      >
        <div className="bg-gradient-to-r from-[#02140D] via-[#052e1d] to-[#02140D] text-slate-200 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-between border-b border-[#B8860B]/40">
          <span>Nama Dokumen</span>
          <span className="pr-2 sm:pr-4">Aksi</span>
        </div>

        <div className="divide-y divide-gray-100">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ backgroundColor: "rgba(184, 134, 11, 0.04)" }}
              className={`p-2.5 sm:p-3.5 flex items-center justify-between gap-2 sm:gap-4 transition-colors ${
                idx % 2 === 0 ? "bg-slate-50/60" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <span className="text-xs font-bold text-gray-400 w-3.5 flex-shrink-0 text-center">
                  {item.no}
                </span>
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-xs ${iconColor}`}
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
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
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-bold text-gray-800 leading-snug truncate sm:whitespace-normal">
                    {item.nama}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 leading-tight line-clamp-1 sm:line-clamp-none">
                    {item.deskripsi}
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0 pl-1">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={
                      item.path +
                      (item.id_dokumen ? `?dokumen=${item.id_dokumen}` : "")
                    }
                    className="inline-flex items-center gap-1 bg-[#B8860B] hover:bg-[#8B6508] text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-md shadow-xs transition-all whitespace-nowrap"
                  >
                    <span>Telusuri</span>
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );

  return (
    <>
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 pt-20 sm:pt-24 pb-12 sm:pb-20 min-h-screen">
        {/* HEADER PAGE */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-10 text-left px-1"
        >
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#B8860B] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 inline-block mb-2">
            Layanan Publik Online
          </span>
          <h1 className="text-xl sm:text-3xl font-black text-[#052e1d] leading-tight">
            Template Dokumen & Surat
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl">
            Pilih dan ajukan dokumen persyaratan pelayanan desa secara cepat dan
            praktis.
          </p>

          {/* TOMBOL CEK STATUS PENGAJUAN (KOMPAK & POSISI KIRI) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="mt-3 sm:mt-4 inline-block"
          >
            <Link
              to="/layanan/status-dokumen"
              className="inline-flex items-center gap-1.5 text-[#B8860B] hover:text-amber-300 font-semibold px-3 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-sm rounded-md sm:rounded-lg transition-all border border-[#B8860B] bg-gradient-to-r from-[#02140D] to-[#052e1d] shadow-sm hover:shadow-amber-500/10"
            >
              <span>Cek Status Pengajuan</span>
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* SEKSI LIST DOKUMEN */}
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

      {/* FOOTER UTAMA */}
      <footer className="w-full bg-emerald-950 text-slate-200 border-t-2 border-amber-500/40 pt-6 sm:pt-8 pb-4 px-4 sm:px-8">
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-5 pb-5 border-b border-emerald-800/60"
        >
          {/* IDENTITAS DESA */}
          <motion.div
            variants={cardItemAnim}
            className="space-y-1.5 sm:col-span-2 md:col-span-1"
          >
            <div className="flex items-center gap-2">
              <img
                src={logoKKN}
                alt="Logo Desa"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
              />
              <div>
                <h3 className="font-extrabold text-xs sm:text-sm text-amber-400 tracking-wide">
                  SIDODADI ASRI
                </h3>
                <p className="text-[9px] sm:text-[10px] text-emerald-200/80">
                  Jati Agung, Lampung Selatan
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-[11px] text-slate-300 leading-relaxed">
              Portal resmi pelayanan publik dan transparansi informasi
              masyarakat Desa Sidodadi Asri.
            </p>
          </motion.div>

          {/* NAVIGASI UTAMA */}
          <motion.div variants={cardItemAnim}>
            <h4 className="text-xs sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2 border-b border-amber-500/30 pb-0.5 inline-block">
              Navigasi Utama
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-[11px]">
              <li>
                <Link
                  to="/"
                  className="text-slate-300 hover:text-amber-300 transition-colors"
                >
                  Profil Desa
                </Link>
              </li>
              <li>
                <Link
                  to="/layanan"
                  className="text-amber-400 font-extrabold flex items-center gap-1.5 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  Layanan Desa
                </Link>
              </li>
              <li>
                <Link
                  to="/galeri"
                  className="text-slate-300 hover:text-amber-300 transition-colors"
                >
                  Galeri & Artikel
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* JAM PELAYANAN */}
          <motion.div variants={cardItemAnim}>
            <h4 className="text-xs sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2 border-b border-amber-500/30 pb-0.5 inline-block">
              Jam Pelayanan
            </h4>
            <ul className="space-y-1 text-xs sm:text-[11px] text-slate-300">
              <li className="flex justify-between gap-2">
                <span>Senin - Kamis:</span>
                <span className="font-semibold text-amber-200 whitespace-nowrap">
                  08:00 - 15:30 WIB
                </span>
              </li>
              <li className="flex justify-between gap-2">
                <span>Jumat:</span>
                <span className="font-semibold text-amber-200 whitespace-nowrap">
                  08:00 - 11:30 WIB
                </span>
              </li>
              <li className="flex justify-between gap-2">
                <span>Sabtu - Minggu:</span>
                <span className="font-semibold text-red-400">Tutup</span>
              </li>
            </ul>
          </motion.div>

          {/* KONTAK KANTOR */}
          <motion.div variants={cardItemAnim}>
            <h4 className="text-xs sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2 border-b border-amber-500/30 pb-0.5 inline-block">
              Kontak Kantor
            </h4>
            <p className="text-xs sm:text-[11px] text-slate-300 leading-relaxed mb-1.5">
              📍 Jl. Balai Desa No. 01, Sidodadi Asri, Kec. Jati Agung, Kab.
              Lampung Selatan
            </p>
            <p className="text-xs sm:text-[11px] text-slate-300 break-all sm:break-normal">
              ✉️ pemdes.sidodadiasri@gmail.com
            </p>
          </motion.div>
        </motion.div>

        {/* COPYRIGHT */}
        <div className="max-w-7xl mx-auto pt-3 text-center text-[10px] sm:text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <p>© 2026 Pemerintah Desa Sidodadi Asri. Hak Cipta Dilindungi.</p>
          <p className="text-amber-400/80 font-medium">
            KKN Tematik Desa Sidodadi Asri
          </p>
        </div>
      </footer>
    </>
  );
};

export default Layanan;
