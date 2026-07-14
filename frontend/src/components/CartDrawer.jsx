import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, setIsOpen }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="ml-auto w-full max-w-md bg-white dark:bg-[#1E2A22] h-full shadow-2xl flex flex-col relative">
        <div className="flex items-center justify-between px-6 py-6 border-b dark:border-[#2D3D32]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-100 dark:bg-gold-950 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-gold-600 dark:text-gold-400" />
            </div>
            <div>
              <div className="text-lg text-gold-800 dark:text-gold-300 font-bold">سبد خرید</div>
              <div className="text-xs text-gold-500 dark:text-gold-400">{cart.length} مورد</div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gold-50 dark:hover:bg-gold-950 rounded-xl transition-colors">
            <X className="w-5 h-5 text-gold-600" />
          </button>
        </div>

        {cart.length > 0 ? (
          <>
            <div className="flex-1 overflow-auto px-6 py-4 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 bg-gold-50/50 dark:bg-gold-950/20 p-3 rounded-2xl">
                  <div className="w-20 h-20 bg-gold-50 dark:bg-gold-950/30 rounded-xl overflow-hidden flex-shrink-0 border border-gold-100 dark:border-[#2D3D32]">
                    <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-sm leading-snug pr-2">{item.name}</div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gold-400 hover:text-red-500 transition-colors p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs text-gold-600 dark:text-gold-400 mt-1">{item.region}</div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="font-semibold text-sm text-gold-800 dark:text-gold-300">{(item.price * item.quantity).toLocaleString('fa-IR')} تومان</div>

                      <div className="flex items-center gap-1 border border-gold-200 dark:border-[#2D3D32] rounded-full px-1 py-0.5 bg-white dark:bg-[#1E2A22]">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-gold-100 dark:hover:bg-gold-900 rounded-full transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold min-w-[20px] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-gold-100 dark:hover:bg-gold-900 rounded-full transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t dark:border-[#2D3D32] px-6 py-6 bg-gold-50/30 dark:bg-gold-950/10">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-gold-600 dark:text-gold-400 text-sm">جمع کل</span>
                <span className="font-bold text-xl text-gold-800 dark:text-gold-300">{cartTotal.toLocaleString('fa-IR')} تومان</span>
              </div>

              <Link to="/cart" onClick={() => setIsOpen(false)}>
                <button className="btn-gold w-full mb-3">ادامه خرید و پرداخت</button>
              </Link>
              <button onClick={clearCart} className="text-sm text-gold-500 dark:text-gold-400 w-full py-2 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                خالی کردن سبد
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-20 h-20 bg-gold-100 dark:bg-gold-950 rounded-full flex items-center justify-center mb-5">
              <ShoppingBag className="w-10 h-10 text-gold-400 dark:text-gold-600" />
            </div>
            <div className="font-medium text-lg text-gold-800 dark:text-gold-300">سبد خرید شما خالی است</div>
            <p className="text-sm text-gold-500 dark:text-gold-400 mt-2">محصولات مورد علاقه خود را اضافه کنید</p>
            <Link to="/shop" className="mt-6">
              <button onClick={() => setIsOpen(false)} className="btn-gold px-8">مشاهده فروشگاه</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
