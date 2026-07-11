import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// File upload setup
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    cb(null, ext && mime);
  }
});

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'تعداد درخواست‌ها بیش از حد مجاز است. لطفاً ۱۵ دقیقه صبر کنید.' }
});

const otpLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1,
  message: { message: 'لطفاً ۶۰ ثانیه صبر کنید.' }
});

// In-memory DB (in production use MongoDB)
let products = [
  {
    id: 1,
    name: "چای سیاه ممتاز گیلان",
    price: 185000,
    originalPrice: 210000,
    image: "https://picsum.photos/id/1015/600/600",
    category: "سیاه",
    region: "گیلان",
    description: "چای سیاه با کیفیت عالی از مزارع سرسبز گیلان. طعم غنی و عطر دلنشین.",
    details: "وزن: ۵۰۰ گرم | درجه: ممتاز | برداشت: بهار ۱۴۰۵",
    stock: 45,
    rating: 4.8,
    reviews: 124,
    featured: true
  },
  {
    id: 2,
    name: "چای سبز ارگانیک بوشهر",
    price: 165000,
    originalPrice: null,
    image: "https://picsum.photos/id/106/600/600",
    category: "سبز",
    region: "بوشهر",
    description: "چای سبز ارگانیک از مزارع بوشهر. غنی از آنتی اکسیدان و طعم تازه.",
    details: "وزن: ۳۰۰ گرم | ارگانیک ۱۰۰٪ | بدون افزودنی",
    stock: 32,
    rating: 4.6,
    reviews: 89,
    featured: true
  },
  {
    id: 3,
    name: "چای دارچین و هل گیلان",
    price: 205000,
    originalPrice: 240000,
    image: "https://picsum.photos/id/312/600/600",
    category: "طعم‌دار",
    region: "گیلان",
    description: "ترکیبی لوکس از چای سیاه گیلان با دارچین و هل طبیعی.",
    details: "وزن: ۴۰۰ گرم | طعم: دارچینی | مناسب برای چای عصرانه",
    stock: 27,
    rating: 4.9,
    reviews: 156,
    featured: true
  },
  {
    id: 4,
    name: "چای سفید ممتاز بوشهر",
    price: 295000,
    originalPrice: null,
    image: "https://picsum.photos/id/201/600/600",
    category: "سفید",
    region: "بوشهر",
    description: "چای سفید نادر و لوکس از بهترین باغات بوشهر.",
    details: "وزن: ۲۵۰ گرم | نادر | برداشت دستی",
    stock: 18,
    rating: 4.7,
    reviews: 73,
    featured: false
  },
  {
    id: 5,
    name: "چای گلستان گیلان",
    price: 175000,
    originalPrice: 195000,
    image: "https://picsum.photos/id/160/600/600",
    category: "سیاه",
    region: "گیلان",
    description: "چای سیاه خوش‌عطر و طعم با کیفیت بالا از منطقه گیلان.",
    details: "وزن: ۵۰۰ گرم | درجه: عالی",
    stock: 61,
    rating: 4.5,
    reviews: 211,
    featured: true
  },
  {
    id: 6,
    name: "چای عطری بوشهر",
    price: 149000,
    originalPrice: null,
    image: "https://picsum.photos/id/292/600/600",
    category: "طعم‌دار",
    region: "بوشهر",
    description: "چای با عطر گل‌های محلی بوشهر و طعم ملایم.",
    details: "وزن: ۳۵۰ گرم | مناسب برای صبحانه",
    stock: 54,
    rating: 4.3,
    reviews: 67,
    featured: false
  }
];

let siteContent = {
  heroTitle: "چای جاویدان",
  heroSubtitle: "طعم اصیل ایرانی در هر فنجان",
  aboutTitle: "درباره چای جاویدان",
  aboutText: "از سال ۱۳۷۵، چای جاویدان با عشق و دقت از بهترین مزارع گیلان و بوشهر، چای‌های ممتاز را به شما ارائه می‌دهد.",
  footerText: "چای جاویدان — کیفیت که ماندگار است.",
  heroImage: "https://picsum.photos/id/1018/2000/1200",
  aboutImage: "https://picsum.photos/id/1018/800/600",
  contactPhone: "۰۲۱-۱۲۳۴۵۶۷۸",
  contactEmail: "info@chaijavidan.com",
  contactAddress: "گیلان و بوشهر، ایران",
  whyUsTitle: "چرا چای جاویدان؟",
  whyUsText: "با بیش از ۵۰ سال تجربه، ما بهترین چای‌های ایرانی را با بالاترین کیفیت عرضه می‌کنیم.",
  newsletterText: "از آخرین محصولات و پیشنهادات ویژه مطلع شوید.",
  instagram: "@chaijavidan"
};

