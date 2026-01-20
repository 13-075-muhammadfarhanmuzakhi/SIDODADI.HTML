import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Profil from "../pages/Profil/Profil";
import Galeri from "../pages/Galeri/Galeri";
import Layanan from "../pages/Layanan/Layanan";
import Kontak from "../pages/Kontak/kontak";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/kontak" element={<Kontak />} />
      </Route>
    </Routes>
  );
}
