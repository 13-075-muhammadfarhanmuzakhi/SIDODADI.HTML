import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import logoKKN from "../../assets/images/logokkn.png";
import bgUp from "../../assets/contacts/bg-up.png";
import arrowIcon from "../../assets/contacts/circle-web.svg";

const API = "http://127.0.0.1:8000/api/artikel";

// ================= 🎭 VARIANTS ANIMASI =================
const pageHeaderVariants = {
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardAnimVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

const Galeri = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [artikels, setArtikels] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API);
        if (!res.ok) {
          const errorText = await res.text();
          console.error(
            `Error ${res.status}: Server mengirim HTML bukannya JSON. Isi response:`,
            errorText,
          );
          return;
        }
        const data = await res.json();
        const finalData = Array.isArray(data) ? data : data.data || [];
        setArtikels(finalData);
      } catch (err) {
        console.error("Gagal fetch data:", err.message);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  };

  const featured = artikels.slice(0, 3);
  const additional = artikels.slice(3);

  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden flex flex-col justify-between font-sans">
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-16 flex-grow">
        {/* ================= 🌟 WELCOME HEADER (MINIMALIST & COMPACT) ================= */}
        <motion.div
          variants={pageHeaderVariants}
          initial="hidden"
          animate="visible"
          className="text-left mb-5 sm:mb-6 max-w-xl"
        >
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-[#b47818] bg-[#FFFBEB] px-2.5 py-0.5 rounded-full border border-[#f5d07f]/70 inline-block mb-1.5 shadow-2xs"
          >
            Dokumentasi & Berita
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-2xl sm:text-3xl font-extrabold mb-1 tracking-tight leading-snug text-[#052e1d]"
          >
            Galeri & Artikel Desa
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-xs sm:text-sm font-normal text-slate-500 leading-normal"
          >
            Kumpulan aktivitas, program kerja, dan catatan peristiwa di Desa
            Sidodadi Asri.
          </motion.p>
        </motion.div>

        {/* ================= 📸 GALERI UTAMA (DESKTOP & MOBILE GRID) ================= */}
        {featured.length > 0 ? (
          <motion.div
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 mb-8 sm:mb-14"
          >
            {/* Foto Utama (2 Kolom + 2 Baris di Desktop) */}
            <motion.div
              variants={cardAnimVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="col-span-2 md:col-span-2 md:row-span-2"
            >
              <Link
                to={`/artikel-desa/${featured[0].id_artikel}`}
                className="relative group overflow-hidden rounded-2xl sm:rounded-3xl h-52 sm:h-72 md:h-full min-h-[220px] md:min-h-[470px] shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end border border-slate-200/80 border-t-2 border-t-[#B8860B]"
              >
                <img
                  src={
                    featured[0].img
                      ? `http://127.0.0.1:8000/artikel/${featured[0].img}`
                      : bgUp
                  }
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                  alt="featured"
                />
                <div className="relative z-10 p-4 sm:p-8 bg-gradient-to-t from-[#02140D]/95 via-[#02140D]/40 to-transparent text-white">
                  <span className="text-[9px] sm:text-xs font-bold text-amber-400 mb-1.5 uppercase tracking-wider backdrop-blur-md bg-black/30 px-2.5 py-0.5 rounded-md inline-block">
                    {new Date(featured[0].tgl_post).toLocaleDateString("id-ID")}
                  </span>
                  <h2 className="text-base sm:text-2xl md:text-3xl font-extrabold mb-1 leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors">
                    {featured[0].judul_artikel}
                  </h2>
                  <p className="opacity-80 text-[10px] sm:text-xs line-clamp-2 hidden sm:block">
                    {featured[0].deskripsi}
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* 2 Foto Pendamping Kolom Kanan */}
            {featured.slice(1).map((item) => (
              <motion.div
                key={item.id_artikel}
                variants={cardAnimVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="col-span-1 md:col-span-1 md:row-span-1"
              >
                <Link
                  to={`/artikel-desa/${item.id_artikel}`}
                  className="relative group overflow-hidden rounded-2xl sm:rounded-3xl h-36 sm:h-48 md:h-[225px] shadow-md hover:shadow-2xl transition-all duration-500 block border border-slate-200/80 border-t-2 border-t-[#B8860B]"
                >
                  <img
                    src={
                      item.img
                        ? `http://127.0.0.1:8000/artikel/${item.img}`
                        : bgUp
                    }
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                    alt={item.judul_artikel}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02140D]/90 via-black/20 to-transparent flex flex-col justify-end p-3 sm:p-5 text-white">
                    <p className="text-[8px] sm:text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-0.5">
                      {new Date(item.tgl_post).toLocaleDateString("id-ID")}
                    </p>
                    <h3 className="font-bold text-xs sm:text-base leading-tight line-clamp-2 group-hover:text-amber-300 transition-colors">
                      {item.judul_artikel}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#052e1d] mb-3"></div>
            <p className="text-xs text-slate-500 italic">
              Memuat dokumentasi desa...
            </p>
          </div>
        )}

        {/* ================= 🔘 BUTTON LIHAT SEMUA ================= */}
        {!isExpanded && additional.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mb-12 sm:mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleExpand}
              className="bg-gradient-to-r from-[#052e1d] to-[#02140D] text-amber-300 border border-[#B8860B]/40 px-6 sm:px-9 py-3 rounded-full font-bold text-xs flex items-center gap-2.5 shadow-lg"
            >
              <span>Lihat Semua Dokumentasi</span>
              <img src={arrowIcon} alt="arrow" className="w-3.5 h-3.5 invert" />
            </motion.button>
          </motion.div>
        )}

        {/* ================= 📂 LIST DOKUMENTASI TAMBAHAN ================= */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              ref={sectionRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden mb-16"
            >
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {additional.map((item, idx) => (
                  <motion.div
                    key={item.id_artikel}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link
                      to={`/artikel-desa/${item.id_artikel}`}
                      className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-xl group transition-all duration-300 block border border-slate-200/80 border-t-2 border-t-[#B8860B]"
                    >
                      <div className="h-28 sm:h-44 md:h-52 overflow-hidden">
                        <img
                          src={
                            item.img
                              ? `http://127.0.0.1:8000/artikel/${item.img}`
                              : bgUp
                          }
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                          alt={item.judul_artikel}
                        />
                      </div>
                      <div className="p-3 sm:p-5">
                        <p className="text-[8px] sm:text-[10px] text-[#B8860B] font-bold uppercase tracking-wider mb-1">
                          {new Date(item.tgl_post).toLocaleDateString("id-ID")}
                        </p>
                        <h3 className="text-xs sm:text-base font-bold text-[#052e1d] leading-snug group-hover:text-[#B8860B] transition-colors line-clamp-2 mb-1">
                          {item.judul_artikel}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed hidden sm:block">
                          {item.deskripsi}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={toggleExpand}
                  className="bg-white text-[#052e1d] border border-[#052e1d]/20 px-6 py-2 rounded-full font-bold hover:bg-[#052e1d] hover:text-white transition-all shadow-xs text-[10px] sm:text-xs uppercase tracking-wider"
                >
                  Tutup Galeri
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= ✨ FLOATING ACTION BUTTON ================= */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-3 sm:right-6 z-[999]"
        >
          <Link
            to="/galeri-spesial"
            className="group flex items-center gap-2 bg-gradient-to-r from-[#052e1d] to-[#02140D] text-amber-300 pl-3.5 pr-1.5 py-1.5 rounded-full shadow-2xl border border-[#B8860B]/40"
          >
            <span className="font-bold text-[9px] sm:text-[10px] tracking-widest uppercase ml-1">
              Galeri Spesial
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#B8860B] rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform shadow-xs">
              <span className="text-white text-xs">✨</span>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* ================= 🔻 FOOTER UTAMA ================= */}
      <footer className="w-full bg-emerald-950 text-slate-200 border-t-2 border-amber-500/40 pt-6 pb-4 px-3 sm:px-8">
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 pb-5 border-b border-emerald-800/60"
        >
          <motion.div
            variants={cardItemAnim}
            className="space-y-1.5 sm:col-span-2 md:col-span-1"
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
                  className="text-slate-300 hover:text-amber-300 transition-colors"
                >
                  Profil Desa
                </Link>
              </li>
              <li>
                <Link
                  to="/layanan"
                  className="text-slate-300 hover:text-amber-300 transition-colors"
                >
                  Layanan Desa
                </Link>
              </li>
              <li>
                <Link
                  to="/galeri"
                  className="text-amber-400 font-extrabold flex items-center gap-1 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
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
    </div>
  );
};

export default Galeri;