let orders = [];
let pendingUsers = []; // For OTP verification
let users = [
  // Admin user
  {
    id: 1,
    email: "admin@chaijavidan.com",
    password: "$2a$10$/hpUDtZESLZCNoPxuVOs9OU1i8otgY2txPKcVKx3stQYv6GatsBua", // admin123
    role: "admin",
    name: "مدیر سایت"
  }
];

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'chai-javidan-super-secret-key-2026';

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'توکن یافت نشد' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'توکن نامعتبر است' });
  }
};

// Routes

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'محصول یافت نشد' });
  res.json(product);
});

// Add product (admin)
app.post('/api/products', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'دسترسی غیر مجاز' });
  
  const newProduct = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  
  products.unshift(newProduct);
  res.status(201).json(newProduct);
});

// Update product
app.put('/api/products/:id', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'دسترسی غیر مجاز' });
  
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'محصول یافت نشد' });
  
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// Delete product
app.delete('/api/products/:id', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'دسترسی غیر مجاز' });
  
  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.json({ message: 'محصول حذف شد' });
});

// Get site content
app.get('/api/content', (req, res) => {
  res.json(siteContent);
});

// Update site content
app.put('/api/content', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'دسترسی غیر مجاز' });
  
  siteContent = { ...siteContent, ...req.body };
  res.json(siteContent);
});

// Login
app.post('/api/auth/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'ایمیل یا رمز عبور اشتباه است' });
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'ایمیل یا رمز عبور اشتباه است' });
  
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  res.json({ 
    token, 
    user: { id: user.id, email: user.email, role: user.role, name: user.name } 
  });
});

// Google Login (mock + real token)
app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body; // Google ID token
  
  // For demo purposes, accept any Google login or simulate
  // In real: use google-auth-library to verify token
  
  const demoUser = {
    id: Date.now(),
    email: "user@google.com",
    name: "کاربر گوگل",
    role: "user"
  };
  
  const jwtToken = jwt.sign(
    { id: demoUser.id, email: demoUser.email, role: demoUser.role, name: demoUser.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  res.json({ 
    token: jwtToken, 
    user: demoUser 
  });
});

// Create order
app.post('/api/orders', (req, res) => {
  const order = {
    id: Date.now(),
    ...req.body,
    date: new Date().toISOString(),
    status: 'در حال پردازش'
  };
  orders.unshift(order);
  res.status(201).json(order);
});

// Get all orders (admin)
app.get('/api/orders', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'دسترسی غیر مجاز' });
  res.json(orders);
});

// Admin check
app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// Seed admin (for initial run)
app.post('/api/seed-admin', async (req, res) => {
  const adminExists = users.find(u => u.email === "admin@chaijavidan.com");
  if (!adminExists) {
    const hashed = await bcrypt.hash("admin123", 10);
    users.push({
      id: 1,
      email: "admin@chaijavidan.com",
      password: hashed,
      role: "admin",
      name: "مدیر چای جاویدان"
    });
  }
  res.json({ message: "Admin seeded" });
});

// ========== CUSTOMER AUTH (Two-Step Verification) ==========

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Register - Step 1: Create pending user, generate OTP
app.post('/api/auth/register', authLimiter, async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: 'نام و رمز عبور الزامی است' });
    }
    if (!email && !phone) {
      return res.status(400).json({ message: 'ایمیل یا شماره موبایل الزامی است' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'رمز عبور باید حداقل ۶ کاراکتر باشد' });
    }

    // Check if user already exists
    const existingUser = users.find(u => (email && u.email === email) || (phone && u.phone === phone));
    if (existingUser) {
      return res.status(400).json({ message: 'کاربری با این ایمیل یا شماره موبایل قبلاً ثبت‌نام کرده است' });
    }

    // Check pending users
    const existingPending = pendingUsers.find(p => (email && p.email === email) || (phone && p.phone === phone));
    if (existingPending) {
      // Update if exists
      const otp = generateOTP();
      const hashedPassword = await bcrypt.hash(password, 10);
      Object.assign(existingPending, {
        name, email, phone, password: hashedPassword,
        otp, otpExpiry: Date.now() + 5 * 60 * 1000, attempts: 0, createdAt: Date.now()
      });
      console.log(`\n🔑 OTP for ${email || phone}: ${otp}\n`);
      const tempToken = jwt.sign({ pendingId: existingPending.id, type: 'otp-verify' }, JWT_SECRET, { expiresIn: '10m' });
      return res.json({ message: 'کد تأیید ارسال شد', tempToken, contact: email || phone });
    }

    // Create pending user
    const otp = generateOTP();
    const hashedPassword = await bcrypt.hash(password, 10);
    const pendingId = Date.now().toString();

    pendingUsers.push({
      id: pendingId,
      name,
      email: email || null,
      phone: phone || null,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
      attempts: 0,
      createdAt: Date.now()
    });

    // In production: send OTP via email (nodemailer) or SMS
    console.log(`\n🔑 OTP for ${email || phone}: ${otp}\n`);

    const tempToken = jwt.sign({ pendingId, type: 'otp-verify' }, JWT_SECRET, { expiresIn: '10m' });

    res.status(201).json({
      message: 'کد تأیید ارسال شد',
      tempToken,
      contact: email || phone
    });
  } catch (err) {
    res.status(500).json({ message: 'خطای سرور' });
  }
});

