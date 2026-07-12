import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const API = 'http://localhost:5001/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API}/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        // fallback
        setProduct({
          id: parseInt(id),
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
          reviews: 124
        });
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return (
    <div className="pt-28 max-w-4xl mx-auto px-6 py-20">در حال بارگذاری...</div>
  );

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="pt-28 max-w-6xl mx-auto px-6 pb-20">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-gold-700 mt-8 mb-8 hover:text-gold-900">
        <ArrowLeft className="w-4 h-4" /> بازگشت به فروشگاه
      </Link>

      <div className="grid md:grid-cols-2 gap-14">
        {/* Image */}
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden bg-white dark:bg-[#1E2A22] shadow-inner border border-gold-100 dark:border-[#2D3D32]">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="absolute top-5 right-5 px-4 py-1 text-sm bg-white dark:bg-[#1E2A22] rounded-2xl border border-gold-100 dark:border-[#2D3D32] shadow-sm">
            {product.region}
          </div>
        </div>

        {/* Info */}
        <div className="pt-2">
          <div className="badge mb-3">{product.category}</div>
          
          <h1 className="text-5xl font-semibold tracking-[-1.6px] leading-none">{product.name}</h1>

          <div className="flex items-center gap-4 mt-5">
            <div className="flex items-baseline">
              <span className="text-3xl font-semibold">{product.price.toLocaleString('fa-IR')}</span>
              <span className="text-sm text-gold-600 dark:text-gold-400 mr-1.5">تومان</span>
            </div>
            {product.originalPrice && (
              <span className="line-through text-gold-500 dark:text-gold-400 text-xl">{product.originalPrice.toLocaleString('fa-IR')}</span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-4 mb-7">
            <div className="flex text-gold-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="text-sm text-gold-600 dark:text-gold-400">{product.rating} • {product.reviews} نظر</span>
          </div>

          <p className="text-gold-700 dark:text-gold-400 text-[15px] leading-relaxed">{product.description}</p>

          <div className="mt-5 bg-gold-50 dark:bg-gold-950 text-gold-700 dark:text-gold-400 px-4 py-3 text-xs rounded-2xl inline-block">
            {product.details || "۵۰۰ گرم • کیفیت ممتاز"}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-gold-200 dark:border-[#2D3D32] rounded-2xl overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-gold-50">-</button>
              <div className="px-6 font-medium">{quantity}</div>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-gold-50">+</button>
            </div>

            <button 
              onClick={handleAdd} 
              className="flex-1 btn-gold py-4 text-base"
            >
              افزودن به سبد خرید
            </button>
          </div>

          <div className="text-xs mt-4 flex gap-4 text-gold-500 dark:text-gold-400">
            <div>ارسال سریع • </div>
            <div>۷ روز گارانتی بازگشت</div>
          </div>

          <div className="mt-10 pt-6 border-t border-gold-100 dark:border-[#2D3D32] text-xs leading-relaxed text-gold-600 dark:text-gold-400">
            این محصول از مزارع {product.region} تهیه شده و پس از کنترل دقیق کیفیت، بسته‌بندی و ارسال می‌شود.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
