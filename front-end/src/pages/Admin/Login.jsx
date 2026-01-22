import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal");
        return;
      }

      // ✅ simpan admin ke localStorage
      localStorage.setItem("admin", JSON.stringify(data.admin));

      // ✅ redirect pakai react-router
      navigate("/admin/dashboard");

    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#6f8f9f]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm text-center space-y-4"
      >
        <input
          type="text"
          placeholder="USERNAME"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded bg-transparent border border-white/50 text-white"
          required
        />

        <input
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded bg-transparent border border-white/50 text-white"
          required
        />

        {error && <p className="text-red-300 text-sm">{error}</p>}

        <button className="w-full bg-black text-white py-3 rounded">
          LOG IN
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
