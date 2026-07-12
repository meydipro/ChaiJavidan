import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, User, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Captcha from '../components/Captcha';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [form, setForm] = useState({ identifier: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValid) return toast.error('لطفاً ابتدا کد امنیتی را وارد کنید');

    setLoading(true);
    try {
      await login(form.identifier, form.password);
      toast.success('ورود موفقیت‌آمیز بود!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'خطا در ورود');
    }
    setLoading(false);
  };

  return (
    <div className="pt-28 min-h-screen flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline text-xs tracking-[3.5px] bg-gold-100 dark:bg-gold-950 text-gold-700 dark:text-gold-400 px-4 py-1 rounded-full">حساب کاربری</div>
          <h1 className="text-3xl font-amiri mt-3 text-gold-900 dark:text-gold-300 font-bold">ورود</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white dark:bg-[#1E2A22] rounded-3xl p-8 border border-gold-100 dark:border-[#2D3D32] shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs text-gold-700 dark:text-gold-400 font-medium mb-1.5 block">ایمیل یا شماره موبایل</label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                  <input type="text" value={form.identifier} onChange={e => setForm({...form, identifier: e.target.value})}
                    className="w-full pr-10" placeholder="example@gmail.com یا 09123456789" required />
                </div>
              </div>

              <div>
                <label className="text-xs text-gold-700 dark:text-gold-400 font-medium mb-1.5 block">رمز عبور</label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                  <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                    className="w-full pr-10" placeholder="رمز عبور خود را وارد کنید" required />
                </div>
              </div>

              {/* CAPTCHA */}
              <div>
                <label className="text-xs text-gold-700 dark:text-gold-400 font-medium mb-1.5 block">تأیید امنیتی</label>
                <Captcha onVerify={setCaptchaValid} />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gold-600 dark:text-gold-400">
                  <input type="checkbox" className="rounded border-gold-300 text-gold-600 focus:ring-gold-400" />
                  مرا به خاطر بسپار
                </label>
                <Link to="/forgot-password" className="text-gold-600 dark:text-gold-400 hover:text-gold-800 dark:hover:text-gold-300">فراموشی رمز عبور</Link>
              </div>

              <button type="submit" disabled={loading || !captchaValid}
                className="btn-gold w-full py-3.5 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'در حال ورود...' : 'ورود'}
                {!loading && <LogIn className="w-4 h-4" />}
              </button>
            </form>

            <div className="text-center mt-5 text-sm text-gold-600 dark:text-gold-400">
              حساب کاربری ندارید؟{' '}
              <Link to="/signup" className="text-gold-700 dark:text-gold-400 font-medium hover:text-gold-900 dark:hover:text-gold-300">ثبت‌نام</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
