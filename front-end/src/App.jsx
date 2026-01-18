import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayouts'; // Pastikan nama file sesuai (MainLayouts.jsx)
import Home from './pages/home'; // Perhatikan besar kecil huruf nama file (Home.jsx atau home.jsx)
import Login from './pages/login';
import Kontak from './pages/kontak';

// Komponen Placeholder: Tampilan sementara untuk halaman yang belum dibuat
const PlaceholderPage = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 pt-24">
    <h1 className="text-4xl font-bold text-slate-800 mb-4">{title}</h1>
    <div className="h-1 w-24 bg-blue-600 rounded mb-6"></div>
    <p className="text-slate-600 max-w-lg text-lg">
      Halaman ini sedang dalam tahap pengembangan. 
      <br />
      Konten dan fitur akan segera tersedia di sini.
    </p>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
      
      {/* 2. Ganti PlaceholderPage dengan <Kontak /> */}
      <Route path="/kontak" element={<MainLayout><Kontak /></MainLayout>} />

      <Route path="/profile" element={<MainLayout><PlaceholderPage title="Profil Desa" /></MainLayout>} />
      <Route path="/layanan" element={<MainLayout><PlaceholderPage title="Layanan Desa" /></MainLayout>} />
      <Route path="/galeri" element={<MainLayout><PlaceholderPage title="Galeri & Artikel" /></MainLayout>} />
    </Routes>
  );
}

export default App;