// Verify OTP - Step 2: Finalize registration
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { tempToken, otp } = req.body;

    if (!tempToken || !otp) {
      return res.status(400).json({ message: 'توکن و کد تأیید الزامی است' });
    }

    let decoded;
    try {
      decoded = jwt.verify(tempToken, JWT_SECRET);
    } catch {
      return res.status(400).json({ message: 'توکن منقضی شده است. لطفاً دوباره ثبت‌نام کنید.' });
    }

    if (decoded.type !== 'otp-verify') {
      return res.status(400).json({ message: 'توکن نامعتبر است' });
    }

    const pending = pendingUsers.find(p => p.id === decoded.pendingId);
    if (!pending) {
      return res.status(400).json({ message: 'درخواست یافت نشد. لطفاً دوباره ثبت‌نام کنید.' });
    }

    // Check expiry
    if (Date.now() > pending.otpExpiry) {
      return res.status(400).json({ message: 'کد تأیید منقضی شده است. لطفاً کد جدید دریافت کنید.' });
    }

    // Check attempts
    if (pending.attempts >= 5) {
      return res.status(400).json({ message: 'تعداد تلاش‌ها بیش از حد مجاز است. لطفاً دوباره ثبت‌نام کنید.' });
    }

    // Verify OTP
    if (pending.otp !== otp.toString()) {
      pending.attempts++;
      return res.status(400).json({ message: 'کد تأیید اشتباه است', attemptsLeft: 5 - pending.attempts });
    }

    // Create user
    const newUser = {
      id: Date.now(),
      name: pending.name,
      email: pending.email,
      phone: pending.phone,
      password: pending.password,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    // Remove from pending
    pendingUsers = pendingUsers.filter(p => p.id !== pending.id);

    // Generate JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, phone: newUser.phone, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'ثبت‌نام با موفقیت انجام شد',
      token,
      user: { id: newUser.id, email: newUser.email, phone: newUser.phone, role: newUser.role, name: newUser.name }
    });
  } catch (err) {
    res.status(500).json({ message: 'خطای سرور' });
  }
});

// Resend OTP
app.post('/api/auth/resend-otp', otpLimiter, async (req, res) => {
  try {
    const { tempToken } = req.body;

    if (!tempToken) {
      return res.status(400).json({ message: 'توکن الزامی است' });
    }

    let decoded;
    try {
      decoded = jwt.verify(tempToken, JWT_SECRET);
    } catch {
      return res.status(400).json({ message: 'توکن منقضی شده است' });
    }

    const pending = pendingUsers.find(p => p.id === decoded.pendingId);
    if (!pending) {
      return res.status(400).json({ message: 'درخواست یافت نشد' });
    }

    // Generate new OTP
    const otp = generateOTP();
    pending.otp = otp;
    pending.otpExpiry = Date.now() + 5 * 60 * 1000;
    pending.attempts = 0;

    console.log(`\n🔑 Resent OTP for ${pending.email || pending.phone}: ${otp}\n`);

    const newTempToken = jwt.sign({ pendingId: pending.id, type: pending.type || 'otp-verify' }, JWT_SECRET, { expiresIn: '10m' });

    res.json({ message: 'کد جدید ارسال شد', tempToken: newTempToken });
  } catch (err) {
    res.status(500).json({ message: 'خطای سرور' });
  }
});

// ========== PASSWORD RESET ==========

