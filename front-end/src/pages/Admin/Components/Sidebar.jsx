import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

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

        <button
          onClick={handleLogout}
          className="mt-3 text-xs bg-red-600 px-4 py-1 rounded"
        >
          KELUAR
        </button>
      </div>

      {/* Menu */}
      <nav className="space-y-3 text-sm">
        <MenuItem to="/admin/dashboard" text="Tinjau Panel" />
        <MenuItem to="/admin/dashboard" text="Pengaturan" />
        <MenuItem to="/" text="Beranda Utama" />
        <MenuItem to="/admin/dashboard" text="Profil Desa" />
        <MenuItem to="/admin/artikel" text="Media & Artikel" />
        <MenuItem to="/admin/dashboard" text="Form Layanan" />
        <MenuItem to="/kontak" text="Kontak" />
      </nav>
    </aside>
  );
};

const MenuItem = ({ text, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 rounded cursor-pointer ${
        isActive ? "bg-white/20" : "hover:bg-white/10"
      }`
    }
  >
    {text}
  </NavLink>
);

export default Sidebar;
