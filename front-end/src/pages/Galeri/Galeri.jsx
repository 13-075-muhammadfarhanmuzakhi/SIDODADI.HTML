import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import logoKKN from "../../assets/images/logokkn.png";
import bgPattern from "../../assets/contacts/bg.png";
import bgUp from "../../assets/contacts/bg-up.png";
import arrowIcon from "../../assets/contacts/circle-web.svg";

const API = "http://127.0.0.1:8000/api/artikel";

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
    <div className="min-h-screen w-full bg-slate-50 relative overflow-x-hidden flex flex-col justify-between font-sans">
      {/* Garis Aksen Gradasi Hijau Gelap ke Emas di paling atas */}
      <div className="w-full h-1.5 bg-gradient-to-r from-[#02140D] via-[#B8860B] to-[#052e1d] fixed top-0 left-0 z-50"></div>

      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-15">
        <img src={bgPattern} alt="bg" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-36 pb-20 flex-grow">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#052e1d] mb-4 tracking-tight leading-tight">
            Galeri & Warta
          </h1>
          <p className="text-base md:text-xl font-light text-slate-600 italic leading-relaxed px-4 max-w-2xl mx-auto">
            Dokumentasi kegiatan dan informasi terbaru Desa Sidodadi Asri
          </p>
          {/* Garis Pembatas Smooth Hijau-Emas */}
          <div className="w-28 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-[#052e1d] via-[#B8860B] to-[#052e1d]"></div>
        </div>

        {/* ================= GALERI UTAMA (FEATURED) ================= */}
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
            {/* Kartu Besar */}
            <Link
              to={`/artikel-desa/${featured[0].id_artikel}`}
              className="md:col-span-2 relative group overflow-hidden rounded-[30px] md:rounded-[40px] h-[350px] md:h-[580px] shadow-xl block border-t-4 border-t-[#B8860B] border-b-4 border-b-[#052e1d]"
            >
              <img
                src={
                  featured[0].img
                    ? `http://127.0.0.1:8000/artikel/${featured[0].img}`
                    : bgUp
                }
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                alt="featured"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02140D]/95 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-10 text-white">
                <p className="text-[10px] md:text-xs font-bold text-amber-400 mb-2 uppercase tracking-widest">
                  {new Date(featured[0].tgl_post).toLocaleDateString("id-ID")}
                </p>
                <h2 className="text-xl md:text-3xl font-bold mb-2 leading-tight">
                  {featured[0].judul_artikel}
                </h2>
                <p className="opacity-80 italic max-w-xl text-xs md:text-sm line-clamp-2">
                  {featured[0].deskripsi}
                </p>
              </div>
            </Link>

            {/* Kartu Kecil Samping */}
            <div className="flex flex-col gap-6">
              {featured.slice(1).map((item) => (
                <Link
                  key={item.id_artikel}
                  to={`/artikel-desa/${item.id_artikel}`}
                  className="relative group overflow-hidden rounded-[25px] md:rounded-[30px] h-[200px] md:h-[277px] shadow-lg block border-t-2 border-t-[#B8860B] border-b-4 border-b-[#052e1d]"
                >
                  <img
                    src={
                      item.img
                        ? `http://127.0.0.1:8000/artikel/${item.img}`
                        : bgUp
                    }
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    alt={item.judul_artikel}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02140D]/90 via-black/40 to-transparent flex flex-col justify-end p-5 text-white">
                    <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">
                      {new Date(item.tgl_post).toLocaleDateString("id-ID")}
                    </p>
                    <h3 className="font-bold text-base md:text-lg leading-tight line-clamp-2">
                      {item.judul_artikel}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#052e1d] mb-4"></div>
            <p className="italic text-slate-500">Memuat data warta...</p>
          </div>
        )}

        {/* ================= BUTTON LIHAT SEMUA ================= */}
        {!isExpanded && additional.length > 0 && (
          <div className="flex justify-center mb-16 md:mb-20">
            <button
              onClick={toggleExpand}
              className="bg-gradient-to-r from-[#052e1d] to-[#02140D] text-amber-300 border border-[#B8860B]/40 px-8 md:px-10 py-3.5 rounded-full font-bold text-xs md:text-sm flex items-center gap-3 hover:scale-105 transition-all shadow-xl active:scale-95"
            >
              Lihat Semua Dokumentasi
              <img src={arrowIcon} alt="arrow" className="w-4 h-4 invert" />
            </button>
          </div>
        )}

        {/* ================= LIST TAMBAHAN (EXPANDABLE) ================= */}
        <div
          ref={sectionRef}
          className={`transition-all duration-1000 ease-in-out overflow-hidden ${
            isExpanded
              ? "max-h-[8000px] opacity-100 mb-20"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {additional.map((item) => (
              <Link
                key={item.id_artikel}
                to={`/artikel-desa/${item.id_artikel}`}
                className="bg-white rounded-3xl overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300 block border-t-2 border-t-[#B8860B] border-b-4 border-b-[#052e1d]"
              >
                <div className="h-52 overflow-hidden">
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
                <div className="p-6">
                  <p className="text-[10px] text-[#B8860B] font-bold uppercase tracking-widest mb-2">
                    {new Date(item.tgl_post).toLocaleDateString("id-ID")}
                  </p>
                  <h3 className="text-lg font-bold mb-2 text-[#052e1d] leading-tight group-hover:text-[#B8860B] transition-colors">
                    {item.judul_artikel}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.deskripsi}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={toggleExpand}
              className="bg-white text-[#052e1d] border border-[#052e1d]/20 px-8 py-2.5 rounded-full font-bold hover:bg-[#052e1d] hover:text-white transition-all shadow-md text-xs uppercase tracking-widest"
            >
              Tutup Galeri
            </button>
          </div>
        </div>

        {/* ================= TOMBOL GALERI SPESIAL (FLOATING) ================= */}
        <Link
          to="/galeri-spesial"
          className="fixed bottom-10 right-4 md:right-8 z-[999] group flex items-center gap-3 bg-gradient-to-r from-[#052e1d] to-[#02140D] text-amber-300 pl-4 pr-1.5 py-1.5 rounded-full shadow-2xl hover:scale-105 transition-all border border-[#B8860B]/40"
        >
          <span className="font-bold text-[10px] tracking-widest uppercase ml-2">
            Galeri Spesial
          </span>
          <div className="w-8 h-8 bg-[#B8860B] rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
            <span className="text-white text-xs">✨</span>
          </div>
        </Link>
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

export default Galeri;
