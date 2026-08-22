import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Import Component Marquee Banner
import MarqueeBanner from "../../layouts/MarqueeBanner";

import logoKKN from "../../assets/images/logokkn.png";
import fotoLegina from "../../assets/images/legina.jpeg";
import fotoMulyadi from "../../assets/images/mulyadi.jpeg";
import fotoSumarman from "../../assets/images/sumarman.jpeg";
import fotoRukiyah from "../../assets/images/rukiyah.jpeg";
import fotoAini from "../../assets/images/aini.jpeg";
import fotoAri from "../../assets/images/ari.jpeg";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  const [showNotif, setShowNotif] = useState(false);
  const [pengumuman, setPengumuman] = useState([]);

  const testimonials = [
    {
      id: 1,
      name: "SUTIBYO & LEGINA",
      position: "PENSIUNAN - IRT",
      text: "Desa yang nyaman ditinggali, warga hidup rukun, ramah, dan musyawarah selalu diutamakan.",
      image: fotoLegina,
    },
    {
      id: 2,
      name: "MULYADI",
      position: "WARGA SIDODADI ASRI",
      text: "Solidaritas dan budaya gotong royong sangat nyata dalam kegiatan pembangunan sosial.",
      image: fotoMulyadi,
    },
    {
      id: 3,
      name: "SUMARMAN",
      position: "KEPALA DUSUN 1",
      text: "Rasa persaudaraan kuat antarwarga, hangat dan penuh kebersamaan untuk kemajuan.",
      image: fotoSumarman,
    },
    {
      id: 4,
      name: "KABUL & RUKIYAH",
      position: "WARGA SIDODADI ASRI",
      text: "Memberikan rasa nyaman dan sosial yang hangat tanpa sekat suku maupun agama.",
      image: fotoRukiyah,
    },
    {
      id: 5,
      name: "NASIFATUL AINI",
      position: "PEMILIK UMKM",
      text: "Mendukung perekonomian masyarakat, memberikan peluang usaha yang baik.",
      image: fotoAini,
    },
    {
      id: 6,
      name: "ARI AFFANDI",
      position: "KETUA RT",
      text: "Terbuka bagi pendatang. Keamanan selalu dijaga bersama melalui siskamling aktif.",
      image: fotoAri,
    },
  ];

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

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="relative flex flex-col w-full min-h-screen font-sans antialiased text-slate-800 bg-white overflow-x-hidden">
      {/* 🌟 CSS KHUSUS ANIMASI */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .text-gradient-animate {
          background-size: 200% auto;
          animation: gradientMove 3s linear infinite;
        }
        .border-animated-wrapper {
          position: relative;
          border-radius: 1.5rem;
          padding: 3px;
          background: linear-gradient(90deg, #064e3b, #eab308, #064e3b, #eab308);
          background-size: 300% 300%;
          animation: gradientMove 3s linear infinite;
        }
        .border-animated-inner {
          background-color: white; 
          border-radius: calc(1.5rem - 3px);
          height: 100%;
          overflow: hidden;
        }
        .footer-border-animated {
          background: linear-gradient(90deg, #064e3b, #eab308, #064e3b, #eab308);
          background-size: 300% 300%;
          animation: gradientMove 3s linear infinite;
          padding-top: 4px;
          padding-right: 4px;
          border-top-right-radius: 4rem;
        }
        .footer-inner {
          background-color: #052e16;
          border-top-right-radius: calc(4rem - 4px);
        }
      `}</style>

      {/* 🔔 FITUR NOTIFIKASI PENGUMUMAN */}
      <AnimatePresence>
        {showNotif &&
          pengumuman.map((item, index) => (
            <motion.div
              key={item.id_pengumuman}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="fixed left-6 z-[999] max-w-[300px]"
              style={{ top: `${80 + index * 160}px` }}
            >
              <div className="bg-white p-5 rounded-2xl shadow-xl border border-green-900/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-green-800"></div>
                <button
                  onClick={() => setShowNotif(false)}
                  className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-600 transition text-xs"
                >
                  ✕
                </button>
                <div className="pl-3">
                  <h4 className="text-green-800 font-bold text-[10px] uppercase tracking-wider mb-1">
                    Pengumuman
                  </h4>
                  <p className="text-slate-800 text-xs leading-relaxed">
                    <strong className="block mb-0.5">{item.judul}</strong>
                    {item.isi}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* 🎬 SECTION 1: HERO */}
      <section
        className="relative h-screen w-full flex items-center bg-green-950 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518182170546-076616fdfaaf?auto=format&fit=crop&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-green-950/80 z-10"></div>
        <div className="relative z-20 px-8 md:px-24 max-w-5xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-lg">
              <svg
                className="w-4 h-4 text-green-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                ></path>
              </svg>
              <span className="text-green-800 font-bold tracking-widest uppercase text-xs">
                Selamat Datang
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-yellow-500 to-emerald-400 text-gradient-animate">
                Sidodadi Asri
              </span>
            </h1>
            <h2 className="text-white text-2xl md:text-3xl font-semibold">
              Desa Asri Penuh Kebersamaan
            </h2>

            <p className="text-slate-300 text-sm md:text-base font-light max-w-2xl leading-relaxed">
              Selamat datang di portal resmi Desa Sidodadi Asri, Kecamatan Jati
              Agung, Kabupaten Lampung Selatan. Mengusung nilai kerukunan,
              pendidikan, dan pemberdayaan masyarakat.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/layanan"
                className="bg-white text-green-900 font-semibold px-8 py-3 rounded-full hover:bg-slate-100 transition-all flex items-center gap-2"
              >
                Layanan Desa <span className="text-xl">→</span>
              </Link>
              <Link
                to="/profile"
                className="bg-transparent text-white font-semibold px-8 py-3 rounded-full border border-white hover:bg-white/10 transition-all"
              >
                Profil Desa
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 📢 MARQUEE BANNER TEPA T DI BAWAH HERO */}
      <MarqueeBanner />

      {/* 📰 SECTION 2: WARTA & GALERI */}
      <section className="bg-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10 flex justify-between items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A261D] tracking-tight">
              Galeri & Kabar Desa
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#0A261D] to-[#B8860B] mt-2 rounded-full"></div>
          </div>

          {/* CARD MINI UNTUK LINK "LIHAT SEMUA" DENGAN BORDER WARNA */}
          <Link
            to="/galeri"
            className="group px-4 py-2 bg-white rounded-xl border border-[#B8860B]/40 shadow-xs hover:shadow-md hover:bg-[#0A261D] transition-all duration-300 flex items-center gap-2"
          >
            <span className="text-xs font-bold text-[#0A261D] group-hover:text-[#D4AF37] uppercase tracking-wider transition-colors">
              Lihat Semua
            </span>
            <span className="text-xs font-bold text-[#B8860B] group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        <div className="w-full overflow-hidden relative flex py-4">
          <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

          <motion.div
            className="flex gap-6 px-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            style={{ width: "max-content" }}
          >
            {loading ? (
              <div className="text-slate-500">Memuat kabar...</div>
            ) : (
              [...articles, ...articles].map((item, index) => (
                <article
                  key={`${item.id_artikel}-${index}`}
                  className="w-64 shrink-0 border-animated-wrapper shadow-md"
                >
                  <div className="border-animated-inner bg-white flex flex-col h-full">
                    <div className="h-40 overflow-hidden relative">
                      <img
                        src={`http://127.0.0.1:8000/artikel/${item.img}`}
                        alt={item.judul_artikel}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x200?text=No+Image";
                        }}
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-sm font-bold text-slate-800 line-clamp-2 mb-2">
                        {item.judul_artikel}
                      </h3>
                      <Link
                        to={`/artikel-desa/${item.id_artikel}`}
                        className="mt-auto text-yellow-600 font-bold text-xs uppercase hover:text-green-700"
                      >
                        Baca →
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* 📹 SECTION 3: VIDEO PROFIL */}
      <section className="bg-slate-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A261D] tracking-tight">
            Mengenal Sidodadi Asri
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#0A261D] to-[#B8860B] mx-auto mt-2 mb-8 rounded-full"></div>

          {/* Pembungkus Video dengan Border Gradasi Hijau-Emas */}
          <div className="border-animated-wrapper shadow-xl rounded-2xl p-[3px] bg-gradient-to-r from-[#0A261D] via-[#B8860B] to-[#0A261D]">
            <div className="border-animated-inner bg-slate-900 rounded-[calc(1rem-1px)] overflow-hidden relative aspect-video">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/MAcDzuu_jOc?rel=0&modestbranding=1"
                title="Video Profil Desa"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* 💬 SECTION 4: TESTIMONIAL WARGA */}
      <section className="bg-white py-16 px-6 relative mb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-green-900 tracking-tight">
              Pendapat mereka tentang desa ini
            </h2>
            <div className="w-16 h-1 bg-yellow-500 mx-auto mt-2"></div>
          </div>

          <div className="border-animated-wrapper shadow-xl rounded-[1.6rem]">
            <div className="border-animated-inner bg-white flex flex-col md:flex-row rounded-3xl overflow-hidden">
              {/* Foto Warga */}
              <div className="md:w-1/3 relative bg-slate-200 min-h-[250px]">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>

              {/* Konten Teks */}
              <div className="md:w-2/3 p-8 flex flex-col justify-center bg-white">
                <svg
                  className="w-8 h-8 text-yellow-400 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-slate-800 text-base md:text-lg italic font-medium leading-relaxed mb-6">
                  "{testimonials[current].text}"
                </p>
                <div>
                  <h3 className="text-lg font-bold text-yellow-500 uppercase">
                    {testimonials[current].name}
                  </h3>
                  <p className="text-green-500 font-semibold text-xs tracking-wider uppercase">
                    {testimonials[current].position}
                  </p>
                </div>

                {/* Tombol Navigasi Slider */}
                <div className="flex items-center gap-4 mt-8">
                  <button
                    onClick={handlePrev}
                    className="w-8 h-8 rounded-full bg-slate-100 text-green-900 flex items-center justify-center hover:bg-yellow-500 hover:text-white transition-all shadow-sm"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-8 h-8 rounded-full bg-slate-100 text-green-900 flex items-center justify-center hover:bg-yellow-500 hover:text-white transition-all shadow-sm"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  className="text-[#B8860B] font-extrabold transition-colors"
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
                  className="text-slate-300 hover:text-amber-300 transition-colors"
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
    </main>
  );
};

export default Home;
