import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const Admin = lazy(() => import('./pages/Admin'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));

// Components
import Navbar from './components/Navbar';
import MegaMenu from './components/MegaMenu';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import PageTransition from './components/animations/PageTransition';

// Context for cart and admin
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import { AuthProvider } from './context/AuthContext';

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0] dark:bg-[#141A16]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-3 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin"></div>
      <div className="text-sm text-[#C9A84C]">در حال بارگذاری...</div>
    </div>
  </div>
);

function App() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <CartProvider>
        <AdminProvider>
          <AuthProvider>
            <div className="min-h-screen bg-cream dark:bg-[#141A16] text-gold-900 dark:text-[#F0EBE0] font-sans overflow-x-hidden">
              <Navbar
                setIsMegaMenuOpen={setIsMegaMenuOpen}
                isMegaMenuOpen={isMegaMenuOpen}
                setIsCartOpen={setIsCartOpen}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              <MegaMenu
                isOpen={isMegaMenuOpen}
                setIsOpen={setIsMegaMenuOpen}
              />

              <main>
                <PageTransition>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop searchQuery={searchQuery} />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/cart" element={<Cart setIsCartOpen={setIsCartOpen} />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route path="/admin" element={<Admin />} />
                    </Routes>
                  </Suspense>
                </PageTransition>
              </main>

              <Footer />

              <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />

              <Toaster position="top-center" richColors closeButton />
            </div>
          </AuthProvider>
        </AdminProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
