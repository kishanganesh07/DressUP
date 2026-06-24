"use client";

import { useEffect, useState, useRef } from "react";
import { Truck, Hand, ShieldCheck } from "lucide-react";
import Link from "next/link";
import WishlistButton from "@/Components/WishlistButton";
import ProductCard from "@/Components/ProductCard";
// Remove axios import

const mensCategories = [
  { name: "POLO T-SHIRTS",  path: "mens-polo-t-shirts", image: "https://i.pinimg.com/736x/bb/9c/49/bb9c49f465840c06b0b01e2ee6748196.jpg" },
  { name: "ROUND NECK T-SHIRTS", path: "mens-round-neck-t-shirts", image: "https://i.pinimg.com/1200x/1d/39/1d/1d391d4b13e38e2bc59f46350e8a3113.jpg" },
  { name: "CASUAL SHIRTS", path: "mens-casual-shirts", image: "https://imagescdn.peterengland.com/uploads/micrositmedia/production/men_Shop_by_category_1773294061486.jpg?auto=format&w=171" },
  { name: "FORMAL SHIRTS", path: "mens-formal-shirts", image: "https://i.pinimg.com/1200x/60/a4/c8/60a4c8d61d93c36cabb94cf84509856b.jpg" },
  { name: "CASUAL TROUSERS", path: "mens-casual-trousers", image: "https://i.pinimg.com/736x/15/1c/e8/151ce84c46826886dd8430c9a977cfb9.jpg" },
  { name: "FORMAL TROUSERS", path: "mens-formal-trousers", image: "https://i.pinimg.com/736x/3e/58/91/3e5891f501ecb150b9d480d6b8ee225f.jpg" },
  { name: "CARGOS", path: "mens-cargos", image: "https://i.pinimg.com/1200x/62/6b/f5/626bf55c235e1aca79290e90f88cf3da.jpg" },
  { name: "JEANS", path: "mens-jeans", image: "https://i.pinimg.com/736x/cd/b5/48/cdb548a8509425626cef0132798401bb.jpg" }
];

const heroImages = [
   "https://imagescdn.peterengland.com/uploads/micrositmedia/production/men_Top_Bottom_Image_1781156685397.jpg?w=1298&h=728&auto=format",
  "https://i.pinimg.com/1200x/20/e3/f4/20e3f43fb3fc6827abebd6ae7d1f6e09.jpg",
  "https://i.pinimg.com/736x/98/7a/fb/987afb860005f44993d1f369f9eb4224.jpg",
  "https://i.pinimg.com/736x/78/32/2c/78322c149131a323f5fd89a46384cfab.jpg",
];

