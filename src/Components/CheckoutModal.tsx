"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutModal({ onClose }: { onClose: () => void }) {
  const { cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<"details" | "success">("details");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call and payment processing
    setTimeout(() => {
      setLoading(false);
      setStep("success");
      clearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white">
            {step === "details" ? "Secure Checkout" : "Order Confirmed"}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {step === "details" ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-purple-400 uppercase tracking-wider">Shipping Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 col-span-2 sm:col-span-1">
                    <label className="text-xs text-zinc-400">First Name</label>
                    <input required type="text" className="w-full px-4 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-purple-500 text-white" />
                  </div>
                  <div className="space-y-1 col-span-2 sm:col-span-1">
                    <label className="text-xs text-zinc-400">Last Name</label>
                    <input required type="text" className="w-full px-4 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-purple-500 text-white" />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-xs text-zinc-400">Address</label>
                    <input required type="text" className="w-full px-4 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-purple-500 text-white" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-purple-400 uppercase tracking-wider">Payment Information</h3>
                <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center text-sm text-zinc-400">
                  Card processing is simulated for this demo.
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <div className="flex justify-between text-lg font-bold text-white mb-6">
                  <span>Total to pay:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl text-white font-bold hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    "Complete Purchase"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Thank you!</h3>
              <p className="text-zinc-400 mb-8">Your order has been placed successfully. A confirmation email has been sent.</p>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-white text-zinc-950 font-bold rounded-xl hover:bg-zinc-200 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
