import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

// ================= PUBLIC =================
import Home from "./pages/Home/Home";
import Kontak from "./pages/Kontak/kontak";
import Profile from "./pages/Profil/Profil";
import Galeri from "./pages/Galeri/Galeri";
import Layanan from "./pages/Layanan/Layanan";

// ================= ADMIN =================
import AdminLogin from "./pages/Admin/Login";
import AdminLayout from "./pages/Admin/Layouts/AdminLayouts";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminArtikel from "./pages/Admin/Artikel";
import Akun from "./pages/Admin/Akun";
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
        <Route path="/" element={<Galeri />} />
        <Route path="/galeri-spesial" element={<GaleriSpesial />} />
      </Route>

      {/* ADMIN LOGIN */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ADMIN AREA */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="artikel" element={<AdminArtikel />} />
        <Route path="akun" element={<Akun />} />
      </Route>
    </Routes>
  );
}

export default App;
