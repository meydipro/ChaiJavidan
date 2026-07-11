# Chai Javidan Enhancement Plan

## Overview

Four major enhancements to the Persian tea e-commerce site:
1. Modernized color palette
2. Rich animation system
3. Two-step verification customer signup with CAPTCHA
4. Implementation sequencing

---

## 1. Color Palette Enhancement

### Current State
- Gold: `#d4af77` / `#b8860b`
- Cream: `#f8f5e9` / `#f1e9d2`
- Text: `#3f3a2e`
- Tailwind gold scale maps to yellow-gold tones, not matching the actual brand gold

### Proposed Palette — "Warm Luxury"

```css
/* === PRIMARY: Deep Tea Gold === */
--primary:        #C9A96E;    /* refined warm gold — less orange, more sophistication */
--primary-light:  #E5D5B0;    /* soft champagne for hover states */
--primary-dark:   #9E7B3C;    /* deep gold for text emphasis */
--primary-50:     #FBF6EE;    /* near-white with warm undertone */
--primary-100:    #F3EAD8;    /* light cream tint */
--primary-200:    #E5D5B0;    /* card backgrounds */
--primary-300:    #D4BA84;    /* borders, dividers */
--primary-400:    #C9A96E;    /* main accent */
--primary-500:    #B8954A;    /* primary CTA */
--primary-600:    #9E7B3C;    /* hover state */
--primary-700:    #7D6130;    /* dark text on light bg */
--primary-800:    #5C4724;    /* headings */
--primary-900:    #3A2D17;    /* near-black warm */

/* === SECONDARY: Deep Forest Green (tea leaves) === */
--secondary:      #3B5E3A;    /* rich tea-green, deeper than current #2E4A2F */
--secondary-light:#5A8A58;    /* lighter variant for accents */
--secondary-dark: #2A4428;    /* dark variant */

/* === ACCENT: Warm Terracotta === */
--accent:         #C2714F;    /* Persian clay / terracotta — contrasts gold beautifully */
--accent-light:   #E89A7A;
--accent-dark:    #A15333;

/* === NEUTRALS === */
--bg:             #FAF7F0;    /* warmer off-white than current #f8f5e9 */
--bg-alt:         #F3EDE0;    /* section alternation */
--surface:        #FFFFFF;    /* cards */
--text:           #2D2820;    /* near-black warm */
--text-secondary: #6B6050;    /* muted body text */
--text-tertiary:  #9E9280;    /* placeholders, captions */
--border:         #E8DFD0;    /* subtle warm border */

/* === SEMANTIC === */
--success:        #4A8B3F;
--error:          #C44536;
--warning:        #D4A23E;
--info:           #5B8DB8;

/* === DARK MODE (future) === */
--dark-bg:        #1A1610;
--dark-surface:   #252018;
--dark-elevated:  #302A20;
--dark-text:      #F0E8D8;
--dark-border:    #3D3528;
```

### Tailwind Config Changes

Replace the entire `colors` block in `tailwind.config.js`:

```js
colors: {
  // Primary gold scale (replaces current gold scale)
  gold: {
    50:  '#FBF6EE',
    100: '#F3EAD8',
    200: '#E5D5B0',
    300: '#D4BA84',
    400: '#C9A96E',
    500: '#B8954A',
    600: '#9E7B3C',
    700: '#7D6130',
    800: '#5C4724',
    900: '#3A2D17',
  },
  // Secondary
  'tea-green': {
    DEFAULT: '#3B5E3A',
    light: '#5A8A58',
    dark: '#2A4428',
  },
  // Accent
  'accent': {
    DEFAULT: '#C2714F',
    light: '#E89A7A',
    dark: '#A15333',
  },
  // Surfaces
  cream: {
    DEFAULT: '#FAF7F0',
    dark: '#F3EDE0',
  },
  // Neutrals
  bark: {
    DEFAULT: '#2D2820',
    light: '#6B6050',
    muted: '#9E9280',
  },
}
```

### CSS Variable Updates

Update `:root` block in `src/index.css`:

