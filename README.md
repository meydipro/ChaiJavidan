# Chai Javidan | Premium Tea Website
# چای جاویدان | وبسایت فروش چای ممتاز

A full-featured premium tea e-commerce website with a luxurious gold theme, smooth iOS-like animations, and a complete admin panel.

وبسایت کامل فروش چای ممتاز با تم طلایی لوکس، انیمیشن‌های نرم iOS-like و پنل ادمین کامل.

---

## Features / ویژگی‌ها

| Feature | Description |
|---------|-------------|
| **Luxury Gold Design** | Golden tea cup logo with premium visual identity |
| **Smooth Animations** | Framer Motion powered transitions and scroll reveals |
| **Dynamic Mega Menu** | Categories and region-based filters (Gilan & Bushehr) |
| **Complete Pages** | Home, Shop, Product Detail, About, Contact, Cart |
| **Advanced Filters** | Filter by region, tea type, and price range |
| **Admin Panel** | Full product & content management with secure login |
| **Responsive** | Optimized for mobile, tablet, and desktop |
| **GitHub Pages** | Deployed on GitHub Pages with HashRouter |

| ویژگی | توضیحات |
|-------|---------|
| **طراحی لوکس طلایی** | لوگوی طلایی فنجان چای با هویت بصری ممتاز |
| **انیمیشن‌های نرم** | انتقال‌ها و scroll reveal با Framer Motion |
| **مگامنو داینامیک** | دسته‌بندی‌ها و فیلتر بر اساس استان (گیلان و بوشهر) |
| **صفحات کامل** | خانه، فروشگاه، جزئیات محصول، درباره، تماس، سبد خرید |
| **فیلترهای پیشرفته** | فیلتر بر اساس استان، نوع چای و محدوده قیمت |
| **پنل ادمین** | مدیریت کامل محصولات و محتوا با ورود امن |
| **واکنش‌گرا** | بهینه‌شده برای موبایل، تبلت و دسکتاپ |
| **GitHub Pages** | استقرار روی GitHub Pages با HashRouter |

---

## Tech Stack / تکنولوژی‌ها

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **UI**: Framer Motion, Lucide Icons, Radix UI
- **Auth**: JWT (JSON Web Tokens), bcryptjs
- **Deploy**: GitHub Pages (frontend) + Render (backend)

---

## Getting Started / راه‌اندازی

### Prerequisites / پیش‌نیازها

- Node.js 18+
- npm or yarn

### Installation / نصب

```bash
# Clone the repository / کلون کردن مخزن
git clone https://github.com/meydipro/ChaiJavidan.git
cd ChaiJavidan

# Frontend / فرانت‌اند
cd frontend
npm install
npm run dev

# Backend (in a separate terminal) / بک‌اند (ترمینال جداگانه)
cd backend
npm install
npm run dev
```

### Configuration / تنظیمات

- Backend runs on `http://localhost:5001`
- Frontend runs on `http://localhost:5173`
- Admin panel: Go to `/admin` and login with:
  - Email: `admin@chaijavidan.com`
  - Password: `admin123`

- بک‌اند روی `http://localhost:5001` اجرا می‌شود
- فرانت‌اند روی `http://localhost:5173` اجرا می‌شود
- پنل ادمین: به `/admin` بروید و وارد شوید:
  - ایمیل: `admin@chaijavidan.com`
  - رمز عبور: `admin123`

---

## Project Structure / ساختار پروژه

```
tea-website/
├── frontend/
│   ├── src/
│   │   ├── components/    # Navbar, MegaMenu, ProductCard, Footer ...
│   │   ├── pages/         # Home, Shop, Admin, About, Contact ...
│   │   ├── context/       # Cart, Admin, Auth, Theme providers
│   │   └── App.jsx        # Main app with HashRouter
│   ├── public/            # Static assets (logo, icons, fonts)
│   └── vite.config.js     # Vite config with base path
├── backend/
│   └── server.js          # Express API server
├── render.yaml            # Render deployment config
└── .github/workflows/     # GitHub Actions CI/CD
```

---

## Pages / صفحات

| Page | Route | Description |
|------|-------|-------------|
| Home | `/#/` | Hero, featured products, testimonials, newsletter |
| Shop | `/#/shop` | All products with filters and sorting |
| Product | `/#/product/:id` | Product detail with add to cart |
| About | `/#/about` | Brand story and values |
| Contact | `/#/contact` | Contact form and information |
| Cart | `/#/cart` | Shopping cart drawer |
| Admin | `/#/admin` | Product & content management |
| Login | `/#/login` | Customer authentication |
| Signup | `/#/signup` | New account registration |

---

## API Endpoints / پایانه‌های API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Add product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |
| GET | `/api/content` | Get site content |
| PUT | `/api/content` | Update site content (admin) |
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/register` | Customer registration with OTP |
| POST | `/api/auth/customer-login` | Customer login |
| POST | `/api/orders` | Create order |

---

## Notes / نکات

- Data is currently in-memory. For production, add MongoDB or another database.
- Google login is a demo mock. Integrate `google-auth-library` for real authentication.
- All admin panel changes are applied via the API in real-time.

- داده‌ها در حال حاضر در حافظه (in-memory) هستند. برای محصول نهایی MongoDB اضافه کنید.
- ورود با گوگل دمو است. می‌توانید با google-auth-library واقعی کنید.
- تمام تغییرات پنل ادمین به صورت واقعی روی API اعمال می‌شود.

---

Made with ❤️ for Chai Javidan / ساخته شده با ❤️ برای چای جاویدان
