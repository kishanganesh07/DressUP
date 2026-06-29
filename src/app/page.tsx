"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import ProductCard from "@/Components/ProductCard";
import { motion } from "framer-motion";
import { Truck, Hand, ShieldCheck, Ruler } from "lucide-react";
import WishlistButton from "@/Components/WishlistButton";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [canScrollLeftRec, setCanScrollLeftRec] = useState(false);
  const [canScrollRightRec, setCanScrollRightRec] = useState(true);



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

  const handleRecScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeftRec(scrollLeft > 0);
      setCanScrollRightRec(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  // Run once on products load to set initial state
  useEffect(() => {
    handleRecScroll();
  }, [products]);



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
          const mensProducts = data.data.filter((p: any) => p.category?.includes('Men') || p.name?.includes('Men'));
          const womensProducts = data.data.filter((p: any) => p.category?.includes('Women') || p.name?.includes('Women'));

          const diverseProducts = [];
          
          // Pick 9 Men's items
          const menStep = Math.max(1, Math.floor(mensProducts.length / 9));
          for (let i = 0; i < 9 && (i * menStep) < mensProducts.length; i++) {
            diverseProducts.push(mensProducts[i * menStep]);
          }

          // Pick 3 Women's items
          const womenStep = Math.max(1, Math.floor(womensProducts.length / 3));
          for (let i = 0; i < 3 && (i * womenStep) < womensProducts.length; i++) {
            diverseProducts.push(womensProducts[i * womenStep]);
          }

          // Shuffle the final array so it's a natural mix
          const shuffled = diverseProducts.sort(() => 0.5 - Math.random());
          setProducts(shuffled);
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
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <div className="relative z-10 w-full px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-full pt-10">
          
          {/* Main Hero Text */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left md:max-w-2xl w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full flex flex-col items-center md:items-start"
            >
              <h1 className="flex flex-col text-center md:text-left mb-8 drop-shadow-2xl relative w-full">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl md:text-5xl italic font-serif font-light text-[#D4AF37] mb-1 md:mb-2 ml-0 md:ml-2 z-10 relative"
                >
                  The
                </motion.span>
                <span className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold tracking-tighter leading-[0.95] md:leading-[0.9] text-white uppercase relative z-0">
                  New<br/>Collection
                </span>
              </h1>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "4rem" }}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-[2px] bg-[#D4AF37] mb-8 ml-0 md:ml-2"
              ></motion.div>
              <p className="text-[10px] md:text-sm text-zinc-200 mb-10 max-w-sm md:max-w-md font-sans font-medium tracking-[0.15em] md:tracking-[0.25em] uppercase drop-shadow-md ml-0 md:ml-2 leading-relaxed opacity-90 px-4 md:px-0">
                Discover premium fashion crafted for modern lifestyles. Elevated essentials, timeless aesthetics.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full px-4 md:px-0 md:w-auto">
                <Link href="/mens" className="w-full sm:w-auto text-center px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-900 bg-white hover:bg-[#D4AF37] hover:text-white transition-colors duration-500 shadow-xl">
                  Shop Men
                </Link>
                <Link href="/womens" className="w-full sm:w-auto text-center px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase text-white bg-transparent border border-white hover:bg-white hover:text-zinc-900 transition-colors duration-500 shadow-xl">
                  Shop Women
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Floating Statistics */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:flex flex-col gap-8 text-right border-l border-white/20 pl-8"
          >
            <div>
              <p className="text-4xl font-serif text-white mb-1">15k<span className="text-[#D4AF37]">+</span></p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-300">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-serif text-white mb-1">500<span className="text-[#D4AF37]">+</span></p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-300">Premium Products</p>
            </div>
            <div>
              <p className="text-4xl font-serif text-white mb-1">50<span className="text-[#D4AF37]">+</span></p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-300">Global Brands</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shop By Category Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pt-24 pb-12 relative z-20">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Men Category Card */}
          <Link href="/mens" className="relative group w-full md:w-1/2 h-[400px] md:h-[600px] overflow-hidden bg-zinc-900 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop" 
              alt="Men" 
              className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-2 group-hover:-translate-y-2 transition-transform duration-500">Men</h2>
              <p className="text-[10px] text-zinc-300 tracking-[0.2em] uppercase mb-6 group-hover:-translate-y-2 transition-transform duration-500 delay-75">150+ Products</p>
              <div className="inline-block border border-white text-white text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-3 hover:bg-white hover:text-black transition-colors duration-300">
                Explore
              </div>
            </div>
          </Link>

          {/* Women Category Card */}
          <Link href="/womens" className="relative group w-full md:w-1/2 h-[400px] md:h-[600px] overflow-hidden bg-zinc-900 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop" 
              alt="Women" 
              className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-2 group-hover:-translate-y-2 transition-transform duration-500">Women</h2>
              <p className="text-[10px] text-zinc-300 tracking-[0.2em] uppercase mb-6 group-hover:-translate-y-2 transition-transform duration-500 delay-75">200+ Products</p>
              <div className="inline-block border border-white text-white text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-3 hover:bg-white hover:text-black transition-colors duration-300">
                Explore
              </div>
            </div>
          </Link>
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
        <div className="mb-16 border-y border-zinc-200 py-12">
          <h2 className="text-4xl md:text-6xl font-bold tracking-widest text-zinc-900 text-center uppercase">Recommended For You</h2>
        </div>

        {loading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-zinc-900"></div>
          </div>
        ) : (
          <div className="relative group/carousel">
            <button 
              onClick={scrollLeft}
              disabled={!canScrollLeftRec}
              className={`absolute left-0 top-1/3 -translate-y-1/2 -ml-4 md:-ml-6 z-10 bg-white border border-zinc-200 rounded-full p-2.5 shadow-md transition-all hidden md:block ${!canScrollLeftRec ? 'opacity-20 cursor-not-allowed text-zinc-300' : 'opacity-0 group-hover/carousel:opacity-100 hover:bg-zinc-50 hover:scale-110 text-zinc-600 hover:text-zinc-900'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button 
              onClick={scrollRight}
              disabled={!canScrollRightRec}
              className={`absolute right-0 top-1/3 -translate-y-1/2 -mr-4 md:-ml-6 z-10 bg-white border border-zinc-200 rounded-full p-2.5 shadow-md transition-all hidden md:block ${!canScrollRightRec ? 'opacity-20 cursor-not-allowed text-zinc-300' : 'opacity-0 group-hover/carousel:opacity-100 hover:bg-zinc-50 hover:scale-110 text-zinc-600 hover:text-zinc-900'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>

            <div 
              ref={scrollRef} 
              onScroll={handleRecScroll}
              className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Exclusive For Men Section */}
      <section className="w-full relative z-20 bg-white">
        <div className="py-16 border-y border-zinc-200">
          <h2 className="text-4xl md:text-6xl font-bold tracking-widest text-zinc-900 text-center uppercase">Exclusive For Men</h2>
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
              <div key={i} className="flex-none w-full snap-start relative overflow-hidden bg-white flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Mens Exclusive Poster ${i+1}`} className="w-full h-auto object-contain object-center" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Categories Section */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 relative z-20">
        <div className="mb-16 border-y border-zinc-200 py-12">
          <h2 className="text-4xl md:text-6xl font-bold tracking-widest text-zinc-900 text-center uppercase">Trending Categories</h2>
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
        <div className="py-16 border-y border-zinc-200">
          <h2 className="text-4xl md:text-6xl font-bold tracking-widest text-zinc-900 text-center uppercase">Exclusive For Women</h2>
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
              <div key={i} className="flex-none w-full snap-start relative overflow-hidden bg-white flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Womens Exclusive Poster ${i+1}`} className="w-full h-auto object-contain object-center" />
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