import React from 'react';

const Footer = () => {
    return (
        <footer className="fixed bottom-0 w-full z-50 bg-[#2D3E50] py-1 text-center border-t border-white/5">
            <div className="container mx-auto px-4">
                <p className="text-white/60 text-sm font-medium">
                    © 2026 KKN Tematik Desa Sidodadi Asri ITERA.
                </p>
                <p className="text-white/40 text-xs mt-1">
                    All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;