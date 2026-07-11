import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Award, MapPin, Star } from 'lucide-react';

const MegaMenu = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  const categories = [
    { name: "چای سیاه", icon: Leaf, slug: "سیاه", region: "گیلان" },
    { name: "چای سبز", icon: Leaf, slug: "سبز", region: "بوشهر" },
    { name: "چای سفید", icon: Star, slug: "سفید", region: "بوشهر" },
    { name: "چای طعم‌دار", icon: Award, slug: "طعم‌دار", region: "گیلان" },
  ];

  const regions = [
    { name: "گیلان", count: "۵۴ محصول", icon: MapPin },
    { name: "بوشهر", count: "۳۲ محصول", icon: MapPin },
  ];

  return (
    <div className="fixed top-[84px] left-4 right-4 z-40 max-w-7xl mx-auto bg-white/90 dark:bg-[#2A2520]/90 backdrop-blur-xl border border-gold-100 dark:border-[#3D3630] shadow-xl rounded-2xl mega-menu">
      <div className="px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-9">
        
        {/* Categories */}
        <div>
          <div className="text-xs font-medium tracking-[2px] text-gold-600 dark:text-gold-400 mb-4">دسته‌بندی‌ها</div>
          <div className="space-y-1">
            {categories.map((cat, idx) => (
              <Link 
                key={idx}
                to={`/shop?category=${cat.slug}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 group px-2 py-3 hover:bg-gold-50 dark:hover:bg-gold-950 rounded-2xl"
              >
                <div className="w-9 h-9 flex items-center justify-center bg-gold-100 dark:bg-gold-950 text-gold-700 dark:text-gold-400 rounded-2xl icon-halo group-hover:bg-gold-200 dark:group-hover:bg-gold-900">
                  <cat.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-sm group-hover:text-gold-700 dark:group-hover:text-gold-300">{cat.name}</div>
                  <div className="text-xs text-gold-500 dark:text-gold-400">{cat.region}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Regions */}
        <div>
          <div className="text-xs font-medium tracking-[2px] text-gold-600 dark:text-gold-400 mb-4">بر اساس استان</div>
          <div className="space-y-1">
            {regions.map((reg, idx) => (
              <Link 
                key={idx}
                to={`/shop?region=${reg.name}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 px-3 py-3.5 hover:bg-gold-50 dark:hover:bg-gold-950 rounded-2xl group"
              >
                <div className="icon-halo w-9 h-9 rounded-2xl bg-gradient-to-br from-gold-200 to-gold-100 dark:from-gold-900 dark:to-gold-950 flex items-center justify-center">
                  <reg.icon className="w-4 h-4 text-gold-700 dark:text-gold-400" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm group-hover:text-gold-700 dark:group-hover:text-gold-300">{reg.name}</div>
                  <div className="text-xs text-gold-600 dark:text-gold-400">{reg.count}</div>
                </div>
                <div className="text-gold-400">→</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured / Quick links */}
        <div className="lg:col-span-1 border-l border-gold-100 dark:border-[#3D3630] pl-8">
          <div className="text-xs font-medium tracking-[2px] text-gold-600 dark:text-gold-400 mb-4">پیشنهاد ویژه</div>
          
          <Link to="/shop" onClick={() => setIsOpen(false)} className="block mb-4">
            <div className="card p-4 hover:shadow-md">
              <div className="flex gap-3">
                <div className="flex-1">
                  <div className="text-sm font-semibold">چای سیاه ممتاز گیلان</div>
                  <div className="text-xs text-gold-600 dark:text-gold-400 mt-0.5">۱۸۵٬۰۰۰ تومان</div>
                </div>
                <div className="text-gold-500 text-xs self-center">۴.۸ ★</div>
              </div>
            </div>
          </Link>
          
          <Link to="/shop?region=بوشهر" onClick={() => setIsOpen(false)} className="block">
            <div className="text-xs bg-gold-50 dark:bg-gold-950 px-3.5 py-3 rounded-2xl flex justify-between items-center">
              <span className="font-medium">مشاهده محصولات بوشهر</span>
              <span className="text-gold-500">→</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
