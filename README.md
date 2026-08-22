<div align="center">

  # 🌾 Portal Resmi Desa Sidodadi Asri
  **Sistem Informasi Pelayanan Publik, Transparansi Informasi & Warta Digital Desa**

  [![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Laravel](https://img.shields.io/badge/Laravel-10.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com/)
  [![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

  <p align="center">
    Dikembangkan oleh <b>Tim KKN Desa Sidodadi Asri</b><br />
    Kecamatan Jati Agung, Kabupaten Lampung Selatan
  </p>

</div>

---

## 📌 Tentang Proyek

**Website Resmi Desa Sidodadi Asri** adalah platform digital terpadu yang dirancang untuk modernisasi tata kelola pemerintahan desa dan peningkatan kualitas pelayanan publik. Platform ini mengintegrasikan layanan administrasi persuratan, transparansi informasi desa, profil SOTK, serta publikasi berita/kegiatan masyarakat secara *real-time*.

---

## ✨ Fitur-Fitur Utama

* **🏠 Beranda Interaktif:** Pengenalan desa, pengumuman penting berbasis *marquee banner*, dan akses cepat ke layanan publik.
* **🏛️ Profil Desa & SOTK:** Informasi sejarah desa, visi-misi, serta diagram Struktur Organisasi dan Tata Kerja Pemerintah Desa.
* **📜 Layanan Persuratan Online:** Panduan persyaratan dan kemudahan pengajuan dokumen administrasi kependudukan/surat keterangan.
* **🖼️ Galeri & Warta Desa:** Dokumentasi foto kegiatan desa, berita terkini, dan artikel yang terhubung langsung dengan RESTful API Backend.
* **📞 Pusat Kontak & Aspirasi:** Informasi jam operasional, peta lokasi kantor desa, serta integrasi *one-click* ke WhatsApp Resmi Pemdes.

---

## 🛠️ Stack Teknologi

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Frontend** | React.js | UI Library yang responsif & dinamis |
| **Styling** | Tailwind CSS | Utility-first CSS framework untuk desain modern |
| **Routing** | React Router DOM v6 | Navigasi halaman Single Page Application (SPA) |
| **Backend** | Laravel Framework | Robust RESTful API engine |
| **Database** | MySQL | Relational Database Management System |
| **Package Manager** | NPM & Composer | Pengelolaan dependensi JS dan PHP |

---

## 📂 Struktur Direktori Proyek

```text
SIDODADI.HTML/
├── back-end/                   # Laravel REST API Engine
│   ├── app/                    # Controllers, Models, Middleware
│   ├── config/                 # Konfigurasi sistem Laravel
│   ├── database/               # Migrasi database & seeders
│   ├── routes/                 # Endpoint API (/api/artikel, dll)
│   ├── storage/                # Penyimpanan file & upload gambar
│   └── composer.json
│
├── front-end/                  # React.js Frontend Application
│   ├── public/                 # Asset publik statis
│   ├── src/
│   │   ├── assets/             # Gambar, logo, & latar belakang
│   │   ├── components/         # Komponen UI Reusable (Navbar, dll)
│   │   ├── layouts/            # Template layout halaman
│   │   └── pages/              # Halaman utama (Home, Profil, Layanan, Galeri, Kontak)
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md                   # Dokumentasi proyek
