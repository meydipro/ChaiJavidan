import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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
    <div className="min-h-screen bg-[#f8f5e9] dark:bg-[#1A1814] flex items-center justify-center pt-12">
      <div className="max-w-md w-full mx-auto px-6">
        <div className="text-center mb-9">
          <div className="flex justify-center mb-6">
            <div className="relative w-16 h-16 bg-gradient-to-br from-white/80 to-gold-50/60 border border-gold-200/50 shadow-md overflow-hidden">
              <img src="/logo.png" className="w-full h-full object-cover relative z-10" alt="" />
              <div className="absolute inset-0 bg-gradient-to-br from-gold-shine/10 to-transparent"></div>
            </div>
          </div>
          <div className="font-amiri text-4xl tracking-tight text-gold-800 dark:text-gold-300 font-bold">چای جاویدان</div>
          <p className="text-sm text-gold-600 dark:text-gold-400 mt-1">پنل مدیریت</p>
        </div>

        <div className="admin-card">
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gold-700 dark:text-gold-400 mb-1.5">ایمیل</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm text-gold-700 dark:text-gold-400 mb-1.5">رمز عبور</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full" 
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-gold w-full mt-8 py-3.5 disabled:opacity-70"
            >
              {loading ? 'در حال ورود...' : 'ورود به پنل'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/" className="text-xs text-gold-500 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300">بازگشت به سایت</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
