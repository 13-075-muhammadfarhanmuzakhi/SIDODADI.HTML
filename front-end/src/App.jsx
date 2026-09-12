import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute"; // Impor ProtectedRoute

// ================= PUBLIC =================
import Galeri from "./pages/Galeri/Galeri";
import Home from "./pages/Home/Home";
import Kontak from "./pages/Kontak/kontak";
import Layanan from "./pages/Layanan/Layanan";
import LayananForm from "./pages/Layanan/LayananForm";
import StatusDokumen from "./pages/Layanan/StatusDokumen";
import Profile from "./pages/Profil/Profil";
import LamanArtikelDesa from "./pages/Galeri/LamanArtikelDesa";
import GaleriSpesial from "./pages/Galeri/GaleriSpesial";

// ================= ADMIN =================
import Akun from "./pages/Admin/Akun";
import AdminPengumuman from "./pages/Admin/Pengumuman";
import AdminArtikel from "./pages/Admin/Artikel";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminLayanan from "./pages/Admin/Layanan";
import AdminLogin from "./pages/Admin/Login";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/layanan/form" element={<LayananForm />} />
        <Route path="/layanan/status-dokumen" element={<StatusDokumen />} />
        <Route path="/galeri-spesial" element={<GaleriSpesial />} />
        <Route path="/artikel-desa/:id" element={<LamanArtikelDesa />} />
      </Route>

      {/* ADMIN PUBLIC ROUTE */}
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ADMIN PROTECTED ROUTES (Hanya bisa dibuka jika sudah login) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/Dashboard" element={<AdminDashboard />} />
        <Route path="/admin/layanan" element={<AdminLayanan />} />
        <Route path="/admin/artikel" element={<AdminArtikel />} />
        <Route path="/admin/pengumuman" element={<AdminPengumuman />} />
        <Route path="/admin/akun" element={<Akun />} />
      </Route>

      {/* FALLBACK ROUTE: Jika alamat tidak ditemukan, lempar ke Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
