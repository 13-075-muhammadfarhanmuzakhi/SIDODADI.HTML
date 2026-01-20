import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home/Home";
import Kontak from "./pages/Kontak/kontak";
// import Login from "./pages/Login/login";
import Profile from "./pages/Profil/Profil";
import Galeri from "./pages/Galeri/Galeri"
import Layanan from "./pages/Layanan/Layanan";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/kontak" element={<Kontak />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Galeri" element={<Galeri />} />
        <Route path="/Layanan" element={<Layanan />} />
      </Route>

      {/* halaman tanpa layout (contoh login) */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
