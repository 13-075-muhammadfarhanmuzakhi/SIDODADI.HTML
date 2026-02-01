import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';

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
          
          // Cek apakah response sukses (status 200)
          if (!res.ok) {
            const errorText = await res.text();
            console.error(`Error ${res.status}: Server mengirim HTML bukannya JSON. Isi response:`, errorText);
            return;
          }

          const data = await res.json();
          // Pastikan data yang masuk adalah array
          const finalData = Array.isArray(data) ? data : (data.data || []);
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
    <div className="min-h-screen w-full bg-[#f3ecdc] relative overflow-x-hidden pt-24 md:pt-40 pb-20 px-4 md:px-6 flex flex-col items-center font-sans">
      
      {/* Background Pattern - Opacity dikurangi di mobile agar tidak mengganggu mata */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 md:opacity-30">
        <img src={bgPattern} alt="bg" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Header Section - Font lebih dinamis */}
        <div className="text-center mb-10 md:mb-16"> 
          <h1 className="text-4xl md:text-7xl font-bold text-black mb-4 tracking-tighter font-serif leading-tight">
            Galeri & Warta
          </h1>
          <p className="text-base md:text-2xl font-light text-black/60 italic leading-relaxed px-4">
            Dokumentasi kegiatan dan informasi terbaru Desa Sidodadi Asri
          </p>
        </div>

        {/* ================= GALERI UTAMA (FEATURED) ================= */}
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
            
            {/* Kartu Besar - Adaptif Height */}
            <Link 
              to={`/artikel-desa/${featured[0].id_artikel}`}
              className="md:col-span-2 relative group overflow-hidden rounded-[30px] md:rounded-[40px] h-[350px] md:h-[600px] shadow-2xl block border-4 border-white/30"
            >
              <img
                src={featured[0].img ? `http://127.0.0.1:8000/artikel/${featured[0].img}` : bgUp}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                alt="featured"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10 text-white">
                <p className="text-[10px] md:text-sm opacity-80 mb-1 uppercase tracking-widest">
                  {new Date(featured[0].tgl_post).toLocaleDateString("id-ID")}
                </p>
                <h2 className="text-xl md:text-4xl font-bold mb-2 md:mb-3 leading-tight">
                    {featured[0].judul_artikel}
                </h2>
                <p className="opacity-70 italic max-w-xl text-xs md:text-base line-clamp-2">
                    {featured[0].deskripsi}
                </p>
              </div>
            </Link>

            {/* Kartu Kecil - Menumpuk rapi di mobile */}
            <div className="flex flex-col gap-4 md:gap-6">
              {featured.slice(1).map((item) => (
                <Link 
                  key={item.id_artikel} 
                  to={`/artikel-desa/${item.id_artikel}`}
                  className="relative group overflow-hidden rounded-[25px] md:rounded-[35px] h-[200px] md:h-[287px] shadow-xl block border-4 border-white/30"
                >
                  <img
                    src={item.img ? `http://127.0.0.1:8000/artikel/${item.img}` : bgUp}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    alt={item.judul_artikel}
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all flex flex-col justify-end p-5 md:p-6 text-white">
                    <p className="text-[10px] opacity-80 uppercase">{new Date(item.tgl_post).toLocaleDateString("id-ID")}</p>
                    <h3 className="font-bold text-lg md:text-xl leading-tight">{item.judul_artikel}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-20">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black/20 mb-4"></div>
             <p className="italic opacity-50">Memuat data warta...</p>
          </div>
        )}

        {/* ================= BUTTON LIHAT SEMUA ================= */}
        {!isExpanded && additional.length > 0 && (
          <div className="flex justify-center mb-16 md:mb-20">
            <button
              onClick={toggleExpand}
              className="bg-[#111827] text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-xs md:text-sm flex items-center gap-3 hover:bg-black transition-all shadow-xl active:scale-95"
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
            isExpanded ? "max-h-[8000px] opacity-100 mb-20" : "max-h-0 opacity-0"
          }`}
        >
          {/* Grid responsif: 1 di Mobile, 2 di Tablet, 3 di Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {additional.map((item) => (
              <Link 
                key={item.id_artikel} 
                to={`/artikel-desa/${item.id_artikel}`}
                className="bg-white/50 backdrop-blur-md rounded-[30px] md:rounded-[40px] overflow-hidden shadow-lg group hover:bg-white transition-all duration-300 block border border-white/50"
              >
                <div className="h-52 md:h-60 overflow-hidden">
                  <img
                    src={item.img ? `http://127.0.0.1:8000/artikel/${item.img}` : bgUp}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    alt={item.judul_artikel}
                  />
                </div>
                <div className="p-6 md:p-8">
                  <p className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">
                    {new Date(item.tgl_post).toLocaleDateString("id-ID")}
                  </p>
                  <h3 className="text-lg md:text-xl font-bold mb-3 leading-tight group-hover:text-emerald-600 transition-colors">
                    {item.judul_artikel}
                  </h3>
                  <p className="text-xs md:text-sm italic text-gray-600 line-clamp-3 leading-relaxed">
                    {item.deskripsi}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="flex justify-center mt-16 md:mt-20">
            <button 
              onClick={toggleExpand}
              className="bg-white text-[#111827] border border-black/10 px-10 py-3 rounded-full font-bold hover:bg-black hover:text-white transition-all shadow-md text-xs uppercase tracking-widest"
            >
              Tutup Galeri
            </button>
          </div>
        </div>

        {/* ================= TOMBOL GALERI SPESIAL (FLOATING) ================= */}
        {/* Posisi disesuaikan untuk kenyamanan jempol (Mobile Friendly) */}
        <Link 
          to="/galeri-spesial" 
          className="fixed bottom-10 md:bottom-24 right-4 md:right-8 z-[999] group flex items-center gap-3 bg-[#1e293b] text-white pl-4 pr-1.5 py-1.5 rounded-full shadow-2xl hover:scale-110 transition-all border border-white/10"
        >
          <span className="font-bold text-[9px] md:text-[10px] tracking-widest uppercase ml-2">Galeri Spesial</span>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#93ff8d] rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
            <span className="text-black text-xs md:text-sm">✨</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Galeri;