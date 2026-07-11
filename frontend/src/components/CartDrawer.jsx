import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
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
      <div className="ml-auto w-full max-w-md bg-white dark:bg-[#2A2520] h-full shadow-2xl flex flex-col relative">
        <div className="flex items-center justify-between px-6 py-6 border-b dark:border-[#3D3630]">
          <div>
            <div className="text-xl text-gold-800 dark:text-gold-300 font-bold">سبد خرید</div>
            <div className="text-xs text-gold-500 dark:text-gold-400">{cart.length} مورد</div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {cart.length > 0 ? (
          <>
            <div className="flex-1 overflow-auto px-6 py-4 space-y-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-gold-50 dark:bg-gold-950/30 rounded-2xl overflow-hidden flex-shrink-0 border border-gold-100 dark:border-[#3D3630]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <div className="font-medium text-sm leading-snug pr-2">{item.name}</div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    <div className="text-xs text-gold-600 dark:text-gold-400 mt-px">{item.region}</div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="font-medium text-sm">{(item.price * item.quantity).toLocaleString('fa-IR')} تومان</div>
                      
                      <div className="flex items-center gap-1 border border-gold-200 dark:border-[#3D3630] rounded-full px-1 py-px">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t dark:border-[#3D3630] px-6 py-6">
              <div className="flex justify-between items-baseline mb-4 text-sm">
                <span className="text-gold-600 dark:text-gold-400">جمع کل</span>
                <span className="font-semibold text-xl">{cartTotal.toLocaleString('fa-IR')} تومان</span>
              </div>

              <Link to="/cart" onClick={() => setIsOpen(false)}>
                <button className="btn-gold w-full mb-2">ادامه خرید و پرداخت</button>
              </Link>
              <button onClick={clearCart} className="text-sm text-gold-500 dark:text-gold-400 w-full py-1 hover:text-gold-700 dark:hover:text-gold-300">خالی کردن سبد</button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="w-16 h-16 bg-gold-100 dark:bg-gold-950 rounded-full flex items-center justify-center mb-5">
              <div className="text-4xl">🍵</div>
            </div>
            <div className="font-medium text-lg">سبد خرید شما خالی است</div>
            <Link to="/shop" className="mt-4">
              <button onClick={() => setIsOpen(false)} className="btn-outline">مشاهده فروشگاه</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
