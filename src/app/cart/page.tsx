"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import ProtectedRoute from '@/Components/ProtectedRoute';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <ProtectedRoute>
      <div className="min-h-[60vh] bg-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="border-b border-zinc-200 pb-8 mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-widest uppercase">Shopping Cart</h1>
            <p className="text-sm text-zinc-500 mt-2 font-medium tracking-wide">Review your items before checkout.</p>
          </div>
          <span className="text-sm font-medium text-zinc-500 uppercase tracking-widest">{cartItems.length} Items</span>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-zinc-900 mb-2 tracking-wide">Your cart is empty</h2>
            <p className="text-zinc-500 mb-8 max-w-sm">
              Looks like you haven&apos;t added anything to your cart yet. Explore our collections to find something you love.
            </p>
            <Link 
              href="/"
              className="px-8 py-4 bg-zinc-900 text-white text-xs font-bold tracking-widest uppercase hover:bg-black transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items List */}
            <div className="flex-1 space-y-8">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex flex-col sm:flex-row gap-6 border border-zinc-100 p-4">
                  <div className="w-full sm:w-32 h-40 bg-zinc-100 flex-shrink-0 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-base font-bold text-zinc-900 mb-1">
                          <Link href={`/product/${item.cartItemId.split('-')[0]}`} className="hover:underline">
                            {item.name}
                          </Link>
                        </h3>
                        {(item.size || item.color) && (
                          <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                            {item.color} {item.size && `| Size: ${item.size}`}
                          </p>
                        )}
                      </div>
                      <p className="text-lg font-bold text-zinc-900">₹{item.price}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center border border-zinc-200">
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
                        >-</button>
                        <span className="w-10 text-center text-sm font-bold text-zinc-900">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
                        >+</button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-xs font-bold text-zinc-400 uppercase tracking-widest hover:text-red-500 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="bg-zinc-50 p-8 border border-zinc-100 sticky top-32">
                <h2 className="text-lg font-bold tracking-widest text-zinc-900 uppercase mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm text-zinc-600">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-zinc-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-zinc-600">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                
                <div className="border-t border-zinc-200 pt-6 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-zinc-900 uppercase tracking-wider">Total</span>
                    <span className="text-2xl font-black text-zinc-900">₹{cartTotal}</span>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  className="w-full py-4 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors text-center block"
                >
                  Proceed to Checkout
                </Link>

                <div className="mt-6 flex items-center justify-center gap-2 text-zinc-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-xs font-medium tracking-wide">Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}
