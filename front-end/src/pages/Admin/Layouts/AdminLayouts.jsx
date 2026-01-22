import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#eae6dc]">
      {/* Sidebar */}
      <Sidebar />
      {/* Content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
