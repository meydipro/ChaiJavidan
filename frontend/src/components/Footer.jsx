import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Send, Mail, Phone, Clock, ArrowUp, Leaf, Heart } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0E1610] dark:bg-[#0E1610] overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#C9A84C_0.3px,transparent_0.3px)] bg-[length:12px_12px] opacity-[0.04]"></div>

      {/* Top gold accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent"></div>

      {/* Main footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-16 pb-8">
        {/* Top section - Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center bg-white/5 border border-white/10">
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="لوگو" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-xl tracking-tight text-[#D4B85C] font-bold">چای جاویدان</span>
                <div className="text-[9px] text-[#C9A84C]/60 tracking-[4px] font-medium">CHAI JAVIDAN</div>
              </div>
            </div>
            <p className="text-[#C9A84C]/70 text-sm leading-relaxed max-w-sm mb-5">
              از سال ۱۳۷۵، با بیش از ۳۰ سال تجربه در تولید و عرضه چای ممتاز ایرانی، انتخاب نخست علاقه‌مندان به چای اصیل.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C9A84C]/60 hover:text-[#D4B85C] hover:bg-white/10 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C9A84C]/60 hover:text-[#D4B85C] hover:bg-white/10 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C9A84C]/60 hover:text-[#D4B85C] hover:bg-white/10 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:mr-auto">
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-3xl p-6 sm:p-7">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4B85C] to-[#8B6914] flex items-center justify-center shadow-lg shadow-[#D4B85C]/10">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#D4B85C]">خبرنامه</div>
                  <div className="text-[10px] text-[#C9A84C]/50">پیشنهادات ویژه</div>
                </div>
              </div>
              <p className="text-[#C9A84C]/60 text-sm mb-4 leading-relaxed">
                از آخرین محصولات، تخفیف‌ها و اخبار چای جاویدان مطلع شوید.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 py-3 px-4 bg-[#D4B85C]/10 rounded-2xl border border-[#D4B85C]/20">
                  <Heart className="w-4 h-4 text-[#D4B85C]" />
                  <span className="text-sm text-[#D4B85C]">متشکریم! عضویت شما تأیید شد.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ایمیل خود را وارد کنید"
                    className="flex-1 bg-white/5 border border-white/10 text-white/90 placeholder:text-white/25 px-4 py-3 text-sm rounded-2xl focus:outline-none focus:border-[#D4B85C]/40 focus:bg-white/[0.07] transition-all"
                    required
                  />
                  <button type="submit" className="px-5 py-3 bg-gradient-to-r from-[#D4B85C] to-[#8B6914] hover:from-[#C9A84C] hover:to-[#D4B85C] text-white text-sm font-bold rounded-2xl flex items-center gap-1.5 transition-all shadow-lg shadow-[#D4B85C]/10 hover:shadow-[#D4B85C]/20">
                    <Send className="w-3.5 h-3.5" />
                    عضویت
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 mb-12">
          {/* Quick Links */}
          <div>
            <div className="text-[11px] font-bold text-[#D4B85C] tracking-wider uppercase mb-4">لینک‌های سریع</div>
            <div className="space-y-2.5">
              {[
                { to: '/shop', label: 'فروشگاه' },
                { to: '/about', label: 'درباره ما' },
                { to: '/contact', label: 'تماس با ما' },
                { to: '/cart', label: 'سبد خرید' },
              ].map(link => (
                <Link key={link.to} to={link.to} className="block text-sm text-[#C9A84C]/50 hover:text-[#D4B85C] transition-colors duration-200">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="text-[11px] font-bold text-[#D4B85C] tracking-wider uppercase mb-4">دسته‌بندی‌ها</div>
            <div className="space-y-2.5">
              {[
                { to: '/shop?category=سیاه', label: 'چای سیاه' },
                { to: '/shop?category=سبز', label: 'چای سبز' },
                { to: '/shop?category=سفید', label: 'چای سفید' },
                { to: '/shop?category=طعم‌دار', label: 'چای طعم‌دار' },
              ].map(link => (
                <Link key={link.to} to={link.to} className="block text-sm text-[#C9A84C]/50 hover:text-[#D4B85C] transition-colors duration-200">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[11px] font-bold text-[#D4B85C] tracking-wider uppercase mb-4">تماس با ما</div>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#C9A84C]/40 mt-0.5 shrink-0" />
                <span className="text-sm text-[#C9A84C]/50" dir="ltr">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#C9A84C]/40 mt-0.5 shrink-0" />
                <span className="text-sm text-[#C9A84C]/50">info@chaijavidan.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#C9A84C]/40 mt-0.5 shrink-0" />
                <span className="text-sm text-[#C9A84C]/50">گیلان، ایران</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-3.5 h-3.5 text-[#C9A84C]/40 mt-0.5 shrink-0" />
                <span className="text-sm text-[#C9A84C]/50">۹ صبح - ۹ شب</span>
              </div>
            </div>
          </div>

          {/* Guarantee */}
          <div>
            <div className="text-[11px] font-bold text-[#D4B85C] tracking-wider uppercase mb-4">تضمین ما</div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Leaf className="w-3.5 h-3.5 text-[#D4B85C]/60 shrink-0" />
                <span className="text-sm text-[#C9A84C]/50">۱۰۰٪ طبیعی</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#D4B85C]/60 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                <span className="text-sm text-[#C9A84C]/50">ارسال سریع</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#D4B85C]/60 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                <span className="text-sm text-[#C9A84C]/50">تضمین کیفیت</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#D4B85C]/60 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <span className="text-sm text-[#C9A84C]/50">بازگشت ۷ روزه</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#C9A84C]/30 text-center sm:text-right">
            © ۱۴۰۵ چای جاویدان. تمامی حقوق محفوظ است.
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#C9A84C]/25">
            <span>ساخته شده با</span>
            <Heart className="w-3 h-3 text-[#D4B85C]/40 fill-[#D4B85C]/40" />
            <span>برای چای جاویدان</span>
          </div>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C9A84C]/40 hover:text-[#D4B85C] hover:bg-white/10 transition-all"
            aria-label="بازگشت به بالا"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
