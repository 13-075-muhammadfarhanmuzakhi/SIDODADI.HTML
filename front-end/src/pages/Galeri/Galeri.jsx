import React, { useState, useRef } from 'react';

// Perbaikan Path: Naik 2 tingkat (../../) dari src/pages/Galeri/ ke src/assets/
import bgPattern from '../../assets/contacts/bg.png';
import bgUp from '../../assets/contacts/bg-up.png';
import arrowIcon from '../../assets/contacts/circle-web.svg';

const Galeri = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const expandedSectionRef = useRef(null);

    // Data Galeri Utama
    const featuredArticles = [
        { id: 1, date: "15 Jan 2024", title: "Pembangunan Jalan Desa", desc: "Dokumentasi perbaikan infrastruktur utama desa.", img: bgUp, tag: "Pembangunan" },
        { id: 2, date: "10 Jan 2024", title: "Pasar Tradisional", img: bgUp, tag: "Ekonomi" },
        { id: 3, date: "05 Jan 2024", title: "Wisata Alam Desa", img: bgUp, tag: "Wisata" },
    ];

    // Data Artikel Tambahan
    const additionalArticles = [
        { id: 4, date: "8 Jan 2024", title: "Pertunjukan Tari Tradisional", desc: "Penampilan memukau dari sanggar tari desa.", img: bgUp, type: "Galeri" },
        { id: 5, date: "5 Jan 2024", title: "Pelatihan UMKM Digital", desc: "Meningkatkan kualitas produk lokal melalui bimbingan teknis.", img: bgUp, type: "Artikel" },
        { id: 6, date: "3 Jan 2024", title: "Kegiatan Koperasi Desa", desc: "Pengembangan ekonomi mandiri melalui unit usaha bersama warga.", img: bgUp, type: "Artikel" },
    ];

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded) {
            setTimeout(() => {
                expandedSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    return (
        /* pt-28 untuk ruang Navbar agar tidak menutupi judul */
        <div className="min-h-screen w-full bg-[#f3ecdc] relative overflow-x-hidden pt-28 pb-20 px-6 flex flex-col items-center font-sans">
            
            {/* Background Pattern Lokal */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
                <img src={bgPattern} alt="bg" className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10 w-full max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16"> 
                    <h1 className="text-5xl md:text-5xl font-bold text-black mb-4 tracking-tighter snake">Galeri</h1>
                    <p className="text-xl md:text-2xl font-light text-black/60 italic">
                        Dokumentasi kegiatan dan informasi terbaru Desa Sidodadi Asri
                    </p>
                </div>

                {/* Seksi Galeri Utama (Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {/* Kartu Besar */}
                    <div className="md:col-span-2 relative group overflow-hidden rounded-[40px] shadow-2xl h-[450px] md:h-[600px] border-4 border-white/30">
                        <img src={featuredArticles[0].img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="featured" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent flex flex-col justify-end p-10 text-white">
                            <span className="bg-[#93ff8d] text-black text-[12px] font-bold px-5 py-1.5 rounded-full w-fit mb-4 shadow-lg uppercase">{featuredArticles[0].tag}</span>
                            <p className="text-sm opacity-80 mb-1">{featuredArticles[0].date}</p>
                            <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">{featuredArticles[0].title}</h2>
                            <p className="text-sm md:text-base opacity-70 italic max-w-xl">{featuredArticles[0].desc}</p>
                        </div>
                    </div>

                    {/* Kartu Kecil */}
                    <div className="flex flex-col gap-6">
                        {featuredArticles.slice(1).map((item) => (
                            <div key={item.id} className="relative group overflow-hidden rounded-[35px] shadow-xl h-[215px] md:h-[287px] border-4 border-white/30">
                                <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="side" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex flex-col justify-end p-6 text-white">
                                    <span className="bg-[#93ff8d] text-black text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-2 uppercase">{item.tag}</span>
                                    <p className="text-xs opacity-80">{item.date}</p>
                                    <h3 className="font-bold text-xl">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tombol Lihat Semua (Ukuran Kecil) */}
                {!isExpanded && (
                    <div className="flex justify-center mb-20">
                        <button 
                            onClick={toggleExpand}
                            className="bg-[#111827] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-black transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95"
                        >
                            Lihat Semua Dokumentasi
                            <img src={arrowIcon} alt="arrow" className="w-4 h-4 invert" />
                        </button>
                    </div>
                )}

                {/* Daftar Tambahan (Muncul saat Klik) */}
                <div 
                    ref={expandedSectionRef}
                    className={`transition-all duration-1000 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {additionalArticles.map((item) => (
                            <div key={item.id} className="bg-white/50 backdrop-blur-md rounded-[40px] overflow-hidden shadow-lg border border-white/50 group hover:bg-white transition-all duration-300">
                                <div className="h-60 overflow-hidden relative">
                                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={item.title} />
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] px-4 py-1.5 rounded-full font-bold tracking-widest uppercase">
                                        {item.type}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-[2px] mb-2">{item.date}</p>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors">{item.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed italic line-clamp-3">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-20">
                        <button 
                            onClick={toggleExpand}
                            className="bg-white text-[#111827] border border-black/10 px-10 py-3 rounded-full font-bold hover:bg-black hover:text-white transition-all shadow-lg text-sm"
                        >
                            Tutup Kembali
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Galeri;