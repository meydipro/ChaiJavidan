import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const PRICE_RANGES = [
  { label: 'همه قیمت‌ها', min: 0, max: Infinity },
  { label: 'زیر ۱۵۰ هزار', min: 0, max: 150000 },
  { label: '۱۵۰ - ۲۰۰ هزار', min: 150000, max: 200000 },
  { label: 'بالای ۲۰۰ هزار', min: 200000, max: Infinity },
];

const Shop = ({ searchQuery: propSearchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeRegion, setActiveRegion] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePriceRange, setActivePriceRange] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = propSearchQuery || searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/products`);
        setProducts(res.data);
      } catch (err) {
        setProducts([
          { id: 1, name: "چای سیاه ممتاز گیلان", price: 185000, originalPrice: 210000, image: "https://picsum.photos/id/1015/600/600", category: "سیاه", region: "گیلان", description: "چای سیاه با کیفیت عالی", stock: 45, rating: 4.8, reviews: 124, featured: true },
          { id: 2, name: "چای سبز ارگانیک گیلان", price: 165000, image: "https://picsum.photos/id/106/600/600", category: "سبز", region: "گیلان", description: "چای سبز ارگانیک", stock: 32, rating: 4.6, reviews: 89, featured: true },
          { id: 3, name: "چای دارچین و هل گیلان", price: 205000, originalPrice: 240000, image: "https://picsum.photos/id/312/600/600", category: "طعم‌دار", region: "گیلان", description: "ترکیبی لوکس", stock: 27, rating: 4.9, reviews: 156, featured: true },
          { id: 4, name: "چای سیاه لاهیجان", price: 195000, image: "https://picsum.photos/id/201/600/600", category: "سیاه", region: "گیلان", description: "چای سیاه ناب", stock: 18, rating: 4.7, reviews: 73, featured: false },
          { id: 5, name: "چای سبز بهاره گیلان", price: 175000, originalPrice: 195000, image: "https://picsum.photos/id/160/600/600", category: "سبز", region: "گیلان", description: "چای سبز خوش‌عطر", stock: 61, rating: 4.5, reviews: 211, featured: true },
          { id: 6, name: "چای سیاه ترش گیلان", price: 149000, image: "https://picsum.photos/id/292/600/600", category: "طعم‌دار", region: "گیلان", description: "چای سیاه ترش", stock: 54, rating: 4.3, reviews: 67, featured: false }
        ]);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    const urlRegion = searchParams.get('region');
    const urlCategory = searchParams.get('category');
    if (urlRegion) setActiveRegion(urlRegion);
    if (urlCategory) setActiveCategory(urlCategory);

    if (activeRegion !== 'all') {
      filtered = filtered.filter(p => p.region === activeRegion);
    }

    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    const range = PRICE_RANGES[activePriceRange];
    if (activePriceRange !== 0) {
      filtered = filtered.filter(p => p.price >= range.min && p.price < range.max);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  }, [products, activeRegion, activeCategory, activePriceRange, searchQuery, sortBy, searchParams]);

  const regions = ['گیلان'];
  const categories = ['سیاه', 'سبز', 'طعم‌دار'];
  const hasActiveFilters = activeRegion !== 'all' || activeCategory !== 'all' || activePriceRange !== 0 || searchQuery;

  const resetFilters = () => {
    setActiveRegion('all');
    setActiveCategory('all');
    setActivePriceRange(0);
    setSortBy('featured');
  };

  return (
    <div className="pt-28 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="uppercase tracking-[2.5px] text-xs text-[#C9A84C] font-bold">فروشگاه</div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#8B6914] dark:text-[#D4B85C] mt-1">
              {searchQuery ? `نتایج: "${searchQuery}"` : 'همه چای‌ها'}
            </h1>
            <p className="text-sm text-[#C9A84C] mt-1">
              {filteredProducts.length} محصول
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-sm font-medium transition-all ${
                showFilters
                  ? 'bg-[#1B3A2B] text-white border-[#1B3A2B]'
                  : 'bg-white dark:bg-[#1E2A22] dark:text-[#F0EBE0] border-[#C9A84C]/20 dark:border-[#2D3D32] hover:border-[#C9A84C]/40'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              فیلترها
              {hasActiveFilters && (
                <span className="w-5 h-5 rounded-full bg-[#D4B85C] text-[#1B3A2B] text-[10px] font-bold flex items-center justify-center">
                  {[activeRegion !== 'all', activeCategory !== 'all', activePriceRange !== 0].filter(Boolean).length}
                </span>
              )}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-[#1E2A22] dark:text-[#F0EBE0] border border-[#C9A84C]/20 dark:border-[#2D3D32] rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A84C]/40"
            >
              <option value="featured">پیشنهاد ویژه</option>
              <option value="price-low">ارزان‌ترین</option>
              <option value="price-high">گران‌ترین</option>
              <option value="rating">بهترین امتیاز</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden mb-8"
            >
              <div className="backdrop-blur-xl bg-white/60 dark:bg-[#1E2A22]/60 border border-[#C9A84C]/15 dark:border-[#2D3D32]/40 rounded-3xl p-5 sm:p-6">
                {/* Region */}
                <div className="mb-5">
                  <div className="text-xs font-bold text-[#8B6914] dark:text-[#D4B85C] tracking-wider mb-3">استان</div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveRegion('all')}
                      className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                        activeRegion === 'all'
                          ? 'bg-[#1B3A2B] text-white shadow-md'
                          : 'bg-white/80 dark:bg-[#141A16] text-[#8B6914] dark:text-[#D4B85C] border border-[#C9A84C]/15 dark:border-[#2D3D32] hover:border-[#C9A84C]/30'
                      }`}
                    >
                      همه
                    </button>
                    {regions.map(region => (
                      <button
                        key={region}
                        onClick={() => setActiveRegion(region)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                          activeRegion === region
                            ? 'bg-[#1B3A2B] text-white shadow-md'
                            : 'bg-white/80 dark:bg-[#141A16] text-[#8B6914] dark:text-[#D4B85C] border border-[#C9A84C]/15 dark:border-[#2D3D32] hover:border-[#C9A84C]/30'
                        }`}
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div className="mb-5">
                  <div className="text-xs font-bold text-[#8B6914] dark:text-[#D4B85C] tracking-wider mb-3">نوع چای</div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveCategory('all')}
                      className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                        activeCategory === 'all'
                          ? 'bg-[#1B3A2B] text-white shadow-md'
                          : 'bg-white/80 dark:bg-[#141A16] text-[#8B6914] dark:text-[#D4B85C] border border-[#C9A84C]/15 dark:border-[#2D3D32] hover:border-[#C9A84C]/30'
                      }`}
                    >
                      همه
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                          activeCategory === cat
                            ? 'bg-[#1B3A2B] text-white shadow-md'
                            : 'bg-white/80 dark:bg-[#141A16] text-[#8B6914] dark:text-[#D4B85C] border border-[#C9A84C]/15 dark:border-[#2D3D32] hover:border-[#C9A84C]/30'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <div className="text-xs font-bold text-[#8B6914] dark:text-[#D4B85C] tracking-wider mb-3">محدوده قیمت</div>
                  <div className="flex flex-wrap gap-2">
                    {PRICE_RANGES.map((range, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePriceRange(idx)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                          activePriceRange === idx
                            ? 'bg-[#C9A84C] text-[#1B3A2B] shadow-md'
                            : 'bg-white/80 dark:bg-[#141A16] text-[#8B6914] dark:text-[#D4B85C] border border-[#C9A84C]/15 dark:border-[#2D3D32] hover:border-[#C9A84C]/30'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active filters & reset */}
                {hasActiveFilters && (
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#C9A84C]/10 dark:border-[#2D3D32]/40">
                    <div className="flex flex-wrap gap-2 flex-1">
                      {activeRegion !== 'all' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#1B3A2B]/10 text-[11px] font-medium text-[#1B3A2B] dark:text-[#D4B85C]">
                          {activeRegion}
                          <X className="w-3 h-3 cursor-pointer" onClick={() => setActiveRegion('all')} />
                        </span>
                      )}
                      {activeCategory !== 'all' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#1B3A2B]/10 text-[11px] font-medium text-[#1B3A2B] dark:text-[#D4B85C]">
                          {activeCategory}
                          <X className="w-3 h-3 cursor-pointer" onClick={() => setActiveCategory('all')} />
                        </span>
                      )}
                      {activePriceRange !== 0 && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#C9A84C]/15 text-[11px] font-medium text-[#8B6914] dark:text-[#D4B85C]">
                          {PRICE_RANGES[activePriceRange].label}
                          <X className="w-3 h-3 cursor-pointer" onClick={() => setActivePriceRange(0)} />
                        </span>
                      )}
                    </div>
                    <button
                      onClick={resetFilters}
                      className="text-xs text-[#C9A84C] hover:text-[#8B6914] font-medium whitespace-nowrap"
                    >
                      پاک کردن همه
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active filter chips (when panel is closed) */}
        {!showFilters && hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {activeRegion !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1B3A2B]/10 dark:bg-[#1B3A2B]/30 text-xs font-medium text-[#1B3A2B] dark:text-[#D4B85C]">
                {activeRegion}
                <X className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => setActiveRegion('all')} />
              </span>
            )}
            {activeCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1B3A2B]/10 dark:bg-[#1B3A2B]/30 text-xs font-medium text-[#1B3A2B] dark:text-[#D4B85C]">
                {activeCategory}
                <X className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => setActiveCategory('all')} />
              </span>
            )}
            {activePriceRange !== 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C9A84C]/15 dark:bg-[#C9A84C]/20 text-xs font-medium text-[#8B6914] dark:text-[#D4B85C]">
                {PRICE_RANGES[activePriceRange].label}
                <X className="w-3 h-3 cursor-pointer hover:opacity-70" onClick={() => setActivePriceRange(0)} />
              </span>
            )}
            <button onClick={resetFilters} className="text-xs text-[#C9A84C] hover:text-[#8B6914] font-medium px-2">
              پاک کردن همه
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="text-5xl mb-4">🍵</div>
              <div className="text-xl font-bold text-[#8B6914] dark:text-[#D4B85C] mb-2">محصولی یافت نشد</div>
              <p className="text-sm text-[#C9A84C] mb-4">فیلترها را تغییر دهید یا پاک کنید</p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-[#1B3A2B] text-white text-sm font-medium rounded-2xl hover:bg-[#1B3A2B]/90 transition-colors"
              >
                حذف فیلترها
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
