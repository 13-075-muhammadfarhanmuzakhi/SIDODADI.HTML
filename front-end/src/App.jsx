import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

// ================= PUBLIC =================
import Galeri from "./pages/Galeri/Galeri";
import Home from "./pages/Home/Home";
import Kontak from "./pages/Kontak/kontak";
import Layanan from "./pages/Layanan/Layanan";
import LayananForm from "./pages/Layanan/LayananForm";
import StatusDokumen from "./pages/Layanan/StatusDokumen";
import SuratIzinKeramaian from "./pages/Layanan/SuratIzinKeramaian";
import Profile from "./pages/Profil/Profil";

// ================= ADMIN =================
import Akun from "./pages/Admin/Akun";
import AdminArtikel from "./pages/Admin/Artikel";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminLayanan from "./pages/Admin/Layanan";
import AdminLayout from "./pages/Admin/Layouts/AdminLayouts";
import AdminLogin from "./pages/Admin/Login";
import GaleriSpesial from './pages/Galeri/GaleriSpesial';

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/layanan/form" element={<LayananForm />} />
        <Route path="/layanan/surat-izin-keramaian" element={<SuratIzinKeramaian />} />
        <Route path="/layanan/status-dokumen" element={<StatusDokumen />} />
        <Route path="/galeri-spesial" element={<GaleriSpesial />} />
      </Route>

      {/* ADMIN LOGIN */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ADMIN AREA */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="layanan" element={<AdminLayanan />} />
        <Route path="artikel" element={<AdminArtikel />} />
        <Route path="akun" element={<Akun />} />
      </Route>
    </Routes>
  );
}

export default App;