```css
:root {
  --primary: #C9A96E;
  --primary-dark: #9E7B3C;
  --primary-light: #E5D5B0;
  --secondary: #3B5E3A;
  --accent: #C2714F;
  --cream: #FAF7F0;
  --cream-dark: #F3EDE0;
  --text: #2D2820;
  --text-light: #6B6050;
  --bg: #FAF7F0;
  --border: #E8DFD0;
}
```

### Files to Modify
- `frontend/tailwind.config.js` — new color scales
- `frontend/src/index.css` — CSS variables + update hardcoded hex values
- `frontend/src/pages/Home.jsx` — replace `#f1e9d2`, `#3f3a2e`, `#f8f5e9` with Tailwind classes
- `frontend/src/pages/AdminLogin.jsx` — replace `#f8f5e9`
- `frontend/src/components/Navbar.jsx` — replace `#f8f5e9`
- `frontend/src/components/Footer.jsx` — replace `#f1e9d2`
- `frontend/src/components/CartDrawer.jsx` — minor color references
- `frontend/src/components/MegaMenu.jsx` — no changes needed (uses Tailwind classes)

---

## 2. Animation Enhancements

### 2A. New Dependencies

```bash
npm install framer-motion@latest   # already installed (v12.42)
# No new packages needed — framer-motion covers everything
```

### 2B. New Tailwind Keyframes & Animations

Add to `tailwind.config.js`:

```js
animation: {
  // Existing (keep)
  'fade-in': 'fadeIn 0.6s ease-out forwards',
  'slide-up': 'slideUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards',
  'float': 'float 3s ease-in-out infinite',
  'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'scale-in': 'scaleIn 0.4s cubic-bezier(0.23, 1.0, 0.32, 1)',
  // New
  'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
  'slide-in-left': 'slideInLeft 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
  'blur-in': 'blurIn 0.5s ease-out forwards',
  'shimmer': 'shimmer 2s infinite linear',
  'ripple': 'ripple 0.6s linear',
  'counter': 'counter 1.5s ease-out forwards',
  'parallax-slow': 'parallaxSlow 20s linear infinite',
  'glow-pulse': 'glowPulse 3s ease-in-out infinite',
},
keyframes: {
  // Existing (keep)
  fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
  slideUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
  float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
  pulseSoft: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.85' } },
  scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
  // New
  slideInRight: { '0%': { opacity: '0', transform: 'translateX(-30px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
  slideInLeft: { '0%': { opacity: '0', transform: 'translateX(30px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
  blurIn: { '0%': { opacity: '0', filter: 'blur(10px)' }, '100%': { opacity: '1', filter: 'blur(0)' } },
  shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
  ripple: { '0%': { transform: 'scale(0)', opacity: '0.5' }, '100%': { transform: 'scale(4)', opacity: '0' } },
  counter: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
  parallaxSlow: { '0%': { transform: 'translateY(0)' }, '100%': { transform: 'translateY(-50%)' } },
  glowPulse: { '0%, 100%': { boxShadow: '0 0 20px rgba(201,169,110,0.15)' }, '50%': { boxShadow: '0 0 40px rgba(201,169,110,0.3)' } },
},
```

### 2C. New Reusable Components

#### `frontend/src/components/PageTransition.jsx`
Wraps `<Routes>` in `App.jsx`. Uses `AnimatePresence` + `motion.div` for page enter/exit:
```jsx
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
};

export default function PageTransition({ children }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

#### `frontend/src/components/ScrollReveal.jsx`
Framer Motion-based scroll reveal replacing the CSS IntersectionObserver approach:
```jsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const directionMap = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

#### `frontend/src/components/SkeletonProduct.jsx`
Shimmer loading skeleton for products:
```jsx
export default function SkeletonProduct() {
  return (
    <div className="rounded-3xl overflow-hidden border border-gold-100 bg-white">
      <div className="aspect-square bg-gradient-to-r from-gold-100 via-gold-50 to-gold-100 animate-shimmer bg-[length:200%_100%]" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gold-100 rounded-xl w-3/4 animate-shimmer bg-[length:200%_100%]" />
        <div className="h-3 bg-gold-50 rounded-xl w-1/2 animate-shimmer bg-[length:200%_100%]" />
        <div className="flex justify-between mt-4">
          <div className="h-5 bg-gold-100 rounded-xl w-20 animate-shimmer bg-[length:200%_100%]" />
          <div className="h-5 bg-gold-50 rounded-xl w-16 animate-shimmer bg-[length:200%_100%]" />
        </div>
      </div>
    </div>
  );
}
```

