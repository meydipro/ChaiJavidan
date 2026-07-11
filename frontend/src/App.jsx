import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Menu, X, User, Search, Heart, ChevronDown, 
  MapPin, Award, Leaf, Star, ArrowRight 
} from 'lucide-react';
import { Toaster, toast } from 'sonner';

// Import pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

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

function App() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <CartProvider>
        <AdminProvider>
          <AuthProvider>
            <div className="min-h-screen bg-cream dark:bg-[#1A1814] text-gold-900 dark:text-[#F0EBE0] font-sans overflow-x-hidden">
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