export default function MensPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const tshirtsScrollRef = useRef<HTMLDivElement>(null);

  const scrollLeftTshirts = () => {
    if (tshirtsScrollRef.current) {
      tshirtsScrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRightTshirts = () => {
    if (tshirtsScrollRef.current) {
      tshirtsScrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const shirtsScrollRef = useRef<HTMLDivElement>(null);
  const jeansScrollRef = useRef<HTMLDivElement>(null);

  const scrollLeftShirts = () => {
    if (shirtsScrollRef.current) {
      shirtsScrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRightShirts = () => {
    if (shirtsScrollRef.current) {
      shirtsScrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
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
        const res = await fetch('/api/products?category=Men');
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
                alt={`Mens Collection ${idx + 1}`}
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
              The Men&apos;s Store
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
      <div className="text-center mt-16 md:mt-24 mb-12">
        <h2 className="text-3xl md:text-4xl font-serif tracking-wide text-zinc-900 mb-4">Explore Categories</h2>
        <div className="w-16 h-[1px] bg-zinc-300 mx-auto"></div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 mt-8">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {mensCategories.map((cat) => (
            <Link href={`/category/${cat.path}`} key={cat.name} className="w-[calc(50%-0.5rem)] md:w-[calc(25%-1.5rem)] group cursor-pointer relative overflow-hidden bg-zinc-900 aspect-[4/5] shadow-lg rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
              
              <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full flex flex-col items-center justify-end text-center">
                <span className="text-sm md:text-lg font-serif text-white tracking-[0.15em] uppercase group-hover:-translate-y-2 transition-transform duration-500 drop-shadow-md">
                  {cat.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-500 delay-100 mt-2 font-bold">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* T-Shirts Section */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 mt-10 relative z-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold tracking-widest text-zinc-900 uppercase">T-Shirts</h2>
          <Link href="/category/mens-t-shirts" className="text-sm font-bold tracking-widest uppercase text-zinc-900 hover:text-zinc-600 transition-colors border-b-2 border-zinc-900 pb-1">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-zinc-900"></div>
          </div>
        ) : (
          <div className="relative group/carousel-tshirts">
            <button 
              onClick={scrollLeftTshirts}
              className="absolute left-0 top-1/3 -translate-y-1/2 -ml-4 md:-ml-6 z-10 bg-white border border-zinc-200 text-zinc-600 rounded-full p-2.5 shadow-md hover:bg-zinc-50 hover:scale-110 hover:text-zinc-900 transition-all opacity-0 group-hover/carousel-tshirts:opacity-100 hidden md:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button 
              onClick={scrollRightTshirts}
              className="absolute right-0 top-1/3 -translate-y-1/2 -mr-4 md:-mr-6 z-10 bg-white border border-zinc-200 text-zinc-600 rounded-full p-2.5 shadow-md hover:bg-zinc-50 hover:scale-110 hover:text-zinc-900 transition-all opacity-0 group-hover/carousel-tshirts:opacity-100 hidden md:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>

            <div ref={tshirtsScrollRef} className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth">
              {products.filter(p => p.subcategory?.includes('T-Shirts') || p.category?.includes('T-Shirts')).slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
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
              "https://i.pinimg.com/736x/17/12/0f/17120f76e8efd48e98a9d8b27f196235.jpg",
              "https://res.cloudinary.com/dvbmbe4cl/image/upload/v1782108303/8c00914f41d0d7fec49c3a9431c5b417_wwyki4.jpg",
              "https://res.cloudinary.com/dvbmbe4cl/image/upload/v1782108136/63de3ecf0e9c6c4a652dcaac01dfcf10_whg0v2.jpg"
            ].map((src, i) => (
              <div key={i} className="flex-none w-screen h-[50vh] md:h-[75vh] snap-start relative overflow-hidden bg-zinc-50 cursor-pointer">
                <Link href="/category/mens-t-shirts" className="w-full h-full block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Promotional Banner ${i+1}`} className="w-full h-full object-cover object-center" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shirts Section */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 relative z-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold tracking-widest text-zinc-900 uppercase">Shirts</h2>
          <Link href="/category/mens-casual-shirts" className="text-sm font-bold tracking-widest uppercase text-zinc-900 hover:text-zinc-600 transition-colors border-b-2 border-zinc-900 pb-1">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-zinc-900"></div>
          </div>
        ) : (
          <div className="relative group/carousel-shirts">
            <button 
              onClick={scrollLeftShirts}
              className="absolute left-0 top-1/3 -translate-y-1/2 -ml-4 md:-ml-6 z-10 bg-white border border-zinc-200 text-zinc-600 rounded-full p-2.5 shadow-md hover:bg-zinc-50 hover:scale-110 hover:text-zinc-900 transition-all opacity-0 group-hover/carousel-shirts:opacity-100 hidden md:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button 
              onClick={scrollRightShirts}
              className="absolute right-0 top-1/3 -translate-y-1/2 -mr-4 md:-mr-6 z-10 bg-white border border-zinc-200 text-zinc-600 rounded-full p-2.5 shadow-md hover:bg-zinc-50 hover:scale-110 hover:text-zinc-900 transition-all opacity-0 group-hover/carousel-shirts:opacity-100 hidden md:block"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>

            <div ref={shirtsScrollRef} className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth">
              {products.filter(p => (p.subcategory?.includes('Shirt') || p.category?.includes('Shirt')) && !p.subcategory?.includes('T-Shirt') && !p.category?.includes('T-Shirt')).slice(0, 8).map((product) => (
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
          <h2 className="text-xl font-bold tracking-widest text-zinc-900 uppercase">Jeans</h2>
          <Link href="/category/mens-jeans" className="text-sm font-bold tracking-widest uppercase text-zinc-900 hover:text-zinc-600 transition-colors border-b-2 border-zinc-900 pb-1">
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
              {products.filter(p => (p.subcategory?.includes('Jean') || p.category?.includes('Jean') || p.name?.includes('Jeans')) && !p.category?.includes('Women') && !p.name?.includes('Women')).slice(0, 8).map((product) => (
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
