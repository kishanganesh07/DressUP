"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/Components/ProtectedRoute";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          setLoading(false);
          return;
        }
        const user = JSON.parse(storedUser);
        
        const res = await fetch(`/api/orders?userId=${user._id}`);
        const data = await res.json();
        
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-[60vh] bg-[#fdfcfb] pt-32 pb-12">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="mb-12 border-b border-zinc-200/50 pb-8">
            <h1 className="text-3xl font-serif text-zinc-900 tracking-wide mb-2">My Orders</h1>
            <p className="text-sm text-zinc-500 font-medium tracking-wide">Review your past purchases and track delivery status.</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 bg-white border border-zinc-100 rounded-2xl shadow-sm">
              <svg className="w-12 h-12 text-zinc-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="text-lg font-bold text-zinc-900 mb-2">No orders yet</h2>
              <p className="text-zinc-500 mb-6 text-sm">When you make a purchase, it will appear here.</p>
              <Link href="/" className="inline-block px-8 py-3 bg-zinc-900 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-black transition-colors rounded-lg">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div key={order._id} className="bg-white border border-zinc-200/50 rounded-2xl shadow-sm overflow-hidden">
                  <div className="bg-zinc-50/50 px-6 py-4 border-b border-zinc-200/50 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Order Placed</p>
                      <p className="text-sm text-zinc-900 font-medium">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Total Amount</p>
                      <p className="text-sm text-zinc-900 font-medium">₹{order.totalAmount}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-zinc-100 text-zinc-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Order #</p>
                      <p className="text-xs text-zinc-400 font-mono">{order._id}</p>
                    </div>
                  </div>
                  
                  <div className="px-6 py-6 divide-y divide-zinc-100">
                    {order.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex gap-6 py-4 first:pt-0 last:pb-0">
                        <div className="w-20 h-24 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <h3 className="text-sm font-bold text-zinc-900 mb-1">{item.name}</h3>
                          <div className="text-xs text-zinc-500 space-y-1">
                            {item.color && <p>Color: {item.color}</p>}
                            {item.size && <p>Size: {item.size}</p>}
                            <p>Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-zinc-900 flex items-center">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    ))}
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
