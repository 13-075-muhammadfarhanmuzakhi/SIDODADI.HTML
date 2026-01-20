import React from 'react';

const Footer = () => {
    return (
        // py-2 menjaga agar footer tetap tipis
        <footer className="fixed bottom-0 w-full z-50 bg-[#2D3E50]/95 backdrop-blur-sm py-2 border-t border-white/10">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
                {/* Baris Pertama: Info KKN */}
                <p className="text-white/60 text-[10px] md:text-xs tracking-wider uppercase font-medium">
                    © 2026 KKN Tematik Desa Sidodadi Asri ITERA.
                </p>
                
                {/* Baris Kedua: All Rights Reserved (Berada di bawah dan lebih transparan) */}
                <p className="text-white/40 text-[9px] md:text-[10px] tracking-widest uppercase mt-0.5">
                    All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;