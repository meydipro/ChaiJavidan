import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-28 max-w-md mx-auto px-6 py-24 text-center">
        <div className="text-6xl mb-5">🛍️</div>
        <h2 className="text-3xl font-semibold tracking-tight">سبد خرید خالی است</h2>
        <p className="mt-3 text-gold-600 dark:text-gold-400">چای دلخواه خود را از فروشگاه انتخاب کنید.</p>
        <Link to="/shop" className="mt-6 inline-block btn-gold">بازگشت به فروشگاه</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 max-w-4xl mx-auto px-6 pb-16">
      <h1 className="text-4xl tracking-tight font-semibold mt-8 mb-8">سبد خرید</h1>

      <div className="grid md:grid-cols-5 gap-x-9">
        <div className="md:col-span-3">
          <div className="space-y-5">
            {cart.map(item => (
              <div key={item.id} className="card flex gap-5 p-5">
                <div className="w-[88px] h-[88px] flex-shrink-0 rounded-2xl overflow-hidden border border-gold-100 dark:border-[#3D3630]">
                  <img src={item.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">{item.name}</div>
                      <div className="text-xs text-gold-600 dark:text-gold-400">{item.region}</div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400"><Trash2 size={15} /></button>
                  </div>
                  <div className="text-sm font-medium mt-3">{(item.price * item.quantity).toLocaleString('fa-IR')} تومان</div>
                  
                  <div className="mt-4 flex items-center gap-px bg-gold-50 dark:bg-gold-950 border border-gold-200 dark:border-[#3D3630] rounded-full w-fit text-sm">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-gold-600 dark:text-gold-400">-</button>
                    <span className="px-4 font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-gold-600 dark:text-gold-400">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="md:col-span-2 mt-8 md:mt-0">
          <div className="admin-card">
            <div className="font-medium text-lg mb-6">خلاصه سفارش</div>
            
            <div className="space-y-2 text-sm pb-4 border-b border-gold-100 dark:border-[#3D3630]">
              <div className="flex justify-between">
                <span>جمع محصولات</span> 
                <span>{cartTotal.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between">
                <span>ارسال</span> 
                <span className="text-green-600">رایگان</span>
              </div>
            </div>

            <div className="flex justify-between font-semibold text-lg pt-4">
              <span>جمع کل</span>
              <span>{cartTotal.toLocaleString('fa-IR')} تومان</span>
            </div>

            <button 
              onClick={() => alert('سفارش با موفقیت ثبت شد! (دمو)')}
              className="btn-gold w-full mt-8 py-[17px]"
            >
              تکمیل خرید
            </button>

            <button onClick={clearCart} className="w-full text-xs text-gold-500 dark:text-gold-400 mt-4 hover:text-gold-700 dark:hover:text-gold-300">خالی کردن سبد</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
