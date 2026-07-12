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
    <div className="pt-20">
      {/* HERO - Parallax with floating leaves */}
      <div ref={heroRef} className="relative h-[92vh] flex items-center justify-center overflow-hidden bg-[#1a1814]">
        <div className="absolute inset-0 bg-[radial-gradient(#c9a84c_0.6px,transparent_1px)] bg-[length:6px_6px] opacity-20"></div>

        <motion.div className="absolute inset-0 will-change-transform" style={{ y: heroY, opacity: heroOpacity }}>
          <img src={content.heroImage} alt="چای جاویدان" className="w-full h-full object-cover" style={{ filter: 'brightness(0.6) saturate(1.1)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(26,24,20,0.5) 0%, rgba(26,24,20,0.3) 40%, rgba(26,24,20,0.7) 100%)' }}></div>
        </motion.div>

        {/* Floating tea leaves */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="float-particle absolute top-[15%] left-[10%] w-8 h-8 text-[#c9a84c]/40" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '0s' }}>
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
          </svg>
          <svg className="float-particle absolute top-[25%] right-[15%] w-6 h-6 text-[#e8c84a]/30" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '2s' }}>
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
          </svg>
          <svg className="float-particle absolute bottom-[30%] left-[20%] w-7 h-7 text-[#1a3a2a]/35" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '4s' }}>
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
          </svg>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.6 }} className="flex justify-center mb-4 sm:mb-6">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-white/80 to-[#f5efe4]/60 border border-[#c9a84c]/30 shadow-xl backdrop-blur-sm overflow-hidden">
              <img src="/logo.png" alt="چای جاویدان" className="w-full h-full object-contain p-2 relative z-10" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="flex justify-center mb-4 sm:mb-6">
            <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-xl px-5 sm:px-6 py-2 rounded-full border border-[#c9a84c]/40 shadow-lg">
              <div className="w-2 h-2 rounded-full bg-[#1a3a2a] animate-pulse-soft"></div>
              <span className="text-xs sm:text-sm font-semibold text-[#5c4814] tracking-wide">از سال ۱۳۷۵</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="text-white text-5xl sm:text-7xl md:text-[82px] leading-[0.92] font-semibold tracking-tighter" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)' }}>
            {content.heroTitle}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
            className="text-white/95 mt-4 sm:mt-5 text-lg sm:text-2xl tracking-tight max-w-md mx-auto" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
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
              <button className="btn-outline bg-white/95 text-[#5c4814] border-white/80 hover:bg-white text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-[17px] w-full sm:w-auto shadow-lg">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#c9a84c]/30 rounded-3xl overflow-hidden">
            {[
              { number: "29+", label: "نوع چای ممتاز" },
              { number: "85+", label: "سال تجربه" },
              { number: "41K", label: "مشتری خوشحال" },
              { number: "100%", label: "کیفیت تضمینی" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-[#2A2520] px-4 sm:px-8 py-5 sm:py-7 text-center">
                <div className="text-2xl sm:text-4xl font-semibold text-[#5c4814] dark:text-[#e8c84a] tracking-tighter">
                  <CountUp end={stat.number} duration={2} />
                </div>
                <div className="text-[10px] sm:text-xs tracking-widest text-[#9a7a24] dark:text-[#c9a84c] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* FEATURED PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-6">
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <div className="uppercase tracking-[3px] text-xs text-[#9a7a24] dark:text-[#c9a84c] font-medium">پیشنهاد ما</div>
            <h2 className="text-3xl sm:section-header text-[#5c4814] dark:text-[#e8c84a]">چای‌های برگزیده</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex items-center text-sm text-[#9a7a24] dark:text-[#c9a84c] hover:text-[#5c4814] dark:hover:text-[#e8c84a] gap-2 font-medium">
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

        <Link to="/shop" className="sm:hidden flex items-center justify-center text-sm text-[#9a7a24] dark:text-[#c9a84c] mt-6 font-medium gap-2">
          مشاهده همه محصولات <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* REGIONS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <ScrollReveal>
          <Link to="/shop?region=گیلان" className="group relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-auto md:h-[420px] block">
            <img src="https://picsum.photos/id/1016/1200/800" alt="گیلان" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition duration-700" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)' }}></div>
            <div className="absolute bottom-0 p-8 sm:p-12 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-[#e8c84a]" />
                <span className="uppercase tracking-widest text-xs sm:text-sm font-medium text-[#e8c84a]">چای ایرانی</span>
              </div>
              <div className="text-4xl sm:text-6xl font-semibold tracking-tighter mb-2">گیلان</div>
              <p className="text-white/90 text-sm sm:text-lg mt-2 max-w-lg">چای سیاه و سبز ممتاز از بهترین باغات استان گیلان</p>
              <div className="mt-4 sm:mt-6 inline-block text-xs sm:text-sm px-6 sm:px-8 py-2.5 border border-white/40 rounded-2xl group-hover:bg-white/10 transition-all">مشاهده محصولات گیلان</div>
            </div>
          </Link>
        </ScrollReveal>
      </div>

      {/* WHY US */}
      <div className="bg-white dark:bg-[#2A2520] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-10 sm:mb-12">
              <div className="text-[#9a7a24] dark:text-[#c9a84c] text-xs tracking-[4px]">چرا چای جاویدان؟</div>
              <h2 className="text-3xl sm:text-4xl tracking-tight mt-1.5 text-[#5c4814] dark:text-[#e8c84a]">تجربه‌ای متفاوت</h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Leaf, title: "برگ‌های برگزیده", desc: "دستی انتخاب‌شده از بهترین باغات" },
              { icon: Award, title: "کیفیت ممتاز", desc: "استانداردهای بین‌المللی" },
              { icon: Users, title: "ارتباط مستقیم", desc: "از کشاورزان تا فنجان شما" }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="bg-[#f5efe4] dark:bg-[#1A1814] p-6 sm:p-8 rounded-3xl border border-[#c9a84c]/20 dark:border-[#3D3630] h-full">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-[#2A2520] border border-[#c9a84c]/20 dark:border-[#3D3630] mb-5 sm:mb-6">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a3a2a]" />
                  </div>
                  <div className="text-lg sm:text-xl font-semibold tracking-tight text-[#5c4814] dark:text-[#e8c84a] mb-2">{item.title}</div>
                  <p className="text-xs sm:text-sm text-[#9a7a24] dark:text-[#c9a84c] leading-relaxed">{item.desc}</p>
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
