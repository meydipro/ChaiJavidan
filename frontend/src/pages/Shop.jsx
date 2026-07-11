import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Filter, X } from 'lucide-react';
import axios from 'axios';

const API = 'http://localhost:5001/api';

const Shop = ({ searchQuery: propSearchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeRegion, setActiveRegion] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = propSearchQuery || searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/products`);
        setProducts(res.data);
      } catch (err) {
        // fallback data
        setProducts([
          { id: 1, name: "چای سیاه ممتاز گیلان", price: 185000, originalPrice: 210000, image: "https://picsum.photos/id/1015/600/600", category: "سیاه", region: "گیلان", description: "چای سیاه با کیفیت عالی", stock: 45, rating: 4.8, reviews: 124, featured: true },
          { id: 2, name: "چای سبز ارگانیک بوشهر", price: 165000, image: "https://picsum.photos/id/106/600/600", category: "سبز", region: "بوشهر", description: "چای سبز ارگانیک", stock: 32, rating: 4.6, reviews: 89, featured: true },
          { id: 3, name: "چای دارچین و هل گیلان", price: 205000, originalPrice: 240000, image: "https://picsum.photos/id/312/600/600", category: "طعم‌دار", region: "گیلان", description: "ترکیبی لوکس", stock: 27, rating: 4.9, reviews: 156, featured: true },
          { id: 4, name: "چای سفید ممتاز بوشهر", price: 295000, image: "https://picsum.photos/id/201/600/600", category: "سفید", region: "بوشهر", description: "چای سفید نادر", stock: 18, rating: 4.7, reviews: 73, featured: false },
          { id: 5, name: "چای گلستان گیلان", price: 175000, originalPrice: 195000, image: "https://picsum.photos/id/160/600/600", category: "سیاه", region: "گیلان", description: "چای سیاه خوش‌عطر", stock: 61, rating: 4.5, reviews: 211, featured: true },
          { id: 6, name: "چای عطری بوشهر", price: 149000, image: "https://picsum.photos/id/292/600/600", category: "طعم‌دار", region: "بوشهر", description: "چای با عطر گل‌های محلی", stock: 54, rating: 4.3, reviews: 67, featured: false }
        ]);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // URL params
    const urlRegion = searchParams.get('region');
    const urlCategory = searchParams.get('category');

    if (urlRegion) setActiveRegion(urlRegion);
    if (urlCategory) setActiveCategory(urlCategory);

    // Region filter
    if (activeRegion !== 'all') {
      filtered = filtered.filter(p => p.region === activeRegion);
    }

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  }, [products, activeRegion, activeCategory, searchQuery, sortBy, searchParams]);

  const regions = ['گیلان', 'بوشهر'];
  const categories = ['سیاه', 'سبز', 'سفید', 'طعم‌دار'];

  const resetFilters = () => {
    setActiveRegion('all');
    setActiveCategory('all');
    setSortBy('featured');
  };

  return (
    <div className="pt-28 max-w-7xl mx-auto px-6">
      <div className="py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="uppercase tracking-[2.5px] text-xs text-gold-500">فروشگاه</div>
            <h1 className="section-header tracking-[-1.5px]">
              {searchQuery ? `نتایج جستجو: "${searchQuery}"` : 'همه چای‌ها'}
            </h1>
            {searchQuery && (
              <p className="text-sm text-gold-600 dark:text-gold-400 mt-1">
                {filteredProducts.length} محصول یافت شد
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-[#2A2520] dark:text-[#F0EBE0] border border-gold-200 dark:border-[#3D3630] rounded-2xl px-4 py-2 text-sm focus:outline-none"
            >
              <option value="featured">پیشنهاد ویژه</option>
              <option value="price-low">ارزان‌ترین</option>
              <option value="price-high">گران‌ترین</option>
              <option value="rating">بهترین امتیاز</option>
            </select>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button 
            onClick={() => setActiveRegion('all')}
            className={`filter-btn ${activeRegion === 'all' ? 'active' : ''}`}
          >
            همه استان‌ها
          </button>
          {regions.map(region => (
            <button 
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`filter-btn ${activeRegion === region ? 'active' : ''}`}
            >
              {region}
            </button>
          ))}

          <div className="w-px h-8 bg-gold-100 dark:bg-[#3D3630] mx-1.5 self-center"></div>

          <button 
            onClick={() => setActiveCategory('all')}
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
          >
            همه انواع
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}

          {(activeRegion !== 'all' || activeCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => { resetFilters(); if (searchQuery) setSearchParams({}); }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs text-gold-600 dark:text-gold-400 border border-gold-200 dark:border-[#3D3630] hover:bg-gold-50 dark:hover:bg-gold-950 rounded-2xl"
            >
              <X className="w-3.5 h-3.5" /> {searchQuery ? 'پاک کردن جستجو' : 'پاک کردن فیلترها'}
            </button>
          )}
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-5xl mb-3">🍵</div>
              <div className="text-xl">محصولی یافت نشد</div>
              <button onClick={resetFilters} className="mt-3 text-sm text-gold-700 underline">حذف فیلترها</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
