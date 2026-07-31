// Wraps authenticated pages with Navbar and Footer
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow container-custom py-6">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;