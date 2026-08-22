import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// Asset Gambar (Sesuaikan path jika letak foldernya berbeda)
import bungaBg from "../../assets/images/BUNGA.png";
import gunungBg from "../../assets/images/GUNUNG.jpeg";
import logoKKN from "../../assets/images/logokkn.png";

const Profil = () => {
  // State untuk Slide Sejarah / Visi Misi
  const [currentSlide, setCurrentSlide] = useState(0);

  // State untuk Peta
  const [mapVisible, setMapVisible] = useState(false);
  const mapRef = useRef(null);

  // State untuk Data Perangkat Desa (Diintegrasikan dengan Backend)
  const [perangkat, setPerangkat] = useState([]);
  const [loadingPerangkat, setLoadingPerangkat] = useState(true);

  // Data Fallback (Tampil jika backend belum berjalan)
  const defaultPerangkat = [
    { id: 1, nama: "H. Mulyadi", jabatan: "Kepala Desa", foto: null },
    { id: 2, nama: "Legina, S.IP", jabatan: "Sekretaris Desa", foto: null },
    { id: 3, nama: "Sumarman", jabatan: "Kaur Keuangan", foto: null },
    { id: 4, nama: "Rukiyah", jabatan: "Kaur Perencanaan", foto: null },
  ];

  // Fetch Data Perangkat Desa dari Backend menggunakan fetch bawaan (Tanpa Axios)
  useEffect(() => {
    const fetchPerangkat = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/perangkat-desa",
        );
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setPerangkat(data);
          } else {
            setPerangkat(defaultPerangkat);
          }
        } else {
          setPerangkat(defaultPerangkat);
        }
      } catch (error) {
        console.warn("Backend offline/error, menggunakan data default.", error);
        setPerangkat(defaultPerangkat);
      } finally {
        setLoadingPerangkat(false);
      }
    };

    fetchPerangkat();
  }, []);

  // Intersection Observer untuk animasi Peta
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setMapVisible(true);
        });
      },
      { threshold: 0.2 },
    );

    if (mapRef.current) observer.observe(mapRef.current);
    return () => {
      if (mapRef.current) observer.unobserve(mapRef.current);
    };
  }, []);

  // Data Slider Sejarah & Visi Misi
  const slides = [
    {
      title: "Sejarah Desa",
      content:
        "Desa Sidodadi Asri terbentuk dari kawasan hutan yang mulai dibuka oleh masyarakat sejak tahun 1939 bersama karyawan Perusahaan Negara Perkebunan. Awalnya wilayah ini masih menjadi bagian dari Desa Kertosari, namun seiring bertambahnya jumlah penduduk dan aktivitas masyarakat, muncul kebutuhan untuk membentuk desa sendiri. Atas inisiatif tokoh masyarakat dan pemerintah setempat, pada tahun 1975 Sidodadi Asri resmi ditetapkan sebagai desa di Kecamatan Jati Agung, Kabupaten Lampung Selatan.",
    },
    {
      title: "Visi & Misi",
      visi: "Mewujudkan Desa Sidodadi Asri yang Mandiri, Sejahtera, Berdaya Saing, dan Berkelanjutan Melalui Tata Kelola Pemerintahan yang Transparan.",
      misi: "Meningkatkan kualitas pelayanan publik berbasis digital, memperkuat perekonomian desa melalui UMKM dan pertanian, melestarikan nilai gotong royong, serta mempercepat pembangunan infrastruktur desa.",
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Data Statistik Desa
  const statistikData = [
    {
      title: "Total Penduduk",
      value: "4.850 Jiwa",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      title: "Penduduk Laki - Laki",
      value: "2.460 Jiwa",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      title: "Penduduk Perempuan",
      value: "2.390 Jiwa",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      title: "Luas Wilayah",
      value: "9,78 km²",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      title: "Mata Pencaharian Utama",
      value: "Pertanian",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Penerima Bantuan",
      value: "320 KK",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      title: "Agama Mayoritas",
      value: "Islam",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen flex flex-col justify-between">
      <div>
        {/* ================= 1. SLIDE SEJARAH / VISI MISI ================= */}
        <div className="relative min-h-[85vh] w-full overflow-hidden flex flex-col justify-center">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${gunungBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#02140D]/85 via-[#0A261D]/80 to-[#02140D]/90" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
            <div className="relative flex items-center">
              <button
                onClick={prevSlide}
                className="absolute -left-3 md:-left-12 z-20 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center bg-[#0A261D] text-amber-400 rounded-full border border-[#B8860B]/60 shadow-lg cursor-pointer"
              >
                ❮
              </button>

              <div className="w-full">
                {slides[currentSlide].content ? (
                  <div className="p-[2px] rounded-3xl bg-gradient-to-r from-[#0A261D] via-[#B8860B] to-[#0A261D]">
                    <div className="bg-white/95 rounded-[22px] p-6 md:p-10 border border-[#B8860B]/30 text-center">
                      <h2 className="text-2xl font-extrabold text-[#0A261D] mb-2 uppercase">
                        {slides[currentSlide].title}
                      </h2>
                      <div className="w-16 h-1 bg-[#B8860B] mx-auto mb-6 rounded-full"></div>
                      <p className="text-slate-800 text-xs md:text-sm leading-relaxed text-justify font-serif italic">
                        "{slides[currentSlide].content}"
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-[2px] rounded-3xl bg-gradient-to-b from-[#B8860B] to-[#0A261D]">
                      <div className="bg-white/95 rounded-[22px] p-6 text-center h-full">
                        <h2 className="text-xl font-bold text-[#0A261D] mb-2">
                          VISI
                        </h2>
                        <p className="text-slate-800 text-xs md:text-sm italic">
                          "{slides[currentSlide].visi}"
                        </p>
                      </div>
                    </div>
                    <div className="p-[2px] rounded-3xl bg-gradient-to-b from-[#0A261D] to-[#B8860B]">
                      <div className="bg-[#02140D] rounded-[22px] p-6 text-center h-full text-white">
                        <h2 className="text-xl font-bold text-amber-400 mb-2">
                          MISI
                        </h2>
                        <p className="text-slate-300 text-xs md:text-sm italic">
                          {slides[currentSlide].misi}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={nextSlide}
                className="absolute -right-3 md:-right-12 z-20 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center bg-[#0A261D] text-amber-400 rounded-full border border-[#B8860B]/60 shadow-lg cursor-pointer"
              >
                ❯
              </button>
            </div>
          </div>
        </div>

        {/* ================= 2. DATA STATISTIK DESA (PRESISI SAMA RATA) ================= */}
        <section
          className="relative py-12 px-4 overflow-hidden"
          style={{
            backgroundImage: `url(${bungaBg})`,
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs" />

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">
                Data Statistik Desa
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#0A261D] via-[#B8860B] to-[#0A261D] mx-auto mt-2 rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 items-stretch">
              {statistikData.map((stat, index) => (
                <div
                  key={index}
                  className="p-[1px] rounded-xl bg-gradient-to-b from-[#B8860B]/70 via-[#0A261D] to-[#B8860B]/30 shadow-md flex flex-col"
                >
                  <div className="bg-[#0A261D]/90 p-3 rounded-[11px] flex-1 flex flex-col justify-between items-center text-center border border-[#B8860B]/20">
                    {/* Icon */}
                    <div className="text-[#B8860B] p-2 bg-black/40 rounded-lg border border-[#B8860B]/30 shrink-0 mb-2">
                      {stat.icon}
                    </div>

                    {/* Container Tinggi Tetap (Sama Rata meski 1 atau 2 Baris Teks) */}
                    <div className="h-10 w-full flex items-center justify-center">
                      <h3 className="text-[10px] md:text-[11px] font-semibold text-slate-300 uppercase tracking-tight leading-tight line-clamp-2">
                        {stat.title}
                      </h3>
                    </div>

                    {/* Angka / Nilai */}
                    <div className="pt-2 border-t border-[#B8860B]/20 w-full mt-1 shrink-0">
                      <p className="text-xs md:text-sm font-extrabold text-amber-400">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 3. STRUKTUR PERANGKAT DESA (DARI BACKEND / ADMIN) ================= */}
        <section className="py-14 px-4 bg-[#0A261D] text-white relative border-t border-[#B8860B]/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight uppercase">
                Struktur Perangkat Desa
              </h2>
              <p className="text-amber-400 text-xs md:text-sm mt-1">
                Pemerintah Desa Sidodadi Asri
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-[#0A261D] via-[#B8860B] to-[#0A261D] mx-auto mt-2 rounded-full"></div>
            </div>

            {loadingPerangkat ? (
              <div className="text-center text-amber-400 py-8 text-sm">
                Memuat Data Perangkat Desa...
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {perangkat.map((item) => (
                  <div
                    key={item.id}
                    className="p-[1px] rounded-2xl bg-gradient-to-b from-[#B8860B] via-[#0A261D] to-[#B8860B]/40 shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="bg-[#02140D] p-4 md:p-5 rounded-[15px] h-full flex flex-col items-center text-center border border-[#B8860B]/20">
                      {/* Foto Perangkat (Bisa diisi via Admin Backend) */}
                      <div className="w-24 h-24 md:w-28 md:h-28 mb-3 rounded-full overflow-hidden p-[2px] bg-gradient-to-tr from-[#B8860B] to-emerald-400 shadow-md">
                        <img
                          src={
                            item.foto
                              ? item.foto.startsWith("http")
                                ? item.foto
                                : `http://localhost:8000/storage/${item.foto}`
                              : "https://via.placeholder.com/150/0A261D/FFFFFF?text=Perangkat"
                          }
                          alt={item.nama}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <h3 className="text-xs md:text-sm font-bold text-amber-400 line-clamp-1">
                        {item.nama}
                      </h3>
                      <p className="text-[10px] md:text-xs text-slate-300 font-medium mt-1 uppercase tracking-wider">
                        {item.jabatan}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ================= 4. PETA WILAYAH DESA (MINIMALIS & RINGKAS) ================= */}
        <section
          ref={mapRef}
          className="relative py-10 px-4"
          style={{
            backgroundImage: `url(${bungaBg})`,
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="text-center mb-5">
              <h2 className="text-lg md:text-xl font-extrabold text-white tracking-tight uppercase">
                Peta Wilayah Desa Sidodadi Asri
              </h2>
              <p className="text-amber-400/90 text-xs mt-0.5">
                Kec. Jati Agung, Kab. Lampung Selatan
              </p>
              <div className="w-12 h-0.5 bg-[#B8860B] mx-auto mt-2 rounded-full"></div>
            </div>

            <div className="p-[1px] rounded-2xl bg-gradient-to-r from-[#0A261D] via-[#B8860B] to-[#0A261D] shadow-lg">
              <div className="relative w-full rounded-[15px] overflow-hidden bg-slate-900 border border-[#B8860B]/30">
                <div className="h-[220px] md:h-[260px] w-full relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31782.355208638686!2d105.312104!3d-5.321856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b8a36ef7b99c7%3A0x868cb67c7e5a013a!2sSidodadi%20Asri%2C%20Kec.%20Jati%20Agung%2C%20Kabupaten%20Lampung%20Selatan%2C%20Lampung!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Peta Desa Sidodadi Asri"
                    className={`transition-opacity duration-700 ${
                      mapVisible ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ================= 5. FOOTER INLINE (GRADASI HIJAU HITAM & NAVIGASI LAYANAN) ================= */}
      <footer className="w-full bg-gradient-to-b from-[#052e1d] to-[#02140D] text-slate-200 border-t-2 border-[#B8860B]/40 pt-10 pb-6 px-4 md:px-8">
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

          {/* Navigasi (Layanan Surat Berwarna Emas) */}
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
                {/* Penanda emas dihilangkan dari Profil Desa */}
                <Link
                  to="/profile"
                  className="text-[#B8860B] font-extrabold transition-colors"
                >
                  Profil Desa
                </Link>
              </li>
              <li>
                {/* Penanda emas dipindah ke Layanan Surat */}
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
                  className="text-slate-300 hover:text-amber-300 transition-colors"
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

export default Profil;
