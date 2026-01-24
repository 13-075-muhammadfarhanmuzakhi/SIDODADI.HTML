import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';

import bgPattern from "../../assets/contacts/bg.png";
import bgUp from "../../assets/contacts/bg-up.png";
import arrowIcon from "../../assets/contacts/circle-web.svg";

const API = "http://127.0.0.1:8000/api/artikel";

const Galeri = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [artikels, setArtikels] = useState([]);
  // Pastikan nama ref konsisten
  const sectionRef = useRef(null); 

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setArtikels(data))
      .catch((err) => console.error("Gagal fetch data:", err)); // Tambahkan catch agar tidak silent error
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // Delay sedikit agar transisi max-h selesai sebelum scroll
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
    <div className="min-h-screen w-full bg-[#f3ecdc] relative overflow-x-hidden pt-28 pb-20 px-6 flex flex-col items-center font-sans">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <img src={bgPattern} alt="bg" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-16"> 
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-4 tracking-tighter font-serif lowercase first-letter:uppercase">
            Galeri
          </h1>
          <p className="text-xl md:text-2xl font-light text-black/60 italic lowercase first-letter:uppercase">
            Dokumentasi kegiatan dan informasi terbaru Desa Sidodadi Asri
          </p>
        </div>

        {/* ================= GALERI UTAMA ================= */}
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Kartu Besar */}
            <div className="md:col-span-2 relative group overflow-hidden rounded-[40px] h-[450px] md:h-[600px]">
              <img
                src={featured[0].img ? `http://127.0.0.1:8000/artikel/${featured[0].img}` : bgUp}
                className="w-full h-full object-cover"
                alt="featured"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10 text-white">
                <p className="text-sm opacity-80 mb-1">
                  {new Date(featured[0].tgl_post).toLocaleDateString("id-ID")}
                </p>
                <h2 className="text-4xl font-bold mb-3">{featured[0].judul_artikel}</h2>
                <p className="opacity-70 italic max-w-xl">{featured[0].deskripsi}</p>
              </div>
            </div>

            {/* Kartu Kecil */}
            <div className="flex flex-col gap-6">
              {featured.slice(1).map((item) => (
                <div key={item.id_artikel} className="relative overflow-hidden rounded-[35px] h-[215px]">
                  <img
                    src={item.img ? `http://127.0.0.1:8000/artikel/${item.img}` : bgUp}
                    className="w-full h-full object-cover"
                    alt={item.judul_artikel}
                  />
                  <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 text-white">
                    <p className="text-xs opacity-80">{new Date(item.tgl_post).toLocaleDateString("id-ID")}</p>
                    <h3 className="font-bold text-xl">{item.judul_artikel}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center italic opacity-50">Memuat data galeri...</p>
        )}

        {/* ================= BUTTON ================= */}
        {!isExpanded && additional.length > 0 && (
          <div className="flex justify-center mb-20">
            <button
              onClick={toggleExpand}
              className="bg-[#111827] text-white px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-black transition-colors"
            >
              Lihat Semua Dokumentasi
              <img src={arrowIcon} alt="arrow" className="w-4 h-4 invert" />
            </button>
          </div>
        )}

        {/* ================= LIST TAMBAHAN ================= */}
        <div
          ref={sectionRef} // Ganti dari expandedSectionRef ke sectionRef
          className={`transition-all duration-700 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-[5000px] opacity-100 mb-20" : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additional.map((item) => (
              <div key={item.id_artikel} className="bg-white rounded-[40px] overflow-hidden shadow-lg">
                <div className="h-60 overflow-hidden">
                  <img
                    src={item.img ? `http://127.0.0.1:8000/artikel/${item.img}` : bgUp}
                    className="w-full h-full object-cover"
                    alt={item.judul_artikel}
                  />
                </div>
                <div className="p-8">
                  <p className="text-xs text-gray-500 mb-2">
                    {new Date(item.tgl_post).toLocaleDateString("id-ID")}
                  </p>
                  <h3 className="text-2xl font-bold mb-3">{item.judul_artikel}</h3>
                  <p className="text-sm italic text-gray-600 line-clamp-3">{item.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Spesial */}
        <Link 
          to="/galeri-spesial" 
          className="fixed bottom-24 right-6 z-[50] group flex items-center gap-3 bg-[#454545] text-white pl-4 pr-1.5 py-1.5 rounded-full shadow-2xl hover:scale-110 transition-all border border-white/10"
        >
          <span className="font-bold text-[10px] tracking-widest uppercase">Galeri Spesial</span>
          <div className="w-8 h-8 bg-[#93ff8d] rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
            <span className="text-black text-sm">✨</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
11111111
export default Galeri;