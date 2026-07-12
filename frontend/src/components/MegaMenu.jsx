import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Award, MapPin, Star } from 'lucide-react';

const MegaMenu = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  const categories = [
    { name: "چای سیاه", icon: Leaf, slug: "سیاه", desc: "قهوه‌ای تیره و عطری" },
    { name: "چای سبز", icon: Leaf, slug: "سبز", desc: "سبز و تازه" },
    { name: "چای طعم‌دار", icon: Award, slug: "طعم‌دار", desc: "ترکیبی لوکس" },
  ];

  const regions = [
    { name: "گیلان", count: "۵۴ محصول", icon: MapPin },
  ];

  return (
    <div className="fixed top-[84px] left-4 right-4 z-40 max-w-7xl mx-auto bg-white/90 dark:bg-[#2A2520]/90 backdrop-blur-xl border border-gold-100 dark:border-[#3D3630] shadow-xl rounded-2xl mega-menu">
      <div className="px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-9">
        
        {/* Categories */}
        <div>
          <div className="text-xs font-medium tracking-[2px] text-[#9a7a24] dark:text-[#c9a84c] mb-4">دسته‌بندی‌ها</div>
          <div className="space-y-1">
            {categories.map((cat, idx) => (
              <Link 
                key={idx}
                to={`/shop?category=${cat.slug}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 group px-2 py-3 hover:bg-[#f5efe4] dark:hover:bg-[#1a1814] rounded-2xl"
              >
                <div className="w-9 h-9 flex items-center justify-center bg-[#c9a84c]/15 dark:bg-[#c9a84c]/10 text-[#1a3a2a] dark:text-[#e8c84a] rounded-2xl icon-halo group-hover:bg-[#c9a84c]/25 dark:group-hover:bg-[#c9a84c]/15">
                  <cat.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-sm group-hover:text-[#5c4814] dark:group-hover:text-[#e8c84a]">{cat.name}</div>
                  <div className="text-xs text-[#9a7a24] dark:text-[#c9a84c]">{cat.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Regions */}
        <div>
          <div className="text-xs font-medium tracking-[2px] text-[#9a7a24] dark:text-[#c9a84c] mb-4">بر اساس استان</div>
          <div className="space-y-1">
            {regions.map((reg, idx) => (
              <Link 
                key={idx}
                to={`/shop?region=${reg.name}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 px-3 py-3.5 hover:bg-[#f5efe4] dark:hover:bg-[#1a1814] rounded-2xl group"
              >
                <div className="icon-halo w-9 h-9 rounded-2xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/10 dark:from-[#c9a84c]/15 dark:to-[#c9a84c]/5 flex items-center justify-center">
                  <reg.icon className="w-4 h-4 text-[#1a3a2a] dark:text-[#e8c84a]" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm group-hover:text-[#5c4814] dark:group-hover:text-[#e8c84a]">{reg.name}</div>
                  <div className="text-xs text-[#9a7a24] dark:text-[#c9a84c]">{reg.count}</div>
                </div>
                <div className="text-[#c9a84c]">→</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured / Quick links */}
        <div className="md:col-span-2 border-t border-[#c9a84c]/20 dark:border-[#3D3630] pt-6 mt-2">
          <div className="text-xs font-medium tracking-[2px] text-[#9a7a24] dark:text-[#c9a84c] mb-4">پیشنهاد ویژه</div>
          
          <Link to="/shop" onClick={() => setIsOpen(false)} className="block">
            <div className="text-xs bg-[#f5efe4] dark:bg-[#1a1814] px-4 py-3 rounded-2xl flex justify-between items-center hover:bg-[#e8dfd0] dark:hover:bg-[#2a2520] transition-colors">
              <span className="font-medium">مشاهده همه محصولات</span>
              <span className="text-[#c9a84c]">→</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
