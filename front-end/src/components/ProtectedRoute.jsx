import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Mengecek apakah data "admin" ada di localStorage
  const admin = localStorage.getItem("admin");

  // Jika tidak ada data admin, tendang ke login
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  // Jika ada, izinkan masuk
  return <Outlet />;
};

export default ProtectedRoute;
