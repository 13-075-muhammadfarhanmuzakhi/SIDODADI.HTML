import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const AdminLayout = () => {
  const admin = localStorage.getItem("admin");

  // ❌ BELUM LOGIN
  if (!admin) {
    alert("Silakan login untuk mengakses halaman admin");
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ SUDAH LOGIN
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
