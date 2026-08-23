import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Import Foto Anggota
import fotoFarhan from "../../assets/images/farhan.jpeg";
import fotoAliya from "../../assets/images/aliya.jpeg";
import fotoHafsa from "../../assets/images/hafsa.jpeg";
import fotoZakiGhozy from "../../assets/images/zakighozy.jpeg";
import fotoZakiKacamata from "../../assets/images/zakikacamata.jpeg";
import fotoRazka from "../../assets/images/razka.jpeg";
import fotoFany from "../../assets/images/fany.jpeg";
import fotoHafiz from "../../assets/images/hafiz.JPG";

const GaleriSpesial = () => {
  const navigate = useNavigate();

  const teamData = [
    {
      img: fotoFarhan,
      nama: "Muhammad Farhan Muzakhi",
      jabatan: "Project Manager",
      color: "#FF5733",
    },
    {
      img: fotoZakiGhozy,
      nama: "Zacky Ghozi Al Miqdad",
      jabatan: "Front-end Developer",
      color: "#33FF57",
    },
    {
      img: fotoZakiKacamata,
      nama: "Muhammad Dzaky",
      jabatan: "Back-end Developer",
      color: "#3357FF",
    },
    {
      img: fotoAliya,
      nama: "Aliya Ammara Ananta",
      jabatan: "UI/UX",
      color: "#F033FF",
    },
    {
      img: fotoHafsa,
      nama: "Hafsa Fadzila Arradhi",
      jabatan: "UI/UX",
      color: "#FF33A1",
    },
    {
      img: fotoRazka,
      nama: "Gusti Putu Ferazka D",
      jabatan: "UI/UX",
      color: "#33FFF5",
    },
    {
      img: fotoFany,
      nama: "Vany Salsabila Putri",
      jabatan: "UI/UX",
      color: "#FFD433",
    },
    {
      img: fotoHafiz,
      nama: "Muhammad Hafiz Assyifa",
      jabatan: "Back-end Developer",
      color: "#93ff8d",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 5000ms (5 detik)
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [teamData.length]);

  const getMember = (offset) => {
    const index = (currentIndex + offset + teamData.length) % teamData.length;
    return teamData[index];
  };

  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden pt-20 pb-32 px-4 sm:px-6 font-sans text-slate-800">
      {/* CSS KHUSUS UNTUK EFEK ANIMASI DAN KERTAS */}
      <style>{`
        /* Animasi Background Berjalan */
        @keyframes runningGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Animasi Text Gradasi Hijau & Emas Terang (Agar terbaca di background gelap) */
        .text-green-gold-animate {
          background: linear-gradient(270deg, #10b981, #fbbf24, #34d399, #f59e0b);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: runningGlow 4s ease infinite;
        }

        /* Animasi Tombol Kembali (Background Gradasi) */
        .btn-back-animate {
          background: linear-gradient(270deg, #052e1d, #B8860B, #052e1d, #B8860B);
          background-size: 300% 300%;
          animation: runningGlow 4s ease infinite;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .btn-back-animate:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(184, 134, 11, 0.4);
        }

        /* Efek Kertas Pin 3D untuk Video */
        .paper-sheet {
          position: relative;
          background: #fdfbf7;
          background-image: radial-gradient(#e2e8f0 0.8px, transparent 0.8px);
          background-size: 10px 10px;
          box-shadow: 0 8px 20px -6px rgba(5, 150, 105, 0.08), 0 2px 6px -2px rgba(0, 0, 0, 0.03);
        }

        .paper-sheet::before,
        .paper-sheet::after {
          content: '';
          position: absolute;
          top: 12px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #ef4444, #991b1b 70%, #450a0a);
          box-shadow: 
            0 2px 5px rgba(0, 0, 0, 0.35),
            inset -1px -1px 2px rgba(0, 0, 0, 0.5),
            inset 1px 1px 2px rgba(255, 255, 255, 0.8);
          z-index: 20;
        }

        .paper-sheet::before { left: 16px; }
        .paper-sheet::after { right: 16px; }
      `}</style>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* ========================================================================= */}
        {/* HEADER: JUDUL KIRI & TOMBOL KEMBALI (Sudah Menggunakan Card & Animasi) */}
        {/* ========================================================================= */}
        <div className="w-full mb-10 flex justify-between items-center">
          {/* Card Kiri: Galeri Spesial */}
          <div className="bg-[#022c22] px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-md border border-amber-500/30 flex items-center justify-center">
            <h2 className="text-[10px] sm:text-xs font-extrabold tracking-[0.2em] sm:tracking-[0.4em] uppercase text-green-gold-animate m-0">
              Galeri Special
            </h2>
          </div>

          {/* Card Kanan: Tombol Kembali Animasi */}
          <button
            onClick={() => navigate(-1)}
            className="btn-back-animate px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <span>Kembali</span>
          </button>
        </div>
        {/* ========================================================================= */}

        {/* ========================================================================= */}
        {/* SLIDER SECTION (Animasi & Rotasi Foto Tetap Utuh) */}
        {/* ========================================================================= */}
        <div className="relative flex flex-col items-center justify-center w-full h-[400px] md:h-[500px] mb-20">
          <div
            className="absolute z-0 w-64 h-64 md:w-96 md:h-96 rounded-full blur-[120px] opacity-25 transition-colors duration-1000"
            style={{ backgroundColor: teamData[currentIndex].color }}
          />

          <div className="relative w-full flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentIndex}
                initial={{ x: 150, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -150, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative flex items-center justify-center w-full"
              >
                {/* Gambar Kiri */}
                <div className="absolute left-[2%] md:left-[10%] z-10 w-32 h-48 md:w-56 md:h-80 rounded-[40px] md:rounded-[60px] overflow-hidden rotate-[-12deg] border-2 border-slate-200 opacity-40 blur-[2px]">
                  <img
                    src={getMember(-1).img}
                    className="w-full h-full object-cover grayscale opacity-80"
                    alt="prev"
                  />
                </div>

                {/* Gambar Tengah */}
                <div
                  className="z-30 w-56 h-80 md:w-72 md:h-[400px] rounded-[50px] md:rounded-[80px] overflow-hidden border-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-colors duration-1000 bg-white"
                  style={{ borderColor: `${teamData[currentIndex].color}99` }}
                >
                  <img
                    src={getMember(0).img}
                    className="w-full h-full object-cover"
                    alt="active"
                  />
                </div>

                {/* Gambar Kanan */}
                <div className="absolute right-[2%] md:right-[10%] z-10 w-32 h-48 md:w-56 md:h-80 rounded-[40px] md:rounded-[60px] overflow-hidden rotate-[12deg] border-2 border-slate-200 opacity-40 blur-[2px]">
                  <img
                    src={getMember(1).img}
                    className="w-full h-full object-cover grayscale opacity-80"
                    alt="next"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nama & Jabatan */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-10 text-center z-10 relative"
            >
              <h3
                className="text-2xl md:text-3xl font-black tracking-tight transition-colors duration-500 drop-shadow-sm"
                style={{ color: teamData[currentIndex].color }}
              >
                {teamData[currentIndex].nama}
              </h3>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-slate-400 mt-2 font-bold">
                {teamData[currentIndex].jabatan}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* ========================================================================= */}

        {/* ========================================================================= */}
        {/* SECTION VIDEO DENGAN BACKGROUND KERTAS PIN */}
        {/* ========================================================================= */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl mt-10 md:mt-20 px-2"
        >
          <div className="paper-sheet rounded-2xl md:rounded-3xl p-6 md:p-10 border border-amber-200/90 shadow-md">
            <div className="text-center mb-8">
              <span className="text-[10px] md:text-xs font-extrabold text-emerald-800 uppercase tracking-widest bg-emerald-100/80 px-3 py-1 rounded-full">
                Dokumentasi KKN
              </span>
              <h2 className="text-xl md:text-3xl font-extrabold tracking-[4px] md:tracking-[8px] uppercase text-emerald-950 mt-4">
                After Movie
              </h2>
              <div className="h-1 w-16 bg-amber-500 mx-auto mt-3 rounded-full" />
            </div>

            <div className="relative group rounded-xl md:rounded-[30px] overflow-hidden border border-emerald-900/10 aspect-video shadow-lg bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/rOtAI6uZbU0?si=43uzQkZBr41xDOBD"
                title="After Movie Desa Sidodadi Asri"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mt-8 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-slate-200 rounded-full"></div>
              <p className="pt-6 text-center text-slate-600 italic font-serif px-4 text-sm md:text-base leading-relaxed">
                "Desa ini telah menjadi rumah yang memberikan banyak kenangan
                bagi kami selama 30 hari penuh makna."
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default GaleriSpesial;
