import React, { useEffect, useState } from "react";
import heroVideo from "../../assets/videos/Desa-Profile.mp4";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/artikel")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal fetch artikel:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex flex-col">
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* YouTube Video Background */}
        <iframe
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            width: "100vw",
            height: "56.25vw", // 16:9 aspect ratio
            minHeight: "100vh",
            minWidth: "177.77vh", // 16:9 aspect ratio
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          src="https://www.youtube.com/embed/MAcDzuu_jOc?autoplay=1&mute=1&loop=1&playlist=MAcDzuu_jOc&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1"
          title="Video Profil Desa Sidodadi Asri"
          frameBorder="0"
          allow="autoplay; encrypted-media"
        />

        <div className="absolute inset-0 bg-slate-900/50 flex flex-col justify-center items-center text-center px-6 z-10">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Selamat Datang di Desa Sidodadi Asri
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl">
            Kec. Jati Agung, Kab. Lampung Selatan, Provinsi Lampung
          </p>
        </div>
      </section>

      {/* ================= BERITA SECTION ================= */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">
            Berita & Kegiatan Desa
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Skeleton loading */}
            {loading &&
              [1, 2, 3, 4, 5, 6].map((item) => (
                <article
                  key={item}
                  className="rounded-3xl border border-slate-200 overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-slate-200" />
                  <div className="p-6">
                    <div className="h-4 w-3/4 bg-slate-300 rounded mb-3" />
                    <div className="h-4 w-1/2 bg-slate-200 rounded" />
                  </div>
                </article>
              ))}

            {/* Data artikel */}
            {!loading &&
              articles.map((item) => (
                <article
                  key={item.id_artikel}
                  className="rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition"
                >
                  <img
                    src={`http://127.0.0.1:8000/artikel/${item.img}`}
                    alt={item.judul_artikel}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      {item.judul_artikel}
                    </h3>

                    <p className="text-slate-600 text-sm line-clamp-3">
                      {item.deskripsi}
                    </p>

                    <p className="text-xs text-slate-400 mt-4">
                      {new Date(item.tgl_post).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
