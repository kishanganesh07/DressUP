"use client";

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import ProtectedRoute from '@/Components/ProtectedRoute';

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist } = useWishlist();

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="border-b border-zinc-200 pb-8 mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-widest uppercase">My Wishlist</h1>
            <p className="text-sm text-zinc-500 mt-2 font-medium tracking-wide">Save your favorite items for later.</p>
          </div>
          <span className="text-sm font-medium text-zinc-500 uppercase tracking-widest">{wishlistItems.length} Items</span>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-zinc-900 mb-2 tracking-wide">Your wishlist is empty</h2>
            <p className="text-zinc-500 mb-8 max-w-sm">
              Looks like you haven&apos;t added anything to your wishlist yet. Explore our collections to find something you love.
            </p>
            <Link 
              href="/"
              className="px-8 py-4 bg-zinc-900 text-white text-xs font-bold tracking-widest uppercase hover:bg-black transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {wishlistItems.map((item) => (
              <div key={item._id} className="group relative">
                <div className="aspect-[3/4] bg-zinc-100 overflow-hidden mb-4 relative">
                  <button 
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-3 right-3 z-10 text-red-500 bg-white/80 p-1.5 rounded-full hover:bg-white"
                  >
                    <svg className="w-4 h-4 fill-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <Link href={`/product/${item._id}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  </Link>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 mb-1 truncate pr-4">
                    <Link href={`/product/${item._id}`}>{item.name}</Link>
                  </h3>
                  <p className="text-sm text-zinc-500 font-medium">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}
