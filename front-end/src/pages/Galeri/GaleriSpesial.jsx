import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import bgPattern from '../../assets/contacts/bg.png';
import bgUp from '../../assets/contacts/bg-up.png';

const GaleriSpesial = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const timPengembang = [
        { id: 1, nama: "ANGGOTA 1", peran: "Ketua Kelompok", img: bgUp },
        { id: 2, nama: "ANGGOTA 2", peran: "Front-end Developer", img: bgUp },
        { id: 3, nama: "ANGGOTA 3", peran: "UI/UX Designer", img: bgUp },
        { id: 4, nama: "ANGGOTA 4", peran: "Back-end Developer", img: bgUp },
        { id: 5, nama: "ANGGOTA 5", peran: "Content Writer", img: bgUp },
        { id: 6, nama: "ANGGOTA 6", peran: "Data Researcher", img: bgUp },
        { id: 7, nama: "ANGGOTA 7", peran: "Public Relation", img: bgUp },
        { id: 8, nama: "ANGGOTA 8", peran: "Documentation", img: bgUp },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev >= timPengembang.length - 3 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [timPengembang.length]);

    return (
        /* Padding top yang cukup agar tombol tidak tertutup Navbar fixed */
        <div className="min-h-screen w-full bg-[#454545] relative overflow-x-hidden pt-32 pb-32 px-6 font-sans text-white">
            
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                <img src={bgPattern} alt="bg" className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col">
                
                {/* TOMBOL KEMBALI: Tidak Fixed, Tidak Floating (Scrollable) */}
                <div className="w-full flex justify-start mb-8">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[#93ff8d] font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all border border-white/20 shadow-lg cursor-pointer"
                    >
                        ← Kembali
                    </button>
                </div>

                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#93ff8d] lowercase first-letter:uppercase font-serif">Galeri Spesial</h1>
                </div>

                {/* Section 1: Tim Pengembang Auto-Slider */}
                <section className="mb-48">
                    <div className="text-center mb-12">
                        <h2 className="text-xl font-bold border-b-2 border-[#93ff8d] pb-2 inline-block uppercase tracking-[5px]">Tim Pengembang</h2>
                    </div>
                    <div className="relative w-full overflow-hidden">
                        <div 
                            className="flex transition-transform duration-1000 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
                        >
                            {timPengembang.map((member) => (
                                <div key={member.id} className="w-full md:w-1/3 flex-shrink-0 px-4">
                                    <div className="bg-[#2d2d2d] rounded-[50px] border-4 border-white/5 overflow-hidden flex flex-col h-[460px]">
                                        <div className="w-full h-3/5 overflow-hidden">
                                            <img src={member.img} alt={member.nama} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                                        </div>
                                        <div className="p-8 text-center flex-1 flex flex-col justify-center bg-gradient-to-b from-[#2d2d2d] to-black">
                                            <h3 className="text-xl font-bold lowercase first-letter:uppercase tracking-tight text-white mb-1">{member.nama}</h3>
                                            <p className="text-[#93ff8d] font-bold text-[10px] uppercase tracking-widest opacity-80">{member.peran}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 2: After Movie */}
                <section className="max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-xl font-bold inline-block border-b-2 border-[#93ff8d] pb-2 uppercase tracking-widest">After Movie KKN</h2>
                    </div>
                    <div className="relative rounded-[60px] overflow-hidden border-8 border-white/10 shadow-2xl bg-black aspect-video group cursor-pointer">
                        <img src={bgUp} alt="Video" className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition duration-1000" />
                        <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-16 h-16 bg-[#93ff8d] rounded-full flex items-center justify-center shadow-lg"><span className="text-black text-2xl ml-1">▶</span></div>
                        </div>
                    </div>
                    <div className="mt-20 text-center px-6">
                        <p className="text-base md:text-lg text-white/70 italic leading-relaxed font-serif max-w-4xl mx-auto px-8 border-x border-[#93ff8d]/20">
                            "Desa ini telah menjadi rumah yang memberikan banyak kenangan bagi kami selama 30 hari pelaksanaan Kuliah Kerja Nyata."
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GaleriSpesial;