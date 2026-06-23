"use client";

import { useEffect, useState, useRef } from "react";
import { Truck, Hand, ShieldCheck } from "lucide-react";
import Link from "next/link";
import WishlistButton from "@/Components/WishlistButton";
// Remove axios import

const womensCategories = [
  { name: "DRESSES", path: "womens-dresses", image: "https://i.pinimg.com/1200x/f4/b0/5a/f4b05a82d38a8d5c211319d3396ae64e.jpg" },
  { name: "TOPS", path: "womens-tops", image: "https://i.pinimg.com/736x/1e/8e/6a/1e8e6ae2e26940015587e09a507cf1d7.jpg" },
  { name: "FORMAL SHIRTS", path: "womens-formal-shirts", image: "https://i.pinimg.com/736x/84/03/90/840390e15dd633ec8580b6199cb25c36.jpg" },
  { name: "TROUSERS", path: "womens-trousers", image: "https://i.pinimg.com/736x/15/1c/e8/151ce84c46826886dd8430c9a977cfb9.jpg" },
  { name: "JEANS", path: "womens-jeans", image: "https://i.pinimg.com/736x/d3/1f/0c/d31f0c8f6cf1e42d43c33a0d082fb711.jpg" }
];

const heroImages = [
  "https://i.pinimg.com/1200x/66/08/e3/6608e35b49515614b40ff1b7a76668a6.jpg",
  "https://i.pinimg.com/736x/05/6a/75/056a75ae33b0200b4a884908d941cc13.jpg",
  "https://i.pinimg.com/736x/bf/8a/c8/bf8ac8f232dcaf91cce58599442afab3.jpg",
  "https://res.cloudinary.com/dvbmbe4cl/image/upload/v1782133564/e5fd0bc6979af48d96b05daae5efe5e9_vdguhy.jpg"
];

