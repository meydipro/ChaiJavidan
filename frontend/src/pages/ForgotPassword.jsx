import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Lock, CheckCircle, Clock, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import OtpInput from '../components/OtpInput';
import Captcha from '../components/Captcha';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword, resetPassword, resendOTP } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tempToken, setTempToken] = useState(null);
  const [contactInfo, setContactInfo] = useState('');
  const [captchaValid, setCaptchaValid] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [identifier, setIdentifier] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    if (!captchaValid) return toast.error('لطفاً ابتدا کد امنیتی را وارد کنید');
    if (!identifier) return toast.error('ایمیل یا شماره موبایل را وارد کنید');

    setLoading(true);
    try {
      const res = await forgotPassword(identifier);
      setTempToken(res.tempToken);
      setContactInfo(res.contact);
      setStep(2);
      setCountdown(60);
      toast.success(res.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'خطا در ارسال کد');
    }
    setLoading(false);
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) return toast.error('رمز عبور باید حداقل ۶ کاراکتر باشد');
    if (newPassword !== confirmPassword) return toast.error('رمز عبور مطابقت ندارد');
    setStep(3);
  };

  const handleVerifyOTP = async (otp) => {
    setLoading(true);
    try {
      await resetPassword(tempToken, otp, newPassword);
      toast.success('رمز عبور با موفقیت تغییر کرد!');
      navigate('/login');
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
        <div className="text-center mb-8">
          <div className="inline text-xs tracking-[3.5px] bg-gold-100 dark:bg-gold-950 text-gold-700 dark:text-gold-400 px-4 py-1 rounded-full">بازیابی رمز عبور</div>
          <h1 className="text-3xl font-amiri mt-3 text-gold-900 dark:text-gold-300 font-bold">فراموشی رمز عبور</h1>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step >= 1 ? 'step-active' : 'step-inactive'}`}>
            {step > 1 ? <CheckCircle className="w-5 h-5" /> : '۱'}
          </div>
          <div className={`w-12 h-0.5 rounded-full transition-all ${step >= 2 ? 'bg-forest-500' : 'bg-gold-200'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step >= 2 ? 'step-active' : 'step-inactive'}`}>
            {step > 2 ? <CheckCircle className="w-5 h-5" /> : '۲'}
          </div>
          <div className={`w-12 h-0.5 rounded-full transition-all ${step >= 3 ? 'bg-forest-500' : 'bg-gold-200'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step >= 3 ? 'step-active' : 'step-inactive'}`}>
            ۳
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Enter identifier */}
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
                  <div className="w-16 h-16 bg-gold-100 dark:bg-gold-950 rounded-full flex items-center justify-center mx-auto mb-4">
                    <KeyRound className="w-8 h-8 text-gold-600 dark:text-gold-400" />
                  </div>
                  <div className="text-sm text-gold-600 dark:text-gold-400">مرحله ۱: بازیابی حساب</div>
                  <p className="text-xs text-gold-500 dark:text-gold-400 mt-2">ایمیل یا شماره موبایل خود را وارد کنید تا کد تأیید دریافت کنید.</p>
                </div>

                <form onSubmit={handleStep1Submit} className="space-y-4">
                  <div>
                    <label className="text-xs text-gold-700 dark:text-gold-400 font-medium mb-1.5 block">ایمیل یا شماره موبایل</label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                      <input
                        type="text"
                        value={identifier}
                        onChange={e => setIdentifier(e.target.value)}
                        className="w-full pr-10"
                        placeholder="example@gmail.com یا 09123456789"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gold-700 dark:text-gold-400 font-medium mb-1.5 block">تأیید امنیتی</label>
                    <Captcha onVerify={setCaptchaValid} />
                  </div>

                  <button type="submit" disabled={loading || !captchaValid}
                    className="btn-gold w-full py-3.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? 'در حال ارسال...' : 'ارسال کد تأیید'}
                  </button>
                </form>

                <div className="text-center mt-5 text-sm text-gold-600 dark:text-gold-400">
                  <Link to="/login" className="text-gold-700 dark:text-gold-400 font-medium hover:text-gold-900 dark:hover:text-gold-300">بازگشت به ورود</Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Enter new password */}
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
                    <Lock className="w-8 h-8 text-gold-600 dark:text-gold-400" />
                  </div>
                  <div className="text-sm text-gold-600 dark:text-gold-400">مرحله ۲: رمز عبور جدید</div>
                  <p className="text-xs text-gold-500 dark:text-gold-400 mt-2">رمز عبور جدید خود را انتخاب کنید.</p>
                </div>

                <form onSubmit={handleStep2Submit} className="space-y-4">
                  <div>
                    <label className="text-xs text-gold-700 dark:text-gold-400 font-medium mb-1.5 block">رمز عبور جدید</label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                      <input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="w-full pr-10"
                        placeholder="حداقل ۶ کاراکتر"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gold-700 dark:text-gold-400 font-medium mb-1.5 block">تکرار رمز عبور جدید</label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-400" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full pr-10"
                        placeholder="رمز عبور را دوباره وارد کنید"
                        required
                      />
                    </div>
                  </div>

                  <button type="submit"
                    className="btn-gold w-full py-3.5 mt-2">
                    ادامه
                  </button>
                </form>

                <button onClick={() => setStep(1)}
                  className="w-full mt-4 text-sm text-gold-600 dark:text-gold-400 hover:text-gold-800 dark:hover:text-gold-300 transition-colors">
                  بازگشت به مرحله قبل
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: OTP Verification */}
          {step === 3 && (
            <motion.div
              key="step3"
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
                  <div className="text-sm text-gold-600 dark:text-gold-400">مرحله ۳: تأیید کد</div>
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

                <button onClick={() => { setStep(2); }}
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

export default ForgotPassword;
