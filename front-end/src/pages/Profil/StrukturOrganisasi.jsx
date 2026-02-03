import React, { useState } from 'react';
import bgPattern from "../../assets/contacts/bg.png";
import bgUp from "../../assets/contacts/bg-up.png";
import Kadus2 from "../../assets/struktur_desa/kadus-2.jpeg";
import kadus6a from "../../assets/struktur_desa/kadus-6a.jpeg";
import Kadus5 from "../../assets/struktur_desa/kadus-5.jpeg";

const StrukturOrganisasi = () => {
    const [selectedMember, setSelectedMember] = useState(null);

    const data = {
        kades: { id: 1, nama: "NAMA KEPALA DESA", jabatan: "Kepala Desa", img: bgUp },
        bpd: { id: 2, nama: "NAMA KETUA BPD", jabatan: "Ketua BPD", img: bgUp },
        sekdes: { id: 3, nama: "NAMA SEKRETARIS DESA", jabatan: "Sekretaris Desa", img: bgUp },
        kaurs: [
            { id: 4, nama: "NAMA KAUR TU", jabatan: "Kaur TU & Umum", img: bgUp },
            { id: 5, nama: "NAMA KAUR PERENCANAAN", jabatan: "Kaur Perencanaan", img: bgUp },
            { id: 6, nama: "NAMA KAUR KEUANGAN", jabatan: "Kaur Keuangan", img: bgUp },
        ],
        kasis: [
            { id: 7, nama: "NAMA KASI PEMERINTAHAN", jabatan: "Kasi Pemerintahan", img: bgUp },
            { id: 8, nama: "NAMA KASI KESEJAHTERAAN", jabatan: "Kasi Kesejahteraan", img: bgUp },
            { id: 9, nama: "NAMA KASI PELAYANAN", jabatan: "Kasi Pelayanan", img: bgUp },
        ],
        kadus: [
            { id: 10, dusun: "Kadus 1", nama: "NAMA KADUS 1", img: bgUp },
            { id: 11, dusun: "Kadus 2", nama: "Slamet Bagio ", img: Kadus2 },
            { id: 12, dusun: "Kadus 3", nama: "NAMA KADUS 3", img: bgUp },
            { id: 13, dusun: "Kadus 4", nama: "NAMA KADUS 4", img: bgUp },
            { id: 14, dusun: "Kadus 5", nama: "Istiyo Paranto", img: Kadus5 },
            { id: 15, dusun: "Kadus 6-A", nama: "Ponidi ", img: kadus6a },
            { id: 16, dusun: "Kadus 6-B", nama: "NAMA KADUS 6-B", img: bgUp },
            { id: 17, dusun: "Kadus 7", nama: "NAMA KADUS 7", img: bgUp },
        ]
    };

    const MemberCircle = ({ item, color = "#93ff8d", label, size = "small" }) => (
        <div 
            onClick={() => setSelectedMember({ ...item, label: label || item.jabatan })}
            className="flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-110 relative z-30"
        >
            <div className={`${size === 'large' ? 'w-20 h-20 md:w-24 md:h-24' : 'w-14 h-14 md:w-16 md:h-16'} rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-[#93ff8d] transition-all`}>
                <img src={item.img} alt={item.nama} className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
            </div>
            <p className="mt-2 px-2 py-0.5 rounded-full text-[6px] md:text-[8px] font-bold uppercase tracking-tighter text-black shadow-sm whitespace-nowrap" style={{ backgroundColor: color }}>
                {label || item.jabatan}
            </p>
        </div>
    );

    return (
        <div className="w-full bg-[#f3ecdc] relative py-10 md:py-20 px-4 flex flex-col items-center overflow-x-hidden">
            {/* Background Pattern tetap fixed */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-10 md:opacity-20">
                <img src={bgPattern} alt="bg" className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
                {/* Judul: Font lebih kecil di mobile */}
                <h2 className="text-xl md:text-3xl font-bold uppercase tracking-[5px] md:tracking-[10px] text-gray-400 mb-12 md:20 text-center">
                    Struktur Organisasi
                </h2>

                {/* LEVEL 0: KADES & BPD (Stack vertikal di HP) */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-32 mb-12 relative">
                    <MemberCircle item={data.bpd} color="#ffd700" />
                    {/* Garis koordinasi hanya muncul di Desktop */}
                    <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 w-40 border-t-2 border-dashed border-gray-400"></div>
                    {/* Garis vertikal pengganti di Mobile */}
                    <div className="md:hidden h-10 w-px bg-gray-400"></div>
                    <MemberCircle item={data.kades} size="large" />
                </div>

                {/* Jalur Tengah */}
                <div className="h-10 md:h-16 w-px bg-gray-400"></div>

                {/* LEVEL 1: SEKDES */}
                <div className="mb-12 relative">
                    <MemberCircle item={data.sekdes} />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-10 md:h-16 bg-gray-400"></div>
                </div>

                {/* LEVEL 2: KASI & KAUR (Grid 2 kolom di HP) */}
                <div className="grid grid-cols-2 md:flex md:justify-center gap-6 md:gap-24 mb-20 md:mb-40">
                    {/* Grup KASI */}
                    <div className="flex flex-col md:flex-row gap-4 relative md:pt-10 md:border-t-2 md:border-gray-400">
                        <p className="text-[7px] text-center text-gray-400 font-bold uppercase md:absolute md:-top-8 md:left-0">Kasi</p>
                        {data.kasis.map(p => <MemberCircle key={p.id} item={p} color="#c5f9c0" />)}
                    </div>
                    {/* Grup KAUR */}
                    <div className="flex flex-col md:flex-row gap-4 relative md:pt-10 md:border-t-2 md:border-gray-400">
                        <p className="text-[7px] text-center text-gray-400 font-bold uppercase md:absolute md:-top-8 md:right-0">Kaur</p>
                        {data.kaurs.map(p => <MemberCircle key={p.id} item={p} color="#c5f9c0" />)}
                    </div>
                </div>

                {/* LEVEL 3: KADUS (2 kolom di HP, 8 di Desktop) */}
                <div className="w-full border-t-2 border-dashed border-gray-300 pt-10">
                    <h3 className="text-center text-[9px] font-bold text-gray-400 tracking-[4px] mb-10">WILAYAH KADUS</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
                        {data.kadus.map(p => <MemberCircle key={p.id} item={p} label={p.dusun} />)}
                    </div>
                </div>
            </div>
            {/* Modal Pop-up: Dioptimalkan agar foto tidak terpotong */}
            {selectedMember && (
                <div 
                    className="fixed inset-0 z-[1000] flex items-center justify-center p-4 backdrop-blur-xl bg-black/60" 
                    onClick={() => setSelectedMember(null)}
                >
                    <div 
                        className="bg-[#333] text-white w-full max-w-[350px] md:max-w-md rounded-[3rem] p-6 md:p-10 relative flex flex-col items-center shadow-2xl border border-white/10" 
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Tombol Close */}
                        <button 
                            onClick={() => setSelectedMember(null)}
                            className="absolute top-6 right-8 text-white/40 hover:text-white text-xl transition-colors"
                        >
                            ✕
                        </button>

                        {/* FOTO: Diubah dari rounded-full menjadi rounded-[2.5rem] (Kotak Tumpul) */}
                        <div className="w-full aspect-[4/5] md:aspect-square rounded-[2.5rem] overflow-hidden border-4 border-[#93ff8d] shadow-2xl mb-8 bg-slate-800">
                            <img 
                                src={selectedMember.img} 
                                alt={selectedMember.nama} 
                                className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105" 
                            />
                        </div>

                        {/* Nama & Jabatan */}
                        <div className="text-center space-y-3">
                            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">
                                {selectedMember.nama}
                            </h3>
                            <div className="inline-block px-6 py-1.5 rounded-full bg-[#93ff8d] text-black text-[10px] md:text-xs font-black uppercase tracking-[0.2em] shadow-lg">
                                {selectedMember.label || selectedMember.jabatan}
                            </div>
                        </div>

                        {/* Quote Motivasi */}
                        <p className="mt-8 text-white/50 text-xs md:text-sm italic leading-relaxed text-center font-serif px-4">
                            "Berdedikasi untuk kemajuan dan kesejahteraan seluruh warga Desa Sidodadi Asri."
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StrukturOrganisasi;