import React, { useState, useEffect } from 'react';
import { Leaf, Award, MapPin, Users } from 'lucide-react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const About = () => {
  const [content, setContent] = useState({
    aboutTitle: 'داستان چای جاویدان',
    aboutText: 'چای جاویدان در سال ۱۳۷۵ در دل مزارع سرسبز گیلان متولد شد. خانواده ما سه نسل است که با احترام به زمین و طبیعت، چای اصیل ایرانی را تولید و عرضه می‌کنند.',
    aboutImage: '',
  });

  useEffect(() => {
    axios.get(`${API}/content`).then(res => {
      if (res.data.aboutTitle || res.data.aboutText) {
        setContent(res.data);
      }
    }).catch(() => {});
  }, []);

  return (
    <div className="pt-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-9">
          <div className="inline text-xs tracking-[3.5px] bg-gold-100 dark:bg-gold-950 text-gold-700 dark:text-gold-400 px-4 py-1 rounded-full">از ۱۳۷۵</div>
          <h1 className="section-header mt-4">{content.aboutTitle}</h1>
        </div>

        <div className="prose prose-gold max-w-none text-[15.2px] text-gold-700 leading-relaxed">
          <p className="text-xl text-gold-800 dark:text-gold-300">
            {content.aboutText}
          </p>

          {content.aboutImage && (
            <div className="my-10">
              <img src={content.aboutImage} alt={content.aboutTitle} className="w-full h-64 md:h-80 object-cover rounded-3xl" />
            </div>
          )}

          <div className="my-12 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="card p-7">
              <Leaf className="mb-4 text-gold-700 dark:text-gold-400 w-7 h-7" />
              <div className="font-medium mb-1 text-gold-800 dark:text-gold-300">ریشه‌های عمیق</div>
              <div>ما هر سال بیش از ۷۵۰۰ هکتار باغ چای را با عشق و دقت مدیریت می‌کنیم.</div>
            </div>
            <div className="card p-7">
              <Award className="mb-4 text-gold-700 dark:text-gold-400 w-7 h-7" />
              <div className="font-medium mb-1 text-gold-800 dark:text-gold-300">کیفیت بدون مصالحه</div>
              <div>هر فنجان، نتیجه‌ی انتخاب دقیق‌ترین برگ‌ها و فرآیند سنتی است.</div>
            </div>
          </div>

          <p>
            امروز ما مفتخریم که چای‌هایمان نه تنها در ایران، بلکه در بیش از ۱۲ کشور جهان در دسترس علاقه‌مندان به چای است. مأموریت ما همچنان همان است: ارائه بهترین چای ممکن به شما.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { icon: MapPin, title: "گیلان", desc: "قلب چای ایران" },
            { icon: Award, title: "کیفیت", desc: "استاندارد بین‌المللی" },
            { icon: Users, title: "تیم ما", desc: "بیش از ۸۰ نفر متخصص" }
          ].map((item, i) => (
            <div key={i} className="p-8 border border-gold-100 dark:border-[#2D3D32] bg-white dark:bg-[#1E2A22] rounded-3xl">
              <div className="w-10 h-10 bg-gold-100 dark:bg-gold-950 text-gold-700 dark:text-gold-400 flex items-center justify-center rounded-2xl mb-7">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="font-semibold text-2xl dark:text-[#F0EBE0]">{item.title}</div>
              <p className="text-sm text-gold-700 dark:text-gold-400 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
