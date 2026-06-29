"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import WishlistButton from "./WishlistButton";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ProductCard({ product }: { product: any }) {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  
  // Simulated discount and rating for the UI
  const discountPercent = 32;
  const originalPrice = product.price / (1 - discountPercent / 100); 
  const rating = 5;
  const reviews = Math.floor(product.price % 200) + 50; // just deterministic randomish

  const cartItemId = `${product._id}-${product.sizes?.[0] || "default"}-${product.colors?.[0] || "default"}`;
  const cartItem = cartItems.find(i => i.cartItemId === cartItemId);
  const count = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
      size: product.sizes?.[0] || "",
      color: product.colors?.[0] || ""
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `/product/${product._id}`;
  };

  return (
    <motion.div 
      className="group relative flex-none w-[280px] lg:w-[320px] snap-start bg-transparent pb-4"
    >
      <div className="aspect-[3/4] w-full overflow-hidden bg-[#fdfcfb] relative cursor-pointer mb-3">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          {product.isNewProduct && (
            <span className="bg-white text-black px-2 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm">New</span>
          )}
          <span className="bg-[#D4AF37] text-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm">-{discountPercent}%</span>
        </div>

        <WishlistButton product={product} />

        <Link href={`/product/${product._id}`}>
          {/* Default Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className={`h-full w-full object-cover object-top transition-all duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${product.images.length > 1 ? 'group-hover:opacity-0 absolute inset-0' : 'group-hover:scale-110'}`}
          />
          {/* Hover Image */}
          {product.images.length > 1 && (
             // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[1]}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover object-top absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-[1.5s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 origin-center"
            />
          )}
        </Link>

        {/* Hover Action Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/50 to-transparent flex gap-2">
          {count === 0 ? (
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-white text-black text-[11px] font-bold py-3 uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex-1 bg-white text-black text-[11px] font-bold py-0 flex items-center justify-between uppercase tracking-wider">
              <button 
                onClick={(e) => { 
                  e.preventDefault(); 
                  if (count > 1) updateQuantity(cartItemId, count - 1); 
                  else removeFromCart(cartItemId); 
                }}
                className="w-8 h-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                -
              </button>
              <span className="flex-1 text-center py-3">{count}</span>
              <button 
                onClick={(e) => { 
                  e.preventDefault(); 
                  updateQuantity(cartItemId, count + 1); 
                }}
                className="w-8 h-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                +
              </button>
            </div>
          )}
          <button 
            onClick={handleQuickView}
            className="flex-1 bg-black/80 backdrop-blur-md text-white text-[11px] font-bold py-3 uppercase tracking-wider hover:bg-[#D4AF37] transition-colors"
          >
            Quick View
          </button>
        </div>
      </div>

      <div className="px-4">
        <div className="text-[10px] text-zinc-400 font-medium mb-1 uppercase tracking-wider flex justify-between items-center">
          <span>{product.subcategory || product.category}</span>
          <div className="flex items-center text-[#D4AF37]">
            {'★'.repeat(rating)}<span className="text-zinc-400 text-[10px] ml-1">({reviews})</span>
          </div>
        </div>
        <Link href={`/product/${product._id}`} className="block">
          <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-[#D4AF37] transition-colors truncate">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2.5">
          <p className="text-lg font-extrabold text-zinc-900 tracking-tight">₹{product.price}</p>
          <p className="text-sm text-zinc-400 line-through decoration-zinc-300">₹{Math.round(originalPrice)}</p>
        </div>
      </div>
    </motion.div>
  );
}
