import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, User, Mail, Phone, Lock, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import OtpInput from '../components/OtpInput';
import Captcha from '../components/Captcha';
import { toast } from 'sonner';

const Signup = () => {
  const navigate = useNavigate();
  const { register, verifyOTP, resendOTP } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tempToken, setTempToken] = useState(null);
  const [contactInfo, setContactInfo] = useState('');
  const [captchaValid, setCaptchaValid] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(5);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    useEmail: true,
  });

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    if (!captchaValid) return toast.error('لطفاً ابتدا کد امنیتی را وارد کنید');
    if (form.password !== form.confirmPassword) return toast.error('رمز عبور مطابقت ندارد');
    if (form.password.length < 6) return toast.error('رمز عبور باید حداقل ۶ کاراکتر باشد');
    if (form.useEmail && !form.email) return toast.error('ایمیل الزامی است');
    if (!form.useEmail && !form.phone) return toast.error('شماره موبایل الزامی است');

    setLoading(true);
    try {
      const data = {
        name: form.name,
        password: form.password,
        ...(form.useEmail ? { email: form.email } : { phone: form.phone }),
      };
      const res = await register(data);
      setTempToken(res.tempToken);
      setContactInfo(res.contact);
      setStep(2);
      setCountdown(60);
      toast.success(res.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'خطا در ثبت‌نام');
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (otp) => {
    setLoading(true);
    try {
      await verifyOTP(tempToken, otp);
      toast.success('ثبت‌نام با موفقیت انجام شد!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'خطا در تأیید کد');
      setAttemptsLeft(err.response?.data?.attemptsLeft || attemptsLeft - 1);
    }
    setLoading(false);
  };

  const handleResend = async () => {
    try {
      const res = await resendOTP(tempToken);
      setTempToken(res.tempToken);
      setCountdown(60);
      toast.success('کد جدید ارسال شد');
    } catch (err) {
      toast.error(err.response?.data?.message || 'خطا در ارسال مجدد');
    }
  };

  return (
    <div className="pt-28 min-h-screen flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline text-xs tracking-[3.5px] bg-gold-100 dark:bg-gold-950 text-gold-700 dark:text-gold-400 px-4 py-1 rounded-full">حساب کاربری</div>
          <h1 className="text-3xl font-amiri mt-3 text-gold-900 dark:text-gold-300 font-bold">ثبت‌نام</h1>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step >= 1 ? 'step-active' : 'step-inactive'}`}>
            {step > 1 ? <CheckCircle className="w-5 h-5" /> : '۱'}
          </div>
          <div className={`w-16 h-0.5 rounded-full transition-all ${step >= 2 ? 'bg-forest-500' : 'bg-gold-200'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step >= 2 ? 'step-active' : 'step-inactive'}`}>
            {step > 2 ? <CheckCircle className="w-5 h-5" /> : '۲'}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Registration Form */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white dark:bg-[#1E2A22] rounded-3xl p-8 border border-gold-100 dark:border-[#2D3D32] shadow-sm">
                <div className="text-center mb-6">
                  <div className="text-sm text-gold-600 dark:text-gold-400">مرحله ۱: اطلاعات شخصی</div>
                </div>

                <form onSubmit={handleStep1Submit} className="space-y-4">
                  <div>
                    <label className="text-xs text-gold-700 dark:text-gold-400 font-medium mb-1.5 block">نام و نام خانوادگی</label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                      <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                        className="w-full pr-10" placeholder="نام خود را وارد کنید" required />
                    </div>
                  </div>

                  {/* Email / Phone toggle */}
                  <div className="flex gap-2 mb-2">
                    <button type="button" onClick={() => setForm({...form, useEmail: true, phone: ''})}
                      className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${form.useEmail ? 'bg-gold-600 text-white' : 'bg-gold-50 dark:bg-gold-950 text-gold-700 dark:text-gold-400'}`}>
                      <Mail className="w-4 h-4 inline ml-1.5" />ایمیل
                    </button>
                    <button type="button" onClick={() => setForm({...form, useEmail: false, email: ''})}
                      className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${!form.useEmail ? 'bg-gold-600 text-white' : 'bg-gold-50 dark:bg-gold-950 text-gold-700 dark:text-gold-400'}`}>
                      <Phone className="w-4 h-4 inline ml-1.5" />موبایل
                    </button>
                  </div>

                  {form.useEmail ? (
                    <div>
                      <label className="text-xs text-gold-700 dark:text-gold-400 font-medium mb-1.5 block">ایمیل (Gmail)</label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                        <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                          className="w-full pr-10" placeholder="example@gmail.com" required />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="text-xs text-gold-700 dark:text-gold-400 font-medium mb-1.5 block">شماره موبایل</label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                        <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                          className="w-full pr-10" placeholder="09123456789" required dir="ltr" />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-xs text-gold-700 dark:text-gold-400 font-medium mb-1.5 block">رمز عبور</label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                      <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                        className="w-full pr-10" placeholder="حداقل ۶ کاراکتر" required minLength={6} />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gold-700 dark:text-gold-400 font-medium mb-1.5 block">تکرار رمز عبور</label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                      <input type="password" value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})}
                        className="w-full pr-10" placeholder="رمز عبور را دوباره وارد کنید" required />
                    </div>
                  </div>

                  {/* CAPTCHA */}
                  <div>
                    <label className="text-xs text-gold-700 dark:text-gold-400 font-medium mb-1.5 block">تأیید امنیتی</label>
                    <Captcha onVerify={setCaptchaValid} />
                  </div>

                  <button type="submit" disabled={loading || !captchaValid}
                    className="btn-gold w-full py-3.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'در حال ارسال...' : 'ارسال کد تأیید'}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>

                <div className="text-center mt-5 text-sm text-gold-600 dark:text-gold-400">
                  قبلاً ثبت‌نام کرده‌اید؟{' '}
                  <Link to="/login" className="text-gold-700 dark:text-gold-400 font-medium hover:text-gold-900 dark:hover:text-gold-300">ورود</Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white dark:bg-[#1E2A22] rounded-3xl p-8 border border-gold-100 dark:border-[#2D3D32] shadow-sm">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gold-100 dark:bg-gold-950 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-gold-600 dark:text-gold-400" />
                  </div>
                  <div className="text-sm text-gold-600 dark:text-gold-400">مرحله ۲: تأیید کد</div>
                  <p className="text-sm text-gold-700 dark:text-gold-400 mt-2">
                    کد ۶ رقمی به<br />
                    <span className="font-semibold">{contactInfo}</span><br />
                    ارسال شد.
                  </p>
                  <p className="text-xs text-gold-500 dark:text-gold-400 mt-1">کد در کنسول سرور نمایش داده می‌شود</p>
                </div>

                <OtpInput onComplete={handleVerifyOTP} disabled={loading} />

                {attemptsLeft < 5 && (
                  <div className="text-center mt-3 text-xs text-terracotta-600">
                    تلاش‌های باقی‌مانده: {attemptsLeft}
                  </div>
                )}

                <div className="text-center mt-6">
                  {countdown > 0 ? (
                    <div className="flex items-center justify-center gap-1.5 text-sm text-gold-500 dark:text-gold-400">
                      <Clock className="w-3.5 h-3.5" />
                      ارسال مجدد تا {countdown} ثانیه
                    </div>
                  ) : (
                    <button onClick={handleResend} className="text-sm text-gold-700 dark:text-gold-400 font-medium hover:text-gold-900 dark:hover:text-gold-300">
                      ارسال مجدد کد
                    </button>
                  )}
                </div>

                <button onClick={() => { setStep(1); setTempToken(null); }}
                  className="w-full mt-4 text-sm text-gold-600 dark:text-gold-400 hover:text-gold-800 dark:hover:text-gold-300 transition-colors">
                  بازگشت به مرحله قبل
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Signup;
