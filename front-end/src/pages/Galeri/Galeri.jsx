import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import bgPattern from '../../assets/contacts/bg.png';
import bgUp from '../../assets/contacts/bg-up.png';
import arrowIcon from '../../assets/contacts/circle-web.svg';

const Galeri = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const sectionRef = useRef(null);

    // Data Gabungan
    const featuredContent = [
        { id: 1, date: "15 Jan 2024", title: "PEMBANGUNAN JALAN DESA", desc: "Dokumentasi perbaikan infrastruktur utama desa.", img: bgUp, tag: "Pembangunan" },
        { id: 2, date: "10 Jan 2024", title: "PASAR TRADISIONAL", img: bgUp, tag: "Ekonomi" },
        { id: 3, date: "05 Jan 2024", title: "WISATA ALAM DESA", img: bgUp, tag: "Wisata" },
    ];

    const additionalContent = [
        { id: 4, date: "8 Jan 2024", title: "PERTUNJUKAN TARI TRADISIONAL", desc: "Penampilan memukau dari sanggar tari desa.", img: bgUp, type: "Galeri" },
        { id: 5, date: "5 Jan 2024", title: "PELATIHAN UMKM DIGITAL", desc: "Meningkatkan kualitas produk lokal melalui bimbingan teknis.", img: bgUp, type: "Artikel" },
        { id: 6, date: "3 Jan 2024", title: "KEGIATAN KOPERASI DESA", desc: "Pengembangan ekonomi mandiri warga.", img: bgUp, type: "Kegiatan" },
    ];

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded) {
            setTimeout(() => {
                sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#f3ecdc] relative overflow-x-hidden pt-32 pb-40 px-6 flex flex-col items-center">
            
            <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
                <img src={bgPattern} alt="bg" className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10 w-full max-w-6xl">
                {/* Header Section */}
                <div className="text-center mb-16"> 
                    <h1 className="text-5xl md:text-7xl font-bold text-black mb-4 tracking-tighter snake font-serif lowercase first-letter:uppercase">
                        Galeri
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-black/60 italic lowercase first-letter:uppercase">
                        Dokumentasi kegiatan dan informasi terbaru Desa Sidodadi Asri
                    </p>
                </div>

                {/* Grid Konten Utama */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <Link to="/artikel-desa" className="md:col-span-2 relative group overflow-hidden rounded-[40px] shadow-2xl h-[450px] md:h-[600px] border-4 border-white/30 block text-left">
                        <img src={featuredContent[0].img} alt="featured" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent flex flex-col justify-end p-10 text-white">
                            <span className="bg-[#93ff8d] text-black text-[10px] font-bold px-4 py-1 rounded-full w-fit mb-4 uppercase tracking-widest">{featuredContent[0].tag}</span>
                            <p className="text-[12px] opacity-80 mb-1">{featuredContent[0].date}</p>
                            <h2 className="text-2xl md:text-4xl font-bold mb-3 lowercase first-letter:uppercase tracking-tight">{featuredContent[0].title}</h2>
                            <p className="text-sm md:text-base opacity-70 italic">{featuredContent[0].desc}</p>
                        </div>
                    </Link>

                    <div className="flex flex-col gap-6">
                        {featuredContent.slice(1).map((item) => (
                            <Link key={item.id} to="/artikel-desa" className="relative group overflow-hidden rounded-[35px] shadow-xl h-[215px] md:h-[287px] border-4 border-white/30 block text-left">
                                <img src={item.img} alt="side" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex flex-col justify-end p-6 text-white">
                                    <span className="bg-[#93ff8d] text-black text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-2 uppercase tracking-widest">{item.tag}</span>
                                    <p className="text-[10px] opacity-80">{item.date}</p>
                                    <h3 className="font-bold text-lg md:text-xl lowercase first-letter:uppercase">{item.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Tombol Lihat Semua */}
                {!isExpanded && (
                    <div className="flex justify-center mb-16">
                        <button onClick={toggleExpand} className="bg-[#111827] text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-black transition-all flex items-center gap-2 shadow-lg">
                            Lihat Semua Dokumentasi
                            <img src={arrowIcon} alt="arrow" className="w-3 h-3 invert" />
                        </button>
                    </div>
                )}

                {/* Konten Tambahan */}
                <div ref={sectionRef} className={`transition-all duration-1000 overflow-hidden ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
                        {additionalContent.map((article) => (
                            <Link key={article.id} to="/artikel-desa" className="bg-white/50 backdrop-blur-md rounded-[40px] overflow-hidden shadow-lg border border-white/50 group hover:bg-white transition-all block text-left">
                                <div className="h-56 overflow-hidden relative">
                                    <img src={article.img} alt="news" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[9px] px-3 py-1 rounded-full font-bold uppercase">{article.type}</div>
                                </div>
                                <div className="p-8">
                                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-2 tracking-widest">{article.date}</p>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 lowercase first-letter:uppercase">{article.title}</h3>
                                    <p className="text-xs text-gray-600 italic line-clamp-3">{article.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* --- TOMBOL GALERI SPESIAL DIKECILKAN & DIPOSISIKAN ULANG --- */}
                <Link 
                    to="/galeri-spesial" 
                    className="fixed bottom-24 right-6 z-[999] group flex items-center gap-3 bg-[#454545] text-white pl-4 pr-1.5 py-1.5 rounded-full shadow-2xl hover:scale-110 transition-all border border-white/10"
                >
                    <span className="font-bold text-[10px] tracking-widest uppercase">Galeri Spesial</span>
                    <div className="w-8 h-8 bg-[#93ff8d] rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                        <span className="text-black text-sm">✨</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Galeri;