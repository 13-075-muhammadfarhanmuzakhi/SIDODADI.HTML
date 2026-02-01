import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Beranda", path: "/" },
    { name: "Profile", path: "/Profile" },
    { name: "Layanan Desa", path: "/Layanan" },
    { name: "Kontak", path: "/Kontak" },
    { name: "Galeri & Artikel", path: "/Galeri" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-1.5 text-white bg-[#2D3E50] shadow-md">
      {/* LOGO */}
      <Link to="/" className="leading-tight">
        <h1 className="text-base font-semibold tracking-wide">
          DESA SIDODADI ASRI
        </h1>
        <p className="text-[10px] opacity-100">Lampung Selatan</p>
      </Link>

      {/* HAMBURGER */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1 focus:outline-none z-50 relative cursor-pointer"
        >
          <span
            className={`h-0.5 w-6 bg-white transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>

        {/* DROPDOWN */}
        {isOpen && (
          <div
            onMouseLeave={() => setIsOpen(false)}
            className="absolute right-0 top-full mt-3 w-52 bg-[#2D3E50]/95 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 shadow-xl"
          >
            <ul className="flex flex-col py-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-5 py-2 text-sm hover:bg-white/10 hover:text-blue-300 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
