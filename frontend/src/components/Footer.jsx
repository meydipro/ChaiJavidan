import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Send, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cream-dark dark:bg-[#2A2520] pt-14 pb-8 border-t border-gold-200/60 dark:border-[#3D3630]/60">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-y-10">

        {/* Brand */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-white/80 to-[#f5efe4]/60 dark:from-white/10 dark:to-[#f5efe4]/10 border border-[#c9a84c]/30 dark:border-[#3D3630]/50 shadow-sm overflow-hidden">
              <img src="/logo.png" alt="لوگو" className="w-full h-full object-contain p-1 relative z-10" />
            </div>
            <div>
              <span className="text-lg tracking-tight text-[#5c4814] dark:text-[#e8c84a] font-bold">چای جاویدان</span>
              <div className="text-[8px] text-[#9a7a24] dark:text-[#c9a84c] tracking-[3px] font-medium">CHAI JAVIDAN</div>
            </div>
          </div>
          <p className="text-[#9a7a24] dark:text-[#c9a84c] max-w-xs text-sm leading-relaxed">
            از سال ۱۳۷۵، انتخاب نخست علاقه‌مندان به چای ممتاز ایرانی
          </p>
          <div className="flex items-center gap-2 mt-4 text-sm text-[#9a7a24] dark:text-[#c9a84c]">
            <MapPin className="w-4 h-4" />
            <span>گیلان، ایران</span>
          </div>
        </div>

        {/* Links */}
        <div className="md:col-span-3 grid grid-cols-2 gap-y-8 text-sm">
          <div>
            <div className="font-medium mb-3 text-[#5c4814] dark:text-[#e8c84a]">لینک‌های سریع</div>
            <div className="space-y-2.5 text-[#9a7a24] dark:text-[#c9a84c]">
              <Link to="/shop" className="block hover:text-[#5c4814] transition-colors">فروشگاه</Link>
              <Link to="/about" className="block hover:text-[#5c4814] transition-colors">درباره ما</Link>
              <Link to="/contact" className="block hover:text-[#5c4814] transition-colors">تماس با ما</Link>
            </div>
          </div>
          <div>
            <div className="font-medium mb-3 text-[#5c4814] dark:text-[#e8c84a]">دسته‌ها</div>
            <div className="space-y-2.5 text-[#9a7a24] dark:text-[#c9a84c]">
              <Link to="/shop?category=سیاه" className="block hover:text-[#5c4814] transition-colors">چای سیاه</Link>
              <Link to="/shop?category=سبز" className="block hover:text-[#5c4814] transition-colors">چای سبز</Link>
              <Link to="/shop?category=طعم‌دار" className="block hover:text-[#5c4814] transition-colors">چای طعم‌دار</Link>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-5">
          <div className="newsletter-box p-6">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#e8c84a] to-[#1a3a2a] flex items-center justify-center shadow-sm">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div className="font-medium text-[#5c4814] dark:text-[#e8c84a]">خبرنامه</div>
            </div>
            <p className="text-[#9a7a24] dark:text-[#c9a84c] text-sm mb-4 leading-relaxed">از آخرین محصولات و پیشنهادات ویژه مطلع شوید.</p>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 bg-white/70 dark:bg-[#2A2520]/70 border border-[#c9a84c]/30 dark:border-[#3D3630]/50 focus:border-[#c9a84c] focus:bg-white dark:focus:bg-[#2A2520] px-4 py-2.5 text-sm rounded-xl focus:outline-none placeholder:text-[#9a7a24]/60 dark:text-[#F0EBE0]"
              />
              <button className="px-5 bg-gradient-to-r from-[#e8c84a] to-[#1a3a2a] hover:from-[#c9a84c] hover:to-[#122a1e] text-white text-sm font-medium rounded-xl flex items-center gap-1.5 transition-all shadow-sm hover:shadow-md">
                <Send className="w-3.5 h-3.5" />
                ثبت
              </button>
            </div>
            <div className="text-[10px] text-[#9a7a24]/70 dark:text-[#c9a84c]/70 mt-2.5">با عضویت در خبرنامه، از تخفیف‌های ویژه بهره‌مند شوید.</div>
          </div>
        </div>
      </div>

      <div className="border-t border-gold-200/50 dark:border-[#3D3630]/50 mt-12 pt-6 text-xs text-center text-gold-500 dark:text-gold-400 max-w-7xl mx-auto px-6">
        © ۱۴۰۵ چای جاویدان. همه حقوق محفوظ است.
        <span className="mx-2">•</span>
        کیفیت که ماندگار است.
      </div>
    </footer>
  );
};

export default Footer;
