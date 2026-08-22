import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import logoKKN from "../../assets/images/logokkn.png";
import bgPattern from "../../assets/contacts/bg.png";

const LamanArtikelDesa = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artikel, setArtikel] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = `http://127.0.0.1:8000/api/artikel/${id}`;
  const IMAGE_BASE_URL = "http://127.0.0.1:8000/artikel/";

  useEffect(() => {
    const fetchDetailArtikel = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Artikel tidak ditemukan");
        const json = await res.json();
        setArtikel(json);
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-serif italic">
        Memuat berita...
      </div>
    );
  if (!artikel)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Artikel tidak ditemukan.
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-slate-50 relative overflow-x-hidden flex flex-col justify-between font-sans">
      {/* Garis Aksen Gradasi Hijau Gelap ke Emas di paling atas */}
      <div className="w-full h-1.5 bg-gradient-to-r from-[#02140D] via-[#B8860B] to-[#052e1d] fixed top-0 left-0 z-50"></div>

      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-15">
        <img src={bgPattern} alt="bg" className="w-full h-full object-cover" />
      </div>

      {/* Konten Utama Detail Artikel */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-6 pt-28 md:pt-36 pb-20 flex-grow">
        {/* Tombol Kembali */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#052e1d] hover:text-[#B8860B] transition-colors font-bold text-xs uppercase tracking-widest bg-white/80 px-4 py-2 rounded-full border border-slate-200 shadow-sm"
          >
            ← Kembali ke Warta & Galeri
          </button>
        </div>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#052e1d] text-amber-300 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm border border-[#B8860B]/40">
              Berita Desa
            </span>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              {new Date(artikel.tgl_post).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[#052e1d] leading-tight mb-6">
            {artikel.judul_artikel}
          </h1>
        </header>

        {/* Foto Utama dengan Garis Aksen Hijau Gelap & Emas */}
        <div className="w-full h-[300px] md:h-[500px] rounded-[30px] md:rounded-[40px] overflow-hidden shadow-xl mb-10 border-t-4 border-t-[#B8860B] border-b-4 border-b-[#052e1d] bg-gray-200">
          <img
            src={
              artikel.img
                ? `${IMAGE_BASE_URL}${artikel.img}`
                : "https://via.placeholder.com/800x500"
            }
            alt={artikel.judul_artikel}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Isi Berita Lengkap */}
        <article className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-200 text-slate-800 leading-relaxed mb-12">
          <div className="whitespace-pre-wrap font-normal text-base md:text-lg text-slate-700">
            {artikel.deskripsi}
          </div>
        </article>

        {/* Watermark bawah artikel */}
        <div className="flex flex-col items-center pt-6 border-t border-slate-200">
          <div className="flex gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#B8860B]"></span>
            <span className="w-10 h-2 rounded-full bg-[#052e1d]"></span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[4px]">
            Humas Pemdes Sidodadi Asri
          </p>
        </div>
      </div>

      {/* ================= FOOTER INLINE ================= */}
      <footer className="w-full bg-gradient-to-b from-[#052e1d] to-[#02140D] text-slate-200 border-t-2 border-[#B8860B]/40 pt-10 pb-6 px-4 md:px-8 relative z-20">
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

          {/* Navigasi - Galeri & Berita berwarna Emas */}
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
                <Link
                  to="/profile"
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
                  className="text-[#B8860B] font-extrabold transition-colors"
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
    </div>
  );
};

export default LamanArtikelDesa;
