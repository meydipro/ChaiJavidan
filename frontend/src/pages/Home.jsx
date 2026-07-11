import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Award, Leaf, Users, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/animations/ScrollReveal';
import axios from 'axios';

const API = 'http://localhost:5001/api';

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
    aboutText: "از سال ۱۳۷۵، چای جاویدان با عشق و دقت از بهترین مزارع گیلان و بوشهر، چای‌های ممتاز را به شما ارائه می‌دهد.",
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
          { id: 2, name: "چای سبز ارگانیک بوشهر", price: 165000, image: "https://picsum.photos/id/106/600/600", category: "سبز", region: "بوشهر", rating: 4.6, reviews: 89 }
        ]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pt-20">
      {/* HERO - Parallax with floating leaves */}
      <div ref={heroRef} className="relative h-[92vh] flex items-center justify-center overflow-hidden bg-cream dark:bg-[#2A2520]">
        <div className="absolute inset-0 bg-[radial-gradient(#C9A96E_0.6px,transparent_1px)] bg-[length:6px_6px] opacity-30"></div>

        <motion.div className="absolute inset-0" style={{ y: heroY, opacity: heroOpacity }}>
          <img src={content.heroImage} alt="چای جاویدان" className="w-full h-full object-cover opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2D2A24]/70 via-[#2D2A24]/50 to-[#2D2A24]/80 dark:from-[#1A1814]/70 dark:via-[#1A1814]/50 dark:to-[#1A1814]/80"></div>
        </motion.div>

        {/* Floating tea leaves */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="float-particle absolute top-[15%] left-[10%] w-8 h-8 text-gold-300/40" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '0s' }}>
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
          </svg>
          <svg className="float-particle absolute top-[25%] right-[15%] w-6 h-6 text-gold-400/30" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '2s' }}>
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
          </svg>
          <svg className="float-particle absolute bottom-[30%] left-[20%] w-7 h-7 text-gold-200/35" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '4s' }}>
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
          </svg>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="flex justify-center mb-4 sm:mb-6">
            <div className="flex items-center gap-2.5 bg-white/90 backdrop-blur-xl px-4 sm:px-5 py-1.5 rounded-full border border-gold-200">
              <div className="w-2 h-2 rounded-full bg-gold-600 animate-pulse-soft"></div>
              <span className="text-xs sm:text-sm font-medium text-gold-800">از سال ۱۳۷۵</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="text-white text-5xl sm:text-7xl md:text-[82px] leading-[0.92] font-semibold tracking-tighter">
            {content.heroTitle}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
            className="text-white/90 mt-3 sm:mt-4 text-lg sm:text-2xl tracking-tight max-w-md mx-auto">
            {content.heroSubtitle}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 sm:mt-10">
            <Link to="/shop">
              <button className="btn-gold text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-[17px] flex items-center gap-2 group w-full sm:w-auto justify-center">
                مشاهده فروشگاه
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </button>
            </Link>
            <Link to="/about">
              <button className="btn-outline bg-white/90 text-gold-800 border-white/80 hover:bg-white text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-[17px] w-full sm:w-auto">
                داستان ما
              </button>
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70 text-xs tracking-[3px]">
          اسکرول کنید <div className="w-px h-9 bg-white/40 mt-1"></div>
        </div>
      </div>

      {/* STATS - Count-up animation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gold-200 rounded-3xl overflow-hidden">
            {[
              { number: "29+", label: "نوع چای ممتاز" },
              { number: "85+", label: "سال تجربه" },
              { number: "41K", label: "مشتری خوشحال" },
              { number: "2", label: "استان" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-[#2A2520] px-4 sm:px-8 py-5 sm:py-7 text-center">
                <div className="text-2xl sm:text-4xl font-semibold text-gold-800 dark:text-gold-300 tracking-tighter">
                  <CountUp end={stat.number} duration={2} />
                </div>
                <div className="text-[10px] sm:text-xs tracking-widest text-gold-600 dark:text-gold-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* FEATURED PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-6">
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <div className="uppercase tracking-[3px] text-xs text-gold-600 dark:text-gold-400 font-medium">پیشنهاد ما</div>
            <h2 className="text-3xl sm:section-header text-gold-900 dark:text-gold-300">چای‌های برگزیده</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center text-sm text-gold-700 dark:text-gold-400 hover:text-gold-900 dark:hover:text-gold-300 gap-2 font-medium">
            مشاهده همه <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <Link to="/shop" className="sm:hidden flex items-center justify-center text-sm text-gold-700 dark:text-gold-400 mt-6 font-medium gap-2">
          مشاهده همه محصولات <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* REGIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <ScrollReveal direction="right">
            <Link to="/shop?region=گیلان" className="group relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-auto md:h-[420px] block">
              <img src="https://picsum.photos/id/1016/1200/800" alt="گیلان" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40"></div>
              <div className="absolute bottom-0 p-5 sm:p-8 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-gold-300" />
                  <span className="uppercase tracking-widest text-[10px] sm:text-xs font-medium text-gold-300">استان</span>
                </div>
                <div className="text-3xl sm:text-5xl font-semibold tracking-tighter">گیلان</div>
                <p className="text-gold-200 text-xs sm:text-sm mt-2 max-w-xs">چای سیاه ممتاز • عطر و طعم بی‌نظیر</p>
                <div className="mt-3 sm:mt-4 inline-block text-[10px] sm:text-xs px-4 sm:px-5 py-1.5 border border-white/40 rounded-2xl group-hover:bg-white/10">مشاهده محصولات گیلان</div>
              </div>
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="left">
            <Link to="/shop?region=بوشهر" className="group relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-auto md:h-[420px] block">
              <img src="https://picsum.photos/id/160/1200/800" alt="بوشهر" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40"></div>
              <div className="absolute bottom-0 p-5 sm:p-8 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-gold-300" />
                  <span className="uppercase tracking-widest text-[10px] sm:text-xs font-medium text-gold-300">استان</span>
                </div>
                <div className="text-3xl sm:text-5xl font-semibold tracking-tighter">بوشهر</div>
                <p className="text-gold-200 text-xs sm:text-sm mt-2 max-w-xs">چای سبز و سفید ارگانیک</p>
                <div className="mt-3 sm:mt-4 inline-block text-[10px] sm:text-xs px-4 sm:px-5 py-1.5 border border-white/40 rounded-2xl group-hover:bg-white/10">مشاهده محصولات بوشهر</div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </div>

      {/* WHY US */}
      <div className="bg-white dark:bg-[#2A2520] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-10 sm:mb-12">
              <div className="text-gold-600 dark:text-gold-400 text-xs tracking-[4px]">چرا چای جاویدان؟</div>
              <h2 className="text-3xl sm:text-4xl tracking-tight mt-1.5 text-gold-900 dark:text-gold-300">تجربه‌ای متفاوت</h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Leaf, title: "برگ‌های برگزیده", desc: "دستی انتخاب‌شده از بهترین باغات" },
              { icon: Award, title: "کیفیت ممتاز", desc: "استانداردهای بین‌المللی" },
              { icon: Users, title: "ارتباط مستقیم", desc: "از کشاورزان تا فنجان شما" }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="bg-cream dark:bg-[#1A1814] p-6 sm:p-8 rounded-3xl border border-gold-100 dark:border-[#3D3630] h-full">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-[#2A2520] border border-gold-100 dark:border-[#3D3630] mb-5 sm:mb-6">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold-700" />
                  </div>
                  <div className="text-lg sm:text-xl font-semibold tracking-tight text-gold-900 dark:text-gold-300 mb-2">{item.title}</div>
                  <p className="text-xs sm:text-sm text-gold-600 dark:text-gold-400 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
