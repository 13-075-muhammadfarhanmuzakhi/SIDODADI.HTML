import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
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
      setError("Server error, coba lagi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#6f8f9f]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm text-center space-y-4 bg-transparent"
      >
        <h1 className="text-white text-2xl font-bold mb-4">Admin Login</h1>

        <input
          type="text"
          placeholder="USERNAME"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded bg-transparent border border-white/50 text-white placeholder-white/60"
          required
        />

        <input
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded bg-transparent border border-white/50 text-white placeholder-white/60"
          required
        />

        {error && (
          <p className="text-red-300 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded hover:bg-black/80 transition disabled:opacity-50"
        >
          {loading ? "LOADING..." : "LOG IN"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
