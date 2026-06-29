"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/Components/ProtectedRoute";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (!user) return null;

  return (
    <ProtectedRoute>
      <div className="min-h-[50vh] bg-[#fdfcfb] pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="mb-8 border-b border-zinc-200/50 pb-6">
            <h1 className="text-3xl font-serif text-zinc-900 tracking-wide mb-2">My Profile</h1>
            <p className="text-sm text-zinc-500 font-medium tracking-wide">Manage your personal information and preferences.</p>
          </div>

          <div className="bg-white border border-zinc-200/50 rounded-2xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center text-3xl font-serif text-zinc-600 border border-zinc-200 shadow-sm">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-zinc-900 mb-1">{user.name}</h2>
                  <p className="text-zinc-500">{user.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-zinc-100 pt-6">
                <Link href="/orders" className="group flex items-center justify-between p-5 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 transition-colors">
                  <div>
                    <h3 className="font-bold text-zinc-900 mb-1 group-hover:text-black transition-colors">My Orders</h3>
                    <p className="text-xs text-zinc-500">Track, return, or buy things again</p>
                  </div>
                  <svg className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                </Link>

                <Link href="/wishlist" className="group flex items-center justify-between p-5 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 transition-colors">
                  <div>
                    <h3 className="font-bold text-zinc-900 mb-1 group-hover:text-black transition-colors">Wishlist</h3>
                    <p className="text-xs text-zinc-500">View your saved items</p>
                  </div>
                  <svg className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                </Link>
                
                {user.isAdmin && (
                  <Link href="/admin" className="group flex items-center justify-between p-5 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 transition-colors sm:col-span-2">
                    <div>
                      <h3 className="font-bold text-zinc-900 mb-1 group-hover:text-black transition-colors">Admin Dashboard</h3>
                      <p className="text-xs text-zinc-500">Manage products, orders, and users</p>
                    </div>
                    <svg className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                )}
              </div>
            </div>
            <div className="bg-zinc-50 px-8 py-6 border-t border-zinc-200/50 flex justify-between items-center">
              <span className="text-xs text-zinc-500">Logged in</span>
              <button 
                onClick={handleLogout}
                className="text-xs font-bold text-red-500 hover:text-red-600 uppercase tracking-widest transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
