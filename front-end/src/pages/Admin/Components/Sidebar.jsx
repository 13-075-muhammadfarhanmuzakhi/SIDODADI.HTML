import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  // State untuk mengontrol buka/tutup menu di mobile
  const [isOpen, setIsOpen] = useState(false);
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
      isActive ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
    }`;

  const iconClass = "w-5 h-5 flex-shrink-0 opacity-90";

  const menu = [
    { to: "/admin/dashboard", label: "Tinjau Panel", icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )},
    { to: "/admin/pengumuman", label: "Pengumuman", icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    )},
    { to: "/admin/artikel", label: "Media & Artikel", icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2zM16 8V4M12 8V4M8 8V4" />
      </svg>
    )},
    { to: "/admin/layanan", label: "Layanan Desa", icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )},
    { to: "/admin/akun", label: "Data Admin", icon: (
      <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )},
  ];

  return (
    <>
      {/* 1. TOMBOL HAMBURGER (Hanya muncul di Mobile) */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-[60] p-2 rounded-lg bg-[#2F4156] text-white shadow-lg md:hidden hover:bg-[#1f2937] transition-all"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* 2. OVERLAY (Muncul saat menu terbuka di Mobile) */}
      {isOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-[50] bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      {/* 3. SIDEBAR CONTAINER */}
      <aside
        className={`fixed inset-y-0 left-0 z-[55] w-64 flex flex-col bg-[#2F4156] text-white shadow-2xl transition-transform duration-300 transform md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Profile */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={
                admin?.foto
                  ? `http://127.0.0.1:8000/admin/${admin.foto}`
                  : "https://ui-avatars.com/api/?name=Admin&background=ffffff33&color=fff"
              }
              alt="Admin"
              className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/30 shadow-inner"
            />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate uppercase tracking-tight">
                {admin?.nama || "Admin Utama"}
              </p>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest opacity-80">
                {admin?.level || "Administrator"}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={navClass}
              onClick={closeMenu} // Tutup menu otomatis setelah klik di mobile
            >
              {item.icon}
              <span className="uppercase tracking-widest text-[11px] font-bold">
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              closeMenu();
              logout();
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] text-white/70 hover:bg-red-500 hover:text-white transition-all shadow-sm"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;