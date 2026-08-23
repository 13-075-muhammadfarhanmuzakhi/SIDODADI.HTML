import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * ============================================================================
 * KOMPONEN LAYOUT & ASSET BERSAMA
 * ============================================================================
 */
import MarqueeBanner from "../../layouts/MarqueeBanner";

// Asset Logo & Foto Warga
import logoKKN from "../../assets/images/logokkn.png";
import fotoLegina from "../../assets/images/legina.jpeg";
import fotoMulyadi from "../../assets/images/mulyadi.jpeg";
import fotoSumarman from "../../assets/images/sumarman.jpeg";
import fotoRukiyah from "../../assets/images/rukiyah.jpeg";
import fotoAini from "../../assets/images/aini.jpeg";
import fotoAri from "../../assets/images/ari.jpeg";

// Fallback Gambar
const gambardesa = "/assets/images/gambardesa.jpg";
const fallbackHeroBg =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop";

/**
 * ============================================================================
 * KONFIGURASI VARIAN ANIMASI FRAMER MOTION
 * ============================================================================
 */
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const paperPopUp = {
  hidden: { opacity: 0, scale: 0.97, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, type: "spring", stiffness: 110, damping: 16 },
  },
};

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardItemAnim = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, type: "spring", stiffness: 100, damping: 16 },
  },
  exit: (dir) => ({
    x: dir < 0 ? 120 : -120,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.25 },
  }),
};

/**
 * ============================================================================
 * DATA MASTER SIMULASI (ARTIKEL, TESTIMONIAL, STATISTIK, SLIDER)
 * ============================================================================
 */
const DATA_SLIDES = [
  {
    id: "sejarah",
    title: "Sejarah Singkat Desa",
    subtitle: "Jejak Langkah & Perkembangan Wilayah",
    content:
      "Desa Sidodadi Asri terbentuk dari kawasan pemukiman dan perkebunan yang mulai dibuka oleh masyarakat sejak tahun 1939 bersama para pekerja Perusahaan Negara Perkebunan. Seiring meningkatnya jumlah penduduk serta aktivitas ekonomi sosial, muncul aspirasi untuk membentuk wilayah otonom tersendiri. Melalui semangat kebersamaan para tokoh masyarakat, pada tahun 1975 Sidodadi Asri secara resmi berpisah dari Desa Kertosari dan dikukuhkan sebagai desa mandiri di Kecamatan Jati Agung, Kabupaten Lampung Selatan.",
  },
  {
    id: "visi-misi",
    title: "Visi & Misi Pembangunan",
    subtitle: "Arah & Komitmen Masa Depan Desa",
    visi: "Mewujudkan Desa Sidodadi Asri yang Mandiri, Sejahtera, Berdaya Saing, dan Berkelanjutan Melalui Tata Kelola Pemerintahan yang Transparan.",
    misi: [
      "Meningkatkan kualitas pelayanan publik berbasis digital yang cepat, transparan, dan ramah.",
      "Memperkuat perekonomian desa melalui pemberdayaan UMKM lokal dan sektor pertanian produktif.",
      "Melestarikan nilai gotong royong, kebudayaan, serta keharmonisan kehidupan antarwarga.",
      "Mempercepat pembangunan infrastruktur desa yang merata, berkelanjutan, dan ramah lingkungan.",
    ],
  },
];

