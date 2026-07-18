import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, Clock, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState({
    contactPhone: '۰۲۱-۱۲۳۴۵۶۷۸',
    contactEmail: 'info@chaijavidan.com',
    contactAddress: 'گیلان، لاهیجان، جاده چای',
  });

  useEffect(() => {
    axios.get(`${API}/content`).then(res => {
      if (res.data.contactPhone || res.data.contactEmail) {
        setContent(res.data);
      }
    }).catch(() => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setForm({ name: '', email: '', message: '' });
    }, 1200);
  };

  const contactInfo = [
    { icon: MapPin, title: "دفتر مرکزی", value: content.contactAddress, color: "from-[#1B3A2B] to-[#2D5E42]" },
    { icon: Phone, title: "تلفن تماس", value: content.contactPhone, color: "from-[#C9A84C] to-[#8B6914]", dir: "ltr" },
    { icon: Mail, title: "ایمیل", value: content.contactEmail, color: "from-[#D4B85C] to-[#C9A84C]", dir: "ltr" },
  ];

  return (
    <div className="pt-28 min-h-screen bg-[#FAF7F0] dark:bg-[#141A16]">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1B3A2B] via-[#141A16] to-[#1B3A2B] py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(#C9A84C_0.5px,transparent_1px)] bg-[length:8px_8px] opacity-10"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 mb-6">
              <MessageCircle className="w-4 h-4 text-[#D4B85C]" />
              <span className="text-xs text-white/80 tracking-wide">با ما در ارتباط باشید</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              با ما در تماس باشید
            </h1>
            <p className="text-white/60 text-sm sm:text-base max-w-md mx-auto">
              ما همیشه آماده شنیدن نظرات، پیشنهادات و سوالات شما هستیم
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-10 pb-20">
        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          {contactInfo.map((item, idx) => (
            <div key={idx} className="backdrop-blur-xl bg-white/70 dark:bg-[#1E2A22]/70 border border-white/40 dark:border-[#2D3D32]/40 rounded-2xl p-5 text-center hover:shadow-lg transition-all">
              <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 shadow-lg`}>
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div className="font-semibold text-[#8B6914] dark:text-[#D4B85C] text-sm mb-1">{item.title}</div>
              <div className="text-[#C9A84C] text-xs" dir={item.dir || 'rtl'}>{item.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-3 backdrop-blur-xl bg-white/70 dark:bg-[#1E2A22]/70 border border-white/40 dark:border-[#2D3D32]/40 rounded-3xl p-6 sm:p-8 shadow-[0_8px_40px_-12px_rgba(201,168,76,0.15)]"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#8B6914] dark:text-[#D4B85C] mb-2">نام کامل</label>
                    <input
                      type="text"
                      placeholder="نام خود را وارد کنید"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full bg-white/80 dark:bg-[#141A16]/80 border border-[#C9A84C]/20 dark:border-[#2D3D32]/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#8B6914] dark:text-[#D4B85C] mb-2">ایمیل</label>
                    <input
                      type="email"
                      placeholder="example@email.com"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full bg-white/80 dark:bg-[#141A16]/80 border border-[#C9A84C]/20 dark:border-[#2D3D32]/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
                      dir="ltr"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#8B6914] dark:text-[#D4B85C] mb-2">موضوع پیام</label>
                  <input
                    type="text"
                    placeholder="موضوع پیام خود را بنویسید"
                    className="w-full bg-white/80 dark:bg-[#141A16]/80 border border-[#C9A84C]/20 dark:border-[#2D3D32]/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#8B6914] dark:text-[#D4B85C] mb-2">متن پیام</label>
                  <textarea
                    rows="5"
                    placeholder="پیام خود را اینجا بنویسید..."
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full bg-white/80 dark:bg-[#141A16]/80 border border-[#C9A84C]/20 dark:border-[#2D3D32]/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20 transition-all resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#1B3A2B] to-[#2D5E42] hover:from-[#2D5E42] hover:to-[#1B3A2B] text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      ارسال پیام
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#1B3A2B] to-[#2D5E42] flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="font-bold text-xl text-[#8B6914] dark:text-[#D4B85C] mb-2">پیام شما ارسال شد!</div>
                <p className="text-sm text-[#C9A84C] mb-6">ما پیام شما را دریافت کردیم و به زودی با شما تماس خواهیم گرفت.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm font-medium text-[#1B3A2B] dark:text-[#D4B85C] hover:underline"
                >
                  ارسال پیام جدید
                </button>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Hours Card */}
            <div className="backdrop-blur-xl bg-white/70 dark:bg-[#1E2A22]/70 border border-white/40 dark:border-[#2D3D32]/40 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#8B6914] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="font-semibold text-[#8B6914] dark:text-[#D4B85C]">ساعات کاری</div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#C9A84C]">
                  <span>شنبه تا چهارشنبه</span>
                  <span className="font-medium" dir="ltr">8:00 - 17:00</span>
                </div>
                <div className="flex justify-between text-[#C9A84C]">
                  <span>پنجشنبه</span>
                  <span className="font-medium" dir="ltr">8:00 - 13:00</span>
                </div>
                <div className="flex justify-between text-[#C9A84C]">
                  <span>جمعه</span>
                  <span className="font-medium text-red-400">تعطیل</span>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="backdrop-blur-xl bg-white/70 dark:bg-[#1E2A22]/70 border border-white/40 dark:border-[#2D3D32]/40 rounded-3xl overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-[#1B3A2B] to-[#2D5E42]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin className="w-8 h-8 mx-auto mb-2 opacity-60" />
                    <p className="text-sm opacity-80">گیلان، لاهیجان</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-[#C9A84C] leading-relaxed">
                  ما در قلب طبیعت گیلان واقع شده‌ایم و با بهترین چای‌های ایرانی در خدمت شما هستیم.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
