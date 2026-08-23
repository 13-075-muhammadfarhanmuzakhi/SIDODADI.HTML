import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import logoKKN from "../../assets/images/logokkn.png";

const API_BASE = "http://127.0.0.1:8000/api/artikel";
const IMAGE_BASE_URL = "http://127.0.0.1:8000/artikel/";

// ================= 🎭 VARIANTS ANIMASI =================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.03 },
  },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardItemAnim = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const LamanArtikelDesa = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artikel, setArtikel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetailArtikel = async () => {
      try {
        const res = await fetch(`${API_BASE}/${id}`);
        if (!res.ok) throw new Error("Artikel tidak ditemukan");
        const json = await res.json();

        const dataAman = json.data || json;
        setArtikel(Array.isArray(dataAman) ? dataAman[0] : dataAman);
      } catch (e) {
        console.error("Gagal memuat artikel:", e);
        setArtikel(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailArtikel();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-500 font-sans gap-2">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#052e1d]"></div>
        <p className="text-[10px] tracking-wider uppercase font-semibold">
          Memuat...
        </p>
      </div>
    );
  }

  if (!artikel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-600 font-sans gap-3 px-4 text-center pt-28">
        <p className="text-xs font-medium">
          Artikel tidak ditemukan atau telah dihapus.
        </p>
        <button
          onClick={() => navigate("/galeri")}
          className="bg-[#052e1d] text-amber-300 px-4 py-1.5 rounded-full font-bold text-[11px] uppercase tracking-wider"
        >
          Kembali ke Galeri
        </button>
      </div>
    );
  }

  const formattedDate = artikel.tgl_post
    ? new Date(artikel.tgl_post).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Tanggal tidak tersedia";

  return (
    <div className="min-h-screen w-full bg-slate-50 relative overflow-x-hidden flex flex-col justify-between font-sans">
      {/* 🟢 Container Utama diberi pt-24 (mobile) & pt-28 (desktop) agar Bebas dari Navbar */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-10 flex-grow">
        {/* ================= ⬅️ TOMBOL KEMBALI ================= */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 bg-[#052e1d] text-amber-300 hover:bg-[#02140D] hover:text-amber-200 px-3.5 py-1.5 rounded-full border border-[#B8860B]/40 shadow-xs text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all active:scale-95"
          >
            <span>←</span>
            <span>Kembali</span>
          </button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3.5"
        >
          {/* ================= 📌 HEADER & METADATA ================= */}
          <motion.header variants={itemFadeUp} className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] sm:text-xs font-semibold text-slate-500 leading-none">
              <span className="text-[#b47818] bg-[#FFFBEB] px-2 py-0.5 rounded-md border border-[#f5d07f]/80 uppercase tracking-wider text-[9px] sm:text-[10px] font-bold">
                {artikel.kategori || artikel.jenis_berita || "Berita Desa"}
              </span>

              <span className="text-slate-300">•</span>
              <span>{formattedDate}</span>

              {artikel.lokasi && (
                <>
                  <span className="text-slate-300">•</span>
                  <span>{artikel.lokasi}</span>
                </>
              )}

              {artikel.penulis && (
                <>
                  <span className="text-slate-300">•</span>
                  <span>{artikel.penulis}</span>
                </>
              )}
            </div>

            <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[#052e1d] leading-snug tracking-tight pt-0.5">
              {artikel.judul_artikel}
            </h1>
          </motion.header>

          {/* ================= 🖼️ FOTO UTAMA ================= */}
          <motion.div
            variants={itemFadeUp}
            className="w-full h-48 sm:h-72 md:h-[380px] rounded-xl sm:rounded-2xl overflow-hidden shadow-xs border border-slate-200 bg-slate-200 relative my-1"
          >
            {artikel.img ? (
              <img
                src={`${IMAGE_BASE_URL}${artikel.img}`}
                alt={artikel.judul_artikel || "Gambar Artikel"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-xs italic">
                Tidak ada foto pendukung
              </div>
            )}
          </motion.div>

          {/* ================= 📝 ISI BERITA ================= */}
          <motion.article
            variants={itemFadeUp}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xs border border-slate-200/80 text-slate-800"
          >
            <div className="whitespace-pre-wrap font-normal text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed sm:leading-loose">
              {artikel.deskripsi}
            </div>

            <div className="mt-6 sm:mt-8 pt-4 border-t border-slate-100 flex flex-col items-center text-center gap-1.5">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]"></span>
                <span className="w-6 h-1.5 rounded-full bg-[#052e1d]"></span>
              </div>
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Pemerintah Desa Sidodadi Asri
              </p>
            </div>
          </motion.article>
        </motion.div>
      </div>

      {/* ================= 🔻 FOOTER ================= */}
      <footer className="w-full bg-emerald-950 text-slate-200 border-t-2 border-amber-500/40 pt-6 pb-4 px-4 sm:px-8 relative z-20">
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

export default LamanArtikelDesa;
