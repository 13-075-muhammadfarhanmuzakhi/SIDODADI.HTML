import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Statis */}
      <Navbar />

      {/* Konten Dinamis - Area yang bisa di-scroll */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer Statis */}
      <Footer />
    </div>
  );
};

export default MainLayout;