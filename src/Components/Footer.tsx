"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white border-t border-zinc-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-baseline font-black tracking-tighter text-white mb-6">
              <span className="text-3xl">D</span>
              <span className="text-2xl">RESS</span>
              <span className="text-2xl animate-bounce inline-block ml-[2px] text-zinc-300">UP!</span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-light">
              Elevating everyday essentials with premium materials and minimalist design. 
              Join the new standard of fashion.
            </p>
            <form className="flex mt-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-b border-zinc-700 text-white placeholder-zinc-500 text-sm py-2 px-0 w-full focus:outline-none focus:border-white transition-colors"
                required
              />
              <button 
                type="submit" 
                className="text-xs uppercase tracking-widest font-medium border-b border-zinc-700 hover:border-white hover:text-white text-zinc-400 transition-colors ml-4 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-6">Shop</h3>
            <ul className="space-y-4 text-sm text-zinc-400 font-light">
              <li><Link href="/mens" className="hover:text-white transition-colors">Men&apos;s Collection</Link></li>
              <li><Link href="/womens" className="hover:text-white transition-colors">Women&apos;s Collection</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Accessories</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Lookbook</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-6">Support</h3>
            <ul className="space-y-4 text-sm text-zinc-400 font-light">
              <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/size-guide" className="hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-6">About</h3>
            <ul className="space-y-4 text-sm text-zinc-400 font-light">
              <li><Link href="#" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Stores</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-light">
          <p>&copy; {new Date().getFullYear()} DRESS UP!. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
