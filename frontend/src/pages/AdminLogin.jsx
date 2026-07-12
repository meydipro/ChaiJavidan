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
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#141A16] flex items-center justify-center pt-12">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6">
        <div className="text-center mb-9">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" className="w-14 h-14 rounded-xl object-cover" alt="لوگو" />
          </div>
          <div className="font-amiri text-4xl tracking-tight text-[#8B6914] dark:text-[#D4B85C] font-bold">چای جاویدان</div>
          <p className="text-sm text-[#C9A84C] dark:text-[#D4B85C] mt-1">پنل مدیریت</p>
        </div>

        <div className="admin-card">
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#C9A84C] dark:text-[#c9a84c] mb-1.5">ایمیل</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm text-[#C9A84C] dark:text-[#c9a84c] mb-1.5">رمز عبور</label>
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
            <Link to="/" className="text-xs text-[#C9A84C] dark:text-[#c9a84c] hover:text-[#8B6914] dark:hover:text-[#D4B85C]">بازگشت به سایت</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
