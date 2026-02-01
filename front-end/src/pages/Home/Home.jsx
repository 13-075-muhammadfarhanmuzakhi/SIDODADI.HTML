import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * IMPORT ASSETS (LOGO & BACKGROUND)
 */
import logoKKN from "../../assets/images/logokkn.png";
import bungaBg from "../../assets/images/BUNGA.png";

/**
 * IMPORT FOTO TESTIMONIAL
 */
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

  // STATE UNTUK NOTIFIKASI
  const [showNotif, setShowNotif] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");

  const testimonials = [
    {
      id: 1,
      name: "SUTIBYO & LEGINA",
      position: "PENSIUNAN - IRT",
      text: "Desa sidodadi asri adalah desa yang nyaman untuk ditinggali karena warganya hidup rukun, ramah, dan terbiasa bermusyawarah dalam menyelesaikan berbagai urusan...",
      image: fotoLegina,
    },
    {
      id: 2,
      name: "MULYADI",
      position: "WARGA DESA SIDODADI ASRI",
      text: "Desa sidodadi asri adalah desa yang memiliki rasa kebersamaan dan solidaritas yang sangat kuat sejak dulu, budaya gotong royong yang nyata...",
      image: fotoMulyadi,
    },
    {
      id: 3,
      name: "SUMARMAN",
      position: "KEPALA DUSUN 1",
      text: "Desa sidodadi asri adalah desa yang memiliki rasa persaudaraan yang kuat antarwarga, sehingga terasa hangat dan penuh kebersamaan...",
      image: fotoSumarman,
    },
    {
      id: 4,
      name: "KABUL SUJATMIKO & RUKIYAH",
      position: "WARGA SIDODADI ASRI",
      text: "Desa sidodadi asri adalah desa yang memberikan rasa nyaman dan memiliki hubungan sosial yang hangat antara sesama warga...",
      image: fotoRukiyah,
    },
    {
      id: 5,
      name: "NASIFATUL AINI",
      position: "PEMILIK UMKM",
      text: "Desa sidodadi asri adalah desa desa yang ramai, mendukung perekonomian masyarakat, dan memberikan peluang usaha yang baik bagi warganya...",
      image: fotoAini,
    },
    {
      id: 6,
      name: "ARI AFFANDI",
      position: "KETUA RT",
      text: "Desa sidodadi asri adalah desa yang terbuka sehingga pendatang pun mudah diterima dan dapat berperan aktif dalam kehidupan masyarakat...",
      image: fotoAri,
    },
  ];

  useEffect(() => {
    // Fetch Artikel
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
    fetchArticles();

    // Logika Munculkan Notifikasi Otomatis (Muncul setelah 2 detik)
    const timer = setTimeout(() => {
      setNotifMessage(
        "Pengumuman: Pembagian Sembako Desa Sidodadi Asri akan dilaksanakan pada tanggal 5 Februari 2026 di Balai Desa.",
      );
      setShowNotif(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="relative flex flex-col w-full min-h-screen font-sans antialiased text-slate-900 bg-slate-50">
      {/* FITUR NOTIFIKASI PENGUMUMAN */}
      <AnimatePresence>
        {showNotif && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed top-15 left-6 z-[999] max-w-[320px] md:max-w-md"
          >
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/40 relative overflow-hidden group">
              {/* Dekorasi Garis */}
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>

              {/* Tombol Close */}
              <button
                onClick={() => setShowNotif(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                ✕
              </button>

              <div className="pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <h4 className="text-emerald-700 font-bold text-xs uppercase tracking-[0.2em]">
                    Pengumuman Desa
                  </h4>
                </div>
                <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
                  {notifMessage}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400 font-mono italic">
                  <span>Baru Saja</span>
                  <span>•</span>
                  <span>Sidodadi Asri Info</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: HERO */}
      <section className="relative h-screen w-full overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black z-0">
          <iframe
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              width: "100vw",
              height: "56.25vw",
              minHeight: "100vh",
              minWidth: "177.77vh",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1.1)",
            }}
            src="https://www.youtube.com/embed/MAcDzuu_jOc?autoplay=1&mute=1&loop=1&playlist=MAcDzuu_jOc&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1"
            title="Video Profil Desa"
            frameBorder="0"
            allow="autoplay; encrypted-media"
          />
        </div>
        <div className="absolute inset-0 bg-slate-900/60 z-10 flex flex-col justify-center items-center text-center px-6">
          <div className="max-w-4xl space-y-6">
            <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-2xl">
              Selamat Datang di <br />
              <span className="text-white-400">Desa Sidodadi Asri</span>
            </h1>
            <p className="text-white/90 text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
              Kec. Jati Agung, Kab. Lampung Selatan, <br />
              Provinsi Lampung
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: BERITA */}
      <section className="relative bg-white py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">
            Berita & Kegiatan Desa
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {!loading &&
              articles.map((item, index) => (
                <article
                  key={item.id_artikel}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="animate-berita flex flex-col rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white h-full group transform hover:-translate-y-2"
                >
                  <div className="h-52 overflow-hidden">
                    <img
                      src={`http://127.0.0.1:8000/artikel/${item.img}`}
                      alt={item.judul_artikel}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-extrabold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
                      {item.judul_artikel}
                    </h3>
                    <div className="flex-grow">
                      <p className="text-slate-600 text-sm line-clamp-3 mb-6 leading-relaxed">
                        {item.deskripsi}
                      </p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-slate-50">
                      <button className="text-emerald-600 font-bold text-sm flex items-center gap-2 group/btn">
                        Baca Selengkapnya
                        <svg
                          className="w-4 h-4 transition-transform group-hover/btn:translate-x-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: TESTIMONIAL */}
      <section className="bg-[#1a202c] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex w-14 h-14 bg-slate-700/50 rounded-full items-center justify-center border border-slate-600 mb-6 shadow-lg text-white font-bold text-2xl">
              ?
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
              Apa Kata Warlok ??
            </h2>
            <p className="text-slate-400 mt-4 text-base italic">
              Berikut adalah beberapa kalimat dari warga lokal tentang Desa
              Sidodadi Asri
            </p>
          </div>

          <div className="bg-[#2D3748] rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl min-h-[500px] border border-white/5">
            <div className="md:w-[45%] relative bg-slate-900 overflow-hidden">
              <img
                src={testimonials[current].image}
                alt={testimonials[current].name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="md:w-[55%] p-10 md:p-16 flex flex-col justify-between">
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-white uppercase">
                    {testimonials[current].name}
                  </h3>
                  <p className="text-emerald-400 font-bold text-xs tracking-widest mt-2">
                    {testimonials[current].position}
                  </p>
                </div>
                <p className="text-slate-200 text-lg md:text-xl italic border-l-2 border-slate-600 pl-6 leading-relaxed">
                  "{testimonials[current].text}"
                </p>
              </div>
              <div className="flex items-center justify-between mt-12 border-t border-white/10 pt-10">
                <div className="flex gap-4">
                  <button
                    onClick={handlePrev}
                    className="w-12 h-12 rounded-full border border-slate-500 text-white hover:bg-emerald-600 transition-all"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-12 h-12 rounded-full border border-slate-500 text-white hover:bg-emerald-600 transition-all"
                  >
                    →
                  </button>
                </div>
                <div className="text-slate-500 font-mono">
                  <span className="text-emerald-400 font-bold">
                    {current + 1}
                  </span>{" "}
                  / {testimonials.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FOOTER */}
      <footer className="relative w-full bg-[#FCFCFC] border-t border-slate-100 overflow-hidden pt-20 pb-0">
        <img
          src={bungaBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.05] pointer-events-none z-0"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            {/* KOLOM 1: LOGO */}
            <div className="flex flex-col gap-6 w-full md:w-1/3">
              <div className="flex items-center gap-5">
                <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-100">
                  <img
                    src={logoKKN}
                    alt="Logo KKN"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                    KKN Tematik ITERA
                  </h3>
                  <p className="text-slate-800 text-2xl font-semibold tracking-tight">
                    Sidodadi Asri
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-slate-700 font-bold text-base">
                  Website Resmi Informasi
                </p>
                <p className="text-slate-500 font-light text-sm">
                  Desa Sidodadi Asri, Jati Agung
                </p>
              </div>
            </div>

            {/* KOLOM 2: NAVIGASI */}
            <div className="flex flex-col gap-5 w-full md:w-1/3 md:items-center">
              <div className="text-left">
                <h4 className="text-slate-900 font-bold text-sm uppercase tracking-widest border-b-2 border-emerald-500 pb-1 mb-4 w-fit">
                  Navigasi
                </h4>
                <ul className="flex flex-col gap-3 text-slate-600 font-semibold text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-emerald-600 transition-colors"
                    >
                      Beranda
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-emerald-600 transition-colors"
                    >
                      Profil Desa
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-emerald-600 transition-colors"
                    >
                      Layanan desa
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-emerald-600 transition-colors"
                    >
                      Kontak Kami
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-emerald-600 transition-colors"
                    >
                      Galeri & Artikel
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* KOLOM 3: LINK SOSMED (RAPI & SEJAJAR) */}
            <div className="flex flex-col items-center md:items-end w-full md:w-1/3">
              <div className="flex flex-col items-center">
                <h4 className="text-slate-900 font-bold text-sm uppercase tracking-widest border-b-2 border-emerald-500 pb-1 mb-8 w-fit">
                  Link Desa Sidodadi Asri
                </h4>

                <div className="flex items-center gap-6">
                  <a
                    href="#"
                    className="transform hover:scale-110 transition-transform drop-shadow-sm"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png"
                      alt="IG"
                      className="w-9 h-9"
                    />
                  </a>
                  <a
                    href="#"
                    className="transform hover:scale-110 transition-transform drop-shadow-sm"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
                      alt="FB"
                      className="w-9 h-9"
                    />
                  </a>
                  <a
                    href="#"
                    className="bg-black w-9 h-9 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform drop-shadow-sm"
                  >
                    <img
                      src="https://toppng.com/uploads/preview/tiktok-logo-png-download-116616376145yvg1mox2s.png"
                      alt="TK"
                      className="w-5 h-5 object-contain invert"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
