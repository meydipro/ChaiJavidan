import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="card h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-square bg-gradient-to-br from-[#FAF7F0] to-[#F0EBE0] dark:from-[#1E2A22] dark:to-[#141A16] overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 to-[#C9A84C]/10 animate-pulse"></div>
          )}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Discount badge */}
          {discount > 0 && (
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#1B3A2B] text-[#D4B85C] text-[10px] font-bold rounded-lg shadow-lg">
              {discount}%-
            </div>
          )}

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 bg-white/90 dark:bg-[#1E2A22]/90 backdrop-blur-sm shadow-lg px-3 py-2 rounded-xl flex items-center gap-1.5 text-xs font-bold text-[#1B3A2B] dark:text-[#D4B85C] hover:bg-[#D4B85C] hover:text-white active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">افزودن</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Name & Region */}
          <div className="mb-2">
            <h3 className="font-bold text-sm leading-tight text-[#8B6914] dark:text-[#D4B85C] line-clamp-1 group-hover:text-[#C9A84C] transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] text-[#C9A84C]/60 bg-[#C9A84C]/5 px-2 py-0.5 rounded-md">{product.region}</span>
              <span className="text-[10px] text-[#C9A84C]/60">•</span>
              <span className="text-[10px] text-[#C9A84C]/60">{product.category}</span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-auto pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-black text-[#8B6914] dark:text-[#D4B85C]">
                {product.price.toLocaleString('fa-IR')}
              </span>
              <span className="text-[10px] text-[#C9A84C]/50">تومان</span>
            </div>
            {product.originalPrice && (
              <div className="text-xs text-[#C9A84C]/40 line-through mt-0.5">
                {product.originalPrice.toLocaleString('fa-IR')} تومان
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#C9A84C]/8 dark:border-[#2D3D32]/40">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-[#D4B85C] fill-[#D4B85C]' : 'text-[#C9A84C]/15'}`}
                />
              ))}
            </div>
            <span className="text-[10px] text-[#C9A84C]/40 font-medium">{product.rating}</span>
            <span className="text-[10px] text-[#C9A84C]/25 mr-auto">({product.reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(ProductCard);
