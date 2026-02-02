import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Import Background
import bgPattern from "../../assets/contacts/bg.png";
import bgUp from "../../assets/contacts/bg-up.png";

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
    // Diubah menjadi 5000ms (5 detik)
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [teamData.length]); // Dependency array ditambahkan agar timer konsisten

  const getMember = (offset) => {
    const index = (currentIndex + offset + teamData.length) % teamData.length;
    return teamData[index];
  };

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] relative overflow-x-hidden pt-20 pb-32 px-6 font-sans text-white">
      <div className="fixed inset-0 z-0 opacity-40">
        <img src={bgPattern} alt="bg" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="w-full mb-10 flex justify-between items-center">
          <h2 className="text-[10px] tracking-[0.4em] uppercase opacity-60">
            Galeri Special
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="text-[10px] uppercase tracking-widest hover:text-[#93ff8d] transition-colors"
          >
            ← Kembali
          </button>
        </div>

        {/* Slider Section */}
        <div className="relative flex flex-col items-center justify-center w-full h-[400px] md:h-[500px] mb-20">
          <div
            className="absolute z-0 w-64 h-64 md:w-96 md:h-96 rounded-full blur-[120px] opacity-20 transition-colors duration-1000"
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
                <div className="absolute left-[2%] md:left-[10%] z-10 w-32 h-48 md:w-56 md:h-80 rounded-[40px] md:rounded-[60px] overflow-hidden rotate-[-12deg] border-2 border-white/5 opacity-30 blur-[2px]">
                  <img
                    src={getMember(-1).img}
                    className="w-full h-full object-cover grayscale"
                    alt="prev"
                  />
                </div>

                {/* Gambar Tengah */}
                <div
                  className="z-30 w-56 h-80 md:w-72 md:h-[400px] rounded-[50px] md:rounded-[80px] overflow-hidden border-4 shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition-colors duration-1000"
                  style={{ borderColor: `${teamData[currentIndex].color}66` }}
                >
                  <img
                    src={getMember(0).img}
                    className="w-full h-full object-cover"
                    alt="active"
                  />
                </div>

                {/* Gambar Kanan */}
                <div className="absolute right-[2%] md:right-[10%] z-10 w-32 h-48 md:w-56 md:h-80 rounded-[40px] md:rounded-[60px] overflow-hidden rotate-[12deg] border-2 border-white/5 opacity-30 blur-[2px]">
                  <img
                    src={getMember(1).img}
                    className="w-full h-full object-cover grayscale"
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
              transition={{ duration: 0.5 }} // Transisi teks lebih cepat agar sinkron
              className="mt-10 text-center"
            >
              <h3
                className="text-2xl md:text-3xl font-black tracking-tight transition-colors duration-500"
                style={{ color: teamData[currentIndex].color }}
              >
                {teamData[currentIndex].nama}
              </h3>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/50 mt-2 font-medium">
                {teamData[currentIndex].jabatan}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Section Video */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl mt-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-xl font-bold tracking-[8px] uppercase">
              After Movie
            </h2>
            <div className="h-1 w-12 bg-[#93ff8d] mx-auto mt-2" />
          </div>

          <div className="relative group rounded-[40px] overflow-hidden border border-white/10 aspect-video shadow-2xl">
            <img
              src={bgUp}
              alt="Thumbnail"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-[#93ff8d] rounded-full flex items-center justify-center shadow-lg"
              >
                <div className="border-y-[10px] border-y-transparent border-l-[16px] border-l-black ml-1" />
              </motion.button>
            </div>
          </div>

          <p className="mt-10 text-center text-white/70 italic font-serif">
            "Desa ini telah menjadi rumah yang memberikan banyak kenangan bagi
            kami selama 30 hari penuh makna."
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default GaleriSpesial;
