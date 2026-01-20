import React, { useState, useRef } from 'react';

// Import asset dari direktori yang sudah Anda tentukan
import bgPattern from '../assets/contacts/bg.png';
import bgUp from '../assets/contacts/bg-up.png';
import arrowIcon from '../assets/contacts/circle-web.svg'; // Menggunakan ikon web sebagai referensi panah

const Galeri = () => {
    // State untuk mengontrol kemunculan artikel tambahan di bawah
    const [isExpanded, setIsExpanded] = useState(false);
    const articleSectionRef = useRef(null);

    // Data artikel yang diambil dari referensi desain Anda
    const featuredArticles = [
        { id: 1, date: "01 Januari", title: "Lorem Ipsum Dolor Sit Amet", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", img: bgUp, tag: "Lorem Ipsum" },
        { id: 2, date: "01 Januari", title: "Pasar Tradisional", img: bgUp, tag: "Lorem Ipsum" },
        { id: 3, date: "01 Januari", title: "Wisata Alam Desa", img: bgUp, tag: "Lorem Ipsum" },
    ];

    const additionalArticles = [
        { id: 4, date: "8 Januari 2024", title: "Pertunjukan Tari Tradisional", desc: "Penampilan memukau dari sanggar tari desa dalam acara perayaan kemerdekaan.", img: bgUp },
        { id: 5, date: "5 Januari 2024", title: "Air Terjun Desa Indah", desc: "Destinasi wisata alam yang menawarkan kesegaran dan keindahan alami.", img: bgUp },
        { id: 6, date: "3 Januari 2024", title: "Pasar Tradisional Minggu", desc: "Aktivitas perdagangan lokal dengan berbagai produk hasil bumi.", img: bgUp },
        { id: 7, date: "01 Januari", title: "Kegiatan Koperasi Desa", desc: "Pengembangan ekonomi mandiri melalui unit usaha desa.", img: bgUp },
        { id: 8, date: "01 Januari", title: "Pelatihan UMKM", desc: "Meningkatkan kualitas produk lokal melalui bimbingan teknis.", img: bgUp },
        { id: 9, date: "01 Januari", title: "Pertemuan Warga", desc: "Diskusi rutin untuk kemajuan dan ketertiban lingkungan desa.", img: bgUp },
    ];

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        // Jika membuka, berikan sedikit delay agar transisi render selesai sebelum scroll
        if (!isExpanded) {
            setTimeout(() => {
                articleSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#f3ecdc] relative overflow-x-hidden pt-10 pb-20 px-6 flex flex-col items-center">
            
            {/* Background Pattern tetap sama */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <img src={bgPattern} alt="bg" className="w-full h-full object-cover opacity-30" />
            </div>

            <div className="relative z-10 w-full max-w-6xl">
                {/* Header Halaman: Berikan sedikit margin-top jika masih dirasa terlalu mepet */}
                <div className="text-center mb-12 mt-4"> 
                    <h1 className="text-5xl md:text-5xl font-bold text-black mb-2 font-serif snake tracking-tight">Galeri</h1>
                    <p className="text-xl md:text-1xl font-light text-black/70 italic">
                        Dokumentasi kegiatan Desa Sidodadi Asri
                    </p>
                </div>

                {/* 2. Tampilan Utama (Featured Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Kartu Besar (Kiri) */}
                    <div className="md:col-span-2 relative group overflow-hidden rounded-[40px] shadow-2xl h-[450px] md:h-[600px] border-4 border-white/20">
                        <img src={featuredArticles[0].img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="featured" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10 text-white">
                            <span className="bg-[#93ff8d] text-black text-[12px] font-bold px-5 py-1.5 rounded-full w-fit mb-4 shadow-lg">{featuredArticles[0].tag}</span>
                            <p className="text-sm opacity-80 mb-1">{featuredArticles[0].date}</p>
                            <h2 className="text-3xl font-bold mb-3 leading-tight">{featuredArticles[0].title}</h2>
                            <p className="text-sm opacity-70 font-serif italic max-w-xl">{featuredArticles[0].desc}</p>
                        </div>
                    </div>

                    {/* Dua Kartu Kecil (Kanan) */}
                    <div className="flex flex-col gap-6">
                        {featuredArticles.slice(1).map((item) => (
                            <div key={item.id} className="relative group overflow-hidden rounded-[35px] shadow-xl h-[215px] md:h-[287px] border-4 border-white/20">
                                <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="side" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex flex-col justify-end p-6 text-white">
                                    <span className="bg-[#93ff8d] text-black text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-2">{item.tag}</span>
                                    <p className="text-xs opacity-80">{item.date}</p>
                                    <h3 className="font-bold text-lg">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Tombol "Lihat Semua Galeri" */}
                {!isExpanded && (
                    <div className="flex justify-center mb-16">
                    <button 
                        onClick={toggleExpand}
            // Mengubah px-10 ke px-6, py-3.5 ke py-2, text-lg ke text-sm, dan gap-4 ke gap-2
                        className="bg-[#111827] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-black transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95"
                    >
                        Lihat Semua Galeri
                        <span className="bg-white/10 rounded-full p-1 text-xs">→</span>
                        </button>
                        </div>
                )}

                {/* 4. Daftar Artikel Tambahan (Muncul di Bawah saat Di-klik) */}
                <div 
                    ref={articleSectionRef}
                    className={`transition-all duration-1000 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[5000px] opacity-100 mt-10' : 'max-h-0 opacity-0'}`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {additionalArticles.map((article) => (
                            <div key={article.id} className="bg-white/40 backdrop-blur-md rounded-[40px] overflow-hidden shadow-lg border border-white/30 group hover:bg-white/60 transition-colors">
                                <div className="h-56 overflow-hidden relative">
                                    <img src={article.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={article.title} />
                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full">
                                        📰 Artikel
                                    </div>
                                </div>
                                <div className="p-8">
                                    <p className="text-[11px] text-[#2f4156] font-bold uppercase tracking-[2px] mb-2 opacity-60">{article.date}</p>
                                    <h3 className="text-xl font-bold text-[#1a4d2e] mb-4 leading-tight group-hover:text-black transition-colors">{article.title}</h3>
                                    <p className="text-sm text-[#2f4156] font-serif italic leading-relaxed line-clamp-3">
                                        {article.desc || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tombol Tutup untuk kembali ke atas */}
                    <div className="flex justify-center mt-20">
                        <button 
                            onClick={toggleExpand}
                            className="bg-white/50 text-[#111827] border border-black/10 px-8 py-3 rounded-full font-bold hover:bg-[#5f7f8f] hover:text-white transition-all shadow-md"
                        >
                            Tutup Galeri
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Galeri;