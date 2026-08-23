import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Profile Desa", path: "/" },
    { name: "Layanan Desa", path: "/Layanan" },
    { name: "Galeri & Artikel", path: "/Galeri" },
  ];

  // Animasi Spring
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.88,
      y: -10,
      transformOrigin: "top right",
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 450,
        damping: 25,
        staggerChildren: 0.05,
        delayChildren: 0.03,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -8,
      transition: { duration: 0.15, ease: "easeInOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 400, damping: 22 },
    },
  };

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-2xs">
      {/* LOGO ELEGAN */}
      <Link to="/" className="leading-tight group flex flex-col justify-center">
        <h1 className="text-xs font-bold tracking-wider text-[#0A261D] group-hover:text-amber-800 transition-colors duration-200">
          DESA SIDODADI ASRI
        </h1>
        <p className="text-[8px] font-semibold tracking-widest uppercase text-[#B8860B]">
          Lampung Selatan
        </p>
      </Link>

      {/* HAMBURGER BUTTON */}
      <div className="relative">
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className="w-7 h-7 rounded-full bg-[#0A261D] border border-[#B8860B]/70 flex flex-col items-center justify-center gap-[3.5px] focus:outline-none cursor-pointer hover:bg-[#13382c] transition-colors z-50 shadow-sm"
        >
          <motion.span
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 5 : 0,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="h-[1.5px] w-3.5 bg-[#D4AF37] rounded-full origin-center"
          />
          <motion.span
            animate={{
              opacity: isOpen ? 0 : 1,
              scale: isOpen ? 0 : 1,
            }}
            transition={{ duration: 0.1 }}
            className="h-[1.5px] w-3.5 bg-[#D4AF37] rounded-full"
          />
          <motion.span
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -5 : 0,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="h-[1.5px] w-3.5 bg-[#D4AF37] rounded-full origin-center"
          />
        </motion.button>

        {/* DROPDOWN MENU DENGAN BACKGROUND ELEGAN & ANIMASI HOVER */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onMouseLeave={() => setIsOpen(false)}
              className="absolute right-0 top-full mt-2 w-48 bg-[#0A261D] border border-[#B8860B]/40 rounded-xl overflow-hidden shadow-2xl p-1.5 backdrop-blur-xl"
            >
              <ul className="flex flex-col gap-1">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <motion.li key={item.name} variants={itemVariants}>
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`group relative flex items-center justify-between px-3 py-2 text-[11px] font-medium rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#0A261D] font-bold shadow-md"
                            : "text-slate-200 hover:bg-[#164435] hover:text-[#D4AF37] hover:pl-4"
                        }`}
                      >
                        <span>{item.name}</span>

                        {/* Indikator Aktif / Panah Hover */}
                        {isActive ? (
                          <motion.span
                            layoutId="activeDot"
                            className="w-1.5 h-1.5 rounded-full bg-[#0A261D]"
                          />
                        ) : (
                          <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-200 transform -translate-x-1 group-hover:translate-x-0 text-[#D4AF37]">
                            ➔
                          </span>
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* PESAN SAMBUTAN DI BAGIAN BAWAH */}
              <motion.div
                variants={itemVariants}
                className="mt-1.5 pt-1.5 border-t border-[#B8860B]/20 px-2 py-1 text-center bg-[#051711]/60 rounded-b-lg"
              >
                <p className="text-[9px] font-medium text-amber-300/80 italic leading-snug">
                  Selamat Datang di Desa Sidodadi Asri
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
