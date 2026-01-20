import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />

      {/* pb-10 dihapus agar tidak ada gap putih di atas footer */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;