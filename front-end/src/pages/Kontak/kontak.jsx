import React from 'react';

// 1. Import semua gambar dari folder src/assets/contacts
import bgUp from "../../assets/contacts/bg-up.png";
import bgPattern from "../../assets/contacts/bg.png";
import waIcon from "../../assets/contacts/wa.png";
import locIcon from "../../assets/contacts/loc-mark.svg";
import mailIcon from "../../assets/contacts/mail.svg";
import fileIcon from "../../assets/contacts/file.svg";
import clockIcon from "../../assets/contacts/clock.svg";
import checkIcon1 from "../../assets/contacts/check.svg";
import checkIcon2 from "../../assets/contacts/check2.svg";
import checkIcon3 from "../../assets/contacts/check3.svg";
import instaIcon from "../../assets/contacts/insta.svg";
import fbIcon from "../../assets/contacts/fb-circle.svg";
import webIcon from "../../assets/contacts/circle-web.svg";
import tiktokIcon from "../../assets/contacts/tiktok.png";

const Kontak = () => {
    return (
        <div className="min-h-screen w-full bg-[#f3ecdc] flex flex-col items-center relative overflow-x-hidden pt-20 pb-10">
            
            {/* Background Atas */}
            <div className="w-full h-[400px] absolute top-0 left-0 z-0">
                <img src={bgUp} alt="Background Top" className="w-full h-full object-cover" />
            </div>

            {/* Background Pola Daun */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img src={bgPattern} alt="Background Pattern" className="w-full h-full object-auto opacity-40" />
            </div>

            <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col items-center">
                
                {/* Banner Utama */}
                <div className="bg-[#5f7f8f] rounded-[50px] p-12 mt-20 mb-20 text-black shadow-2xl w-full max-w-4xl flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-3xl font-bold mb-4">Punya Pertanyaan, Masukkan, atau Aspirasi?</h1>
                    <p className="text-lg opacity-90 mb-8 font-serif">Kami siap membantu Anda melalui layanan resmi kami.</p>
                    <button className="bg-[#fef9eb] text-[#1e293b] px-8 py-2 rounded-xl font-bold text-lg flex items-center gap-3 shadow-md border border-black/10">
                    <a
                        href="https://wa.me/628989174990?text=Halo%20saya%20ingin%20mengakses%20layanan%20Desa%20Sidodadi%20Asri"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#fef9eb] text-[#1e293b] px-8 py-2 rounded-xl font-bold text-lg flex items-center gap-3 shadow-md border border-black/10 hover:scale-105 transition"
                        >
                        Akses Layanan
                        <img src={waIcon} className="w-6 h-6" alt="WA" />
                    </a>
                    </button>
                </div>

                {/* Grid Informasi */}
                <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-0 mb-16 border-t border-[#2f4156]/10 pt-10">
                    <div className="flex gap-4 px-4">
                        <img src={locIcon} className="w-8 h-8 shrink-0" alt="Location" />
                        <div className="text-sm">
                            <h3 className="font-bold text-[#1f2937]">Alamat Kantor Desa</h3>
                            <p className="text-[#2f4156] font-serif italic mt-1 leading-relaxed">Jl. Niskala Wastukancana, Sidodadi Asri, Lampung</p>
                        </div>
                    </div>

                    <div className="flex gap-4 px-4 border-l border-[#2f4156]/20">
                        <img src={mailIcon} className="w-8 h-8 shrink-0" alt="Email" />
                        <div className="text-sm">
                            <h3 className="font-bold text-[#1f2937]">Email</h3>
                            <p className="text-[#2f4156] font-serif italic mt-1">sidodadiasri@gmail.com</p>
                        </div>
                    </div>

                    <div className="flex gap-4 px-4 border-l border-[#2f4156]/20">
                        <img src={fileIcon} className="w-8 h-8 shrink-0" alt="Layanan" />
                        <div className="text-sm">
                            <h3 className="font-bold text-[#1f2937] mb-2">Jenis Layanan</h3>
                            <ul className="text-[#2f4156] font-serif italic space-y-1">
                                <li className="flex items-center gap-2"><img src={checkIcon1} className="w-3" alt="v" /> Administrasi</li>
                                <li className="flex items-center gap-2"><img src={checkIcon2} className="w-3" alt="v" /> Surat Keterangan</li>
                                <li className="flex items-center gap-2"><img src={checkIcon3} className="w-3" alt="v" /> Aspirasi</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex gap-4 px-4 border-l border-[#2f4156]/20">
                        <img src={clockIcon} className="w-8 h-8 shrink-0" alt="Clock" />
                        <div className="text-sm">
                            <h3 className="font-bold text-[#1f2937]">Jam Pelayanan</h3>
                            <p className="text-[#2f4156] font-serif italic mt-1 leading-tight">Senin - Jumat<br />08.00 - 15.00</p>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="flex flex-col items-center gap-4">
                    <h4 className="font-bold text-[#1f2937] text-sm">Link Desa Sidodadi Asri</h4>
                    <div className="flex gap-6">
                        <a href="https://www.instagram.com/sidodadiasri?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
                            <img src={instaIcon} className="w-9 h-9 hover:scale-110 transition cursor-pointer" alt="Instagram Desa Sidodadi Asri"/>
                        </a>
                        <img src={fbIcon} className="w-9 h-9" alt="FB" />
                        <img src={webIcon} className="w-9 h-9" alt="Web" />
                        <img src={tiktokIcon} className="w-9 h-9" alt="TikTok" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Kontak;