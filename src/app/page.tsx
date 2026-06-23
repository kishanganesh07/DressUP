"use client";

import { useEffect, useState, useRef } from "react";
// Remove axios import
import Link from "next/link";
import { Truck, Hand, ShieldCheck, Ruler } from "lucide-react";
import WishlistButton from "@/Components/WishlistButton";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);



  const scrollRef = useRef<HTMLDivElement>(null);
  const mensScrollRef = useRef<HTMLDivElement>(null);
  const womensScrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };



  useEffect(() => {
    const interval = setInterval(() => {
      if (mensScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = mensScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          mensScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          mensScrollRef.current.scrollBy({ left: window.innerWidth, behavior: "smooth" });
        }
      }
      if (womensScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = womensScrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          womensScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          womensScrollRef.current.scrollBy({ left: window.innerWidth, behavior: "smooth" });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          setProducts(data.data.slice(0, 10)); // Fetch some products for recommended
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products;

  return (
    <div className="min-h-screen bg-white text-zinc-900 pt-20">
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-zinc-200">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        
        {/* Subtle Dark Overlay to ensure perfect text readability */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white uppercase drop-shadow-2xl">
            The New Collection
          </h1>
          <p className="text-lg md:text-xl text-zinc-200 mb-10 max-w-2xl mx-auto font-medium tracking-widest uppercase drop-shadow-md">
            Minimalist design. Premium materials. Discover the latest arrivals for this season.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/mens" className="w-full sm:w-auto text-center px-12 py-4 text-sm font-bold tracking-widest uppercase text-white bg-zinc-900 hover:bg-black transition-all duration-300 shadow-xl hover:shadow-2xl">
              Shop Men
            </Link>
            <Link href="/womens" className="w-full sm:w-auto text-center px-12 py-4 text-sm font-bold tracking-widest uppercase text-zinc-900 bg-white border border-zinc-900 hover:bg-zinc-100 transition-all duration-300 shadow-xl hover:shadow-2xl">
              Shop Women
            </Link>
          </div>
        </div>
      </section>

      {/* Shop By Category Section */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-24 pb-12 relative z-20">
        <h2 className="text-xl font-bold tracking-widest text-center text-zinc-900 mb-12 uppercase">Shop By Category</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-24">
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 ring-1 ring-zinc-200 group-hover:ring-zinc-900 transition-all duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop" alt="Men" className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" />
            </div>
            <span className="text-sm font-bold tracking-widest uppercase text-zinc-900">Men</span>
          </div>
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 ring-1 ring-zinc-200 group-hover:ring-zinc-900 transition-all duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop" alt="Women" className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" />
            </div>
            <span className="text-sm font-bold tracking-widest uppercase text-zinc-900">Women</span>
          </div>
        </div>
      </section>



      {/* Features Banner Section */}
      <section className="w-full bg-zinc-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?q=80&w=2000&auto=format&fit=crop" alt="Dark Fabric Texture" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-800">
            {/* Feature 1 */}
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0 px-4">
              <svg className="w-10 h-10 mb-6 text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <h3 className="text-sm md:text-base font-serif tracking-wide text-zinc-100 max-w-[200px] leading-relaxed">Free shipping on every order</h3>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0 px-4">
              <svg className="w-10 h-10 mb-6 text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-sm md:text-base font-serif tracking-wide text-zinc-100 max-w-[200px] leading-relaxed">Get special offers on your first app order</h3>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center justify-center pt-8 md:pt-0 px-4">
              <svg className="w-10 h-10 mb-6 text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14.121 14.121L19 19m-7-7l-7-7m8 0l-8 8m14-4l-4 4" />
              </svg>
              <h3 className="text-sm md:text-base font-serif tracking-wide text-zinc-100 max-w-[200px] leading-relaxed">Free alteration for all purchased garments</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-12 pb-24 relative z-20">
        <div className="mb-12">
          <h2 className="text-xl font-bold tracking-widest text-zinc-900 text-center uppercase">Recommended For You</h2>
        </div>

        {loading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-zinc-900"></div>
          </div>
        ) : (
          <div className="relative group/carousel">
            <button 
              onClick={scrollLeft}
              className="absolute left-0 top-1/3 -translate-y-1/2 -ml-4 md:-ml-6 z-10 bg-white border border-zinc-200 text-zinc-600 rounded-full p-2.5 shadow-md hover:bg-zinc-50 hover:scale-110 hover:text-zinc-900 transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/3 -translate-y-1/2 -mr-4 md:-mr-6 z-10 bg-white border border-zinc-200 text-zinc-600 rounded-full p-2.5 shadow-md hover:bg-zinc-50 hover:scale-110 hover:text-zinc-900 transition-all opacity-0 group-hover/carousel:opacity-100 hidden md:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>

            <div ref={scrollRef} className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth">
              {filteredProducts.map((product) => (
                <div key={product._id} className="group relative flex-none w-[75vw] sm:w-[280px] lg:w-[320px] snap-start border border-transparent hover:border-zinc-200 transition-colors bg-white pb-4 rounded-sm">
                  <div className="aspect-[2/3] w-full overflow-hidden bg-zinc-100 relative cursor-pointer mb-3 rounded-t-sm">
                    <WishlistButton product={product} />
                    <Link href={`/product/${product._id}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </Link>
                </div>
                <div className="px-2">
                  <div className="text-[10px] text-zinc-400 font-medium mb-1 uppercase tracking-wider">
                    {product.subcategory || product.category}
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900 mb-1 leading-snug truncate">
                    <Link href={`/product/${product._id}`}>
                      <span aria-hidden="true" className="absolute inset-0 z-0"></span>
                      {product.name}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-zinc-400 line-through">₹{Math.floor(product.price * 1.15)}</span>
                    <span className="text-sm font-bold text-zinc-900">₹{product.price}</span>
                    <span className="text-[11px] font-bold text-red-500 tracking-wide">{Math.round((1 - (product.price / Math.floor(product.price * 1.15))) * 100)}% OFF</span>
                  </div>
                  <div className="flex items-center gap-2 border-t border-zinc-100 pt-3 mt-1">
                    <span 
                      className="w-3.5 h-3.5 rounded-full ring-1 ring-offset-1 ring-zinc-300 shadow-sm" 
                      style={{ backgroundColor: product.colors?.[0]?.toLowerCase().replace(" ", "") || 'gray' }}
                    ></span>
                    <span className="text-[10px] text-zinc-500 uppercase font-medium tracking-wider">{product.colors?.[0] || 'STANDARD'}</span>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}
      </section>

      {/* Exclusive For Men Section */}
      <section className="w-full relative z-20 bg-white">
        <div className="py-12 pb-6">
          <h2 className="text-xl font-bold tracking-widest text-zinc-900 text-center uppercase">Exclusive For Men</h2>
        </div>
        <div className="relative group/mens-carousel border-b border-t border-zinc-100">
          <div ref={mensScrollRef} className="flex overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth pb-0">
            {[
              "https://i.pinimg.com/1200x/ca/0b/15/ca0b15c69bac959c5b8fc44428f9cbbe.jpg",
              "https://i.pinimg.com/1200x/e3/13/13/e3131355d0378e95c47cd1c0f2c50cef.jpg",
              "https://i.pinimg.com/736x/83/c6/c9/83c6c9ab1fd4d896710a1e8421836353.jpg",
              "https://i.pinimg.com/474x/30/10/ad/3010adb9be5707272cade6a25bd0045c.jpg",
              "https://i.pinimg.com/736x/6c/03/35/6c03354a8988d0ec3c2a54e3c2a9efff.jpg",
              "https://i.pinimg.com/1200x/04/2c/07/042c07d8d737cd0485b6d841ff0ea72d.jpg"
            ].map((src, i) => (
              <div key={i} className="flex-none w-screen h-[50vh] md:h-[75vh] snap-start relative overflow-hidden bg-zinc-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Mens Exclusive Poster ${i+1}`} className="w-full h-full object-cover object-center" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Categories Section */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 relative z-20">
        <div className="mb-10">
          <h2 className="text-xl font-bold tracking-widest text-zinc-900 text-center uppercase">Trending Categories</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* T-Shirts Category */}
          <Link href="/category/mens-t-shirts" className="relative group block aspect-[4/3] md:aspect-[16/11] overflow-hidden bg-zinc-100 cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://i.pinimg.com/736x/a1/9e/fe/a19efe17e58d1ca94b02c80ef7316eb6.jpg" 
              alt="T-Shirts Category" 
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30 group-hover:to-black/40 transition-colors duration-500"></div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-right">
             
            </div>
          </Link>
          
          {/* Shirts Category */}
          <Link href="/category/mens-casual-shirts" className="relative group block aspect-[4/3] md:aspect-[16/11] overflow-hidden bg-zinc-100 cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://i.pinimg.com/736x/26/47/f2/2647f21911b94fd48220cf6c69c91e59.jpg" 
              alt="Shirts Category" 
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30 group-hover:to-black/40 transition-colors duration-500"></div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-right">
             
            </div>
          </Link>
        </div>
      </section>

      {/* Exclusive For Women Section */}
      <section className="w-full relative z-20 bg-white">
        <div className="py-12 pb-6">
          <h2 className="text-xl font-bold tracking-widest text-zinc-900 text-center uppercase">Exclusive For Women</h2>
        </div>
        <div className="relative group/womens-carousel border-b border-t border-zinc-100">
          <div ref={womensScrollRef} className="flex overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth pb-0">
            {[
              "https://i.pinimg.com/736x/2d/73/2b/2d732bf232ebef2c8092d525ef288669.jpg",
              "https://i.pinimg.com/736x/5e/ea/99/5eea99edcf50e3f26e9303479175362a.jpg",
              "https://i.pinimg.com/736x/d1/04/06/d104065daebc413aef9c1e8c131d799c.jpg",
              "https://res.cloudinary.com/dvbmbe4cl/image/upload/v1782141641/b25c086e5852e583eb1ffe344b5708c2_ymwoxo.jpg",
              "https://i.pinimg.com/1200x/08/08/e1/0808e1fb7ee460268f8e885c1af1fbba.jpg"
            ].map((src, i) => (
              <div key={i} className="flex-none w-screen h-[50vh] md:h-[75vh] snap-start relative overflow-hidden bg-zinc-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Womens Exclusive Poster ${i+1}`} className="w-full h-full object-cover object-center" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Size Guide Section */}
      <section className="w-full bg-zinc-950 text-white relative z-20 py-16 px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left max-w-4xl mx-auto md:mx-0">
          <div className="bg-zinc-800 p-4 rounded-full flex-shrink-0">
            <Ruler className="w-8 h-8 text-zinc-100" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-widest uppercase mb-2">Find Your Perfect Fit</h2>
            <p className="text-zinc-400 font-medium max-w-xl">
              Not sure about your size? Use our comprehensive size guide to find the perfect fit for your body type. We&apos;ve detailed measurements for all our exclusive collections.
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <Link href="/size-guide" className="inline-block border border-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-zinc-950 transition-colors duration-300">
            View Size Guide
          </Link>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="w-full bg-[#f0f0f0] border-y border-zinc-300 py-6 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 divide-y md:divide-y-0 md:divide-x divide-zinc-300">
          
          <div className="flex items-center gap-4 px-4 py-2 w-full justify-center md:w-auto">
            <Truck className="w-8 h-8 text-zinc-800" strokeWidth={1.5} />
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-zinc-900 tracking-wide uppercase leading-tight">Free Shipping For</span>
              <span className="text-sm font-bold text-zinc-900 tracking-wide uppercase leading-tight">Orders Above ₹599</span>
            </div>
          </div>

          <div className="flex items-center gap-4 px-4 py-2 w-full justify-center md:w-auto">
            <Hand className="w-8 h-8 text-zinc-800" strokeWidth={1.5} />
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-zinc-900 tracking-wide uppercase leading-tight">Promise, On Time</span>
              <span className="text-sm font-bold text-zinc-900 tracking-wide uppercase leading-tight">Delivery</span>
            </div>
          </div>

          <div className="flex items-center gap-4 px-4 py-2 w-full justify-center md:w-auto">
            <ShieldCheck className="w-8 h-8 text-zinc-800" strokeWidth={1.5} />
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-zinc-900 tracking-wide uppercase leading-tight">100% Secure</span>
              <span className="text-sm font-bold text-zinc-900 tracking-wide uppercase leading-tight">Payment</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}