export default function WomensPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const topsScrollRef = useRef<HTMLDivElement>(null);

  const scrollLeftTops = () => {
    if (topsScrollRef.current) {
      topsScrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRightTops = () => {
    if (topsScrollRef.current) {
      topsScrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const dressesScrollRef = useRef<HTMLDivElement>(null);
  const jeansScrollRef = useRef<HTMLDivElement>(null);

  const scrollLeftDresses = () => {
    if (dressesScrollRef.current) {
      dressesScrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRightDresses = () => {
    if (dressesScrollRef.current) {
      dressesScrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const scrollLeftJeans = () => {
    if (jeansScrollRef.current) {
      jeansScrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRightJeans = () => {
    if (jeansScrollRef.current) {
      jeansScrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const promoCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (promoCarouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = promoCarouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          promoCarouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          promoCarouselRef.current.scrollBy({ left: window.innerWidth, behavior: "smooth" });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const heroInterval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(heroInterval);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products?category=Women');
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Top Dark Blue Header */}
      <div className="w-full bg-[#183454] h-32 md:h-48 relative z-0"></div>

      {/* Main Banner Container */}
      <div className="w-full relative z-10 -mt-12 md:-mt-20">
        <div className="relative overflow-hidden shadow-2xl">
          {/* Main Image Carousel & Gradient Overlay */}
          <div className="relative w-full overflow-hidden aspect-[4/3] md:aspect-[21/9] lg:aspect-[24/9]">
            {heroImages.map((img, idx) => (
              <img 
                key={img}
                src={img} 
                alt={`Womens Collection ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
                  currentHeroImage === idx ? 'opacity-100 z-0' : 'opacity-0 -z-10'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-black/30 z-10"></div>
          </div>
          
          {/* Text Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none pb-20 md:pb-32">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-[0.15em] uppercase drop-shadow-xl mb-3 md:mb-5">
               The Women&apos;s Store
            </h1>
            <p className="text-xs md:text-base lg:text-lg text-zinc-100 font-bold tracking-[0.2em] uppercase drop-shadow-md max-w-2xl">
              Elevate your everyday style with our exclusive collection
            </p>
          </div>

          {/* Shop Collection Button */}
      <div className="w-full bg-[#183454] h-4 md:h-10 relative z-0"></div>
         


        </div>
      </div>

      {/* Shop By Category Heading */}
      <div className="text-center mt-16 md:mt-20 mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#183454] tracking-widest uppercase">SHOP BY CATEGORY</h2>
        <div className="w-24 h-1 bg-[#183454] mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10">
          {womensCategories.map((cat) => (
            <Link href={`/category/${cat.path}`} key={cat.name} className="group cursor-pointer flex flex-col items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-5 shadow-sm group-hover:shadow-lg transition-all duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>
              <span className="text-sm md:text-base font-extrabold text-zinc-800 tracking-wider group-hover:text-black transition-colors text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Tops Section */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 mt-10 relative z-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold tracking-widest text-zinc-900 uppercase">Women&apos;s Tops</h2>
          <Link href="/category/womens-tops" className="text-sm font-bold tracking-widest uppercase text-zinc-900 hover:text-zinc-600 transition-colors border-b-2 border-zinc-900 pb-1">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-zinc-900"></div>
          </div>
        ) : (
          <div className="relative group/carousel-tops">
            <button 
              onClick={scrollLeftTops}
              className="absolute left-0 top-1/3 -translate-y-1/2 -ml-4 md:-ml-6 z-10 bg-white border border-zinc-200 text-zinc-600 rounded-full p-2.5 shadow-md hover:bg-zinc-50 hover:scale-110 hover:text-zinc-900 transition-all opacity-0 group-hover/carousel-tops:opacity-100 hidden md:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button 
              onClick={scrollRightTops}
              className="absolute right-0 top-1/3 -translate-y-1/2 -mr-4 md:-mr-6 z-10 bg-white border border-zinc-200 text-zinc-600 rounded-full p-2.5 shadow-md hover:bg-zinc-50 hover:scale-110 hover:text-zinc-900 transition-all opacity-0 group-hover/carousel-tops:opacity-100 hidden md:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>

            <div ref={topsScrollRef} className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth">
              {products.filter(p => p.subcategory?.includes('Top') || p.category?.includes('Top')).slice(0, 8).map((product) => (
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

      {/* Promotional Carousel */}
      <section className="w-full relative z-20 pb-12 bg-white">
        <div className="relative group/promo-carousel border-b border-t border-zinc-100">
          <div ref={promoCarouselRef} className="flex overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth pb-0">
            {[
              "https://i.pinimg.com/1200x/ab/36/c8/ab36c8f2c8471782ac83577eea7a6f96.jpg",
              "https://i.pinimg.com/1200x/1c/5c/85/1c5c8589b0e40a45c6ca0747b78c590d.jpg",
              "https://i.pinimg.com/736x/57/89/11/5789118ed47d5e0afcd568658e79b86c.jpg"
            ].map((src, i) => (
              <div key={i} className="flex-none w-screen h-[50vh] md:h-[75vh] snap-start relative overflow-hidden bg-zinc-50 cursor-pointer">
                <Link href="/category/womens-tops" className="w-full h-full block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Promotional Banner ${i+1}`} className="w-full h-full object-cover object-center" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dresses Section */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 relative z-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold tracking-widest text-zinc-900 uppercase">Dresses</h2>
          <Link href="/category/womens-dresses" className="text-sm font-bold tracking-widest uppercase text-zinc-900 hover:text-zinc-600 transition-colors border-b-2 border-zinc-900 pb-1">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-zinc-900"></div>
          </div>
        ) : (
          <div className="relative group/carousel-dresses">
            <button 
              onClick={scrollLeftDresses}
              className="absolute left-0 top-1/3 -translate-y-1/2 -ml-4 md:-ml-6 z-10 bg-white border border-zinc-200 text-zinc-600 rounded-full p-2.5 shadow-md hover:bg-zinc-50 hover:scale-110 hover:text-zinc-900 transition-all opacity-0 group-hover/carousel-dresses:opacity-100 hidden md:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button 
              onClick={scrollRightDresses}
              className="absolute right-0 top-1/3 -translate-y-1/2 -mr-4 md:-mr-6 z-10 bg-white border border-zinc-200 text-zinc-600 rounded-full p-2.5 shadow-md hover:bg-zinc-50 hover:scale-110 hover:text-zinc-900 transition-all opacity-0 group-hover/carousel-dresses:opacity-100 hidden md:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>

            <div ref={dressesScrollRef} className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth">
              {products.filter(p => p.subcategory?.includes('Dress') || p.category?.includes('Dress')).slice(0, 8).map((product) => (
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

      {/* Jeans Section */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 relative z-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold tracking-widest text-zinc-900 uppercase">Women&apos;s Jeans</h2>
          <Link href="/category/womens-jeans" className="text-sm font-bold tracking-widest uppercase text-zinc-900 hover:text-zinc-600 transition-colors border-b-2 border-zinc-900 pb-1">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-zinc-900"></div>
          </div>
        ) : (
          <div className="relative group/carousel-jeans">
            <button 
              onClick={scrollLeftJeans}
              className="absolute left-0 top-1/3 -translate-y-1/2 -ml-4 md:-ml-6 z-10 bg-white border border-zinc-200 text-zinc-600 rounded-full p-2.5 shadow-md hover:bg-zinc-50 hover:scale-110 hover:text-zinc-900 transition-all opacity-0 group-hover/carousel-jeans:opacity-100 hidden md:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button 
              onClick={scrollRightJeans}
              className="absolute right-0 top-1/3 -translate-y-1/2 -mr-4 md:-mr-6 z-10 bg-white border border-zinc-200 text-zinc-600 rounded-full p-2.5 shadow-md hover:bg-zinc-50 hover:scale-110 hover:text-zinc-900 transition-all opacity-0 group-hover/carousel-jeans:opacity-100 hidden md:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>

            <div ref={jeansScrollRef} className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth">
              {products.filter(p => (p.subcategory?.includes('Jean') || p.category?.includes('Jean') || p.name?.includes('Jeans')) && !p.category?.includes('Men') && !p.name?.includes('Men')).slice(0, 8).map((product) => (
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

      {/* Referral Promotional Banner */}
      <section className="w-full relative z-20 py-8 bg-[#112741]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
          <div className="flex items-center gap-5">
            <svg className="w-10 h-10 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
            </svg>
            <div>
              <h3 className="text-[17px] md:text-lg font-normal tracking-wide">
                <span className="text-[#FFD700]">REFER & EARN WITH</span> <span className="text-white">THE REFERRAL PROGRAM</span>
              </h3>
              <p className="text-white text-[13px] mt-1 font-serif">Invite your friends and earn up to ₹ 7500 in discounts.</p>
            </div>
          </div>
          <button className="bg-[#FFD700] hover:bg-yellow-400 text-black px-6 py-2.5 text-xs font-bold transition-colors uppercase tracking-wider">
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="w-full relative z-20 py-8 bg-zinc-50 border-t border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
            {/* Feature 1 */}
            <div className="flex items-center justify-center gap-4 pt-4 md:pt-0">
              <Truck className="w-8 h-8 text-zinc-700" strokeWidth={1.5} />
              <div>
                <h3 className="text-[11px] font-bold tracking-wider text-zinc-900 uppercase leading-relaxed">Free Shipping For<br/>Orders Above ₹599</h3>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="flex items-center justify-center gap-4 pt-8 md:pt-0 px-4">
              <Hand className="w-8 h-8 text-zinc-700" strokeWidth={1.5} />
              <div>
                <h3 className="text-[11px] font-bold tracking-wider text-zinc-900 uppercase leading-relaxed">Promise, On Time<br/>Delivery</h3>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="flex items-center justify-center gap-4 pt-8 md:pt-0 px-4">
              <ShieldCheck className="w-8 h-8 text-zinc-700" strokeWidth={1.5} />
              <div>
                <h3 className="text-[11px] font-bold tracking-wider text-zinc-900 uppercase leading-relaxed">100% Secure<br/>Payment</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
