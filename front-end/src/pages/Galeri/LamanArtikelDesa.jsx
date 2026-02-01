import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Import aset lokal untuk background
import bgPattern from '../../assets/contacts/bg.png';

const LamanArtikelDesa = () => {
    const { id } = useParams(); // Mengambil ID dari URL
    const navigate = useNavigate();
    const [artikel, setArtikel] = useState(null);
    const [loading, setLoading] = useState(true);

    // Endpoint sesuai dengan sistem admin Anda
    const API_URL = `http://127.0.0.1:8000/api/artikel/${id}`;
    const IMAGE_BASE_URL = "http://127.0.0.1:8000/artikel/";

    useEffect(() => {
        const fetchDetailArtikel = async () => {
            try {
                const res = await fetch(API_URL);
                const json = await res.json();
                setArtikel(json);
            } catch (e) {
                console.error("Gagal memuat artikel:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchDetailArtikel();
        window.scrollTo(0, 0); // Scroll ke atas otomatis
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500 font-serif italic">Memuat berita...</div>;
    if (!artikel) return <div className="min-h-screen flex items-center justify-center text-gray-500">Artikel tidak ditemukan.</div>;

    return (
        <div className="min-h-screen w-full bg-[#f3ecdc] relative overflow-x-hidden pt-32 pb-20 px-6 font-sans">
            
            {/* Background Pattern */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
                <img src={bgPattern} alt="bg" className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto">
                
                {/* Tombol Kembali (Tidak Fixed) */}
                <div className="mb-8">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center gap-2 text-black/50 hover:text-black transition-colors font-bold text-xs uppercase tracking-widest"
                    >
                        ← Kembali ke Warta & Galeri
                    </button>
                </div>

                <header className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-[#93ff8d] text-black text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                            Berita Desa
                        </span>
                        <span className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">
                            {new Date(artikel.tgl_post).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                    </div>

                    {/* Judul dengan Logika Snake (Huruf besar di awal) */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8 font-serif lowercase first-letter:uppercase">
                        {artikel.judul_artikel}
                    </h1>
                </header>

                {/* Foto Utama dari Database */}
                <div className="w-full h-[300px] md:h-[550px] rounded-[50px] overflow-hidden shadow-2xl mb-12 border-8 border-white/50 bg-gray-200">
                    <img 
                        src={artikel.img ? `${IMAGE_BASE_URL}${artikel.img}` : "https://via.placeholder.com/800x500"} 
                        alt={artikel.judul_artikel} 
                        className="w-full h-full object-cover" 
                    />
                </div>

                {/* Isi Berita Lengkap */}
                <article className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6">
                    {/* Menggunakan format white-space-pre-wrap agar paragraf dari textarea admin terjaga */}
                    <div className="whitespace-pre-wrap font-light text-lg">
                        {artikel.deskripsi}
                    </div>
                </article>

                <footer className="mt-20 pt-10 border-t border-black/5 flex flex-col items-center">
                    <div className="flex gap-2 mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#93ff8d]"></span>
                        <span className="w-10 h-2 rounded-full bg-[#93ff8d]/30"></span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[4px]">DARI KAMI UNTUK SIDODADI ASRI</p>
                </footer>
            </div>
        </div>
    );
};

export default LamanArtikelDesa;