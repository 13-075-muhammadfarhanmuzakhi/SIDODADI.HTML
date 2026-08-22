import React from "react";
// WAJIB DITAMBAHKAN AGAR TIDAK ERROR
import { Link } from "react-router-dom";
import logoKKN from "../../assets/images/logokkn.png";

// Import semua gambar dari folder src/assets/contacts
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
// Icon sosmed (biarkan jika nanti ingin dipakai)
import instaIcon from "../../assets/contacts/insta.svg";
import fbIcon from "../../assets/contacts/fb-circle.svg";
import webIcon from "../../assets/contacts/circle-web.svg";
import tiktokIcon from "../../assets/contacts/tiktok.png";

const Kontak = () => {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center relative overflow-x-hidden pt-10 md:pt-20">
      {/* Background Atas - Dioptimalkan tingginya untuk mobile */}
      <div className="w-full h-[300px] md:h-[400px] absolute top-0 left-0 z-0">
        <img
          src={bgUp}
          alt="Background Top"
          className="w-full h-full object-cover"
        />
        {/* Overlay hitam/hijau transparan agar menyatu dengan tema */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#052e1d]/80 to-transparent"></div>
      </div>

      {/* Background Pola Daun */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-multiply">
        <img
          src={bgPattern}
          alt="Background Pattern"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      {/* ================= KONTEN UTAMA ================= */}
      <div className="relative z-10 w-full max-w-6xl px-4 md:px-6 flex flex-col items-center flex-grow">
        {/* Banner Utama - Tema Hijau Gelap & Emas */}
        <div className="relative bg-gradient-to-br from-[#052e1d] to-[#02140D] rounded-3xl md:rounded-[40px] p-8 md:p-12 mt-16 md:mt-20 mb-12 text-white shadow-2xl w-full max-w-4xl flex flex-col items-center text-center overflow-hidden border border-[#B8860B]/30">
          {/* Garis gradasi hijau gelap ke emas yang smooth di bagian atas banner */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#02140D] via-[#B8860B] to-[#052e1d]"></div>

          <h1 className="text-2xl md:text-4xl font-extrabold mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200">
            Punya Pertanyaan, Masukkan, atau Aspirasi?
          </h1>
          <p className="text-base md:text-lg opacity-80 mb-8 font-serif italic max-w-2xl">
            Kami siap membantu Anda melalui layanan resmi kami. Jangan ragu
            untuk menghubungi Pemerintah Desa Sidodadi Asri.
          </p>

          {/* Link Akses Layanan - Tombol Tema Emas */}
          <a
            href="https://wa.me/6282363607196?text=Halo%20saya%20ingin%20mengakses%20layanan%20Desa%20Sidodadi%20Asri"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#B8860B] to-[#996b05] text-white px-6 md:px-10 py-3.5 rounded-2xl font-bold text-base md:text-lg flex items-center gap-3 shadow-lg shadow-[#B8860B]/20 hover:scale-105 active:scale-95 transition-all duration-300 border border-amber-300/30"
          >
            Hubungi via WhatsApp
            <img
              src={waIcon}
              className="w-6 h-6 md:w-7 md:h-7 brightness-200"
              alt="WA"
            />
          </a>
        </div>

        {/* Garis Pembatas Smooth */}
        <div className="w-32 h-1 rounded-full bg-gradient-to-r from-[#052e1d] via-[#B8860B] to-[#052e1d] mb-12"></div>

        {/* Grid Informasi - UI Card dengan Garis Aksen */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {/* Card 1: Alamat */}
          <div className="bg-white rounded-xl p-6 border-b-4 border-b-[#052e1d] border-t-2 border-t-[#B8860B] shadow-md flex gap-4 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full bg-[#052e1d]/10 flex items-center justify-center shrink-0">
              <img src={locIcon} className="w-5 h-5" alt="Location" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-[#052e1d] uppercase text-xs tracking-wider mb-2">
                Alamat Kantor
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Jl. Niskala Wastukancana, Sidodadi Asri, Lampung
              </p>
            </div>
          </div>

          {/* Card 2: Email */}
          <div className="bg-white rounded-xl p-6 border-b-4 border-b-[#052e1d] border-t-2 border-t-[#B8860B] shadow-md flex gap-4 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full bg-[#052e1d]/10 flex items-center justify-center shrink-0">
              <img src={mailIcon} className="w-5 h-5" alt="Email" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-[#052e1d] uppercase text-xs tracking-wider mb-2">
                Email Resmi
              </h3>
              <p className="text-gray-600 text-sm font-medium">
                sidodadiasri250@gmail.com
              </p>
            </div>
          </div>

          {/* Card 3: Layanan */}
          <div className="bg-white rounded-xl p-6 border-b-4 border-b-[#052e1d] border-t-2 border-t-[#B8860B] shadow-md flex gap-4 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full bg-[#052e1d]/10 flex items-center justify-center shrink-0">
              <img src={fileIcon} className="w-5 h-5" alt="Layanan" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-[#052e1d] uppercase text-xs tracking-wider mb-2">
                Jenis Layanan
              </h3>
              <ul className="text-gray-600 text-sm space-y-1.5">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]"></span>{" "}
                  Administrasi Umum
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]"></span>{" "}
                  Surat Keterangan
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]"></span>{" "}
                  Layanan Aspirasi
                </li>
              </ul>
            </div>
          </div>

          {/* Card 4: Jam Operasional */}
          <div className="bg-white rounded-xl p-6 border-b-4 border-b-[#052e1d] border-t-2 border-t-[#B8860B] shadow-md flex gap-4 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full bg-[#052e1d]/10 flex items-center justify-center shrink-0">
              <img src={clockIcon} className="w-5 h-5" alt="Clock" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-[#052e1d] uppercase text-xs tracking-wider mb-2">
                Jam Pelayanan
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Senin - Jumat
                <br />
                <span className="font-bold text-[#B8860B]">
                  08.00 - 15.00 WIB
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      {/* Footer dipindah ke luar max-w-6xl agar membentang penuh (full width) */}
      <footer className="w-full bg-gradient-to-b from-[#052e1d] to-[#02140D] text-slate-200 border-t-2 border-[#B8860B]/40 pt-10 pb-6 px-4 md:px-8 relative z-20 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#B8860B]/20">
          {/* Identitas Desa */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src={logoKKN}
                alt="Logo Desa"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h3 className="font-extrabold text-base text-amber-400 tracking-wide">
                  SIDODADI ASRI
                </h3>
                <p className="text-[10px] text-slate-400">
                  Jati Agung, Lampung Selatan
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Portal resmi pelayanan publik dan transparansi informasi
              masyarakat Desa Sidodadi Asri.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 border-b border-[#B8860B]/30 pb-1 inline-block">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/"
                  className="text-slate-300 hover:text-amber-300 transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-slate-300 hover:text-amber-300 transition-colors"
                >
                  Profil Desa
                </Link>
              </li>
              <li>
                <Link
                  to="/layanan"
                  className="text-slate-300 hover:text-amber-300 transition-colors"
                >
                  Layanan Surat
                </Link>
              </li>
              <li>
                {/* Penanda emas sekarang di halaman Kontak */}
                <Link
                  to="/Kontak"
                  className="text-[#B8860B] font-extrabold transition-colors"
                >
                  Kontak
                </Link>
              </li>
              <li>
                <Link
                  to="/galeri"
                  className="text-slate-300 hover:text-amber-300 transition-colors"
                >
                  Galeri & Berita
                </Link>
              </li>
            </ul>
          </div>

          {/* Jam Operasional */}
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 border-b border-[#B8860B]/30 pb-1 inline-block">
              Jam Pelayanan
            </h4>
            <ul className="space-y-1 text-xs text-slate-300">
              <li className="flex justify-between">
                <span>Senin - Kamis:</span>
                <span className="font-semibold text-amber-200">
                  08:00 - 15:30 WIB
                </span>
              </li>
              <li className="flex justify-between">
                <span>Jumat:</span>
                <span className="font-semibold text-amber-200">
                  08:00 - 11:30 WIB
                </span>
              </li>
              <li className="flex justify-between">
                <span>Sabtu - Minggu:</span>
                <span className="font-semibold text-red-400">Tutup</span>
              </li>
            </ul>
          </div>

          {/* Kontak Desa */}
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 border-b border-[#B8860B]/30 pb-1 inline-block">
              Kontak Kantor
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-1.5">
              📍 Jl. Balai Desa No. 01, Sidodadi Asri, Kec. Jati Agung, Kab.
              Lampung Selatan
            </p>
            <p className="text-xs text-slate-300">
              ✉️ pemdes.sidodadiasri@gmail.com
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto pt-4 text-center text-[10px] text-slate-400 flex flex-col md:flex-row justify-between items-center gap-2">
          <p>© 2026 Pemerintah Desa Sidodadi Asri. Hak Cipta Dilindungi.</p>
          <p className="text-amber-400/80 font-medium">
            KKN Desa Sidodadi Asri
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Kontak;
