import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 text-white">
            {/* Logo Section */}
            <div>
                <h1 className="text-xl font-bold tracking-tight">DESA SIDODADI ASRI</h1>
                <p className="text-xs opacity-80">Lampung Selatan</p>
            </div>

            {/* Menu Button & Dropdown Container */}
            <div className="relative">
                {/* Hamburger Icon */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex flex-col gap-1.5 focus:outline-none z-50 relative group"
                >
                    <span className={`h-0.5 w-8 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`h-0.5 w-8 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`h-0.5 w-8 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {/* Dropdown Menu (Muncul saat Klik, Hilang saat Mouse Leave) */}
                {isOpen && (
                    <div 
                        onMouseLeave={() => setIsOpen(false)}
                        className="absolute right-0 top-full mt-4 w-64 bg-slate-900/90 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-all animate-in fade-in slide-in-from-top-2"
                    >
                        <ul className="flex flex-col py-4">
                            {['Beranda', 'Profile', 'Layanan Desa', 'Kontak', 'Galeri & Artikel'].map((item) => (
                                <li key={item} className="px-6 py-3 hover:bg-blue-600/30 hover:text-blue-400 cursor-pointer transition text-lg font-medium">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;