const DATA_TESTIMONIALS = [
  {
    id: 1,
    name: "SUTIBYO & LEGINA",
    position: "PENSIUNAN & IRT",
    text: "Desa yang sangat nyaman untuk ditinggali, suasana tenang, warga hidup rukun, ramah, dan musyawarah selalu diutamakan dalam pengambilan keputusan bersama.",
    image: fotoLegina,
  },
  {
    id: 2,
    name: "MULYADI",
    position: "WARGA SIDODADI ASRI",
    text: "Solidaritas dan budaya gotong royong warga sangat tinggi. Setiap kegiatan sosial dan pembangunan kemasyarakatan selalu didukung penuh oleh seluruh warga.",
    image: fotoMulyadi,
  },
  {
    id: 3,
    name: "SUMARMAN",
    position: "KEPALA DUSUN 1",
    text: "Rasa persaudaraan antarwarga sangat kuat. Pelayanan pemerintah desa juga cepat dan terbuka untuk mendengar masukan demi kemajuan bersama.",
    image: fotoSumarman,
  },
  {
    id: 4,
    name: "KABUL & RUKIYAH",
    position: "WARGA SIDODADI ASRI",
    text: "Lingkungan desa yang aman dan hangat. Tidak ada sekat antar pendatang maupun warga asli, semuanya saling merangkul dan mendukung.",
    image: fotoRukiyah,
  },
  {
    id: 5,
    name: "NASIFATUL AINI",
    position: "PEMILIK UMKM DESA",
    text: "Pemerintah desa sangat mendukung perkembangan pelaku UMKM lokal, memberikan wadah promosi dan fasilitas pelatihan yang bermanfaat.",
    image: fotoAini,
  },
  {
    id: 6,
    name: "ARI AFFANDI",
    position: "KETUA RT",
    text: "Keamanan lingkungan terjaga dengan baik melalui siskamling aktif. Warga sangat peduli terhadap ketertiban dan kebersihan lingkungan.",
    image: fotoAri,
  },
];

