import React from "react";

const MarqueeBanner = () => {
  const announcements = [
    "📢 Selamat Datang di Portal Resmi Desa Sidodadi Asri",
    "📜 Layanan Surat & Administrasi Desa Tersedia Online",
    "🌾 Mari Tingkatkan Semangat Gotong Royong Desa",
    "💡 Cek Informasi & Pengumuman Terbaru Hari Ini",
  ];

  return (
    <div className="w-full bg-white border-y border-[#B8860B]/30 py-3 overflow-hidden relative shadow-sm">
      {/* Animation Style */}
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          display: flex;
          width: max-content;
          animation: marqueeScroll 35s linear infinite;
        }
        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Fade Effect Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      {/* Marquee Content */}
      <div className="animate-marquee-slow flex items-center gap-4">
        {[...announcements, ...announcements].map((text, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-4 py-1.5 rounded-xl border border-[#B8860B]/40 bg-white hover:border-[#B8860B] transition-colors shadow-xs"
          >
            <span className="text-xs md:text-sm font-semibold text-[#0A261D] tracking-wide whitespace-nowrap">
              {text}
            </span>
            <span className="text-[#B8860B] font-extrabold text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;
