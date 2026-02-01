import { Link } from "react-router-dom";

const Warna = { primary: "#2F4156" };

const Dashboard = () => {
  const cards = [
    { label: "Layanan Masyarakat", path: "/admin/layanan", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { label: "Media & Artikel", path: "/admin/artikel", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2zM16 8V4M12 8V4M8 8V4" },
    { label: "Data Admin", path: "/admin/akun", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Tinjau Panel</h1>
        <p className="text-sm text-gray-500 mt-0.5">Selamat datang di panel admin Desa Sidodadi Asri</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.path}
            to={card.path}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-[#2F4156]/30 transition-all flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white group-hover:opacity-90 transition-opacity" style={{ backgroundColor: Warna.primary }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
              </svg>
            </div>
            <span className="font-semibold text-gray-800 group-hover:text-[#2F4156]">{card.label}</span>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="aspect-video max-h-80 bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            alt="Desa Sidodadi Asri"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 border-t border-gray-100">
          <h2 className="font-bold text-gray-800">Desa Sidodadi Asri</h2>
          <p className="text-sm text-gray-500">Permata Indah Milik Lampung Selatan</p>
        </div>
      </div>

      <p className="text-xs text-gray-400">© 2026 KKN Tematik Desa Sidodadi Asri ITERA</p>
    </div>
  );
};

export default Dashboard;
