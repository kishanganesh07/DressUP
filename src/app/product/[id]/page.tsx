"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// Remove axios import
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import WishlistButton from "@/Components/WishlistButton";
import ProductCard from "@/Components/ProductCard";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>(null);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [error, setError] = useState("");
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.data);
          if (data.data.sizes?.length) setSelectedSize(data.data.sizes[0]);
          if (data.data.colors?.length) setSelectedColor(data.data.colors[0]);

          // Fetch similar products based on the category
          if (data.data.category) {
            try {
              const similarRes = await fetch(`/api/products?category=${encodeURIComponent(data.data.category)}`);
              const similarData = await similarRes.json();
              if (similarData.success) {
                 setSimilarProducts(similarData.data.filter((p: any) => p._id !== id).slice(0, 4));
              }
            } catch (err) {
              console.error("Failed to fetch similar products", err);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      setError("Please select a size");
      return;
    }
    if (product.colors?.length > 0 && !selectedColor) {
      setError("Please select a color");
      return;
    }
    
    setError("");
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
          <p className="text-zinc-400">The item you are looking for does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfcfb] text-zinc-900 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 xl:gap-x-24">
          
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="w-full aspect-[3/4] bg-[#fdfcfb] relative shadow-sm rounded-xl border border-zinc-100">
              <style jsx global>{`
                .iiz { width: 100%; height: 100%; margin: 0; border-radius: 0.75rem; overflow: hidden; }
                .iiz__img { width: 100% !important; height: 100% !important; object-fit: cover; }
              `}</style>
              {product.images && product.images.length > 0 ? (
                <InnerImageZoom
                  src={product.images[activeImage]}
                  zoomSrc={product.images[activeImage]}
                  alt={product.name}
                  zoomType="hover"
                  zoomScale={1.5}
                  hideHint={true}
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-zinc-100 rounded-xl"></div>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-4">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-[3/4] overflow-hidden bg-[#fdfcfb] transition-all rounded-lg cursor-pointer ${
                      activeImage === idx ? 'ring-1 ring-zinc-400 ring-offset-2' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={img} 
                      alt={`${product.name} thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="mt-12 px-4 sm:px-0 lg:mt-8 flex flex-col justify-center">
            <h2 className="text-[11px] font-semibold text-zinc-500 tracking-[0.2em] uppercase mb-4">
              {product.category}
            </h2>
            <h1 className="text-4xl sm:text-5xl font-serif tracking-wide text-zinc-900 mb-6 leading-tight">
              {product.name}
            </h1>
            
            <div className="mt-3 flex items-center">
              <p className="text-2xl font-medium tracking-tight text-zinc-900">
                ₹{product.price.toFixed(2)}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-base text-zinc-500 font-light tracking-wide">
                Premium quality {product.subcategory || product.category} by {product.brand || "our brand"}.
              </p>
            </div>

            <div className="mt-12 border-t border-zinc-200 pt-10">
              {/* Color Picker */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-zinc-300 mb-3">Color</h3>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color: string) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                          selectedColor === color 
                            ? 'border-zinc-900 ring-2 ring-offset-2 ring-zinc-900' 
                            : 'border-zinc-300 hover:border-zinc-400'
                        }`}
                        title={color}
                        style={{ backgroundColor: color.toLowerCase().replace(' ', '') === 'black' ? '#18181b' : color.toLowerCase().replace(' ', '') === 'white' ? '#ffffff' : color.toLowerCase().includes('blue') ? '#1e3a8a' : color.toLowerCase().includes('red') ? '#991b1b' : color.toLowerCase().includes('green') ? '#166534' : '#52525b' }}
                      >
                        <span className="sr-only">{color}</span>
                        {selectedColor === color && (
                          <svg className="w-5 h-5 text-white filter drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Picker */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-zinc-300">Size</h3>
                    <a href="#" className="text-sm font-medium text-purple-400 hover:text-purple-300">Size guide</a>
                  </div>
                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`flex items-center justify-center px-3 py-3 border text-sm transition-all duration-300 cursor-pointer ${
                          selectedSize === size
                            ? 'border-zinc-900 bg-zinc-900 text-white font-medium'
                            : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-900 hover:text-zinc-900'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">{error}</p>
              )}

              <div className="mt-8 flex gap-4">
                {(() => {
                  const cartItemId = `${product._id}-${selectedSize || "default"}-${selectedColor || "default"}`;
                  const cartItem = cartItems.find((i) => i.cartItemId === cartItemId);
                  const count = cartItem ? cartItem.quantity : 0;

                  return count === 0 ? (
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-zinc-900 border border-transparent py-4 px-8 flex items-center justify-center text-[11px] font-bold tracking-[0.15em] text-white hover:bg-black transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 focus:outline-none uppercase rounded-sm"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex-1 bg-zinc-900 border border-transparent py-0 flex items-center justify-between text-[11px] font-bold tracking-[0.15em] text-white transition-all duration-500 shadow-xl rounded-sm">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (count > 1) updateQuantity(cartItemId, count - 1);
                          else removeFromCart(cartItemId);
                        }}
                        className="w-16 h-full min-h-[50px] flex items-center justify-center hover:bg-black transition-colors"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center py-4">{count}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          updateQuantity(cartItemId, count + 1);
                        }}
                        className="w-16 h-full min-h-[50px] flex items-center justify-center hover:bg-black transition-colors"
                      >
                        +
                      </button>
                    </div>
                  );
                })()}
                <WishlistButton 
                  product={product} 
                  className="flex-none p-4 border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 transition-colors duration-300 flex items-center justify-center" 
                  iconClassName="w-6 h-6"
                />
              </div>

              {/* Badges/Features */}
              <div className="mt-12 grid grid-cols-2 gap-6 border-t border-zinc-200 pt-10">
                <div className="flex flex-col text-sm text-zinc-500">
                  <span className="font-medium text-zinc-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                    Free Shipping
                  </span>
                  <span className="mt-1">On orders over $150</span>
                </div>
                <div className="flex flex-col text-sm text-zinc-500">
                  <span className="font-medium text-zinc-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    Free Returns
                  </span>
                  <span className="mt-1">Within 30 days</span>
                </div>
              </div>

              {/* Product Description & Details */}
              <div className="mt-12 border-t border-zinc-200 pt-10">
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-zinc-900 tracking-wider uppercase mb-4">Product Description</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                    {product.description || "Drenched in sophistication, this piece is an impeccable choice for any occasion. Made from premium materials, it ensures all-day comfort while enhancing your presence at every event. Elevate your aesthetic with this striking piece that embodies modern elegance."}
                  </p>
                </div>

                <div className="border-t border-zinc-200 pt-6">
                  <div 
                    className="flex justify-between items-center cursor-pointer mb-6"
                    onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                  >
                    <h3 className="text-sm font-bold text-zinc-900 tracking-wider uppercase">Product Details</h3>
                    <svg 
                      className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isDetailsOpen ? 'rotate-180' : ''}`} 
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {isDetailsOpen && (
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Material:</p>
                        <p className="text-sm font-semibold text-zinc-900">{product.material || "100% Premium Cotton"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Fit:</p>
                        <p className="text-sm font-semibold text-zinc-900">{product.fit || "Slim Fit"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">StyleCode:</p>
                        <p className="text-sm font-semibold text-zinc-900">{product._id || "STY-123456"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Brand:</p>
                        <p className="text-sm font-semibold text-zinc-900">{product.brand || "Exclusive Collection"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Collar:</p>
                        <p className="text-sm font-semibold text-zinc-900">{product.subcategory?.includes('Polo') ? 'Polo Collar' : 'Regular Collar'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Color:</p>
                        <p className="text-sm font-semibold text-zinc-900">{product.colors?.[0] || "Standard"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Occasion:</p>
                        <p className="text-sm font-semibold text-zinc-900">{product.subcategory?.includes('Formal') ? 'Formal' : 'Casual'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Pattern:</p>
                        <p className="text-sm font-semibold text-zinc-900">{product.name?.toLowerCase().includes('solid') ? 'Solid' : product.name?.toLowerCase().includes('print') ? 'Printed' : 'Textured'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">Sleeves:</p>
                        <p className="text-sm font-semibold text-zinc-900">{product.subcategory?.includes('T-Shirt') ? 'Short Sleeves' : 'Full Sleeves'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">ProductType:</p>
                        <p className="text-sm font-semibold text-zinc-900">{product.subcategory || product.category || 'Apparel'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {product && (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-24 border-t border-zinc-200/50 pt-16">
          <h2 className="text-2xl md:text-3xl font-serif tracking-wide text-zinc-900 mb-10 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.length > 0 ? (
              similarProducts.map(similar => (
                <ProductCard key={similar._id} product={similar} />
              ))
            ) : (
              <p className="col-span-full text-center text-zinc-500 py-10">No similar products found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
