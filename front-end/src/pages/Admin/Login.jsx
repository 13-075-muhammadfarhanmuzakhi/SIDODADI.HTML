import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://desasidodadiasri.my.id/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.message || "Username atau password yang dimasukkan salah.",
        );
        setLoading(false);
        return;
      }

      localStorage.setItem("admin", JSON.stringify(data.admin));
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError("Gagal terhubung ke server. Periksa koneksi backend Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#061e14] selection:bg-amber-400 selection:text-emerald-950 font-sans">
      {/* Background Gambar Banner Desa dengan Blend Dark Emerald */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 scale-105 transition-transform duration-10000 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070')`,
        }}
      />

      {/* Overlay Gradien Hijau Gelap & Emas */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#04130d] via-[#0b291c]/90 to-[#04130d]/95" />

      {/* Ornamen Cahaya Emas & Hijau Beranimasi */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-amber-400/20 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -right-20 w-[30rem] h-[30rem] bg-gradient-to-tl from-amber-500/25 via-emerald-600/15 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* Tombol Kembali ke Beranda Utama */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-6 left-6 z-20"
      >
        <Link
          to="/"
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-950/60 hover:bg-emerald-900/80 border border-amber-500/30 hover:border-amber-400/70 text-amber-300 hover:text-amber-200 text-xs md:text-sm font-semibold backdrop-blur-md transition-all shadow-lg hover:shadow-amber-500/10 active:scale-95"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Kembali ke Profile Desa</span>
        </Link>
      </motion.div>

      {/* Card Form Utama dengan Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="relative overflow-hidden rounded-3xl bg-emerald-950/40 backdrop-blur-2xl border border-amber-500/30 p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          {/* Accent Line Emas Berkilau di Atas Card */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_#fbbf24]" />

          {/* Header Card */}
          <div className="text-center space-y-3 mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 p-0.5 shadow-[0_0_25px_rgba(245,158,11,0.4)]"
            >
              <div className="w-full h-full bg-[#072418] rounded-[14px] flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </motion.div>

            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
                Admin{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                  Portal
                </span>
              </h1>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300/80 mt-1">
                Desa Sidodadi Asri
              </p>
            </div>
          </div>

          {/* Form Login */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Username */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-200/90 ml-1">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoCapitalize="none"
                  spellCheck="false"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-emerald-950/60 border border-emerald-700/60 text-white placeholder-emerald-400/40 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all text-sm font-medium"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Input Password + Toggle Tutup/Buka Mata */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-amber-200/90 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 pr-12 rounded-xl bg-emerald-950/60 border border-emerald-700/60 text-white placeholder-emerald-400/40 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all text-sm font-medium tracking-wide"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-amber-300 transition-colors p-1"
                  title={
                    showPassword ? "Sembunyikan Password" : "Tampilkan Password"
                  }
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-10-7-10-7a19.16 19.16 0 014.13-5.249M9.88 9.88a3 3 0 104.24 4.24m-4.24-4.24L3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs font-semibold text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tombol Masuk */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-500/40 active:scale-[0.98] disabled:opacity-50 mt-2"
            >
              <div className="w-full h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 group-hover:bg-amber-300 py-3.5 rounded-[10px] text-emerald-950 font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Panel</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-8 pt-5 border-t border-emerald-800/40 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-400/60">
              © 2026 KKN Tematik Desa Sidodadi Asri ITERA
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
