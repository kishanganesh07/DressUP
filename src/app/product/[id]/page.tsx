"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// Remove axios import
import { useCart } from "@/context/CartContext";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import Link from "next/link";
import WishlistButton from "@/Components/WishlistButton";

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;
  const { addToCart } = useCart();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [error, setError] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (data.success) {
          setProduct(data.data);
          if (data.data.sizes?.length) setSelectedSize(data.data.sizes[0]);
          if (data.data.colors?.length) setSelectedColor(data.data.colors[0]);
        } else {
          fallbackToMock();
        }
      } catch {
        fallbackToMock();
      } finally {
        setLoading(false);
      }
    };

    const fallbackToMock = () => {
      const mockProduct = MOCK_PRODUCTS.find((p) => p._id === id);
      if (mockProduct) {
        setProduct(mockProduct);
        if (mockProduct.sizes?.length) setSelectedSize(mockProduct.sizes[0]);
        if (mockProduct.colors?.length) setSelectedColor(mockProduct.colors[0]);
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
    <div className="min-h-screen bg-white text-zinc-900 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 xl:gap-x-24">
          
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div 
              className="w-full aspect-[3/4] bg-zinc-100 overflow-hidden relative cursor-zoom-in group"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={product.images && product.images.length > 0 ? product.images[activeImage] : ""} 
                alt={product.name} 
                className={`w-full h-full object-cover object-center transition-transform ${isZoomed ? 'duration-0' : 'duration-700 ease-in-out'}`}
                style={{
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                  transform: isZoomed ? 'scale(2.5)' : 'scale(1)'
                }}
              />
            </div>
            
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-4">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-[3/4] overflow-hidden bg-zinc-100 transition-all ${
                      activeImage === idx ? 'ring-2 ring-zinc-900 ring-offset-2' : 'opacity-70 hover:opacity-100'
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
            <h2 className="text-xs font-semibold text-zinc-500 tracking-widest uppercase mb-4">
              {product.category}
            </h2>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 mb-6 leading-tight">
              {product.name}
            </h1>
            
            <div className="mt-3 flex items-center">
              <p className="text-2xl font-medium tracking-tight text-zinc-900">
                ₹{product.price.toFixed(2)}
              </p>
            </div>

            <div className="mt-8">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-zinc-600 leading-relaxed font-light">
                {product.description || "No description available for this product."}
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
                        className={`relative w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
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
                        className={`flex items-center justify-center px-3 py-3 border text-sm transition-all duration-300 ${
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
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-zinc-900 border border-transparent py-4 px-8 flex items-center justify-center text-sm font-medium text-white hover:bg-black transition-colors duration-300 focus:outline-none uppercase tracking-widest"
                >
                  Add to Cart
                </button>
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
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {product && (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-24 border-t border-zinc-200 pt-16">
          <h2 className="text-2xl font-bold tracking-widest text-zinc-900 uppercase mb-10 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {MOCK_PRODUCTS
              .filter(p => p.category === product.category && p._id !== product._id)
              .slice(0, 4)
              .map(similar => (
                <div key={similar._id} className="group cursor-pointer">
                  <Link href={`/product/${similar._id}`}>
                    <div className="aspect-[3/4] bg-zinc-100 overflow-hidden mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={similar.images[0]} 
                        alt={similar.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-sm font-semibold text-zinc-900 mb-1 truncate px-2">{similar.name}</h3>
                      <p className="text-sm text-zinc-500">₹{similar.price}</p>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
}
