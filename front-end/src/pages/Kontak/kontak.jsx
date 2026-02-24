import React from "react";

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
    <div className="min-h-screen w-full bg-[#f3ecdc] flex flex-col items-center relative overflow-x-hidden pt-10 md:pt-20 pb-10">
      {/* Background Atas - Dioptimalkan tingginya untuk mobile */}
      <div className="w-full h-[300px] md:h-[400px] absolute top-0 left-0 z-0">
        <img
          src={bgUp}
          alt="Background Top"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Background Pola Daun - Opacity disesuaikan agar teks terbaca jelas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={bgPattern}
          alt="Background Pattern"
          className="w-full h-full object-cover opacity-20 md:opacity-40"
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-4 md:px-6 flex flex-col items-center">
        {/* Banner Utama - Responsif Padding & Font */}
        <div className="bg-[#5f7f8f] rounded-[30px] md:rounded-[50px] p-8 md:p-12 mt-16 md:mt-20 mb-12 md:mb-20 text-black shadow-2xl w-full max-w-4xl flex flex-col items-center text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
            Punya Pertanyaan, Masukkan, atau Aspirasi?
          </h1>
          <p className="text-base md:text-lg opacity-90 mb-8 font-serif italic">
            Kami siap membantu Anda melalui layanan resmi kami.
          </p>

          {/* Link Akses Layanan - Tombol Tunggal yang Kuat */}
          <a
            href="https://wa.me/6282363607196?text=Halo%20saya%20ingin%20mengakses%20layanan%20Desa%20Sidodadi%20Asri"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#fef9eb] text-[#1e293b] px-6 md:px-10 py-3 rounded-2xl font-black text-base md:text-xl flex items-center gap-3 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95 transition-all duration-300 border border-black/5"
          >
            Akses Layanan
            <img src={waIcon} className="w-6 h-6 md:w-8 md:h-8" alt="WA" />
          </a>
        </div>

        {/* Grid Informasi - Dari 1 kolom (Mobile) ke 4 kolom (Desktop) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 md:gap-y-0 mb-20 border-t border-[#2f4156]/10 pt-12">
          {/* Alamat */}
          <div className="flex gap-4 px-4">
            <img src={locIcon} className="w-8 h-8 shrink-0" alt="Location" />
            <div className="flex flex-col">
              <h3 className="font-black text-[#1f2937] uppercase text-xs tracking-widest mb-1">
                Alamat Kantor Desa
              </h3>
              <p className="text-[#2f4156] font-serif italic text-sm leading-relaxed">
                Jl. Niskala Wastukancana, Sidodadi Asri, Lampung
              </p>
            </div>
          </div>

          {/* Email - Border kiri hanya muncul di Desktop */}
          <div className="flex gap-4 px-4 md:border-l border-[#2f4156]/20">
            <img src={mailIcon} className="w-8 h-8 shrink-0" alt="Email" />
            <div className="flex flex-col">
              <h3 className="font-black text-[#1f2937] uppercase text-xs tracking-widest mb-1">
                Email Resmi
              </h3>
              <p className="text-[#2f4156] font-serif italic text-sm">
                sidodadiasri250@gmail.com
              </p>
            </div>
          </div>

          {/* Jenis Layanan */}
          <div className="flex gap-4 px-4 md:border-l border-[#2f4156]/20">
            <img src={fileIcon} className="w-8 h-8 shrink-0" alt="Layanan" />
            <div className="flex flex-col">
              <h3 className="font-black text-[#1f2937] uppercase text-xs tracking-widest mb-2">
                Jenis Layanan
              </h3>
              <ul className="text-[#2f4156] font-serif italic text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <img src={checkIcon1} className="w-3" alt="v" /> Administrasi
                  Umum
                </li>
                <li className="flex items-center gap-2">
                  <img src={checkIcon2} className="w-3" alt="v" /> Surat
                  Keterangan
                </li>
                <li className="flex items-center gap-2">
                  <img src={checkIcon3} className="w-3" alt="v" /> Layanan
                  Aspirasi
                </li>
              </ul>
            </div>
          </div>

          {/* Jam Pelayanan */}
          <div className="flex gap-4 px-4 md:border-l border-[#2f4156]/20">
            <img src={clockIcon} className="w-8 h-8 shrink-0" alt="Clock" />
            <div className="flex flex-col">
              <h3 className="font-black text-[#1f2937] uppercase text-xs tracking-widest mb-1">
                Jam Pelayanan
              </h3>
              <p className="text-[#2f4156] font-serif italic text-sm leading-tight">
                Senin - Jumat
                <br />
                <span className="font-sans font-bold not-italic">
                  08.00 - 15.00 WIB
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Social Media - Footer Kontak */}
        <div className="flex flex-col items-center gap-6 mt-4 w-full">
          <div className="h-px w-20 bg-[#1f2937]/20"></div>
          <h4 className="font-black text-[#1f2937] text-xs uppercase tracking-[0.3em]">
            Media Sosial Kami
          </h4>
          <div className="flex flex-wrap justify-center gap-8 md:gap-10">
            <a
              href="https://instagram.com/sidodadiasri"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-125 transition-transform duration-300"
            >
              <img
                src={instaIcon}
                className="w-9 h-9 md:w-10 md:h-10"
                alt="Instagram"
              />
            </a>
            <a
              href="#"
              className="hover:scale-125 transition-transform duration-300"
            >
              <img
                src={fbIcon}
                className="w-9 h-9 md:w-10 md:h-10"
                alt="Facebook"
              />
            </a>
            <a
              href="#"
              className="hover:scale-125 transition-transform duration-300"
            >
              <img
                src={webIcon}
                className="w-9 h-9 md:w-10 md:h-10"
                alt="Website"
              />
            </a>
            <a
              href="#"
              className="hover:scale-125 transition-transform duration-300"
            >
              <img
                src={tiktokIcon}
                className="w-9 h-9 md:w-10 md:h-10"
                alt="TikTok"
              />
            </a>
          </div>
          <p className="text-[10px] text-[#1f2937]/40 uppercase tracking-widest mt-8 font-bold">
            © 2026 Desa Sidodadi Asri
          </p>
        </div>
      </div>
    </div>
  );
};

export default Kontak;