// Forgot password - Step 1: Send OTP
app.post('/api/auth/forgot-password', authLimiter, async (req, res) => {
  try {
    const { identifier } = req.body;

    if (!identifier) {
      return res.status(400).json({ message: 'ایمیل یا شماره موبایل الزامی است' });
    }

    const user = users.find(u => u.email === identifier || u.phone === identifier);
    if (!user) {
      // Don't reveal if user exists
      return res.json({ message: 'اگر حسابی با این مشخصات وجود داشته باشد، کد تأیید ارسال شده است.' });
    }

    const otp = generateOTP();
    const pendingId = Date.now().toString();

    pendingUsers.push({
      id: pendingId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: null,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
      attempts: 0,
      createdAt: Date.now(),
      type: 'password-reset',
      userId: user.id
    });

    console.log(`\n🔑 Password Reset OTP for ${identifier}: ${otp}\n`);

    const tempToken = jwt.sign({ pendingId, type: 'password-reset' }, JWT_SECRET, { expiresIn: '10m' });

    res.json({
      message: 'کد تأیید ارسال شد',
      tempToken,
      contact: user.email || user.phone
    });
  } catch (err) {
    res.status(500).json({ message: 'خطای سرور' });
  }
});

// Reset password - Step 2: Verify OTP and update password
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { tempToken, otp, newPassword } = req.body;

    if (!tempToken || !otp || !newPassword) {
      return res.status(400).json({ message: 'توکن، کد تأیید و رمز عبور جدید الزامی است' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'رمز عبور باید حداقل ۶ کاراکتر باشد' });
    }

    let decoded;
    try {
      decoded = jwt.verify(tempToken, JWT_SECRET);
    } catch {
      return res.status(400).json({ message: 'توکن منقضی شده است. لطفاً دوباره درخواست دهید.' });
    }

    if (decoded.type !== 'password-reset') {
      return res.status(400).json({ message: 'توکن نامعتبر است' });
    }

    const pending = pendingUsers.find(p => p.id === decoded.pendingId && p.type === 'password-reset');
    if (!pending) {
      return res.status(400).json({ message: 'درخواست یافت نشد. لطفاً دوباره درخواست دهید.' });
    }

    if (Date.now() > pending.otpExpiry) {
      return res.status(400).json({ message: 'کد تأیید منقضی شده است. لطفاً کد جدید دریافت کنید.' });
    }

    if (pending.attempts >= 5) {
      return res.status(400).json({ message: 'تعداد تلاش‌ها بیش از حد مجاز است. لطفاً دوباره درخواست دهید.' });
    }

    if (pending.otp !== otp.toString()) {
      pending.attempts++;
      return res.status(400).json({ message: 'کد تأیید اشتباه است', attemptsLeft: 5 - pending.attempts });
    }

    // Update password
    const userIndex = users.findIndex(u => u.id === pending.userId);
    if (userIndex === -1) {
      return res.status(400).json({ message: 'کاربر یافت نشد' });
    }

    users[userIndex].password = await bcrypt.hash(newPassword, 10);

    // Remove from pending
    pendingUsers = pendingUsers.filter(p => p.id !== pending.id);

    res.json({ message: 'رمز عبور با موفقیت تغییر کرد. اکنون می‌توانید وارد شوید.' });
  } catch (err) {
    res.status(500).json({ message: 'خطای سرور' });
  }
});

// Customer login (supports email or phone)
app.post('/api/auth/customer-login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: 'ایمیل/موبایل و رمز عبور الزامی است' });
    }

    const user = users.find(u => (u.email === identifier || u.phone === identifier) && u.role === 'user');
    if (!user) {
      return res.status(400).json({ message: 'کاربری با این مشخصات یافت نشد' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'ایمیل/موبایل یا رمز عبور اشتباه است' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, phone: user.phone, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: user.id, email: user.email, phone: user.phone, role: user.role, name: user.name }
    });
  } catch (err) {
    res.status(500).json({ message: 'خطای سرور' });
  }
});

// Cleanup expired pending users (every 10 minutes)
setInterval(() => {
  const now = Date.now();
  pendingUsers = pendingUsers.filter(p => now - p.createdAt < 15 * 60 * 1000);
}, 10 * 60 * 1000);

// ========== FILE UPLOAD ==========
app.post('/api/upload', authMiddleware, upload.single('image'), (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'دسترسی غیر مجاز' });
  if (!req.file) return res.status(400).json({ message: 'فایلی ارسال نشد' });
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url, filename: req.file.filename });
});

app.delete('/api/upload/:filename', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'دسترسی غیر مجاز' });
  const filePath = path.join(uploadsDir, req.params.filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ message: 'فایل حذف شد' });
  } else {
    res.status(404).json({ message: 'فایل یافت نشد' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