#### `frontend/src/components/RippleButton.jsx`
Button with CSS ripple click effect:
```jsx
import { useState, useRef } from 'react';

export default function RippleButton({ children, className = '', ...props }) {
  const [ripples, setRipples] = useState([]);
  const btnRef = useRef(null);

  const handleClick = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
    props.onClick?.(e);
  };

  return (
    <button ref={btnRef} className={`relative overflow-hidden ${className}`} onClick={handleClick} {...props}>
      {ripples.map(r => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
          style={{ left: r.x - 10, top: r.y - 10, width: 20, height: 20 }}
        />
      ))}
      {children}
    </button>
  );
}
```

### 2D. Specific Page Enhancements

#### Navbar — Scroll Effects
In `Navbar.jsx`, add state + motion for:
- Background opacity transition (fully transparent at top → white/95 backdrop-blur on scroll)
- Height reduction (h-20 → h-16 on scroll)
- Box shadow appearance on scroll

```jsx
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);

// Apply to <nav>:
// className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm h-16' : 'bg-transparent h-20'}`}
```

Also add `useLocation` + `AnimatePresence` for the Navbar's search bar focus animation.

#### Hero Section — Parallax + Staggered Entrance
In `Home.jsx`, enhance the hero:
- `motion.div` for the background image with `useScroll` + `useTransform` for parallax (image moves slower than scroll)
- Staggered children entrance: badge → title → subtitle → buttons → scroll indicator
- Floating particles effect using multiple `motion.div` with `animate={{ y: [0, -20, 0] }}` and randomized delays

```jsx
const { scrollY } = useScroll();
const heroY = useTransform(scrollY, [0, 800], [0, 200]);
const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

// Wrap hero image:
<motion.img style={{ y: heroY }} ... />

// Wrap hero content:
<motion.div style={{ opacity: heroOpacity }} ... />

// Stagger children:
const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
```

#### Product Card — Enhanced Hover
In `ProductCard.jsx`:
- Replace the CSS-only hover with `motion.div` for:
  - Subtle 3D tilt on hover (using `rotateY` / `rotateX` via `onMouseMove`)
  - "Add to cart" button slide-up entrance with spring physics
  - Image zoom with scale animation
  - Quick-view overlay blur effect

```jsx
// On the card container:
<motion.div
  whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.12)' }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
>
// On the add-to-cart button:
<motion.button
  initial={{ opacity: 0, y: 10 }}
  whileHover={{ scale: 1.05 }}
  className="absolute bottom-4 left-4 group-hover:opacity-100 ..."
>
```

#### Stats Counter — Animated Number Count-Up
In `Home.jsx`, replace the static stat numbers with a counting animation:
```jsx
function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);
  return count;
}
```

#### Section Entrance — Replace scroll-reveal CSS
Replace all `.scroll-reveal` CSS classes with `<ScrollReveal>` components. Remove the `IntersectionObserver` useEffect in `Home.jsx`. Apply different `direction` props per section for variety.

#### Cart Drawer — Slide-in with Spring
In `CartDrawer.jsx`, wrap with `AnimatePresence` and `motion.div`:
```jsx
<AnimatePresence>
  {isOpen && (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="absolute inset-y-0 right-0 w-full max-w-md bg-white">
        ...
      </motion.div>
    </>
  )}
</AnimatePresence>
```
Note: In RTL, drawer slides from the LEFT (`ml-auto` becomes `mr-auto` or use `left-0`).

#### MegaMenu — AnimatePresence
In `MegaMenu.jsx`, replace the `if (!isOpen) return null` pattern with:
```jsx
<AnimatePresence>
  {isOpen && (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="fixed top-[80px] ...">
      ...
    </motion.div>
  )}
