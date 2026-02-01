import { Link } from "react-router-dom";
// Menambahkan framer-motion untuk umpan balik sentuhan yang lebih baik di HP
import { motion } from "framer-motion";

const Warna = { primary: "#2F4156" };

const Dashboard = () => {
  // Menambahkan deskripsi singkat untuk konteks yang lebih jelas di mobile
  const cards = [
    { 
      label: "Layanan Masyarakat", 
      desc: "Kelola surat & aspirasi",
      path: "/admin/layanan", 
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
    },
    { 
      label: "Media & Artikel", 
      desc: "Update berita desa",
      path: "/admin/artikel", 
      icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2zM16 8V4M12 8V4M8 8V4" 
    },
    { 
      label: "Data Admin", 
      desc: "Pengaturan akun",
      path: "/admin/akun", 
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8 px-1">
      {/* 1. Header: Font lebih dinamis agar tidak memakan banyak tempat di HP */}
      <div className="space-y-1">
        <h1 className="text-xl md:text-2xl font-black text-gray-800 uppercase tracking-tighter">
          Tinjau <span className="text-[#2F4156]">Panel</span>
        </h1>
        <p className="text-xs md:text-sm text-gray-500 font-medium">
          Selamat datang di panel admin Desa Sidodadi Asri
        </p>
      </div>

      {/* 2. Grid Navigasi: Umpan balik 'Active' untuk layar sentuh */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {cards.map((card) => (
          <motion.div
            key={card.path}
            whileTap={{ scale: 0.97 }} // Efek menekan tombol di HP
          >
            <Link
              to={card.path}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm active:bg-gray-50 transition-all flex items-center gap-4 group h-full"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg" 
                style={{ backgroundColor: Warna.primary }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-800 text-sm md:text-base group-hover:text-[#2F4156]">
                  {card.label}
                </span >
                <span className="text-[10px] md:text-xs text-gray-400 font-medium italic">
                  {card.desc}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* 3. Hero Card: Aspect ratio dioptimalkan untuk mobile */}
      <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
        <div className="aspect-[16/10] md:aspect-video max-h-80 bg-gray-100 relative">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            alt="Desa Sidodadi Asri"
            className="w-full h-full object-cover"
          />
          {/* Overlay gradasi agar teks di bawah lebih menyatu */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
        </div>
        <div className="p-5 border-t border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <h2 className="font-black text-gray-800 uppercase text-sm md:text-base tracking-tight">
              Desa Sidodadi Asri
            </h2>
            <p className="text-[11px] md:text-sm text-gray-400 font-medium">
              Permata Indah Milik Lampung Selatan
            </p>
          </div>
          <div className="text-[9px] font-bold text-[#2F4156] bg-[#2F4156]/5 px-3 py-1 rounded-full w-fit uppercase tracking-widest">
            Wilayah Aktif
          </div>
        </div>
      </div>

      {/* 4. Footer: Rata tengah di mobile */}
      <div className="pt-4 flex flex-col items-center gap-2">
        <div className="h-px w-12 bg-gray-200"></div>
        <p className="text-[9px] md:text-xs text-gray-400 font-bold uppercase tracking-[0.3em] text-center leading-relaxed">
          © 2026 KKN Tematik Desa Sidodadi Asri ITERA
        </p>
      </div>
    </div>
  );
};

export default Dashboard;