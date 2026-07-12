import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search, LogIn, LogOut, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ setIsMegaMenuOpen, isMegaMenuOpen, setIsCartOpen, searchQuery, setSearchQuery }) => {
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setShowUserMenu(false); }, [location]);

  useEffect(() => {
    if (searchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchExpanded]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const handleSearchToggle = () => {
    if (searchExpanded && searchQuery) return;
    setSearchExpanded(!searchExpanded);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchExpanded(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 transition-all duration-500">
      <nav className={`mx-auto max-w-7xl rounded-2xl transition-all duration-500 navbar-glass ${scrolled ? 'navbar-scrolled !h-14' : 'h-[72px]'}`}>
        <div className="flex items-center justify-between h-full px-5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-white/80 to-[#f5efe4]/60 border border-[#c9a84c]/30 shadow-sm backdrop-blur-sm overflow-hidden">
              <img src="/logo.png" alt="چای جاویدان" className="w-full h-full object-cover relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#e8c84a]/10 via-transparent to-[#1a3a2a]/10"></div>
            </div>
            <div className="hidden sm:block">
              <div className="font-amiri text-lg tracking-tight text-[#5c4814] dark:text-[#e8c84a] font-bold leading-tight">چای جاویدان</div>
              <div className="text-[8px] text-[#9a7a24] dark:text-[#c9a84c] tracking-[3px] font-medium">CHAI JAVIDAN</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link to="/shop" className={`nav-link ${isActive('/shop') ? 'text-gold-700 dark:text-gold-300' : 'hover:text-gold-700 dark:hover:text-gold-300'}`}>فروشگاه</Link>
            <button onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)} className="flex items-center gap-1.5 nav-link hover:text-gold-700 dark:hover:text-gold-300">
              دسته‌بندی‌ها <span className="text-gold-shine text-[10px]">▼</span>
            </button>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'text-gold-700 dark:text-gold-300' : 'hover:text-gold-700 dark:hover:text-gold-300'}`}>درباره ما</Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'text-gold-700 dark:text-gold-300' : 'hover:text-gold-700 dark:hover:text-gold-300'}`}>تماس</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search - collapsible */}
            <div className="relative hidden sm:flex items-center">
              <div className={`flex items-center overflow-hidden transition-all duration-300 ease-out ${searchExpanded ? 'w-72 opacity-100' : 'w-10 opacity-100'}`}>
                <button
                  onClick={handleSearchToggle}
                  className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-xl transition-all duration-200 ${searchExpanded ? 'bg-gold-50/80 dark:bg-gold-950/50 text-gold-700 dark:text-gold-300' : 'hover:bg-gold-50/60 dark:hover:bg-gold-950/50 text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300'} ${searchExpanded ? 'search-icon-active' : ''}`}
                >
                  <Search className="w-[18px] h-[18px]" />
                </button>
                <div className={`flex items-center bg-white/60 dark:bg-[#2A2520]/60 border border-gold-200/60 dark:border-[#3D3630]/60 focus-within:border-gold-400/80 focus-within:bg-white/80 dark:focus-within:bg-[#2A2520]/80 rounded-xl h-10 transition-all duration-300 ${searchExpanded ? 'w-full ml-2 opacity-100' : 'w-0 opacity-0'}`}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="جستجوی چای..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    onBlur={() => { if (!searchQuery) setSearchExpanded(false); }}
                    className="w-full bg-transparent text-sm placeholder:text-gold-400/70 dark:text-[#F0EBE0] px-4 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 hover:bg-gold-50/60 dark:hover:bg-gold-950/50 rounded-xl transition-colors"
              title={isDark ? 'حالت روشن' : 'حالت تاریک'}
            >
              {isDark ? <Sun className="w-[18px] h-[18px] text-gold-400" /> : <Moon className="w-[18px] h-[18px] text-gold-600" />}
            </button>

            {/* Cart */}
            <button onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 hover:bg-gold-50/60 dark:hover:bg-gold-950/50 rounded-xl transition-colors">
              <ShoppingCart className="w-[18px] h-[18px] text-gold-700 dark:text-gold-300" />
              {cartCount > 0 && (
                <div className="absolute -top-0.5 -right-0.5 bg-gradient-to-br from-gold-shine to-gold-600 text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">{cartCount}</div>
              )}
            </button>

            {/* Auth Area */}
            <div className="relative">
              {isAuthenticated ? (
                <button onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border border-gold-200/60 dark:border-[#3D3630]/60 hover:bg-gold-50/50 dark:hover:bg-gold-950/50 text-gold-700 dark:text-gold-300 transition-all">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user?.name}</span>
                </button>
              ) : (
                <Link to="/login"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border border-gold-200/60 dark:border-[#3D3630]/60 hover:bg-gold-50/50 dark:hover:bg-gold-950/50 text-gold-700 dark:text-gold-300 transition-all">
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">ورود</span>
                </Link>
              )}

              {/* User dropdown */}
              <AnimatePresence>
                {showUserMenu && isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-2 w-48 bg-white/90 dark:bg-[#2A2520]/90 backdrop-blur-xl rounded-2xl border border-gold-100 dark:border-[#3D3630] shadow-xl py-2 z-50"
                  >
                    <Link to="/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gold-700 hover:bg-gold-50/50 transition-colors">
                      <User className="w-4 h-4" /> مدیریت
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50/50 transition-colors">
                      <LogOut className="w-4 h-4" /> خروج
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu */}
            <button onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 hover:bg-gold-50/60 dark:hover:bg-gold-950/50 rounded-xl">
              {isMegaMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