</AnimatePresence>
```

#### Loading States
Add skeleton loading to `Shop.jsx` and `Home.jsx` while data is fetching:
```jsx
const [loading, setLoading] = useState(true);
// In fetch: setLoading(false) after data arrives
// Render: loading ? Array(8).fill(0).map((_, i) => <SkeletonProduct key={i} />) : actual products
```

#### Micro-interactions in index.css
Add these CSS utilities:
```css
/* Button ripple base */
.ripple-container { position: relative; overflow: hidden; }

/* Focus ring for forms */
input:focus, textarea:focus, select:focus {
  box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.2);
}

/* Smooth image load */
img {
  transition: opacity 0.4s ease;
}
img[loading] { opacity: 0; }
img.loaded { opacity: 1; }

/* Hover glow on cards */
.card-glow:hover {
  box-shadow: 0 0 30px rgba(201, 169, 110, 0.15);
}
```

### 2E. Files to Create (New)
| File | Purpose |
|------|---------|
| `frontend/src/components/PageTransition.jsx` | Route transition wrapper |
| `frontend/src/components/ScrollReveal.jsx` | Framer Motion scroll reveal |
| `frontend/src/components/SkeletonProduct.jsx` | Loading skeleton |
| `frontend/src/components/RippleButton.jsx` | Click ripple effect |

### 2F. Files to Modify (Animation)
| File | Changes |
|------|---------|
| `frontend/tailwind.config.js` | New keyframes + animations |
| `frontend/src/index.css` | New CSS utilities |
| `frontend/src/App.jsx` | Wrap Routes in PageTransition, add AnimatePresence |
| `frontend/src/pages/Home.jsx` | Hero parallax, staggered entrance, count-up stats, replace scroll-reveal with ScrollReveal component, remove IntersectionObserver |
| `frontend/src/pages/Shop.jsx` | Add loading skeleton, staggered product grid entrance |
| `frontend/src/components/Navbar.jsx` | Scroll-based shrink/glassmorphism, mobile menu animation |
| `frontend/src/components/ProductCard.jsx` | Motion hover effects, spring animations |
| `frontend/src/components/CartDrawer.jsx` | AnimatePresence slide-in/out |
| `frontend/src/components/MegaMenu.jsx` | AnimatePresence enter/exit |

---

## 3. Two-Step Verification Signup System

### 3A. Architecture

**Flow:**
1. User enters email (Gmail) OR mobile number + name + password
2. System sends 6-digit OTP to the provided email/mobile
3. User enters OTP + solves CAPTCHA
4. Account created, JWT issued

**Backend stores:**
- `users[]` — existing pattern, add new fields: `phone`, `verified`, `createdAt`
- `otpStore[]` — `{ identifier, otp, expiresAt, attempts }`

**CAPTCHA approach:** Google reCAPTCHA v3 (invisible, score-based). For in-memory dev without API key, fall back to a simple custom CAPTCHA (math question or image-based) with a toggle.

### 3B. New Backend Dependencies

```bash
cd backend
npm install nodemailer           # For sending OTP emails
npm install twilio                # For SMS (optional, can mock for dev)
npm install express-rate-limit    # Rate limiting for OTP endpoints
```

### 3C. Backend Changes — `backend/server.js`

Add these endpoint groups:

#### User Registration Data Structure
```js
// Extend the users array pattern
let users = [
  // ... existing admin user
];

// New: OTP storage
let otpStore = [];

