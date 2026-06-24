"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import AuthModal from "./AuthModal";

export default function Navbar() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleOpenAuth = () => setShowAuthModal(true);
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("openAuthModal", handleOpenAuth);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("openAuthModal", handleOpenAuth);
    };
  }, []);

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
    toast.success("Successfully signed out");
    router.push("/");
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-[#fdfcfb]/90 backdrop-blur-2xl border-b transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isScrolled ? 'border-zinc-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.05)]' : 'border-transparent shadow-none'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        <div className={`flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isScrolled ? 'h-16' : 'h-24'}`}>
          {/* Logo */}
          <div className="flex-shrink-0 group">
            <Link href="/" className="flex items-baseline font-serif tracking-[0.2em] text-zinc-900">
              <span className="text-3xl font-bold transition-all duration-500 group-hover:tracking-[0.25em]">DRESS</span>
              <span className="text-3xl font-bold animate-bounce inline-block ml-2 text-zinc-500 transition-all duration-500">UP!</span>
            </Link>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6 lg:space-x-8">
              {[
                { name: 'Home', path: '/' },
                { name: 'Men', path: '/mens' },
                { name: 'Women', path: '/womens' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link 
                    key={item.name} 
                    href={item.path} 
                    className={`relative text-[11px] uppercase tracking-[0.15em] font-medium transition-colors group py-2 ${isActive ? 'text-[#D4AF37]' : 'text-zinc-500 hover:text-[#D4AF37]'}`}
                  >
                    {item.name}
                    <span className={`absolute inset-x-0 -bottom-1 h-[1px] bg-[#D4AF37] origin-center transition-transform duration-500 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Button & Cart (Mobile) */}
          <div className="flex md:hidden items-center gap-4">
            <Link 
              href="/cart"
              className="relative p-2 text-zinc-600 hover:text-zinc-900 transition-all"
            >
              <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-zinc-900 rounded-full min-w-[1.25rem]">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-600 hover:text-zinc-900 focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>

          {/* Auth Section & Cart */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/cart"
              className="relative p-2 text-zinc-600 hover:text-zinc-900 transition-all hover:scale-110 duration-300"
            >
              <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-zinc-900 rounded-full min-w-[1.25rem]">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative pl-6 border-l border-zinc-200 group">
                <button className="flex items-center gap-2 text-[13px] text-zinc-500 tracking-wide hover:text-zinc-900 transition-colors py-2 cursor-pointer">
                  <span className="hidden lg:inline">WELCOME,</span> 
                  <strong className="text-zinc-900 font-bold uppercase tracking-wider">{user.name || user.email?.split('@')[0]}</strong>
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-0 w-48 bg-white border border-zinc-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 rounded-xl overflow-hidden before:absolute before:-top-4 before:left-0 before:w-full before:h-4">
                  <div className="py-2 flex flex-col">
                    <Link href="/profile" className="px-5 py-3 text-[11px] font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors uppercase tracking-[0.15em] text-left">
                      My Profile
                    </Link>
                    <Link href="/orders" className="px-5 py-3 text-[11px] font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors uppercase tracking-[0.15em] text-left">
                      My Orders
                    </Link>
                    <Link href="/wishlist" className="px-5 py-3 text-[11px] font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors uppercase tracking-[0.15em] text-left border-b border-zinc-100">
                      Wishlist
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-5 py-3 text-[11px] font-bold text-red-500 hover:text-white hover:bg-red-500 transition-colors uppercase tracking-[0.15em] text-left w-full"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-5 pl-6 border-l border-zinc-200">
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500 hover:text-zinc-900 transition-colors"
                  suppressHydrationWarning
                >
                  Sign In
                </button>
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white bg-zinc-900 hover:bg-black shadow-lg shadow-zinc-900/20 hover:shadow-xl hover:shadow-zinc-900/30 hover:-translate-y-0.5 transition-all duration-500"
                  suppressHydrationWarning
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-zinc-200 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col p-6 space-y-4">
            {[
              { name: 'Home', path: '/' },
              { name: 'Men', path: '/mens' },
              { name: 'Women', path: '/womens' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' }
            ].map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.name} 
                  href={item.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[13px] uppercase tracking-[0.15em] font-medium border-b border-zinc-100 pb-4 transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-zinc-600 hover:text-[#D4AF37]'}`}
                >
                  {item.name}
                </Link>
              );
            })}
            
            <div className="pt-2 flex flex-col space-y-4">
              {user ? (
                <>
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">My Account ({user.name || user.email?.split('@')[0]})</div>
                  <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-[12px] font-bold text-zinc-600 hover:text-zinc-900 uppercase tracking-wider">My Profile</Link>
                  <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} className="text-[12px] font-bold text-zinc-600 hover:text-zinc-900 uppercase tracking-wider">My Orders</Link>
                  <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="text-[12px] font-bold text-zinc-600 hover:text-zinc-900 uppercase tracking-wider">Wishlist</Link>
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-[12px] font-bold text-red-500 uppercase tracking-wider text-left pt-2">Sign Out</button>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-2">
                  <button onClick={() => { setIsMobileMenuOpen(false); setShowAuthModal(true); }} className="w-full py-3 border border-zinc-900 text-zinc-900 text-[11px] font-bold uppercase tracking-[0.15em]">Sign In</button>
                  <button onClick={() => { setIsMobileMenuOpen(false); setShowAuthModal(true); }} className="w-full py-3 bg-zinc-900 text-white text-[11px] font-bold uppercase tracking-[0.15em]">Sign Up</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      </nav>

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onSuccess={(userData) => {
            setUser(userData);
            toast.success(`Welcome back, ${userData.name?.split(' ')[0] || 'User'}!`);
          }} 
        />
      )}
    </>
  );
}
