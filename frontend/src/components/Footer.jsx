import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Send, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cream-dark dark:bg-[#1E2A22] pt-14 pb-8 border-t border-gold-200/60 dark:border-[#2D3D32]/60">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-y-10">

        {/* Brand */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.png" alt="لوگو" className="w-9 h-9 rounded-lg object-cover" />
            <div>
              <span className="text-lg tracking-tight text-[#8B6914] dark:text-[#D4B85C] font-bold">چای جاویدان</span>
              <div className="text-[8px] text-[#C9A84C] dark:text-[#D4B85C] tracking-[3px] font-medium">CHAI JAVIDAN</div>
            </div>
          </div>
          <p className="text-[#C9A84C] dark:text-[#C9A84C] max-w-xs text-sm leading-relaxed">
            از سال ۱۳۷۵، انتخاب نخست علاقه‌مندان به چای ممتاز ایرانی
          </p>
          <div className="flex items-center gap-2 mt-4 text-sm text-[#C9A84C] dark:text-[#C9A84C]">
            <MapPin className="w-4 h-4" />
            <span>گیلان، ایران</span>
          </div>
        </div>

        {/* Links */}
        <div className="md:col-span-3 grid grid-cols-2 gap-y-8 text-sm">
          <div>
            <div className="font-medium mb-3 text-[#8B6914] dark:text-[#D4B85C]">لینک‌های سریع</div>
            <div className="space-y-2.5 text-[#C9A84C] dark:text-[#C9A84C]">
              <Link to="/shop" className="block hover:text-[#8B6914] transition-colors">فروشگاه</Link>
              <Link to="/about" className="block hover:text-[#8B6914] transition-colors">درباره ما</Link>
              <Link to="/contact" className="block hover:text-[#8B6914] transition-colors">تماس با ما</Link>
            </div>
          </div>
          <div>
            <div className="font-medium mb-3 text-[#8B6914] dark:text-[#D4B85C]">دسته‌ها</div>
            <div className="space-y-2.5 text-[#C9A84C] dark:text-[#C9A84C]">
              <Link to="/shop?category=سیاه" className="block hover:text-[#8B6914] transition-colors">چای سیاه</Link>
              <Link to="/shop?category=سبز" className="block hover:text-[#8B6914] transition-colors">چای سبز</Link>
              <Link to="/shop?category=طعم‌دار" className="block hover:text-[#8B6914] transition-colors">چای طعم‌دار</Link>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-5">
          <div className="newsletter-box p-6">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D4B85C] to-[#1B3A2B] flex items-center justify-center shadow-sm">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div className="font-medium text-[#8B6914] dark:text-[#D4B85C]">خبرنامه</div>
            </div>
            <p className="text-[#C9A84C] dark:text-[#C9A84C] text-sm mb-4 leading-relaxed">از آخرین محصولات و پیشنهادات ویژه مطلع شوید.</p>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="flex-1 bg-white/70 dark:bg-[#1E2A22]/70 border border-[#C9A84C]/30 dark:border-[#2D3D32]/50 focus:border-[#C9A84C] focus:bg-white dark:focus:bg-[#1E2A22] px-4 py-2.5 text-sm rounded-xl focus:outline-none placeholder:text-[#C9A84C]/60 dark:text-[#F0EBE0]"
              />
              <button className="px-5 bg-gradient-to-r from-[#D4B85C] to-[#1B3A2B] hover:from-[#C9A84C] hover:to-[#0A1A12] text-white text-sm font-medium rounded-xl flex items-center gap-1.5 transition-all shadow-sm hover:shadow-md">
                <Send className="w-3.5 h-3.5" />
                ثبت
              </button>
            </div>
            <div className="text-[10px] text-[#C9A84C]/70 dark:text-[#C9A84C]/70 mt-2.5">با عضویت در خبرنامه، از تخفیف‌های ویژه بهره‌مند شوید.</div>
          </div>
        </div>
      </div>

      <div className="border-t border-gold-200/50 dark:border-[#2D3D32]/50 mt-12 pt-6 text-xs text-center text-gold-500 dark:text-gold-400 max-w-7xl mx-auto px-6">
        © ۱۴۰۵ چای جاویدان. همه حقوق محفوظ است.
        <span className="mx-2">•</span>
        کیفیت که ماندگار است.
      </div>
    </footer>
  );
};

export default Footer;
