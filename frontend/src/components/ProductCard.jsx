import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="card h-full flex flex-col">
        <div className="relative aspect-square bg-gold-50 dark:bg-gold-950/30 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-img w-full h-full object-cover" 
          />
          
          {product.originalPrice && (
            <div className="absolute top-4 right-4 badge text-xs font-medium">تخفیف</div>
          )}
          
          <button 
            onClick={handleAddToCart}
            className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all bg-white dark:bg-[#1E2A22] shadow px-3 py-1.5 rounded-2xl flex items-center gap-1.5 text-xs font-medium text-gold-800 dark:text-gold-300 hover:bg-gold-50 dark:hover:bg-gold-950"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            افزودن
          </button>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="font-medium leading-tight text-sm tracking-tight">{product.name}</div>
              <div className="text-[11px] text-gold-600 dark:text-gold-400 mt-px">{product.region} • {product.category}</div>
            </div>
            
            <div className="text-right">
              <div className="font-semibold text-sm">{product.price.toLocaleString('fa-IR')}</div>
              {product.originalPrice && (
                <div className="text-xs text-gold-400 line-through">{product.originalPrice.toLocaleString('fa-IR')}</div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-gold-600 dark:text-gold-400 mt-auto pt-3 text-xs">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "text-gold-500 dark:text-gold-400" : "text-gold-200 dark:text-gold-700"}>★</span>
              ))}
            </div>
            <span className="text-[10px]">{product.rating}</span>
            <span className="ml-auto text-gold-400 dark:text-gold-500">({product.reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
