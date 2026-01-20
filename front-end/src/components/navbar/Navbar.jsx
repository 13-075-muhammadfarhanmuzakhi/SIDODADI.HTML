import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { name: 'Beranda', path: '/' },
        { name: 'Profile', path: '/Profile' },
        { name: 'Layanan Desa', path: '/Layanan' },
        { name: 'Kontak', path: '/Kontak' },
        { name: 'Galeri & Artikel', path: '/Galeri' },
    ];

    return (
        // Menambahkan bg-slate-900 dan shadow-md agar tidak transparan dan terlihat terpisah
        <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 text-white bg-slate-900 shadow-md">
            <div>
                <Link to="/">
                    <h1 className="text-xl font-bold tracking-tight">DESA SIDODADI ASRI</h1>
                    <p className="text-xs opacity-80">Lampung Selatan</p>
                </Link>
            </div>

            <div className="relative">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex flex-col gap-1.5 focus:outline-none z-50 relative group cursor-pointer"
                >
                    <span className={`h-0.5 w-8 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`h-0.5 w-8 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`h-0.5 w-8 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {isOpen && (
                    <div 
                        onMouseLeave={() => setIsOpen(false)}
                        className="absolute right-0 top-full mt-4 w-64 bg-slate-900/95 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-all"
                    >
                        <ul className="flex flex-col py-4">
                            {menuItems.map((item) => (
                                <li key={item.name}>
                                    <Link 
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-6 py-3 hover:bg-blue-600/30 hover:text-blue-400 transition text-lg font-medium"
                                    >
                                        {item.name}
                                    </Link>
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