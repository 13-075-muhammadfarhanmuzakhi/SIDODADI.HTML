const Dashboard = () => {
    return (
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold tracking-wide mb-1">
          DESA SIDODADI ASRI
        </h1>
        <p className="text-sm mb-8">
          PERMATA INDAH MILIK LAMPUNG SELATAN
        </p>
  
        <div className="w-full max-w-3xl rounded-3xl overflow-hidden shadow-xl border-8 border-[#b6b0d9]">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            alt="Dashboard Banner"
            className="w-full h-80 object-cover"
          />
        </div>
  
        <footer className="mt-10 text-xs text-gray-500">
          © 2026 KKN Tematik Desa Sidodadi Asri ITERA. All rights reserved.
        </footer>
      </div>
    );
  };
  
  export default Dashboard;
  