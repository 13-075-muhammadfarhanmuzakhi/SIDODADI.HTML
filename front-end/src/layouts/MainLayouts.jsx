import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />

      {/* Tambahkan pt-20 agar konten tidak tertutup Navbar fixed */}
      <main className="flex-grow pt-20 pb-20">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;