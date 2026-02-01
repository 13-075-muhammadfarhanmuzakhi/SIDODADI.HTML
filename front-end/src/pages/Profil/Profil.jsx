import React, { useEffect, useRef, useState } from "react";
import bungaBg from "../../assets/images/BUNGA.png";
import gunungBg from "../../assets/images/GUNUNG.jpeg";
import StrukturOrganisasi from "./StrukturOrganisasi";

const Profile = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mapVisible, setMapVisible] = useState(false);
  const mapRef = useRef(null);

  const slides = [
    {
      title: "Sejarah Desa",
      content:
        "Desa Sidodadi Asri terbentuk dari kawasan hutan yang mulai dibuka oleh masyarakat sejak tahun 1939 bersama karyawan Perusahaan Negara Perkebunan. Awalnya wilayah ini masih menjadi bagian dari Desa Kertosari, namun seiring bertambahnya jumlah penduduk dan aktivitas masyarakat, muncul kebutuhan untuk membentuk desa sendiri. Atas inisiatif tokoh masyarakat dan pemerintah setempat, pada tahun 1975 Sidodadi Asri resmi ditetapkan sebagai desa di Kecamatan Jati Agung, Kabupaten Lampung Selatan. Dalam perjalanannya, desa ini terus mengalami perkembangan, mulai dari penataan wilayah dan dusun, penegasan batas desa, hingga proses pengelolaan dan penguatan hak atas tanah masyarakat. Pergantian kepemimpinan desa dari waktu ke waktu turut mewarnai dinamika pembangunan, sehingga hingga kini Desa Sidodadi Asri terus tumbuh sebagai desa yang aktif dan berorientasi pada peningkatan kesejahteraan warganya.",
    },
    {
      title: "Visi & Misi",
      visi: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.",
      misi: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Intersection Observer untuk animasi zoom out peta
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMapVisible(true);
          }
        });
      },
      {
        threshold: 0.3, // Trigger saat 30% section terlihat
      }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current);
      }
    };
  }, []);

  const statistikData = [
    {
      title: "Total Penduduk",
      value: "122.222 Jiwa",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Jumlah Penduduk Laki - Laki",
      value: "12345",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: "Jumlah Penduduk Perempuan",
      value: "12345",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: "Luas Wilayah",
      value: "978 km²",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Mata Pencaharian Utama",
      value: "Petani",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Jumlah Penerima Bantuan",
      value: "12345",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: "Agama Mayoritas",
      value: "Islam",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* ================= SLIDES SECTION ================= */}
      <div className="relative min-h-[100vh] w-full overflow-hidden flex flex-col justify-center">
        {/* Background Image - Di HP 'fixed' dimatikan agar performa ringan */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${gunungBg})`,
            backgroundAttachment: window.innerWidth > 768 ? "fixed" : "scroll",
          }}
        />

        {/* Overlay - Lebih gelap di mobile agar teks putih/terang lebih kontras */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/20" />

        {/* Content Container */}
        <div className="relative z-10 w-full px-4 py-20 md:py-24">
          <div className="max-w-5xl mx-auto">
            
            {/* Slide Wrapper */}
            <div className="relative flex items-center">
              
              {/* Tombol Navigasi - Di HP diletakkan di bawah atau dibuat minimalis */}
              <button
                onClick={prevSlide}
                className="absolute -left-2 md:-left-20 z-20 w-10 h-10 md:w-16 md:h-16 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/40 transition-all shadow-lg"
                aria-label="Previous"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Card Utama */}
              <div className="w-full transition-all duration-500 transform">
                {slides[currentSlide].content ? (
                  // --- TAMPILAN SEJARAH ---
                  <div className="bg-white/90 md:bg-white/80 backdrop-blur-lg rounded-[30px] md:rounded-[50px] p-6 md:p-12 shadow-2xl border border-white/50">
                    <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4 md:mb-8 text-center font-serif uppercase tracking-tight">
                      {slides[currentSlide].title}
                    </h2>
                    {/* Scroll area untuk teks panjang di mobile agar tidak memotong layar */}
                    <div className="max-h-[50vh] md:max-h-none overflow-y-auto pr-2 custom-scrollbar">
                      <p className="text-slate-700 text-sm md:text-lg leading-relaxed md:leading-loose text-justify font-serif italic">
                        {slides[currentSlide].content}
                      </p>
                    </div>
                  </div>
                ) : (
                  // --- TAMPILAN VISI & MISI ---
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-stretch">
                    {/* Visi Card */}
                    <div className="flex-1 bg-white/90 md:bg-white/80 backdrop-blur-lg rounded-[30px] p-6 md:p-10 shadow-xl border border-white/50 flex flex-col items-center">
                      <div className="w-12 h-1 bg-[#93ff8d] mb-4 rounded-full"></div>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 uppercase font-serif">Visi</h2>
                      <p className="text-slate-700 text-sm md:text-lg leading-relaxed text-center font-serif italic">
                        "{slides[currentSlide].visi}"
                      </p>
                    </div>

                    {/* Misi Card */}
                    <div className="flex-1 bg-[#1e293b]/90 md:bg-[#1e293b]/80 backdrop-blur-lg rounded-[30px] p-6 md:p-10 shadow-xl border border-white/10 flex flex-col items-center">
                      <div className="w-12 h-1 bg-[#93ff8d] mb-4 rounded-full"></div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 uppercase font-serif">Misi</h2>
                      <p className="text-slate-200 text-sm md:text-lg leading-relaxed text-justify font-serif italic">
                        {slides[currentSlide].misi}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Tombol Next */}
              <button
                onClick={nextSlide}
                className="absolute -right-2 md:-right-20 z-20 w-10 h-10 md:w-16 md:h-16 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/40 transition-all shadow-lg"
                aria-label="Next"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Slide Indicators - Sangat penting di mobile agar user tahu ada slide lain */}
            <div className="flex justify-center gap-2 mt-8 md:mt-12">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "w-8 bg-[#93ff8d]" : "w-4 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= STATISTIK DESA SECTION ================= */}
      <section
        className="relative py-16 px-4"
        style={{
          backgroundImage: `url(${bungaBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/60" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-12">
            Data Statistik Desa
          </h2>

          {/* Statistik Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3 md:gap-6">
            {statistikData.map((stat, index) => (
              <div key={index} className="p-3 md:p-6 rounded-2xl bg-slate-600/90 ...">
                {/* Ikon diperkecil di mobile */}
                <div className="text-white mb-2 scale-75 md:scale-100">{stat.icon}</div>
                <h3 className="text-[10px] md:text-sm font-semibold text-white">{stat.title}</h3>
                <p className="text-xs md:text-base font-bold text-[#93ff8d]">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STRUKTUR PERANGKAT DESA SECTION ================= */}
      <StrukturOrganisasi />

      {/* ================= PETA DESA SECTION ================= */}
      <section 
        ref={mapRef}
        className="relative py-12 md:py-20 px-4 pb-20 md:pb-32"
        style={{
          backgroundImage: `url(${bungaBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay Background */}
        <div className="absolute inset-0 bg-white/70" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-serif uppercase tracking-tighter">
              Peta Wilayah Desa
            </h2>
            <div className="h-1.5 w-20 bg-[#93ff8d] mx-auto rounded-full"></div>
          </div>

          {/* Map Container - Frame Utama */}
          <div className="relative w-full rounded-[40px] overflow-hidden shadow-2xl border-4 border-slate-700 bg-slate-200">
            
            {/* 1. Kotak Info Utama - Di HP kita letakkan di atas secara statis, di Desktop melayang */}
            <div className="md:absolute md:top-6 md:left-6 bg-white/95 backdrop-blur-md p-5 md:rounded-2xl shadow-xl z-20 md:max-w-xs border-b md:border-b-0 border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📍</span>
                <h3 className="text-lg font-bold text-slate-800 leading-tight">
                  Desa Sidodadi Asri
                </h3>
              </div>
              <p className="text-xs md:text-sm text-slate-600 ml-9 font-medium">
                Kec. Jati Agung, Kab. Lampung Selatan, Lampung.
              </p>
            </div>

            {/* 2. Map Iframe - Ketinggian adaptif */}
            <div className="h-[400px] md:h-[550px] w-full relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15891.13540494443!2d105.295!3d-5.325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMTknMzAuMCJTIDEwNcKwMTcnNDIuMCJF!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Desa Sidodadi Asri"
                className={`transition-all duration-1000 ease-in-out ${
                  mapVisible ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
                }`}
              />
              
              {/* Anti-Trap Overlay: Mencegah peta ter-scroll tidak sengaja di HP */}
              {!mapVisible && (
                <div className="absolute inset-0 bg-transparent z-10" />
              )}
            </div>

            {/* 3. Legenda/Markers - Di HP diletakkan di bawah secara statis */}
            <div className="md:absolute md:bottom-6 md:right-6 bg-white/95 backdrop-blur-md p-4 md:rounded-2xl shadow-lg z-20 flex flex-row md:flex-col gap-4 md:gap-2">
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-700">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                Kantor Desa
              </div>
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-700 border-l md:border-l-0 pl-4 md:pl-0 border-slate-200">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                Fasilitas Umum
              </div>
            </div>
          </div>
          
          {/* Tombol Buka di Google Maps untuk Mobile */}
          <div className="mt-6 flex justify-center md:hidden">
            <a 
              href="https://maps.app.goo.gl/L3gHyd4rXHkX79ER7" // Ganti dengan link share maps asli desa anda
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1e293b] text-[#93ff8d] px-6 py-3 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 active:scale-95 transition-transform"
            >
              <span>Buka di Aplikasi Maps</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;