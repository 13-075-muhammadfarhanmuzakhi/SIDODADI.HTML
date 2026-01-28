import React, { useEffect, useRef, useState } from "react";
import bungaBg from "../../assets/images/BUNGA.png";
import gunungBg from "../../assets/images/GUNUNG.jpeg";
import strukImg from "../../assets/images/Struk.png";

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
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${gunungBg})`,
            backgroundAttachment: "fixed",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20 pb-24">
        <div className="max-w-6xl w-full">
          {/* Slide Container */}
          <div className="relative flex items-center justify-center">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-0 z-20 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300 -translate-x-14 md:-translate-x-20"
              aria-label="Previous slide"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Card Content */}
            <div className="w-full max-w-4xl">
              {slides[currentSlide].content ? (
                // Slide Sejarah Desa (1 card)
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 text-center">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="text-slate-700 text-base md:text-lg leading-relaxed text-justify font-serif">
                    {slides[currentSlide].content}
                  </p>
                </div>
              ) : (
                // Slide Visi & Misi (2 cards terpisah)
                <div className="space-y-6">
                  {/* Visi Card */}
                  <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-white/50">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 text-center">
                      Visi
                    </h2>
                    <p className="text-slate-700 text-base md:text-lg leading-relaxed text-justify font-serif">
                      {slides[currentSlide].visi}
                    </p>
                  </div>

                  {/* Misi Card */}
                  <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-white/50">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 text-center">
                      Misi
                    </h2>
                    <p className="text-slate-700 text-base md:text-lg leading-relaxed text-justify font-serif">
                      {slides[currentSlide].misi}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-0 z-20 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300 translate-x-14 md:translate-x-20"
              aria-label="Next slide"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Slide Indicators */}
          {/* <div className="flex justify-center gap-3 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div> */}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
            {statistikData.map((stat, index) => (
              <div
                key={index}
                className="bg-slate-600/90 backdrop-blur-sm rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {/* Icon */}
                <div className="text-white mb-3">{stat.icon}</div>

                {/* Title */}
                <h3 className="text-white text-xs md:text-sm font-semibold mb-2 min-h-[40px] flex items-center">
                  {stat.title}
                </h3>

                {/* Value */}
                <p className="text-white text-sm md:text-base font-bold">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STRUKTUR PERANGKAT DESA SECTION ================= */}
      <section className="relative py-8 md:py-12 px-4 bg-slate-700 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center mb-4 md:mb-8">
            Struktur Perangkat Desa
          </h2> */}

          {/* Organizational Chart Image - Responsive */}
          <div className="flex justify-center items-center w-full">
            <img 
              src={strukImg} 
              alt="Struktur Perangkat Desa Sidodadi Asri" 
              className="w-full h-auto object-contain max-h-[70vh] md:max-h-[80vh]"
            />
          </div>
        </div>
      </section>

      {/* ================= PETA DESA SECTION ================= */}
      <section 
        ref={mapRef}
        className="relative py-8 md:py-12 px-4 pb-16 md:pb-24"
        style={{
          backgroundImage: `url(${bungaBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/70" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 text-center mb-6">
            Peta Desa
          </h2>

          {/* Map Container - Frame tetap, map yang zoom */}
          <div className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-600">
            {/* Google Maps Embed - Desa Sidodadi Asri dengan Zoom Animation */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.9707823456!2d105.30694931476!3d-5.370984596208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40dac0e5c6cf8d%3A0x5f5c5e5c5e5c5e5c!2sDesa%20Sidodadi%20Asri!5e0!3m2!1sen!2sid!4v1737887890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Desa Sidodadi Asri"
              className={`transition-all duration-1000 ease-out ${
                mapVisible ? 'scale-100 opacity-100' : 'scale-150 opacity-0'
              }`}
            />

            {/* Overlay Info */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs">
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                📍 Desa Sidodadi Asri
              </h3>
              <p className="text-sm text-slate-600">
                Kec. Jati Agung, Kab. Lampung Selatan
              </p>
              <p className="text-sm text-slate-600">
                Provinsi Lampung, Indonesia
              </p>
            </div>

            {/* Markers Info */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-slate-700 font-medium">Kantor Desa</span>
              </div>
              <div className="flex items-center gap-2 text-sm mt-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-slate-700 font-medium">Fasilitas Umum</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;