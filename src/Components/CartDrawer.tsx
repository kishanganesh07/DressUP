"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-zinc-200 shadow-2xl flex flex-col transition-transform transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-zinc-200">
          <h2 className="text-xl font-medium text-zinc-900 uppercase tracking-widest">Cart</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 border border-zinc-200 rounded-full flex items-center justify-center text-zinc-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-zinc-500 text-base">Your cart is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-zinc-900 font-medium border-b border-zinc-900 pb-0.5 hover:text-zinc-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.cartItemId} className="flex gap-4 border-b border-zinc-100 pb-6 mb-6 last:border-0 last:mb-0 last:pb-0">
                <div className="w-24 h-32 bg-zinc-100 flex-shrink-0 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-zinc-900 line-clamp-2 pr-4">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-zinc-400 hover:text-zinc-900 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    {(item.size || item.color) && (
                      <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">
                        {item.color} {item.size && `| ${item.size}`}
                      </p>
                    )}
                    <p className="text-zinc-900 text-sm mt-2">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Control */}
                    <div className="flex items-center gap-3 border border-zinc-200 px-3 py-1.5">
                      <button 
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="text-zinc-500 hover:text-zinc-900 transition-colors"
                      >-</button>
                      <span className="text-zinc-900 text-sm w-4 text-center font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="text-zinc-500 hover:text-zinc-900 transition-colors"
                      >+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-zinc-200 bg-zinc-50">
            <div className="flex items-center justify-between mb-6">
              <span className="text-zinc-600 font-medium uppercase tracking-wider text-sm">Subtotal</span>
              <span className="text-xl font-medium text-zinc-900">${cartTotal.toFixed(2)}</span>
            </div>
            <Link 
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full block text-center py-4 bg-zinc-900 text-white font-bold text-sm hover:bg-black transition-colors uppercase tracking-widest"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
