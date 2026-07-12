import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import axios from 'axios';

const API = 'http://localhost:5001/api';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
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
    setTimeout(() => {
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    }, 550);
  };

  return (
    <div className="pt-20 max-w-5xl mx-auto px-6 pb-20">
      <div className="py-12 text-center">
        <div className="text-gold-600 dark:text-gold-400 text-xs tracking-[3.5px]">ارتباط با ما</div>
        <h1 className="section-header">با ما در تماس باشید</h1>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Contact Info */}
        <div className="md:col-span-2">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 text-gold-700 dark:text-gold-400">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">دفتر مرکزی</span>
              </div>
              <p className="text-sm text-gold-700 dark:text-gold-400 mt-2 pl-8">{content.contactAddress}</p>
            </div>
            <div>
              <div className="flex items-center gap-3 text-gold-700 dark:text-gold-400">
                <Phone className="w-5 h-5" />
                <span className="font-medium">تلفن</span>
              </div>
              <p className="text-sm text-gold-700 dark:text-gold-400 mt-1 pl-8" dir="ltr">{content.contactPhone}</p>
            </div>
            <div>
              <div className="flex items-center gap-3 text-gold-700 dark:text-gold-400">
                <Mail className="w-5 h-5" />
                <span className="font-medium">ایمیل</span>
              </div>
              <p className="text-sm text-gold-700 dark:text-gold-400 mt-1 pl-8" dir="ltr">{content.contactEmail}</p>
            </div>
          </div>

          <div className="mt-10 text-xs leading-relaxed text-gold-500 dark:text-gold-400">
            ساعات پاسخگویی: شنبه تا چهارشنبه ۸ تا ۱۷
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-3 bg-white dark:bg-[#1E2A22] p-6 sm:p-8 rounded-3xl border border-gold-100 dark:border-[#2D3D32]">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text" placeholder="نام شما"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full" required
                />
              </div>
              <div>
                <input
                  type="email" placeholder="ایمیل"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full" required
                />
              </div>
              <div>
                <textarea
                  rows="5" placeholder="پیام شما"
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  className="w-full" required
                />
              </div>
              <button type="submit" className="btn-gold w-full mt-2">ارسال پیام</button>
            </form>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">✓</div>
              <div className="font-medium text-xl">پیام شما دریافت شد</div>
              <p className="text-sm text-gold-600 dark:text-gold-400 mt-2">به زودی با شما تماس خواهیم گرفت.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
