import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-72 bg-[#3f3f3f] text-white flex flex-col p-6">
      {/* Profile */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://via.placeholder.com/80"
          alt="Kepala Desa"
          className="rounded-full mb-3"
        />
        <h3 className="font-semibold text-sm">RAHLI SIBRANTO</h3>
        <p className="text-xs text-white/70">KEPALA DESA</p>

        <button className="mt-3 text-xs bg-red-600 px-4 py-1 rounded">
          KELUAR
        </button>
      </div>

      {/* Menu */}
      <nav className="space-y-3 text-sm">
        <MenuItem text="Tinjau Panel" />
        <MenuItem text="Pengaturan" />
        <MenuItem text="Beranda Utama" />
        <MenuItem text="Profil Desa" />
        <MenuItem text="Media & Artikel" />
        <MenuItem text="Form Layanan" />
        <MenuItem text="Kontak" />
      </nav>
    </aside>
  );
};

const MenuItem = ({ text }) => (
  <div className="cursor-pointer px-4 py-2 rounded hover:bg-white/10">
    {text}
  </div>
);

export default Sidebar;