// New: Customer signup request storage
let pendingSignups = [];
```

#### POST /api/auth/register
```js
// Step 1: Register — validates input, generates OTP, stores pending signup
app.post('/api/auth/register', async (req, res) => {
  const { name, email, phone, password, captchaToken } = req.body;

  // Validate: must have email OR phone, plus name + password
  if (!name || (!email && !phone) || !password) {
    return res.status(400).json({ message: 'لطفا تمام فیلدها را پر کنید' });
  }

  // Check if user already exists
  const identifier = email || phone;
  const exists = users.find(u => u.email === identifier || u.phone === identifier);
  if (exists) {
    return res.status(400).json({ message: 'این ایمیل یا شماره قبلا ثبت شده' });
  }

  // Validate email format if provided
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'فرمت ایمیل نامعتبر است' });
  }

  // Validate Iranian phone format if provided
  if (phone && !/^09\d{9}$/.test(phone)) {
    return res.status(400).json({ message: 'شماره موبایل نامعتبر است' });
  }

  // CAPTCHA verification (reCAPTCHA v3 or custom)
  // if (!await verifyCaptcha(captchaToken)) {
  //   return res.status(400).json({ message: 'تایید ربات ناموفق' });
  // }

  // Generate 6-digit OTP
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  // Remove any previous OTP for this identifier
  otpStore = otpStore.filter(o => o.identifier !== identifier);

  // Store OTP
  otpStore.push({ identifier, otp, expiresAt, attempts: 0 });

  // Store pending signup data
  pendingSignups = pendingSignups.filter(p => p.identifier !== identifier);
  const hashedPassword = await bcrypt.hash(password, 10);
  pendingSignups.push({ name, identifier, email, phone, password: hashedPassword });

  // Send OTP (email or SMS)
  if (email) {
    await sendEmailOTP(email, otp);
  } else {
    await sendSMSOTP(phone, otp);
  }

  res.json({ message: 'کد تایید ارسال شد', identifier });
});
```

#### POST /api/auth/verify-otp
```js
app.post('/api/auth/verify-otp', async (req, res) => {
  const { identifier, otp } = req.body;

  const otpRecord = otpStore.find(o => o.identifier === identifier);
  if (!otpRecord) {
    return res.status(400).json({ message: 'کد تایید یافت نشد. لطفا دوباره درخواست دهید.' });
  }

  // Check expiry
  if (Date.now() > otpRecord.expiresAt) {
    otpStore = otpStore.filter(o => o.identifier !== identifier);
    return res.status(400).json({ message: 'کد تایید منقضی شده است' });
  }

  // Check attempts (max 5)
  if (otpRecord.attempts >= 5) {
    otpStore = otpStore.filter(o => o.identifier !== identifier);
    return res.status(400).json({ message: 'تعداد تلاش‌ها بیش از حد مجاز است' });
  }

  otpRecord.attempts++;

  // Verify OTP
  if (otpRecord.otp !== otp) {
    return res.status(400).json({ message: 'کد تایید اشتباه است' });
  }

  // OTP valid — create user
  const pending = pendingSignups.find(p => p.identifier === identifier);
  if (!pending) {
    return res.status(400).json({ message: 'خطا در ثبت نام' });
  }

  const newUser = {
    id: Date.now(),
    name: pending.name,
    email: pending.email || null,
    phone: pending.phone || null,
    password: pending.password,
    role: 'customer',
    verified: true,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  // Cleanup
  otpStore = otpStore.filter(o => o.identifier !== identifier);
  pendingSignups = pendingSignups.filter(p => p.identifier !== identifier);

  // Generate JWT
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    token,
    user: { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone, role: newUser.role }
  });
});
```

#### POST /api/auth/resend-otp
```js
app.post('/api/auth/resend-otp', async (req, res) => {
  const { identifier } = req.body;

  // Cooldown: 60 seconds between resends
  const existing = otpStore.find(o => o.identifier === identifier);
  if (existing && Date.now() - (existing.expiresAt - 5 * 60 * 1000) < 60000) {
    return res.status(429).json({ message: 'لطفا ۶۰ ثانیه صبر کنید' });
  }

  // Check pending signup exists
  const pending = pendingSignups.find(p => p.identifier === identifier);
  if (!pending) {
    return res.status(400).json({ message: 'ابتدا ثبت نام کنید' });
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = Date.now() + 5 * 60 * 1000;

  otpStore = otpStore.filter(o => o.identifier !== identifier);
  otpStore.push({ identifier, otp, expiresAt, attempts: 0 });

  if (pending.email) {
    await sendEmailOTP(pending.email, otp);
  } else {
    await sendSMSOTP(pending.phone, otp);
  }

  res.json({ message: 'کد جدید ارسال شد' });
});
```

#### POST /api/auth/login (customer)
Add to existing login endpoint — it already handles email+password. Add phone-based login:
```js
// Modify existing login to accept phone OR email
app.post('/api/auth/login', async (req, res) => {
  const { email, phone, password } = req.body;
  const identifier = email || phone;

  const user = users.find(u => u.email === identifier || u.phone === identifier);
  if (!user) return res.status(400).json({ message: 'ایمیل/موبایل یا رمز عبور اشتباه است' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'ایمیل/موبایل یا رمز عبور اشتباه است' });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({ token, user: { id: user.id, email: user.email, phone: user.phone, role: user.role, name: user.name } });
});
```

#### OTP Sending Functions (dev/mock mode)
```js
// In dev mode, log OTP to console. In production, use nodemailer/twilio
async function sendEmailOTP(email, otp) {
  console.log(`📧 OTP for ${email}: ${otp}`);
  // Production: use nodemailer with SMTP
  // await transporter.sendMail({ to: email, subject: 'کد تایید چای جاویدان', text: `کد تایید شما: ${otp}` });
}

async function sendSMSOTP(phone, otp) {
  console.log(`📱 OTP for ${phone}: ${otp}`);
  // Production: use twilio or kavenegar (Iranian SMS provider)
}
```

#### Rate Limiting
```js
import rateLimit from 'express-rate-limit';

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { message: 'تعداد درخواست‌ها بیش از حد مجاز است. لطفا بعدا تلاش کنید.' }
});

