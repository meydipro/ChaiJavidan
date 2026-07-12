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
    <div className="fixed top-[84px] left-4 right-4 z-40 max-w-7xl mx-auto bg-white/90 dark:bg-[#1E2A22]/90 backdrop-blur-xl border border-gold-100 dark:border-[#2D3D32] shadow-xl rounded-2xl mega-menu">
      <div className="px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-9">
        
        {/* Categories */}
        <div>
          <div className="text-xs font-medium tracking-[2px] text-[#C9A84C] dark:text-[#C9A84C] mb-4">دسته‌بندی‌ها</div>
          <div className="space-y-1">
            {categories.map((cat, idx) => (
              <Link 
                key={idx}
                to={`/shop?category=${cat.slug}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 group px-2 py-3 hover:bg-[#FAF7F0] dark:hover:bg-[#141A16] rounded-2xl"
              >
                <div className="w-9 h-9 flex items-center justify-center bg-[#C9A84C]/15 dark:bg-[#C9A84C]/10 text-[#1B3A2B] dark:text-[#D4B85C] rounded-2xl icon-halo group-hover:bg-[#C9A84C]/25 dark:group-hover:bg-[#C9A84C]/15">
                  <cat.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-sm group-hover:text-[#8B6914] dark:group-hover:text-[#D4B85C]">{cat.name}</div>
                  <div className="text-xs text-[#C9A84C] dark:text-[#C9A84C]">{cat.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Regions */}
        <div>
          <div className="text-xs font-medium tracking-[2px] text-[#C9A84C] dark:text-[#C9A84C] mb-4">بر اساس استان</div>
          <div className="space-y-1">
            {regions.map((reg, idx) => (
              <Link 
                key={idx}
                to={`/shop?region=${reg.name}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 px-3 py-3.5 hover:bg-[#FAF7F0] dark:hover:bg-[#141A16] rounded-2xl group"
              >
                <div className="icon-halo w-9 h-9 rounded-2xl bg-gradient-to-br from-[#C9A84C]/20 to-[#C9A84C]/10 dark:from-[#C9A84C]/15 dark:to-[#C9A84C]/5 flex items-center justify-center">
                  <reg.icon className="w-4 h-4 text-[#1B3A2B] dark:text-[#D4B85C]" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm group-hover:text-[#8B6914] dark:group-hover:text-[#D4B85C]">{reg.name}</div>
                  <div className="text-xs text-[#C9A84C] dark:text-[#C9A84C]">{reg.count}</div>
                </div>
                <div className="text-[#C9A84C]">→</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured / Quick links */}
        <div className="md:col-span-2 border-t border-[#C9A84C]/20 dark:border-[#2D3D32] pt-6 mt-2">
          <div className="text-xs font-medium tracking-[2px] text-[#C9A84C] dark:text-[#C9A84C] mb-4">پیشنهاد ویژه</div>
          
          <Link to="/shop" onClick={() => setIsOpen(false)} className="block">
            <div className="text-xs bg-[#FAF7F0] dark:bg-[#141A16] px-4 py-3 rounded-2xl flex justify-between items-center hover:bg-[#F0EBE0] dark:hover:bg-[#1E2A22] transition-colors">
              <span className="font-medium">مشاهده همه محصولات</span>
              <span className="text-[#C9A84C]">→</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
