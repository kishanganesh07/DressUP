"use client";

import { useWishlist } from "@/context/WishlistContext";
import React from "react";

type WishlistButtonProps = {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  className?: string;
  iconClassName?: string;
};

export default function WishlistButton({ product, className, iconClassName }: WishlistButtonProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist({
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || ""
        });
      }}
      className={className || `absolute top-3 right-3 z-20 transition-colors bg-white/80 p-1.5 rounded-full hover:bg-white ${inWishlist ? 'text-red-500 opacity-100' : 'text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100'}`}
      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <svg className={iconClassName ? `${iconClassName} ${inWishlist ? 'text-red-500 fill-current' : ''}` : `w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </svg>
    </button>
  );
}