app.use('/api/auth/register', otpLimiter);
app.use('/api/auth/verify-otp', otpLimiter);
app.use('/api/auth/resend-otp', otpLimiter);
```

### 3D. CAPTCHA Implementation

#### Option A: Google reCAPTCHA v3 (Recommended for Production)
Add to `index.html`:
```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>
```

In the signup form, before submitting:
```jsx
const captchaToken = await window.grecaptcha.execute('YOUR_SITE_KEY', { action: 'register' });
// Send captchaToken to backend
```

Backend verification:
```js
async function verifyCaptcha(token) {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.RECAPTCHA_SECRET}&response=${token}`
  });
  const data = await res.json();
  return data.success && data.score >= 0.5;
}
```

#### Option B: Custom CAPTCHA (For Dev/No-API-Key)
Create `frontend/src/components/CustomCaptcha.jsx`:
- Generates a simple math question (e.g., "۳ + ۵ = ?")
- Or displays 4 images, asks user to click the one with tea
- Persian/Farsi labels
- Returns a boolean `verified` state

This is a good fallback for development and can coexist with reCAPTCHA.

### 3E. Frontend — New Pages

#### `frontend/src/pages/Signup.jsx`
Two-step form:
- **Step 1:** Name, Email OR Mobile (toggle), Password, CAPTCHA, Submit → triggers OTP send
- **Step 2:** 6-digit OTP input (individual digit boxes), Resend timer (60s countdown), Verify button

Persian labels:
```jsx
// Field labels
"نام و نام خانوادگی"
"ایمیل یا شماره موبایل"
"رمز عبور"
"تایید ربات"
"ارسال کد تایید"

// Step 2
"کد تایید را وارد کنید"
"ارسال مجدد کد"
"تایید و ثبت نام"
```

Design details:
- Centered card layout (matching AdminLogin style)
- Step indicator (1/2 dots or progress bar)
- OTP input: 6 individual `<input maxLength={1}>` boxes with auto-focus forwarding
- Back button on step 2
- Timer countdown on resend button
- Loading spinner on submit
- Error toast on failure
- Success → auto-login → redirect to home

#### `frontend/src/pages/CustomerLogin.jsx`
Simple login form:
- Email/Phone + Password
- "هنوز ثبت نام نکردید؟ ثبت نام" link
- "ورود با گوگل" button (reuses existing Google auth mock)
- JWT stored in localStorage as `customerToken`
- Redirect to home after login

### 3F. Frontend — New Context

