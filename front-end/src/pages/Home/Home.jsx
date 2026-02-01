import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * ============================================================
 * IMPORT ASSETS (LOGO & BACKGROUND)
 * ============================================================
 */
import logoKKN from "../../assets/images/logokkn.png";
import bungaBg from "../../assets/images/BUNGA.png";

/**
 * ============================================================
 * IMPORT FOTO TESTIMONIAL
 * ============================================================
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

  // STATE PENGUMUMAN DARI API
  // STATE PENGUMUMAN
  const [showNotif, setShowNotif] = useState(false);
  const [pengumuman, setPengumuman] = useState([]);
  const [notifMessage, setNotifMessage] = useState("");


  /**
   * DATA TESTIMONIAL LENGKAP
   */
  const testimonials = [
    {
      id: 1,
      name: "SUTIBYO & LEGINA",
      position: "PENSIUNAN - IRT",
      text: "Desa sidodadi asri adalah desa yang nyaman untuk ditinggali karena warganya hidup rukun, ramah, dan terbiasa bermusyawarah dalam menyelesaikan berbagai urusan. Suasana kekeluargaannya sangat kental sehingga kami merasa sangat tenang menghabiskan masa tua di sini.",
      image: fotoLegina,
    },
    {
      id: 2,
      name: "MULYADI",
      position: "WARGA DESA SIDODADI ASRI",
      text: "Desa sidodadi asri adalah desa yang memiliki rasa kebersamaan dan solidaritas yang sangat kuat sejak dulu, budaya gotong royong yang nyata dilakukan oleh warga desa ini dalam berbagai kegiatan pembangunan maupun sosial.",
      image: fotoMulyadi,
    },
    {
      id: 3,
      name: "SUMARMAN",
      position: "KEPALA DUSUN 1",
      text: "Desa sidodadi asri adalah desa yang memiliki rasa persaudaraan yang kuat antarwarga, sehingga terasa hangat dan penuh kebersamaan. Kami selaku perangkat desa selalu berupaya menjaga keharmonisan ini demi kemajuan bersama.",
      image: fotoSumarman,
    },
    {
      id: 4,
      name: "KABUL SUJATMIKO & RUKIYAH",
      position: "WARGA SIDODADI ASRI",
      text: "Desa sidodadi asri adalah desa yang memberikan rasa nyaman dan memiliki hubungan sosial yang hangat antara sesama warga. Tidak ada sekat antar suku maupun agama, semuanya hidup berdampingan dengan damai.",
      image: fotoRukiyah,
    },
    {
      id: 5,
      name: "NASIFATUL AINI",
      position: "PEMILIK UMKM",
      text: "Desa sidodadi asri adalah desa desa yang ramai, mendukung perekonomian masyarakat, dan memberikan peluang usaha yang baik bagi warganya. UMKM di sini sangat didukung oleh pemerintah desa dan warga sekitar.",
      image: fotoAini,
    },
    {
      id: 6,
      name: "ARI AFFANDI",
      position: "KETUA RT",
      text: "Desa sidodadi asri adalah desa yang terbuka sehingga pendatang pun mudah diterima dan dapat berperan aktif dalam kehidupan masyarakat. Keamanan dan ketertiban selalu kami jaga bersama melalui siskamling yang aktif.",
      image: fotoAri,
    },
  ];

  /**
   * USE EFFECT: FETCH DATA & NOTIFICATION TIMER
   */
  useEffect(() => {
    // Logic Fetch Artikel dari API
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
  
    // ================= PENGUMUMAN HOME =================
    const fetchPengumuman = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/pengumuman-home");
        const data = await res.json();
  
        if (Array.isArray(data) && data.length > 0) {
          setPengumuman(data);          // ← ARRAY
          setTimeout(() => setShowNotif(true), 1500);
        }
      } catch (err) {
        console.error("Gagal mengambil pengumuman:", err);
      }
    };
  
    fetchArticles();
    fetchPengumuman();
  }, []);  

  /**
   * HANDLER NAVIGATION TESTIMONI
   */
  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="relative flex flex-col w-full min-h-screen font-sans antialiased text-slate-900 bg-slate-50 overflow-x-hidden">
      
      {/* 🔔 FITUR NOTIFIKASI PENGUMUMAN */}
      <AnimatePresence>
      {showNotif &&
        pengumuman.map((item, index) => (
          <motion.div
            key={item.id_pengumuman}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed left-6 z-[999] max-w-[320px] md:max-w-md"
            style={{ top: `${80 + index * 190}px` }} // 🔥 STACK
          >
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/40 relative overflow-hidden">
              
              {/* Garis kiri */}
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>

              {/* Close */}
              <button
                onClick={() => setShowNotif(false)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-500 hover:text-white transition shadow-sm"
              >
                ✕
              </button>

              <div className="pl-4 md:pl-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                  </span>
                  <h4 className="text-emerald-700 font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">
                    Pengumuman Desa
                  </h4>
                </div>

                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  <strong>{item.judul}</strong>
                  <br />
                  {item.isi}
                </p>

                <div className="mt-2 text-xs text-slate-500 italic">
                  📅 {new Date(item.tanggal_kegiatan).toLocaleDateString("id-ID")}
                </div>

                <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400 font-mono italic">
                  <span>Sidodadi Asri Info</span>
                
                <p className="text-slate-800 text-sm md:text-lg leading-relaxed font-bold">
                  {notifMessage}
                </p>
                
                <div className="mt-6 flex items-center gap-3 text-[10px] md:text-xs text-slate-400 font-mono italic">
                  <span className="bg-slate-100 px-2 py-1 rounded">Baru Saja</span>
                  <span>•</span>
                  <span>Sidodadi Asri Digital</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
    </AnimatePresence>


      {/* 🎬 SECTION 1: HERO (VIDEO PROFILE) */}
      <section className="relative h-[80vh] md:h-screen w-full overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black z-0">
          <iframe
            className="absolute inset-0 w-full h-full pointer-events-none scale-[1.3] md:scale-110"
            style={{
              width: "100vw", height: "56.25vw", minHeight: "100vh", minWidth: "177.77vh",
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
            }}
            src="https://www.youtube.com/embed/MAcDzuu_jOc?autoplay=1&mute=1&loop=1&playlist=MAcDzuu_jOc&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1"
            title="Video Profil Desa" frameBorder="0" allow="autoplay; encrypted-media"
          />
        </div>
        
        <div className="absolute inset-0 bg-slate-900/60 z-10 flex flex-col justify-center items-center text-center px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl space-y-6"
          >
            <h1 className="text-white text-4xl md:text-8xl font-black tracking-tighter drop-shadow-2xl uppercase leading-[0.9]">
              Selamat Datang di <br />
              <span className="text-emerald-400">Desa Sidodadi Asri</span>
            </h1>
            <p className="text-white/90 text-sm md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed tracking-wide">
              Kecamatan Jati Agung, Kabupaten Lampung Selatan, <br className="hidden md:block" />
              Provinsi Lampung, Indonesia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 📰 SECTION 2: BERITA & KEGIATAN DESA */}
      <section className="relative bg-white py-16 md:py-28 px-4 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-slate-800 text-center uppercase tracking-tighter mb-4">
              Warta & Kabar Desa
            </h2>
            <div className="w-24 h-2 bg-emerald-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {!loading &&
              articles.map((item, index) => (
                <article
                  key={item.id_artikel}
                  className="group flex flex-col rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-100 overflow-hidden hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 bg-white h-full transform hover:-translate-y-4"
                >
                  <div className="h-56 md:h-64 overflow-hidden relative">
                    <img
                      src={`http://127.0.0.1:8000/artikel/${item.img}`}
                      alt={item.judul_artikel}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-700 shadow-sm">
                      Informasi
                    </div>
                  </div>

                  <div className="p-8 md:p-12 flex flex-col flex-grow">
                    <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors leading-tight">
                      {item.judul_artikel}
                    </h3>
                    <p className="text-slate-500 text-sm md:text-base line-clamp-3 mb-8 leading-relaxed font-medium">
                      {item.deskripsi}
                    </p>
                    <div className="mt-auto">
                      <Link to={`/artikel-desa/${item.id_artikel}`} className="inline-flex items-center gap-3 text-emerald-600 font-black text-xs md:text-sm uppercase tracking-[0.2em] group/btn">
                        Baca Selengkapnya
                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover/btn:bg-emerald-600 group-hover/btn:text-white transition-all">
                          →
                        </div>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* 💬 SECTION 3: TESTIMONIAL WARGA */}
      <section className="bg-slate-900 py-20 md:py-32 px-4 md:px-10 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex w-16 h-16 bg-white/5 rounded-full items-center justify-center border border-white/10 mb-8 shadow-2xl text-white font-black text-3xl">
              “
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
              Apa Kata Warga Lokal?
            </h2>
            <p className="text-slate-400 mt-6 text-sm md:text-lg font-medium italic opacity-70">
              Cerita jujur dari mereka yang tinggal di Desa Sidodadi Asri
            </p>
          </div>

          <div className="bg-[#1e293b] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_rgba(0,0,0,0.4)] border border-white/5">
            {/* Bagian Foto Warga */}
            <div className="h-80 md:h-[600px] md:w-[45%] relative bg-slate-800 overflow-hidden shrink-0 group">
              <img
                src={testimonials[current].image}
                alt={testimonials[current].name}
                className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:hidden"></div>
            </div>
            
            {/* Bagian Teks Testimoni */}
            <div className="md:w-[55%] p-10 md:p-20 flex flex-col justify-between relative">
              <div className="space-y-8 md:space-y-12">
                <div>
                  <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                    {testimonials[current].name}
                  </h3>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="h-0.5 w-8 bg-emerald-500"></div>
                    <p className="text-emerald-400 font-black text-[10px] md:text-xs tracking-[0.3em] uppercase">
                      {testimonials[current].position}
                    </p>
                  </div>
                </div>
                
                <p className="text-slate-200 text-lg md:text-2xl italic leading-relaxed font-serif">
                  "{testimonials[current].text}"
                </p>
              </div>
              
              <div className="flex items-center justify-between mt-16 pt-10 border-t border-white/10">
                <div className="flex gap-4 md:gap-6">
                  <button onClick={handlePrev} className="w-14 h-14 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 transition-all shadow-xl active:scale-90">
                    ←
                  </button>
                  <button onClick={handleNext} className="w-14 h-14 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 transition-all shadow-xl active:scale-90">
                    →
                  </button>
                </div>
                
                <div className="text-slate-500 font-mono text-sm md:text-xl">
                  <span className="text-emerald-400 font-black tracking-tighter">0{current + 1}</span> 
                  <span className="mx-2 opacity-20">/</span> 
                  <span className="opacity-40">0{testimonials.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏛️ SECTION 4: FOOTER (OFFICIAL INFO) */}
      <footer className="relative w-full bg-white border-t border-slate-100 overflow-hidden pt-20 md:pt-32 pb-12">
        <img
          src={bungaBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none z-0 scale-150"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-10">
            
            {/* IDENTITAS DESA */}
            <div className="flex flex-col gap-8 w-full lg:w-1/3 items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center gap-6">
                <div className="bg-white p-3 rounded-[2rem] shadow-2xl border border-slate-50 transform -rotate-6">
                  <img src={logoKKN} alt="Logo KKN" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
                </div>
                <div className="text-left rotate-0">
                  <h3 className="text-slate-400 font-black text-[10px] md:text-[12px] uppercase tracking-[0.3em]">KKN Tematik ITERA</h3>
                  <p className="text-slate-900 text-3xl md:text-4xl font-black tracking-tighter leading-none">Sidodadi Asri</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-slate-800 font-black text-base md:text-lg">Website Resmi Informasi Desa</p>
                <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed opacity-60 italic">
                  Memberikan informasi akurat dan transparan bagi seluruh warga Desa Sidodadi Asri, Kecamatan Jati Agung.
                </p>
              </div>
            </div>

            {/* NAVIGASI HALAMAN (DI TAB YANG SAMA) */}
            <div className="w-full lg:w-1/3 flex flex-col items-center">
              <h4 className="text-slate-900 font-black text-xs md:text-sm uppercase tracking-[0.4em] border-b-4 border-emerald-500 pb-2 mb-10 inline-block">
                Eksplorasi
              </h4>
              <ul className="grid grid-cols-2 lg:grid-cols-1 gap-x-12 gap-y-5 text-slate-600 font-black text-xs md:text-sm text-center lg:text-center">
                <li><Link to="/" className="hover:text-emerald-600 transition-all uppercase tracking-widest">Beranda</Link></li>
                <li><Link to="/profile" className="hover:text-emerald-600 transition-all uppercase tracking-widest">Profil Desa</Link></li>
                <li><Link to="/layanan" className="hover:text-emerald-600 transition-all uppercase tracking-widest">Layanan Desa</Link></li>
                <li><Link to="/kontak" className="hover:text-emerald-600 transition-all uppercase tracking-widest">Kontak Kami</Link></li>
                <li><Link to="/galeri" className="hover:text-emerald-600 transition-all uppercase tracking-widest">Galeri & Artikel</Link></li>
              </ul>
            </div>

            {/* KONEKSI MEDIA SOSIAL */}
            <div className="flex flex-col items-center lg:items-end w-full lg:w-1/3">
              <h4 className="text-slate-900 font-black text-xs md:text-sm uppercase tracking-[0.4em] border-b-4 border-emerald-500 pb-2 mb-10 inline-block">
                Ikuti Kami
              </h4>
              <div className="flex items-center gap-8">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-125 transition-all duration-500">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png" alt="IG" className="w-10 h-10 md:w-12 md:h-12 shadow-sm" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-125 transition-all duration-500">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png" alt="FB" className="w-10 h-10 md:w-12 md:h-12 shadow-sm" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="bg-black w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transform hover:scale-125 transition-all duration-500 shadow-xl">
                  <img src="https://toppng.com/uploads/preview/tiktok-logo-png-download-116616376145yvg1mox2s.png" alt="TK" className="w-5 h-5 md:w-6 md:h-6 object-contain invert" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;