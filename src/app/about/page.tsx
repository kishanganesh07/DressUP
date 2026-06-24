import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-[60vh] bg-white pt-24 pb-12">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[60vh] bg-zinc-950 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop" 
            alt="About DRESS UP!" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-[0.15em] uppercase drop-shadow-xl mb-4 font-serif">
            Our Story
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-zinc-300 font-bold tracking-[0.2em] uppercase max-w-2xl mx-auto">
            Redefining Modern Fashion
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-5xl mx-auto px-6 lg:px-12 py-20">
        
        {/* Section 1: Who We Are */}
        <div className="mb-20 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-widest uppercase mb-6 font-serif">
            Who We Are
          </h2>
          <div className="w-16 h-1 bg-zinc-900 mx-auto mb-8 rounded-full"></div>
          <p className="text-zinc-600 leading-relaxed md:text-lg font-serif max-w-3xl mx-auto">
            Founded with a passion for exceptional style and uncompromising quality, DRESS UP! is your ultimate destination for contemporary fashion. We believe that what you wear is an expression of who you are, and our mission is to empower individuals through meticulously curated collections.
          </p>
        </div>

        {/* Section 2 & 3: Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div className="bg-zinc-50 p-10 border border-zinc-100">
            <h3 className="text-xl font-bold text-zinc-900 tracking-widest uppercase mb-4 font-serif">Our Mission</h3>
            <p className="text-zinc-600 leading-relaxed font-serif">
              To blend classic elegance with modern trends, creating pieces that empower you to look and feel your absolute best in every setting. We strive to set a new standard in everyday fashion.
            </p>
          </div>
          <div className="bg-zinc-50 p-10 border border-zinc-100">
            <h3 className="text-xl font-bold text-zinc-900 tracking-widest uppercase mb-4 font-serif">Our Values</h3>
            <p className="text-zinc-600 leading-relaxed font-serif">
              We prioritize premium materials, sustainable practices, and innovative designs to bring you apparel that not only looks stunning but stands the test of time. Quality over quantity, always.
            </p>
          </div>
        </div>

        {/* Section 4: Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-200 border-y border-zinc-200 py-12">
          <div className="flex flex-col items-center px-4">
            <h3 className="text-4xl font-black text-zinc-900 mb-2 font-serif">10K+</h3>
            <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Happy Customers</p>
          </div>
          <div className="flex flex-col items-center px-4 pt-8 md:pt-0">
            <h3 className="text-4xl font-black text-zinc-900 mb-2 font-serif">100%</h3>
            <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Premium Quality</p>
          </div>
          <div className="flex flex-col items-center px-4 pt-8 md:pt-0">
            <h3 className="text-4xl font-black text-zinc-900 mb-2 font-serif">50+</h3>
            <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Exclusive Collections</p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link href="/" className="inline-block px-12 py-5 bg-zinc-900 text-white text-xs font-bold tracking-widest uppercase hover:bg-black hover:scale-[1.02] transition-all duration-300">
            Explore Collections
          </Link>
        </div>
      </section>
    </div>
  );
}