#### `frontend/src/context/AuthContext.jsx`
Customer auth context (separate from AdminContext):
```jsx
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('customerToken') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verify token on mount
    if (token) {
      axios.get(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => setUser(res.data.user))
        .catch(() => { localStorage.removeItem('customerToken'); setToken(null); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = (token, user) => {
    localStorage.setItem('customerToken', token);
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('customerToken');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 3G. Navbar Integration
Add to `Navbar.jsx`:
- If `user` from AuthContext exists: show user avatar/name + dropdown (profile, orders, logout)
- If not logged in: show "ورود / ثبت نام" button linking to `/login`
- Replace the current "مدیریت" link with a separate admin icon (or keep it but make it less prominent)

### 3H. App.jsx Route Additions
```jsx
import Signup from './pages/Signup';
import CustomerLogin from './pages/CustomerLogin';
import { AuthProvider } from './context/AuthContext';

// Inside Router:
<AuthProvider>
  <Routes>
    {/* ... existing routes ... */}
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<CustomerLogin />} />
  </Routes>
</AuthProvider>
```

### 3I. Files to Create (Auth System)
| File | Purpose |
|------|---------|
| `frontend/src/pages/Signup.jsx` | Two-step registration page |
| `frontend/src/pages/CustomerLogin.jsx` | Customer login page |
| `frontend/src/context/AuthContext.jsx` | Customer auth state |
| `frontend/src/components/CustomCaptcha.jsx` | CAPTCHA component (fallback) |
| `frontend/src/components/OtpInput.jsx` | 6-digit OTP input component |

### 3J. Files to Modify (Auth System)
| File | Changes |
|------|---------|
| `backend/server.js` | Add register, verify-otp, resend-otp endpoints; extend login; add otpStore/pendingSignups arrays; add rate limiting |
| `frontend/src/App.jsx` | Add AuthProvider, new routes |
| `frontend/src/components/Navbar.jsx` | Auth-aware nav (login/signup vs profile) |
| `frontend/package.json` | No new deps needed (all framer-motion already installed) |
| `backend/package.json` | Add nodemailer, express-rate-limit |

---

## 4. Implementation Order

### Phase 1: Foundation (Color Palette)
**Goal:** Update the visual foundation before adding animations.
**Estimated files touched:** 6-8

| Step | Action | Files |
|------|--------|-------|
| 1.1 | Update Tailwind config with new color scales | `tailwind.config.js` |
| 1.2 | Update CSS variables in index.css | `src/index.css` |
| 1.3 | Replace hardcoded hex colors in pages/components with Tailwind classes | `Home.jsx`, `AdminLogin.jsx`, `Footer.jsx`, `Navbar.jsx` |
| 1.4 | Verify all color references are consistent | Grep for old hex values |

### Phase 2: Animation System
**Goal:** Build the animation infrastructure and apply across site.
**Estimated files touched:** 4 new + 7 modified

| Step | Action | Files |
|------|--------|-------|
| 2.1 | Add new keyframes/animations to Tailwind config | `tailwind.config.js` |
| 2.2 | Create ScrollReveal component | NEW: `components/ScrollReveal.jsx` |
| 2.3 | Create SkeletonProduct component | NEW: `components/SkeletonProduct.jsx` |
| 2.4 | Create RippleButton component | NEW: `components/RippleButton.jsx` |
| 2.5 | Create PageTransition component | NEW: `components/PageTransition.jsx` |
| 2.6 | Add PageTransition to App.jsx (wrap Routes) | `App.jsx` |
| 2.7 | Enhance Navbar scroll effects | `Navbar.jsx` |
| 2.8 | Enhance Hero with parallax + stagger | `Home.jsx` |
| 2.9 | Replace scroll-reveal CSS with ScrollReveal components in Home | `Home.jsx` |
| 2.10 | Add count-up animation to stats | `Home.jsx` |
| 2.11 | Add loading skeletons to Shop + Home | `Shop.jsx`, `Home.jsx` |
| 2.12 | Enhance ProductCard with motion hover | `ProductCard.jsx` |
| 2.13 | Add AnimatePresence to CartDrawer | `CartDrawer.jsx` |
| 2.14 | Add AnimatePresence to MegaMenu | `MegaMenu.jsx` |
| 2.15 | Add micro-interaction CSS utilities | `src/index.css` |

### Phase 3: Auth System Backend
**Goal:** Build the server-side auth endpoints.
**Estimated files touched:** 2-3

| Step | Action | Files |
|------|--------|-------|
| 3.1 | Install backend dependencies (nodemailer, express-rate-limit) | `backend/package.json` |
| 3.2 | Add OTP store, pending signups arrays | `backend/server.js` |
| 3.3 | Add rate limiting middleware | `backend/server.js` |
| 3.4 | Add POST /api/auth/register endpoint | `backend/server.js` |
| 3.5 | Add POST /api/auth/verify-otp endpoint | `backend/server.js` |
| 3.6 | Add POST /api/auth/resend-otp endpoint | `backend/server.js` |
| 3.7 | Modify POST /api/auth/login to accept phone | `backend/server.js` |
| 3.8 | Add OTP send functions (console.log for dev) | `backend/server.js` |
| 3.9 | Test all endpoints with curl/Postman | Manual testing |

### Phase 4: Auth System Frontend
**Goal:** Build the customer-facing auth UI.
**Estimated files touched:** 5 new + 3 modified

| Step | Action | Files |
|------|--------|-------|
| 4.1 | Create AuthContext | NEW: `context/AuthContext.jsx` |
| 4.2 | Create OtpInput component | NEW: `components/OtpInput.jsx` |
| 4.3 | Create CustomCaptcha component | NEW: `components/CustomCaptcha.jsx` |
| 4.4 | Create Signup page (two-step) | NEW: `pages/Signup.jsx` |
| 4.5 | Create CustomerLogin page | NEW: `pages/CustomerLogin.jsx` |
| 4.6 | Add AuthProvider + new routes to App.jsx | `App.jsx` |
| 4.7 | Update Navbar for auth-aware display | `Navbar.jsx` |
| 4.8 | End-to-end testing of signup flow | Manual testing |

### Phase 5: Polish & Testing
| Step | Action |
|------|--------|
| 5.1 | Test RTL layout for all new components |
| 5.2 | Test responsive design (mobile, tablet, desktop) |
| 5.3 | Test all animations on slow devices |
| 5.4 | Test auth flow end-to-end (register → OTP → login → logout) |
| 5.5 | Verify no console errors or warnings |
| 5.6 | Performance check: no animation jank, smooth 60fps |

---

## Summary of All New/Modified Files

### New Files (10)
| Path | Purpose |
|------|---------|
| `frontend/src/components/PageTransition.jsx` | Route change animations |
| `frontend/src/components/ScrollReveal.jsx` | Scroll-triggered reveal |
| `frontend/src/components/SkeletonProduct.jsx` | Loading skeleton |
| `frontend/src/components/RippleButton.jsx` | Click ripple effect |
| `frontend/src/components/OtpInput.jsx` | 6-digit OTP input |
| `frontend/src/components/CustomCaptcha.jsx` | Human verification |
| `frontend/src/pages/Signup.jsx` | Two-step registration |
| `frontend/src/pages/CustomerLogin.jsx` | Customer login |
| `frontend/src/context/AuthContext.jsx` | Customer auth state |

### Modified Files (10)
| Path | Changes |
|------|---------|
| `frontend/tailwind.config.js` | New color palette + animation keyframes |
| `frontend/src/index.css` | New CSS variables + utility classes |
| `frontend/src/App.jsx` | AuthProvider, PageTransition, new routes |
| `frontend/src/pages/Home.jsx` | Hero parallax, stagger, count-up, ScrollReveal, skeletons |
| `frontend/src/pages/Shop.jsx` | Loading skeletons, staggered grid |
| `frontend/src/components/Navbar.jsx` | Scroll effects, auth-aware display |
| `frontend/src/components/ProductCard.jsx` | Motion hover effects |
| `frontend/src/components/CartDrawer.jsx` | AnimatePresence |
| `frontend/src/components/MegaMenu.jsx` | AnimatePresence |
| `backend/server.js` | Register/verify/resend endpoints, rate limiting |
| `backend/package.json` | nodemailer, express-rate-limit |

### Dependencies to Install
```bash
# Frontend (no new deps — framer-motion already installed)
cd frontend && npm ls framer-motion  # verify v12+

# Backend
cd backend && npm install nodemailer express-rate-limit
```
