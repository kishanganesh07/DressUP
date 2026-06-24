"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/Components/ProtectedRoute";
import Script from "next/script";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<"details" | "success">("details");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {}
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!user) {
        throw new Error("You must be logged in to checkout.");
      }

      if (cartItems.length === 0) {
        throw new Error("Your cart is empty.");
      }

      // 1. Create Razorpay order on our backend
      const rzpRes = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotal }),
      });
      
      const rzpData = await rzpRes.json();
      
      if (!rzpData.success) {
        throw new Error(rzpData.message || "Failed to initiate payment");
      }

      // 2. Open Razorpay checkout modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: rzpData.amount, 
        currency: rzpData.currency,
        name: "Dress UP!",
        description: "Secure Payment for your order",
        order_id: rzpData.orderId,
        handler: async function (response: any) {
          try {
            // 3. Verify and save the order on our backend
            const orderRes = await fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: user._id,
                items: cartItems,
                shippingDetails,
                totalAmount: cartTotal,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              }),
            });

            const orderData = await orderRes.json();
            
            if (orderData.success) {
              setStep("success");
              clearCart();
            } else {
              setError(orderData.message || "Failed to process order verification.");
            }
          } catch (err: any) {
            setError(err.message || "An unexpected error occurred during verification.");
          }
        },
        prefill: {
          name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
          email: user.email,
          contact: shippingDetails.phone,
        },
        theme: {
          color: "#18181b", // zinc-900
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on('payment.failed', function (response: any){
        setError(`Payment Failed: ${response.error.description}`);
      });
      razorpayInstance.open();

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-[#fdfcfb] pt-32 pb-20 flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-10 border border-zinc-200 rounded-2xl shadow-sm text-center">
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif text-zinc-900 mb-3 tracking-wide">Order Confirmed</h2>
          <p className="text-zinc-500 mb-8 font-medium">Thank you for your purchase! We've received your order and will ship it shortly.</p>
          <Link
            href="/orders"
            className="inline-block w-full px-8 py-4 bg-zinc-900 text-white rounded-xl text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-black hover:-translate-y-0.5 hover:shadow-xl hover:shadow-zinc-900/20 transition-all"
          >
            View My Orders
          </Link>
          <Link
            href="/"
            className="inline-block mt-4 text-[11px] font-bold text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-widest border-b border-transparent hover:border-zinc-900"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="min-h-screen bg-[#fdfcfb] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="mb-10">
            <h1 className="text-3xl font-serif text-zinc-900 tracking-wide mb-2">Secure Checkout</h1>
            <p className="text-sm text-zinc-500 font-medium tracking-wide">Please complete your shipping and payment details.</p>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
            
            {/* Left Column - Forms */}
            <div className="lg:col-span-7 mb-12 lg:mb-0 space-y-10">
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {/* Shipping Details */}
                <div className="bg-white p-8 border border-zinc-200 rounded-2xl shadow-sm">
                  <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-100 pb-4">Shipping Information</h3>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">First Name</label>
                      <input 
                        name="firstName" 
                        value={shippingDetails.firstName} 
                        onChange={handleInputChange} 
                        required 
                        type="text" 
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 text-zinc-900 transition-all" 
                      />
                    </div>
                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">Last Name</label>
                      <input 
                        name="lastName" 
                        value={shippingDetails.lastName} 
                        onChange={handleInputChange} 
                        required 
                        type="text" 
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 text-zinc-900 transition-all" 
                      />
                    </div>
                    <div className="space-y-1.5 col-span-2">
                      <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">Address</label>
                      <input 
                        name="address" 
                        value={shippingDetails.address} 
                        onChange={handleInputChange} 
                        required 
                        type="text" 
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 text-zinc-900 transition-all" 
                      />
                    </div>
                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">City</label>
                      <input 
                        name="city" 
                        value={shippingDetails.city} 
                        onChange={handleInputChange} 
                        required 
                        type="text" 
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 text-zinc-900 transition-all" 
                      />
                    </div>
                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">State</label>
                      <input 
                        name="state" 
                        value={shippingDetails.state} 
                        onChange={handleInputChange} 
                        required 
                        type="text" 
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 text-zinc-900 transition-all" 
                      />
                    </div>
                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">Pincode</label>
                      <input 
                        name="pincode" 
                        value={shippingDetails.pincode} 
                        onChange={handleInputChange} 
                        required 
                        type="text" 
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 text-zinc-900 transition-all" 
                      />
                    </div>
                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">Phone</label>
                      <input 
                        name="phone" 
                        value={shippingDetails.phone} 
                        onChange={handleInputChange} 
                        required 
                        type="tel" 
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 text-zinc-900 transition-all" 
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Simulation */}
                <div className="bg-white p-8 border border-zinc-200 rounded-2xl shadow-sm">
                  <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-100 pb-4">Payment Method</h3>
                  <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-100 flex flex-col items-center justify-center text-center">
                    <svg className="w-8 h-8 text-zinc-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <p className="text-sm font-medium text-zinc-600">Secure Payment Simulation</p>
                    <p className="text-xs text-zinc-400 mt-1">No actual card processing is required for this demo.</p>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 sticky top-32">
                <h3 className="text-lg font-serif text-zinc-900 tracking-wide mb-6">Order Summary</h3>
                
                {/* Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.cartItemId} className="flex gap-4">
                      <div className="w-16 h-20 bg-white rounded-lg overflow-hidden border border-zinc-200 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <p className="text-sm font-bold text-zinc-900 leading-tight mb-1">{item.name}</p>
                        <p className="text-xs text-zinc-500 mb-1">
                          {item.color && <span>{item.color} | </span>}
                          {item.size && <span>{item.size}</span>}
                        </p>
                        <p className="text-xs font-medium text-zinc-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-bold text-zinc-900 pt-1">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-zinc-200 pt-6 space-y-3 mb-8">
                  <div className="flex justify-between text-sm text-zinc-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-zinc-900">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-zinc-600">
                    <span>Shipping</span>
                    <span className="font-medium text-zinc-900 uppercase text-xs tracking-wider">Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-zinc-600">
                    <span>Taxes</span>
                    <span className="font-medium text-zinc-900">₹0</span>
                  </div>
                  <div className="flex justify-between text-lg font-serif text-zinc-900 pt-3 border-t border-zinc-200">
                    <span>Total</span>
                    <span className="font-sans font-bold tracking-tight">₹{cartTotal}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={loading || cartItems.length === 0}
                  className="w-full py-4 bg-zinc-900 text-white rounded-xl text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-black hover:-translate-y-0.5 hover:shadow-xl hover:shadow-zinc-900/20 transition-all flex items-center justify-center disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Complete Purchase"
                  )}
                </button>
                <div className="mt-4 text-center">
                  <p className="text-xs text-zinc-400 flex items-center justify-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Guaranteed Safe & Secure Checkout
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
