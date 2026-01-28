import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  // ambil admin dari localStorage
  const admin = JSON.parse(localStorage.getItem("admin"));

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <aside className="w-72 bg-[#3f3f3f] text-white flex flex-col p-6">
      {/* ================= PROFILE ================= */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={
            admin?.foto
              ? `http://127.0.0.1:8000/admin/${admin.foto}`
              : "https://via.placeholder.com/80"
          }
          className="w-20 h-20 rounded-full object-cover"
        />

        <h3 className="font-semibold text-sm uppercase">
          {admin?.nama || "ADMIN"}
        </h3>

        <p className="text-xs text-white/60">
          {admin?.level || ""}
        </p>

        <button
          onClick={logout}
          className="mt-3 text-xs bg-red-600 px-4 py-1 rounded"
        >
          KELUAR
        </button>
      </div>

      {/* ================= MENU ================= */}
      <nav className="space-y-3 text-sm">
        <Link
          to="/admin/dashboard"
          className="block px-4 py-2 rounded hover:bg-white/10"
        >
          Tinjau Panel
        </Link>

        <Link
          to="/admin/artikel"
          className="block px-4 py-2 rounded hover:bg-white/10"
        >
          Media & Artikel
        </Link>

        <Link
          to="/admin/layanan"
          className="block px-4 py-2 rounded hover:bg-white/10"
        >
          Layanan Desa
        </Link>

        <Link
          to="/admin/Akun"
          className="block px-4 py-2 rounded hover:bg-white/10"
        >
          Data Admin
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
