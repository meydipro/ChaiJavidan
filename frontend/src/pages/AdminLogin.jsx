import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { toast } from 'sonner';
import { Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('خوش آمدید!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'ورود ناموفق. لطفا دوباره تلاش کنید.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B3A2B] via-[#141A16] to-[#1B3A2B] flex items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#C9A84C_0.5px,transparent_1px)] bg-[length:8px_8px] opacity-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-[#C9A84C]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#1B3A2B]/50 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md mx-4"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden flex items-center justify-center">
            <img src="/logo.png" className="w-full h-full object-contain" alt="لوگو" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">چای جاویدان</h1>
          <p className="text-sm text-[#C9A84C] mt-1">پنل مدیریت</p>
        </div>

        {/* Login Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-1">ورود به حساب</h2>
            <p className="text-xs text-white/50">لطفاً اطلاعات خود را وارد کنید</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#C9A84C] mb-2">ایمیل</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@chaijavidan.com"
                  className="w-full bg-white/10 border border-white/15 rounded-xl pr-10 pl-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
                  dir="ltr"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#C9A84C] mb-2">رمز عبور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/15 rounded-xl pr-10 pl-10 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-2 focus:ring-[#C9A84C]/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-white/60 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-white/20 bg-white/10 text-[#C9A84C] focus:ring-[#C9A84C]/30" />
                <span>مرا به خاطر بسپار</span>
              </label>
              <a href="#" className="text-[#C9A84C] hover:text-[#D4B85C] transition-colors">فراموشی رمز?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#C9A84C] to-[#8B6914] hover:from-[#D4B85C] hover:to-[#C9A84C] text-[#1B3A2B] font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#1B3A2B]/30 border-t-[#1B3A2B] rounded-full animate-spin"></div>
              ) : (
                <>
                  ورود به پنل
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <Link to="/" className="text-xs text-white/50 hover:text-[#C9A84C] transition-colors inline-flex items-center gap-1">
              <ArrowRight className="w-3 h-3" />
              بازگشت به سایت اصلی
            </Link>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-white/30 mt-6">
          © ۱۴۰۵ چای جاویدان. تمامی حقوق محفوظ است.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
