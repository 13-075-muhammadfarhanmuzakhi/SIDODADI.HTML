import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Beranda", path: "/" },
    { name: "Profile", path: "/Profile" },
    { name: "Layanan Desa", path: "/Layanan" },
    { name: "Kontak", path: "/Kontak" },
    { name: "Galeri & Artikel", path: "/Galeri" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-4 py-2 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-2xs">
      {/* LOGO ELEGAN & MINIMALIS */}
      <Link to="/" className="leading-tight group flex flex-col justify-center">
        <h1 className="text-xs font-bold tracking-wider text-[#0A261D] group-hover:text-amber-800 transition-colors duration-200">
          DESA SIDODADI ASRI
        </h1>
        <p className="text-[8px] font-semibold tracking-widest uppercase text-[#B8860B]">
          Lampung Selatan
        </p>
      </Link>

      {/* HAMBURGER DALAM LINGKARAN KECIL */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className="w-7 h-7 rounded-full bg-[#0A261D] border border-[#B8860B]/70 flex flex-col items-center justify-center gap-[3px] focus:outline-none cursor-pointer hover:bg-[#13382c] active:scale-95 transition-all duration-200 z-50"
        >
          <span
            className={`h-[1.5px] w-3.5 bg-[#D4AF37] rounded-full transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-[4.5px]" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-3.5 bg-[#D4AF37] rounded-full transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-3.5 bg-[#D4AF37] rounded-full transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
            }`}
          />
        </button>

        {/* DROPDOWN MENU SLIM */}
        <div
          onMouseLeave={() => setIsOpen(false)}
          className={`absolute right-0 top-full mt-2 w-44 bg-white rounded-lg overflow-hidden border border-slate-100 shadow-xl transition-all duration-200 transform origin-top-right ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col p-1.5 gap-0.5">
            {menuItems.map((item) => {
              const isActive =
                location.pathname.toLowerCase() === item.path.toLowerCase();

              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-3 py-1.5 text-[12px] font-medium rounded-md transition-all duration-150 ${
                      isActive
                        ? "bg-[#0A261D] text-[#D4AF37] font-semibold border-l-2 border-[#B8860B]"
                        : "text-slate-700 hover:bg-slate-50 hover:text-[#0A261D]"
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
