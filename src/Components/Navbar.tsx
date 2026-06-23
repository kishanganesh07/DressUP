"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const { cartCount, toggleCart } = useCart();

  // Check auth state on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(storedUser));
      } catch {
        // ignore parsing error
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-200 transition-all duration-300">
      <div className="px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-baseline font-black tracking-tighter text-zinc-900">
              <span className="text-3xl">D</span>
              <span className="text-2xl">RESS</span>
              <span className="text-2xl animate-bounce inline-block ml-[2px] text-zinc-800">UP!</span>
            </Link>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {[
                { name: 'Home', path: '/' },
                { name: 'Men', path: '/mens' },
                { name: 'Women', path: '/womens' },
                { name: 'Wishlist', path: '/wishlist' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact Us', path: '/contact' }
              ].map((item) => (
                <Link key={item.name} href={item.path} className="relative text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors group py-2">
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-zinc-900 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Section & Cart */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/cart"
              className="relative p-2 text-zinc-900 hover:text-zinc-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-zinc-900 rounded-full min-w-[1.25rem]">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-6">
                <span className="text-sm text-zinc-500 hidden lg:inline">
                  Welcome, <strong className="text-zinc-900 font-medium">{user.name || user.email?.split('@')[0]}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 pl-4 border-l border-zinc-200">
                <Link href="/login" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2 text-sm font-medium text-white bg-zinc-900 hover:bg-black rounded-none transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
