import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// Menambahkan motion untuk feel mobile yang lebih smooth (opsional, tapi disarankan)
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal");
        setLoading(false);
        return;
      }

      // ✅ SIMPAN DATA ADMIN
      localStorage.setItem("admin", JSON.stringify(data.admin));

      // ✅ REDIRECT KE DASHBOARD
      navigate("/admin/dashboard", { replace: true });

    } catch (err) {
      setError("Server error, coba lagi nanti");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Menggunakan min-h-[100dvh] agar pas dengan layar HP meski address bar muncul/hilang
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-[#6f8f9f] px-6 py-10 overflow-x-hidden">
      
      {/* Container Form dengan Glassmorphism agar terlihat elegan di HP */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full text-center space-y-5 bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/20 shadow-2xl"
        >
          {/* Ikon Gembok untuk Identitas Login */}
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 border border-white/30">
            <span className="text-2xl">🔐</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tighter">
              Admin <span className="text-black">Login</span>
            </h1>
            <p className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
              Sidodadi Asri Portal
            </p>
          </div>

          <div className="space-y-4 pt-4">
            {/* Input Username - Dioptimalkan untuk Mobile Keyboard */}
            <div className="relative">
              <input
                type="text"
                placeholder="USERNAME"
                autoCapitalize="none" // Mencegah huruf besar otomatis di HP
                autoComplete="username"
                spellCheck="false"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:bg-white/20 focus:border-white focus:outline-none transition-all duration-300 text-sm md:text-base font-bold tracking-widest"
                required
              />
            </div>

            {/* Input Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="PASSWORD"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:bg-white/20 focus:border-white focus:outline-none transition-all duration-300 text-sm md:text-base font-bold tracking-widest"
                required
              />
            </div>
          </div>

          {/* Menampilkan Error dengan kontras yang baik */}
          {error && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-red-500/20 border border-red-500/50 p-3 rounded-xl"
            >
              <p className="text-red-200 text-[11px] md:text-xs font-bold uppercase tracking-wider">{error}</p>
            </motion.div>
          )}

          {/* Tombol Login - Lebih besar agar mudah ditekan jempol */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-[#93ff8d] py-4 rounded-2xl font-black uppercase tracking-[0.4em] text-sm hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:scale-100 mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-[#93ff8d]/30 border-t-[#93ff8d] rounded-full animate-spin"></div>
                SINKRONISASI...
              </span>
            ) : (
              "LOG IN"
            )}
          </button>
          
          {/* Tombol Kembali ke Beranda untuk User yang salah klik */}
          <div className="pt-4">
            <Link 
              to="/" 
              className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;