const DATA_STATISTIK = [
  {
    title: "Total Penduduk",
    value: "4.850 Jiwa",
    icon: (
      <svg
        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    title: "Laki - Laki",
    value: "2.460 Jiwa",
    icon: (
      <svg
        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    title: "Perempuan",
    value: "2.390 Jiwa",
    icon: (
      <svg
        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    title: "Luas Wilayah",
    value: "9,78 km²",
    icon: (
      <svg
        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "Sektor Utama",
    value: "Pertanian & UMKM",
    icon: (
      <svg
        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Penerima Bantuan",
    value: "320 KK",
    icon: (
      <svg
        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
];

/**
 * ============================================================================
 * KOMPONEN UTAMA HALAMAN HOME
 * ============================================================================
 */
const Home = () => {
  // ---------------- STATE KELOLA DATA ----------------
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotif, setShowNotif] = useState(false);
  const [pengumuman, setPengumuman] = useState([]);

  // ---------------- STATE SLIDER SEJARAH ----------------
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  // ---------------- STATE SLIDER TESTIMONIAL ----------------
  const [currentTesti, setCurrentTesti] = useState(0);
  const [testiDir, setTestiDir] = useState(1);

  // ---------------- STATE MAP INTERSECTION ----------------
  const [mapVisible, setMapVisible] = useState(false);
  const mapRef = useRef(null);

  // ---------------- STATE FORMULIR WA ----------------
  const [formData, setFormData] = useState({
    nama: "",
    noHp: "",
    email: "",
    jenisPertanyaan: "Pelayanan Surat / Administrasi",
    pesan: "",
  });

  // ---------------- API FETCHING ----------------
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/artikel");
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        console.error("Gagal mengambil data artikel:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchPengumuman = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/pengumuman-home");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setPengumuman(data);
          setTimeout(() => setShowNotif(true), 1000);
        }
      } catch (err) {
        console.error("Gagal mengambil pengumuman:", err);
      }
    };

    fetchArticles();
    fetchPengumuman();
  }, []);

  // ---------------- INTERSECTION OBSERVER MAPS ----------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setMapVisible(true);
        });
      },
      { threshold: 0.15 },
    );

    if (mapRef.current) observer.observe(mapRef.current);
    return () => {
      if (mapRef.current) observer.unobserve(mapRef.current);
    };
  }, []);

  // ---------------- HANDLER NAVIGATION SLIDER ----------------
  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % DATA_SLIDES.length);
  };
  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide(
      (prev) => (prev - 1 + DATA_SLIDES.length) % DATA_SLIDES.length,
    );
  };

  const nextTesti = () => {
    setTestiDir(1);
    setCurrentTesti((prev) => (prev + 1) % DATA_TESTIMONIALS.length);
  };
  const prevTesti = () => {
    setTestiDir(-1);
    setCurrentTesti(
      (prev) =>
        (prev - 1 + DATA_TESTIMONIALS.length) % DATA_TESTIMONIALS.length,
    );
  };

  // ---------------- HANDLER FORM ----------------
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const pesanWA = `*HALO ADMIN PEMDES SIDODADI ASRI*%0A%0ASaya ingin mengajukan pertanyaan/aspirasi dengan detail sebagai berikut:%0A%0A👤 *Nama*: ${formData.nama}%0A📞 *No. HP/WA*: ${formData.noHp}%0A✉️ *Email*: ${
      formData.email || "-"
    }%0A📌 *Kategori Pertanyaan*: ${formData.jenisPertanyaan}%0A%0A💬 *Pesan/Aspirasi*:%0A"${formData.pesan}"`;

    window.open(`https://wa.me/6282363607196?text=${pesanWA}`, "_blank");
  };

  return (
    <main className="relative flex flex-col w-full min-h-screen font-sans antialiased text-slate-800 bg-white overflow-x-hidden">
      {/* Dynamic Keyframe Injection */}
      <style>{`
        @keyframes runningGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Gradien Animasi Hijau Emerald Terang & Emas Bercahaya */
        @keyframes darkGreenGoldFlow {
          0% {
            background-position: 0% 50%;
            filter: drop-shadow(0 2px 8px rgba(16, 185, 129, 0.3));
          }
          50% {
            background-position: 100% 50%;
            filter: drop-shadow(0 4px 16px rgba(245, 158, 11, 0.6));
          }
          100% {
            background-position: 0% 50%;
            filter: drop-shadow(0 2px 8px rgba(16, 185, 129, 0.3));
          }
        }

        .animated-text-green-gold {
          background: linear-gradient(
            110deg,
            #6ee7b7 0%,
            #10b981 25%,
            #f59e0b 50%,
            #fbbf24 75%,
            #34d399 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: darkGreenGoldFlow 6s ease-in-out infinite;
        }
        
        .animated-gbg-border {
          position: relative;
          border-radius: 0.85rem;
          padding: 1.5px;
          background: linear-gradient(135deg, #059669, #0f172a, #d97706, #059669, #0f172a);
          background-size: 300% 300%;
          animation: runningGlow 6s ease infinite;
        }

        .animated-gbg-inner {
          background-color: #ffffff;
          border-radius: calc(0.85rem - 1.5px);
          height: 100%;
          overflow: hidden;
        }

        /* Tekstur Kertas dengan Pin 3D Kiri & Kanan Atas */
        .paper-sheet {
          position: relative;
          background: #fdfbf7;
          background-image: radial-gradient(#e2e8f0 0.8px, transparent 0.8px);
          background-size: 10px 10px;
          box-shadow: 0 8px 20px -6px rgba(5, 150, 105, 0.08), 0 2px 6px -2px rgba(0, 0, 0, 0.03);
        }

        .paper-sheet::before,
        .paper-sheet::after {
          content: '';
          position: absolute;
          top: 8px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #ef4444, #991b1b 70%, #450a0a);
          box-shadow: 
            0 2px 5px rgba(0, 0, 0, 0.35),
            inset -1px -1px 2px rgba(0, 0, 0, 0.5),
            inset 1px 1px 2px rgba(255, 255, 255, 0.8);
          z-index: 20;
        }

        .paper-sheet::before { left: 10px; }
        .paper-sheet::after { right: 10px; }

        /* GRADASI ANIMASI HIJAU GELAP & EMAS UNTUK TEKS DAN TOMBOL */
        .text-gradient-animate {
          background: linear-gradient(270deg, #052e1d, #B8860B, #052e1d, #B8860B);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: runningGlow 4s ease infinite;
        }

        .btn-gradient-animate {
          background: linear-gradient(270deg, #052e1d, #B8860B, #052e1d, #B8860B);
          background-size: 300% 300%;
          animation: runningGlow 4s ease infinite;
          color: white;
          border: none;
        }
        
        .btn-gradient-animate:hover {
          opacity: 0.9;
          transform: scale(1.02);
        }
      `}</style>

      {/* 🔔 POPUP NOTIFIKASI PENGUMUMAN */}
      <AnimatePresence>
        {showNotif &&
          pengumuman.map((item, index) => (
            <motion.div
              key={item.id_pengumuman}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="fixed left-2 sm:left-4 z-[999] max-w-[220px] sm:max-w-[280px]"
              style={{ top: `${65 + index * 130}px` }}
            >
              <div className="bg-white p-2.5 sm:p-3.5 rounded-xl shadow-xl border border-emerald-500/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-600"></div>
                <button
                  onClick={() => setShowNotif(false)}
                  className="absolute top-1.5 right-1.5 w-4 h-4 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600 transition text-[9px] cursor-pointer"
                >
                  ✕
                </button>
                <div className="pl-1">
                  <h4 className="text-emerald-800 font-bold text-[8px] sm:text-[9px] uppercase tracking-wider mb-0.5">
                    Pengumuman Resmi
                  </h4>
                  <p className="text-slate-800 text-[10px] sm:text-[11px] leading-snug">
                    <strong className="block mb-0.5">{item.judul}</strong>
                    {item.isi}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* ================= 🎬 SECTION 1: HERO BANNER UTAMA (MOBILE OPTIMIZED) ================= */}
      <section className="relative h-screen min-h-[100vh] w-full flex items-center bg-emerald-950 overflow-hidden -mt-[64px] sm:-mt-[80px] pt-16 sm:pt-20">
        <img
          src={gambardesa}
          alt="Desa Sidodadi Asri"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          onError={(e) => {
            e.target.src = fallbackHeroBg;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/85 to-emerald-950/60 z-10"></div>

        <div className="relative z-20 px-4 sm:px-8 md:px-16 max-w-5xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start gap-1 sm:gap-2.5 max-w-[92%] sm:max-w-xl"
          >
            <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="text-emerald-950 font-extrabold tracking-widest uppercase text-[8px] sm:text-[10px]">
                SELAMAT DATANG
              </span>
            </div>

            {/* Judul Animasi Gradient Gelap Emerald & Gold */}
            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight leading-tight mt-0.5">
              <span className="text-gradient-animate">Desa Sidodadi Asri</span>
            </h1>

            <h2 className="text-slate-100 text-[11px] sm:text-base md:text-xl font-medium tracking-wide">
              Kecamatan Jati Agung, Lampung Selatan, Lampung
            </h2>

            <p className="text-slate-200 text-[10px] sm:text-xs md:text-sm font-light max-w-md sm:max-w-xl leading-relaxed sm:leading-normal drop-shadow-xs mt-0.5">
              Selamat datang di pusat pelayanan publik digital dan informasi
              resmi Desa Sidodadi Asri, kami harap anda bisa lebih mengenal
              tentang desa kami melalui website ini, dikembangkan oleh tim
              website KKN Tematik desa sidodadi asri ITERA pada januari 2026.
            </p>

            <div className="flex flex-row items-center gap-2 pt-1.5 w-full sm:w-auto">
              <Link
                to="/layanan"
                className="btn-gradient-animate font-bold px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-center shadow-md transition-all text-[10px] sm:text-xs flex items-center justify-center gap-1"
              >
                <span>Layanan Desa</span>
                <span>→</span>
              </Link>
              <Link
                to="/galeri"
                className="bg-amber-500/90 hover:bg-amber-500 text-slate-950 font-bold px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-center transition-all border border-amber-300 shadow-xs text-[10px] sm:text-xs"
              >
                Galeri & Artikel
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 📢 MARQUEE BANNER (Bg Luar Putih, Dalam Kertas + Pin) */}
      <div className="bg-white py-3 px-3 sm:px-6 w-full flex justify-center border-b border-slate-100">
        <div className="paper-sheet max-w-7xl w-full py-2 px-6 sm:px-10 overflow-hidden rounded-xl border border-amber-200/80">
          <MarqueeBanner />
        </div>
      </div>

      {/* ================= 📰 SECTION 2: WARTA & GALERI DESA ================= */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        className="bg-white py-3 sm:py-5 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 mb-2.5 flex justify-between items-center">
          <div>
            <h2 className="text-base sm:text-xl md:text-2xl font-extrabold text-emerald-950 tracking-tight">
              Galeri & Warta Desa
            </h2>
            <div className="w-8 h-0.5 bg-amber-500 mt-0.5 rounded-full"></div>
          </div>

          <Link
            to="/galeri"
            className="group px-2.5 py-1 bg-white rounded-md border border-emerald-200 shadow-2xs hover:border-emerald-500 transition-all flex items-center gap-1"
          >
            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-900 group-hover:text-emerald-600 uppercase tracking-wider">
              Lihat Semua
            </span>
            <span className="text-[10px] text-amber-500">→</span>
          </Link>
        </div>

        <div className="w-full overflow-hidden relative flex py-1">
          <div className="absolute left-0 top-0 w-4 sm:w-10 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-4 sm:w-10 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <motion.div
            className="flex gap-2.5 sm:gap-4 px-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            style={{ width: "max-content" }}
          >
            {loading ? (
              <div className="text-slate-500 text-xs">Memuat artikel...</div>
            ) : (
              [...articles, ...articles].map((item, index) => (
                <motion.article
                  key={`${item.id_artikel}-${index}`}
                  whileHover={{ scale: 1.02 }}
                  className="w-40 sm:w-52 shrink-0 animated-gbg-border shadow-2xs hover:shadow-md transition-all"
                >
                  <div className="animated-gbg-inner flex flex-col h-full">
                    <div className="h-24 sm:h-30 overflow-hidden relative">
                      <img
                        src={`http://127.0.0.1:8000/artikel/${item.img}`}
                        alt={item.judul_artikel}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x200?text=No+Image";
                        }}
                      />
                    </div>
                    <div className="p-2 sm:p-2.5 flex flex-col flex-grow">
                      <h3 className="text-[11px] sm:text-xs font-bold text-slate-800 line-clamp-2 mb-1">
                        {item.judul_artikel}
                      </h3>
                      <Link
                        to={`/artikel-desa/${item.id_artikel}`}
                        className="mt-auto text-amber-600 font-bold text-[9px] uppercase hover:text-emerald-700 flex items-center gap-0.5"
                      >
                        Baca <span className="text-[10px]">→</span>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* ================= 📹 SECTION 3: VIDEO PROFIL DESA ================= */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        className="bg-white py-4 sm:py-6 px-3 sm:px-6"
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={paperPopUp}
            className="paper-sheet rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-amber-200/90 relative shadow-sm"
          >
            <div className="text-center mb-2.5">
              <span className="text-[8px] sm:text-[9px] font-extrabold text-emerald-800 uppercase tracking-widest bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                Video Profile Desa
              </span>
              <h2 className="text-sm sm:text-base font-extrabold text-emerald-950 tracking-tight mt-1">
                MENGENAL DESA SIDODADI ASRI
              </h2>
            </div>

            <div className="w-full relative rounded-lg overflow-hidden shadow-md bg-black aspect-video border border-emerald-900/20">
              <iframe
                className="w-full h-full border-0 rounded-lg"
                src="https://www.youtube.com/embed/MAcDzuu_jOc?rel=0&modestbranding=1"
                title="Video Profil Desa Sidodadi Asri"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= 🏛️ SECTION 4: PROFIL DESA ================= */}
      <div id="profil-desa" className="scroll-mt-6 bg-white py-2 sm:py-3">
        {/* 1. SEJARAH & VISI MISI - SLIDER */}
        <motion.div
          variants={paperPopUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="relative max-w-4xl mx-auto px-3 sm:px-6 mb-3"
        >
          <div className="text-center mb-2">
            <span className="text-[8px] sm:text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
              Mengenal Desa Lebih Dekat
            </span>
            <h2 className="text-base sm:text-xl font-extrabold text-emerald-950 mt-0.5">
              Informasi Umum Desa
            </h2>
          </div>

          <div className="relative min-h-[200px] sm:min-h-[220px] flex items-center justify-center">
            <button
              onClick={prevSlide}
              className="absolute left-0 z-30 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-white text-emerald-900 rounded-full border border-emerald-200 shadow-2xs hover:bg-emerald-600 hover:text-white transition-all cursor-pointer text-[10px] sm:text-xs"
            >
              ❮
            </button>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={DATA_SLIDES[currentSlide].id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full max-w-2xl paper-sheet rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-amber-200/80 relative"
              >
                <div className="text-center">
                  <h3 className="text-sm sm:text-base font-serif font-bold text-emerald-950 mb-0.5">
                    {DATA_SLIDES[currentSlide].title}
                  </h3>
                  <p className="text-[8px] sm:text-[10px] font-semibold text-amber-600 uppercase tracking-wider mb-1.5">
                    {DATA_SLIDES[currentSlide].subtitle}
                  </p>

                  {DATA_SLIDES[currentSlide].content ? (
                    <p className="text-slate-700 text-[11px] sm:text-xs leading-relaxed font-serif italic text-justify sm:text-center">
                      "{DATA_SLIDES[currentSlide].content}"
                    </p>
                  ) : (
                    <div className="space-y-1.5 text-left">
                      <div className="bg-emerald-50/80 p-2 rounded-lg border border-emerald-200/60">
                        <h4 className="font-bold text-emerald-900 text-[9px] uppercase mb-0.5">
                          Visi Utama
                        </h4>
                        <p className="text-slate-700 text-[11px] sm:text-xs italic">
                          "{DATA_SLIDES[currentSlide].visi}"
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-emerald-900 text-[9px] uppercase mb-0.5">
                          Misi Utama
                        </h4>
                        <ul className="space-y-0.5">
                          {DATA_SLIDES[currentSlide].misi.map((m, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-1 text-[11px] sm:text-xs text-slate-700"
                            >
                              <span className="text-amber-500 font-bold">
                                •
                              </span>
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={nextSlide}
              className="absolute right-0 z-30 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-white text-emerald-900 rounded-full border border-emerald-200 shadow-2xs hover:bg-emerald-600 hover:text-white transition-all cursor-pointer text-[10px] sm:text-xs"
            >
              ❯
            </button>
          </div>

          <div className="flex justify-center gap-1 mt-1.5">
            {DATA_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentSlide ? 1 : -1);
                  setCurrentSlide(idx);
                }}
                className={`h-1 rounded-full transition-all ${
                  currentSlide === idx
                    ? "w-4 bg-emerald-600"
                    : "w-1 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* 2. DATA STATISTIK DESA (DENGAN ANIMASI FLOAT & HOVER) */}
        <section className="py-2 px-3 sm:px-6 max-w-5xl mx-auto">
          <motion.div
            variants={paperPopUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            className="paper-sheet rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-amber-200/90 relative shadow-xs"
          >
            <div className="text-center mb-2.5">
              <span className="text-[8px] sm:text-[10px] font-extrabold text-emerald-800 uppercase tracking-widest bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                Data Kependudukan
              </span>
              <h2 className="text-sm sm:text-lg font-extrabold text-emerald-950 uppercase tracking-tight mt-0.5">
                Statistik Demografi Desa
              </h2>
            </div>

            <motion.div
              variants={containerStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2.5"
            >
              {DATA_STATISTIK.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={cardItemAnim}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    y: {
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.25,
                    },
                  }}
                  whileHover={{ scale: 1.06, y: -8 }}
                  className="animated-gbg-border shadow-2xs cursor-pointer"
                >
                  <div className="animated-gbg-inner bg-white p-2 flex flex-col items-center text-center justify-between h-full">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center mb-0.5 border border-emerald-100">
                      {stat.icon}
                    </div>
                    <h3 className="text-[8px] sm:text-[9px] font-semibold text-slate-500 uppercase">
                      {stat.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs font-extrabold text-emerald-900 mt-0.5">
                      {stat.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* 3. PETA WILAYAH DESA */}
        <section ref={mapRef} className="py-2 px-3 sm:px-6 max-w-5xl mx-auto">
          <motion.div
            variants={paperPopUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            className="paper-sheet rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-amber-200/90 relative shadow-xs"
          >
            <div className="text-center mb-1.5">
              <h2 className="text-sm sm:text-lg font-extrabold text-emerald-950 uppercase tracking-tight">
                Peta Lokasi & Geografis
              </h2>
              <div className="w-8 h-0.5 bg-amber-500 mx-auto mt-0.5 rounded-full"></div>
            </div>

            <div className="animated-gbg-border shadow-2xs">
              <div className="animated-gbg-inner p-0.5 bg-white">
                <div className="h-[200px] sm:h-[280px] w-full rounded-md overflow-hidden relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31782.355208638686!2d105.312104!3d-5.321856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b8a36ef7b99c7%3A0x868cb67c7e5a013a!2sSidodadi%20Asri%2C%20Kec.%20Jati%20Agung%2C%20Kabupaten%20Lampung%20Selatan%2C%20Lampung!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Peta Wilayah Sidodadi Asri"
                    className={`transition-opacity duration-700 ${
                      mapVisible ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* ================= 💬 SECTION 5: APA KATA WARGA KAMI ================= */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        className="bg-white py-4 sm:py-8 px-3 sm:px-6 relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-[9px] sm:text-xs font-extrabold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
              Kesan & Suara Masyarakat
            </span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-emerald-950 tracking-tight mt-1.5">
              Apa Kata Warga Kami
            </h2>
            <h2 className="text-lg sm:text-2xl font-extrabold text-emerald-950 tracking-tight mt-1.5">
              Tentang Desa Sidodadi Asri
            </h2>

            <div className="w-35 h-1 bg-amber-500 mx-auto mt-1 rounded-full"></div>
          </div>

          <div className="relative min-h-[220px] sm:min-h-[250px] flex items-center justify-center">
            <button
              onClick={prevTesti}
              className="absolute left-0 sm:-left-3 z-30 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white text-emerald-900 rounded-full border border-emerald-200 shadow-md hover:bg-emerald-600 hover:text-white transition-all cursor-pointer text-xs sm:text-sm font-bold"
            >
              ❮
            </button>

            <AnimatePresence mode="wait" custom={testiDir}>
              <motion.div
                key={DATA_TESTIMONIALS[currentTesti].id}
                custom={testiDir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full max-w-3xl paper-sheet rounded-2xl p-5 sm:p-7 border border-amber-300/90 relative shadow-md"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <div className="relative shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden border-2 border-amber-400 shadow-md">
                      <img
                        src={DATA_TESTIMONIALS[currentTesti].image}
                        alt={DATA_TESTIMONIALS[currentTesti].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-slate-700 text-xs sm:text-sm md:text-base italic font-serif leading-relaxed mb-2.5">
                      "{DATA_TESTIMONIALS[currentTesti].text}"
                    </p>
                    <h3 className="text-xs sm:text-sm md:text-base font-bold text-emerald-950 uppercase tracking-wide">
                      {DATA_TESTIMONIALS[currentTesti].name}
                    </h3>
                    <p className="text-amber-600 font-semibold text-[10px] sm:text-xs tracking-wider uppercase mt-0.5">
                      {DATA_TESTIMONIALS[currentTesti].position}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={nextTesti}
              className="absolute right-0 sm:-right-3 z-30 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white text-emerald-900 rounded-full border border-emerald-200 shadow-md hover:bg-emerald-600 hover:text-white transition-all cursor-pointer text-xs sm:text-sm font-bold"
            >
              ❯
            </button>
          </div>

          <div className="flex justify-center gap-1.5 mt-3">
            {DATA_TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTestiDir(idx > currentTesti ? 1 : -1);
                  setCurrentTesti(idx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  currentTesti === idx
                    ? "w-6 bg-emerald-600"
                    : "w-2 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ================= 📞 SECTION 6: KONTAK & FORM ASPIRASI ================= */}
      <section
        id="kontak-desa"
        className="scroll-mt-6 py-3 sm:py-5 px-3 sm:px-6 bg-white flex flex-col items-center w-full"
      >
        <div className="w-full max-w-4xl flex flex-col items-center">
          <motion.div
            variants={paperPopUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            className="w-full paper-sheet rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-amber-200/90 relative shadow-xs"
          >
            <div className="text-center mb-3">
              <span className="text-[8px] sm:text-[10px] font-extrabold text-emerald-800 uppercase tracking-widest bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                Formulir Komunikasi Publik
              </span>
              <h3 className="text-base sm:text-xl font-extrabold text-emerald-950 mt-0.5">
                Kirim Pertanyaan & Pesan
              </h3>
              <p className="text-slate-600 text-[10px] sm:text-xs mt-0.5">
                Isi data berikut dan pesan Anda akan langsung diteruskan ke
                WhatsApp resmi desa.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-2.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[9px] sm:text-[10px] font-bold text-emerald-950 uppercase tracking-wider mb-0.5">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nama"
                    required
                    value={formData.nama}
                    onChange={handleInputChange}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-[11px] sm:text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-[9px] sm:text-[10px] font-bold text-emerald-950 uppercase tracking-wider mb-0.5">
                    Nomor HP / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="noHp"
                    required
                    value={formData.noHp}
                    onChange={handleInputChange}
                    placeholder="Contoh: 08123456789"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-[11px] sm:text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-2xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[9px] sm:text-[10px] font-bold text-emerald-950 uppercase tracking-wider mb-0.5">
                    Alamat Email (Opsional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="contoh@gmail.com"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-[11px] sm:text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-[9px] sm:text-[10px] font-bold text-emerald-950 uppercase tracking-wider mb-0.5">
                    Kategori Pertanyaan <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="jenisPertanyaan"
                    value={formData.jenisPertanyaan}
                    onChange={handleInputChange}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-[11px] sm:text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-2xs"
                  >
                    <option value="Pelayanan Surat / Administrasi">
                      Pelayanan Surat / Administrasi
                    </option>
                    <option value="Aspirasi Warga">
                      Aspirasi & Usulan Pembangunan
                    </option>
                    <option value="Pengaduan Masyarakat">
                      Pengaduan / Laporan Fasilitas
                    </option>
                    <option value="Informasi UMKM & Ekonomi">
                      Informasi UMKM & Ekonomi
                    </option>
                    <option value="Lainnya">Lain-lain</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] sm:text-[10px] font-bold text-emerald-950 uppercase tracking-wider mb-0.5">
                  Pesan / Pertanyaan <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="pesan"
                  rows={3}
                  required
                  value={formData.pesan}
                  onChange={handleInputChange}
                  placeholder="Tuliskan pertanyaan atau aspirasi Anda secara lengkap..."
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-[11px] sm:text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-2xs"
                ></textarea>
              </div>

              <div className="pt-0.5">
                <button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 px-3 rounded-lg shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer text-[11px] sm:text-xs"
                >
                  <span>Kirim Pesan Langsung ke WhatsApp</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ================= 🔻 FOOTER UTAMA ================= */}
      <footer className="w-full bg-emerald-950 text-slate-200 border-t-2 border-amber-500/40 pt-6 pb-4 px-3 sm:px-8">
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-5 pb-5 border-b border-emerald-800/60"
        >
          <motion.div
            variants={cardItemAnim}
            className="space-y-1.5 md:col-span-1"
          >
            <div className="flex items-center gap-2">
              <img
                src={logoKKN}
                alt="Logo Desa"
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
              />
              <div>
                <h3 className="font-extrabold text-xs sm:text-sm text-amber-400 tracking-wide">
                  SIDODADI ASRI
                </h3>
                <p className="text-[8px] sm:text-[9px] text-emerald-200/80">
                  Jati Agung, Lampung Selatan
                </p>
              </div>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-300 leading-snug">
              Portal resmi pelayanan publik dan transparansi informasi
              masyarakat Desa Sidodadi Asri.
            </p>
          </motion.div>

          <motion.div variants={cardItemAnim}>
            <h4 className="text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1.5 border-b border-amber-500/30 pb-0.5 inline-block">
              Navigasi Utama
            </h4>
            <ul className="space-y-1 text-[10px] sm:text-[11px]">
              <li>
                <Link
                  to="/"
                  className="text-amber-400 font-extrabold flex items-center gap-1 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  Profil Desa
                </Link>
              </li>
              <li>
                <Link
                  to="/layanan"
                  className="ext-slate-300 hover:text-amber-300 transition-colors"
                >
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

          <motion.div variants={cardItemAnim}>
            <h4 className="text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1.5 border-b border-amber-500/30 pb-0.5 inline-block">
              Jam Pelayanan
            </h4>
            <ul className="space-y-0.5 text-[10px] sm:text-[11px] text-slate-300">
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
          </motion.div>

          <motion.div variants={cardItemAnim}>
            <h4 className="text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1.5 border-b border-amber-500/30 pb-0.5 inline-block">
              Kontak Kantor
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-300 leading-snug mb-1">
              📍 Jl. Balai Desa No. 01, Sidodadi Asri, Kec. Jati Agung, Kab.
              Lampung Selatan
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-300">
              ✉️ pemdes.sidodadiasri@gmail.com
            </p>
          </motion.div>
        </motion.div>

        <div className="max-w-7xl mx-auto pt-2.5 text-center text-[9px] sm:text-[10px] text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-1">
          <p>© 2026 Pemerintah Desa Sidodadi Asri. Hak Cipta Dilindungi.</p>
          <p className="text-amber-400/80 font-medium">
            KKN Tematik Desa Sidodadi Asri
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Home;
