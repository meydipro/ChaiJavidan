import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Award, Leaf, Users, Star, Heart, Truck, ShieldCheck, Quote } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/animations/ScrollReveal';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const numeric = parseInt(end.replace(/[^0-9]/g, ''));
    if (isNaN(numeric)) return;
    let start = 0;
    const increment = numeric / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numeric) { setCount(numeric); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{end.includes('+') ? '+' : end.includes('K') ? 'K' : ''}</span>;
};

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const [content, setContent] = useState({
    heroTitle: "چای جاویدان",
    heroSubtitle: "طعم اصیل ایرانی در هر فنجان",
    aboutText: "از سال ۱۳۷۵، چای جاویدان با عشق و دقت از بهترین مزارع گیلان، چای‌های ممتاز را به شما ارائه می‌دهد.",
    heroImage: "https://picsum.photos/id/1018/2000/1200"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, contentRes] = await Promise.all([
          axios.get(`${API}/products`),
          axios.get(`${API}/content`)
        ]);
        setFeaturedProducts(prodRes.data.filter(p => p.featured).slice(0, 4));
        setContent(contentRes.data);
      } catch (e) {
        setFeaturedProducts([
          { id: 1, name: "چای سیاه ممتاز گیلان", price: 185000, originalPrice: 210000, image: "https://picsum.photos/id/1015/600/600", category: "سیاه", region: "گیلان", rating: 4.8, reviews: 124 },
          { id: 2, name: "چای سبز ارگانیک گیلان", price: 165000, image: "https://picsum.photos/id/106/600/600", category: "سبز", region: "گیلان", rating: 4.6, reviews: 89 },
          { id: 3, name: "چای دارچین و هل گیلان", price: 205000, originalPrice: 240000, image: "https://picsum.photos/id/312/600/600", category: "طعم‌دار", region: "گیلان", rating: 4.9, reviews: 156 },
          { id: 4, name: "چای سبز لاهیجان", price: 195000, image: "https://picsum.photos/id/201/600/600", category: "سبز", region: "گیلان", rating: 4.7, reviews: 98 }
        ]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pt-20 overflow-x-hidden">
      {/* HERO - Parallax with floating leaves */}
      <div ref={heroRef} className="relative h-[100vh] min-h-[600px] max-h-[900px] flex items-center justify-center overflow-hidden bg-[#141A16]">
        <div className="absolute inset-0 bg-[radial-gradient(#C9A84C_0.6px,transparent_1px)] bg-[length:6px_6px] opacity-20"></div>

        <motion.div className="absolute inset-0 will-change-transform" style={{ y: heroY, opacity: heroOpacity }}>
          <img src={content.heroImage} alt="چای جاویدان" className="w-full h-full object-cover" style={{ filter: 'brightness(0.55) saturate(1.15)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(20,26,22,0.6) 0%, rgba(20,26,22,0.2) 35%, rgba(20,26,22,0.3) 65%, rgba(20,26,22,0.8) 100%)' }}></div>
        </motion.div>

        {/* Floating tea leaves */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="float-particle absolute top-[15%] left-[10%] w-8 h-8 text-[#C9A84C]/40" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '0s' }}>
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
          </svg>
          <svg className="float-particle absolute top-[25%] right-[15%] w-6 h-6 text-[#D4B85C]/30" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '2s' }}>
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
          </svg>
          <svg className="float-particle absolute bottom-[30%] left-[20%] w-7 h-7 text-[#1B3A2B]/35" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '4s' }}>
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
          </svg>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 flex flex-col items-center text-center">
          {/* Logo with glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="relative mb-5 sm:mb-6"
          >
            <div className="absolute inset-0 blur-3xl bg-[#C9A84C]/20 rounded-full scale-[2.5]"></div>
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="چای جاویدان"
              className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain drop-shadow-[0_8px_30px_rgba(201,168,76,0.4)]"
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-2.5 bg-white/10 backdrop-blur-xl px-5 py-2 rounded-full border border-white/15 shadow-lg mb-6 sm:mb-7"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4B85C] animate-pulse"></div>
            <span className="text-[10px] sm:text-[11px] font-bold text-white/80 tracking-[5px] uppercase">از سال ۱۳۷۵</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="text-white text-[42px] sm:text-6xl md:text-[82px] leading-[1.05] font-bold tracking-tight"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.5), 0 1px 6px rgba(0,0,0,0.3)' }}
          >
            {content.heroTitle}
          </motion.h1>

          {/* Decorative divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4B85C]/70 to-transparent my-5 sm:my-6"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-white/80 text-base sm:text-lg md:text-xl tracking-tight max-w-lg leading-relaxed"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
          >
            {content.heroSubtitle}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-8 sm:mt-10"
          >
            <Link to="/shop" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#D4B85C] to-[#C9A84C] text-[#1B3A2B] font-bold text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2.5 group hover:from-[#C9A84C] hover:to-[#8B6914] transition-all shadow-lg hover:shadow-xl">
                مشاهده فروشگاه
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 font-medium text-sm sm:text-base rounded-2xl transition-all">
                داستان ما
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        >
          <span className="text-[9px] text-white/40 tracking-[6px] uppercase font-semibold">اسکرول</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#D4B85C]/50 via-[#D4B85C]/20 to-transparent animate-pulse"></div>
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#FAF7F0] dark:from-[#141A16] via-[#FAF7F0]/50 dark:via-[#141A16]/50 to-transparent pointer-events-none z-[5]"></div>
      </div>

      {/* STATS - Liquid Glass */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <ScrollReveal>
          <div className="backdrop-blur-2xl bg-white/50 dark:bg-[#1E2A22]/50 border border-white/40 dark:border-[#2D3D32]/40 rounded-3xl shadow-[0_8px_40px_-12px_rgba(201,168,76,0.15)] overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-y md:divide-y-0 divide-[#C9A84C]/10 dark:divide-[#2D3D32]/40">
              {[
                { number: "29+", label: "نوع چای ممتاز" },
                { number: "30+", label: "سال تجربه" },
                { number: "41K", label: "مشتری خوشحال" },
                { number: "100%", label: "کیفیت تضمینی" }
              ].map((stat, idx) => (
                <div key={idx} className="px-4 sm:px-6 py-5 sm:py-7 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-[#8B6914] dark:text-[#D4B85C] tracking-tight">
                    <CountUp end={stat.number} duration={2} />
                  </div>
                  <div className="text-[10px] sm:text-xs tracking-widest text-[#C9A84C] mt-1.5 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* FEATURED PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-6">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-8 sm:mb-10">
            <div>
              <div className="uppercase tracking-[4px] text-[10px] sm:text-xs text-[#C9A84C] font-bold mb-2">پیشنهاد ما</div>
              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#8B6914] dark:text-[#D4B85C]">چای‌های برگزیده</h2>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-2 text-sm text-[#C9A84C] hover:text-[#8B6914] font-medium group">
              مشاهده همه
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <Link to="/shop" className="sm:hidden flex items-center justify-center text-sm text-[#C9A84C] mt-8 font-medium gap-2">
          مشاهده همه محصولات <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* STORY SECTION - Liquid Glass */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <ScrollReveal>
          <div className="relative rounded-[2rem] overflow-hidden">
            <img src="https://picsum.photos/id/1016/1400/600" alt="داستان ما" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1B3A2B]/90 via-[#1B3A2B]/70 to-transparent"></div>
            <div className="relative z-10 p-5 sm:p-10 md:p-16 flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-16">
              <div className="flex-1 text-white">
                <div className="uppercase tracking-[4px] text-[10px] text-[#D4B85C] font-bold mb-3">داستان ما</div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight">از باغ تا فنجان</h2>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-lg mb-6">
                  {content.aboutText}
                </p>
                <Link to="/about" className="inline-flex items-center gap-2 text-sm font-medium text-[#D4B85C] hover:text-white transition-colors group">
                  خواندن داستان کامل
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
              <div className="hidden md:block w-px h-48 bg-white/15"></div>
              <div className="flex flex-col gap-4 text-center md:text-right">
                <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-2xl px-6 py-4">
                  <div className="text-2xl font-bold text-[#D4B85C]">۱۳۷۵</div>
                  <div className="text-[10px] text-white/60 tracking-widest mt-1">سال تأسیس</div>
                </div>
                <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-2xl px-6 py-4">
                  <div className="text-2xl font-bold text-[#D4B85C]">گیلان</div>
                  <div className="text-[10px] text-white/60 tracking-widest mt-1">مرکز تولید</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* WHY US - Liquid Glass Cards */}
      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-10 sm:mb-14">
              <div className="text-[#C9A84C] text-[10px] sm:text-xs tracking-[5px] font-bold mb-2">چرا چای جاویدان؟</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#8B6914] dark:text-[#D4B85C]">تجربه‌ای متفاوت</h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              { icon: Leaf, title: "برگ‌های برگزیده", desc: "دستی انتخاب‌شده از بهترین باغات گیلان" },
              { icon: ShieldCheck, title: "کیفیت ممتاز", desc: "استانداردهای بین‌المللی و آزمایشگاه مجهز" },
              { icon: Truck, title: "ارسال سریع", desc: "ارسال به سراسر کشور در کمتر از ۳ روز" },
              { icon: Heart, title: "رضایت مشتری", desc: "بیش از ۴۱ هزار مشتری راضی و وفادار" }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="backdrop-blur-xl bg-white/50 dark:bg-[#1E2A22]/50 border border-white/40 dark:border-[#2D3D32]/40 p-5 sm:p-7 rounded-3xl shadow-[0_4px_24px_-8px_rgba(201,168,76,0.1)] h-full hover:shadow-[0_8px_32px_-8px_rgba(201,168,76,0.2)] transition-shadow">
                  <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#1B3A2B]/10 to-[#C9A84C]/10 border border-[#C9A84C]/15 mb-5">
                    <item.icon className="w-5 h-5 text-[#1B3A2B] dark:text-[#D4B85C]" />
                  </div>
                  <div className="text-base sm:text-lg font-bold tracking-tight text-[#8B6914] dark:text-[#D4B85C] mb-1.5">{item.title}</div>
                  <p className="text-xs sm:text-sm text-[#C9A84C] leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS - Liquid Glass */}
      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-10 sm:mb-14">
              <div className="text-[#C9A84C] text-[10px] sm:text-xs tracking-[5px] font-bold mb-2">نظرات مشتریان</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#8B6914] dark:text-[#D4B85C]">چه می‌گویند؟</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
            {[
              { name: "سارا محمدی", role: "خریدار دائمی", text: "بهترین چایی که تا حالا خوردم. عطر و طعمش واقعاً بی‌نظیره و هر بار با خریدم راضی‌تر می‌شم.", rating: 5 },
              { name: "رضا کریمی", role: "قهوه‌خانه‌دار", text: "مشتریام عاشق چای جاویدان شدن. کیفیتش همیشه یکدست و عالیه. بهترین انتخاب برای کسب‌وکارم بود.", rating: 5 },
              { name: "مریم احمدی", role: "علاقه‌مند به چای", text: "بسته‌بندی شیک، ارسال سریع و مهم‌تر از همه طعم اصیل چای ایرانی. قطعاً بازم خرید می‌کنم.", rating: 5 }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div className="backdrop-blur-xl bg-white/50 dark:bg-[#1E2A22]/50 border border-white/40 dark:border-[#2D3D32]/40 p-5 sm:p-7 rounded-3xl shadow-[0_4px_24px_-8px_rgba(201,168,76,0.1)] h-full flex flex-col">
                  <Quote className="w-8 h-8 text-[#C9A84C]/30 mb-3" />
                  <p className="text-sm sm:text-[15px] text-[#8B6914] dark:text-[#D4B85C]/90 leading-relaxed flex-1 mb-5">{item.text}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(item.rating)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-[#D4B85C] text-[#D4B85C]" />
                    ))}
                  </div>
                  <div className="border-t border-[#C9A84C]/10 dark:border-[#2D3D32]/40 pt-4">
                    <div className="text-sm font-bold text-[#8B6914] dark:text-[#D4B85C]">{item.name}</div>
                    <div className="text-[10px] text-[#C9A84C] tracking-wider mt-0.5">{item.role}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* CTA - Liquid Glass */}
      <div className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="relative rounded-[2rem] overflow-hidden">
              <img src="https://picsum.photos/id/1018/1200/500" alt="CTA" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#1B3A2B]/80"></div>
              <div className="relative z-10 backdrop-blur-sm bg-white/5 border border-white/10 rounded-[2rem] p-6 sm:p-10 md:p-16 text-center">
                <div className="uppercase tracking-[4px] text-[10px] text-[#D4B85C] font-bold mb-3">پیشنهاد ویژه</div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">اولین خریدتان با تخفیف ویژه</h2>
                <p className="text-white/70 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
                  همین حالا عضو خبرنامه شوید و ۱۵٪ تخفیف اولین خریدتان را دریافت کنید.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input type="email" placeholder="ایمیل خود را وارد کنید" className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-5 py-3 rounded-2xl text-sm focus:outline-none focus:border-[#D4B85C]/50" />
                  <button className="px-6 py-3 bg-gradient-to-r from-[#D4B85C] to-[#C9A84C] text-[#1B3A2B] font-bold text-sm rounded-2xl hover:from-[#C9A84C] hover:to-[#8B6914] transition-all shadow-lg hover:shadow-xl whitespace-nowrap">
                    عضویت
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Home;
