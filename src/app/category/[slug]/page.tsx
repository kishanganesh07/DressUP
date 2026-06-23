"use client";

import { useEffect, useState } from "react";
import { Filter, ChevronDown, Check } from "lucide-react";
import WishlistButton from "@/Components/WishlistButton";
import Link from "next/link";
import axios from "axios";
import { use } from "react";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("recommended");
  const [selectedSize, setSelectedSize] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const isMen = slug.includes("mens") || slug.includes("men");
        const categoryParam = isMen ? "Men" : "Women";
        
        const { data } = await axios.get(`/api/products?category=${categoryParam}`);
        if (data.success) {
          // Format slug for filtering
          const searchStr = slug.replace("mens-", "").replace("womens-", "").replace(/-/g, " ");
          const keywords = searchStr.split(' ').filter(k => k.length > 2);
          
          let filtered = data.data.filter((p: any) => {
            const textToSearch = `${p.subcategory || ''} ${p.name || ''} ${p.category || ''}`.toLowerCase();
            // If no keywords (e.g. just "mens"), return all. Otherwise check if any keyword matches.
            if (keywords.length === 0) return true;
            return keywords.some(kw => textToSearch.includes(kw));
          });
          
          if (selectedSize !== "all") {
            filtered = filtered.filter((p: any) => p.sizes && p.sizes.includes(selectedSize));
          }

          if (sortOption === "price-low") {
            filtered.sort((a: any, b: any) => a.price - b.price);
          } else if (sortOption === "price-high") {
            filtered.sort((a: any, b: any) => b.price - a.price);
          }
          
          setProducts(filtered);
          setCurrentPage(1); // Reset to page 1 on filter/sort changes
        }
      } catch (error) {
        console.error("Failed to fetch category products", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [slug, sortOption, selectedSize]);

  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const itemsPerPage = 8;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Hero Banner */}
      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#112741] overflow-hidden">
        {/* Subtle background glow/pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FFD700] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>
        
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-widest uppercase drop-shadow-sm mb-4">
            {title}
          </h1>
          <div className="h-1 w-24 bg-[#FFD700] mx-auto mb-6"></div>
          <p className="text-sm md:text-base text-zinc-300 uppercase tracking-[0.2em] font-medium">
            Discover {products.length} Exclusive Styles
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Updated Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-8 pb-4 border-b border-zinc-200 gap-4">
          <div>
            <p className="text-sm text-zinc-600 cursor-pointer hover:underline underline-offset-4 decoration-zinc-300">
              <span className="font-bold text-black underline">Add delivery location</span><br/>
              to see express delivery options
            </p>
          </div>
          <span className="text-sm font-medium text-zinc-600">{products.length} items found</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mr-2">Filter By Size</span>
            {["all", "S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-full border ${
                  selectedSize === size 
                    ? "bg-[#112741] text-white border-[#112741] shadow-md" 
                    : "bg-white text-zinc-600 border-zinc-200 hover:border-[#112741] hover:text-[#112741]"
                }`}
              >
                {size === "all" ? "All" : size}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Sort</span>
            <div className="relative">
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-white border-b-2 border-zinc-300 text-zinc-800 text-sm font-bold uppercase tracking-wide py-2 pr-8 pl-2 outline-none cursor-pointer hover:border-[#112741] transition-colors focus:border-[#112741]"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zinc-900"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 bg-zinc-50 rounded-sm border border-zinc-100">
            <h2 className="text-2xl font-bold text-zinc-800 mb-3 uppercase tracking-wider">No products found</h2>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto">We couldn&apos;t find any products in this category at the moment. Please check back later or explore other categories.</p>
            <Link href="/" className="inline-block px-8 py-3.5 bg-zinc-900 text-white font-bold text-sm hover:bg-zinc-800 transition-colors uppercase tracking-widest shadow-md">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12">
              {currentProducts.map((product) => (
              <div key={product._id} className="group relative flex flex-col bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-zinc-200 p-2">
                <div className="aspect-[2/3] w-full overflow-hidden bg-zinc-100 relative cursor-pointer mb-3">
                  
                  {/* JUST IN tag */}
                  {product._id.charCodeAt(0) % 3 === 0 && (
                    <div className="absolute top-2 left-2 bg-[#4285F4] text-white text-[10px] font-bold px-2 py-0.5 z-10 uppercase tracking-widest rounded-sm">
                      JUST IN
                    </div>
                  )}
                  
                  {/* Heart Icon */}
                  <WishlistButton product={product} />

                  {/* Size Selector on Hover */}
                  <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm py-2 px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 flex justify-center gap-3 border-t border-zinc-100">
                    {["S", "M", "L", "XL", "XXL"].map(size => (
                      <span key={size} className={`text-xs font-bold cursor-pointer hover:text-black ${((product._id.charCodeAt(0) + size.charCodeAt(0)) % 5 === 0) ? 'text-zinc-300 line-through' : 'text-zinc-600'}`}>{size}</span>
                    ))}
                  </div>

                  <Link href={`/product/${product._id}`} className="block w-full h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  </Link>
                </div>
                
                <div className="px-1 pb-2 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-[11px] text-zinc-400 font-medium tracking-wide">
                      {product.subcategory || product.category}
                    </div>
                    <button className="text-zinc-400 hover:text-black transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    </button>
                  </div>
                  
                  <h3 className="text-sm font-semibold text-zinc-800 mb-1 leading-snug truncate group-hover:text-black transition-colors">
                    <Link href={`/product/${product._id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-zinc-400 line-through">₹{Math.floor(product.price * 1.15)}</span>
                    <span className="text-sm font-bold text-zinc-900">₹{product.price}</span>
                    <span className="text-[11px] font-bold text-red-500 tracking-wide">{Math.round((1 - (product.price / Math.floor(product.price * 1.15))) * 100)}% OFF</span>
                  </div>
                  
                  <div className="mt-auto flex items-center gap-2 pt-2 border-t border-zinc-50">
                    <span 
                      className="w-3.5 h-3.5 rounded-full ring-1 ring-offset-1 ring-zinc-200 shadow-sm" 
                      style={{ backgroundColor: product.colors?.[0]?.toLowerCase().replace(" ", "") || 'gray' }}
                    ></span>
                    <span className="text-[11px] text-zinc-500 capitalize tracking-wide">{product.colors?.[0] || 'Standard'}</span>
                  </div>
                  </div>
                </div>
            ))}
          </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-16 gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-zinc-200 rounded-md text-sm font-bold text-zinc-600 hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  PREV
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-bold transition-all ${
                      currentPage === i + 1 
                        ? 'bg-[#112741] text-white shadow-md transform scale-105' 
                        : 'bg-white border border-zinc-200 text-zinc-600 hover:border-[#112741] hover:text-[#112741]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-zinc-200 rounded-md text-sm font-bold text-zinc-600 hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  NEXT
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
