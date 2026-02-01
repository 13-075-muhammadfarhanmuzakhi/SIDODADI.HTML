import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const AdminLayout = () => {
  const admin = localStorage.getItem("admin");

  // ❌ BELUM LOGIN
  if (!admin) {
    // Alert tetap dipertahankan sesuai logika asli Anda
    alert("Silakan login untuk mengakses halaman admin");
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ SUDAH LOGIN
  return (
    // Menggunakan min-h-[100dvh] untuk menghindari masalah address bar di browser HP
    <div className="flex min-h-[100dvh] bg-gray-100 overflow-x-hidden">
      
      {/* 1. SIDEBAR */}
      {/* Sidebar kita sudah memiliki logika responsif (Fixed di mobile, Relative di desktop) */}
      <Sidebar />

      {/* 2. KONTEN UTAMA */}
      <main className="flex-1 w-full min-w-0 flex flex-col">
        {/* Memberikan padding-top (pt-20) di mobile agar konten tidak tertutup tombol hamburger.
           Pada desktop (md:pt-10), padding disesuaikan untuk estetika.
        */}
        <div className="flex-1 p-4 md:p-10 pt-20 md:pt-10 transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>

        {/* Footer Kecil Admin agar terlihat lebih profesional */}
        <footer className="px-6 py-4 bg-white/50 border-t border-gray-200">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center md:text-left">
             Sistem Informasi Desa Sidodadi Asri © 2026
           </p>
        </footer>
      </main>
    </div>
  );
};

export default AdminLayout;