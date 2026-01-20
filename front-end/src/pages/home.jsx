import React from 'react';

const Home = () => {
    return (
        <div className="flex flex-col">
            {/* Section 1: Video Profile (Hero) */}
            <section className="relative h-screen w-full overflow-hidden">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
                >
                    <source src="/assets/videos/Desa-Profile.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                
                {/* Overlay sesuai Desain Figma */}
                <div className="absolute inset-0 z-10 bg-slate-900/40 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                        Selamat Datang di Desa Sidodadi Asri
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl max-w-2xl">
                        Kec. Jati Agung, Kab. Lampung Selatan, Provinsi Lampung
                    </p>
                </div>
            </section>

            {/* Section 2: Konten Tambahan (Bisa di-scroll) */}
            <section className="bg-white py-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Berita Terkini Desa</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Contoh Card Konten */}
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-64 bg-slate-100 rounded-3xl p-6 border border-slate-200">
                                <div className="h-32 bg-slate-300 rounded-2xl mb-4"></div>
                                <div className="h-4 w-3/4 bg-slate-400 rounded mb-2"></div>
                                <div className="h-4 w-1/2 bg-slate-300 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;