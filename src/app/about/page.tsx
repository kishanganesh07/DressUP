import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-[0.15em] uppercase drop-shadow-xl mb-4">
            Our Story
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-zinc-300 font-bold tracking-[0.2em] uppercase max-w-2xl mx-auto">
            Redefining Modern Fashion
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-widest uppercase mb-8">
          Welcome to DRESS UP!
        </h2>
        <div className="w-24 h-1 bg-zinc-900 mx-auto mb-12 rounded-full"></div>
        
        <p className="text-zinc-600 leading-relaxed md:text-lg font-serif mb-8 text-justify md:text-center">
          Founded with a passion for exceptional style and uncompromising quality, DRESS UP! is your ultimate destination for contemporary fashion. We believe that what you wear is an expression of who you are, and our mission is to empower individuals through meticulously curated collections that blend classic elegance with modern trends.
        </p>
        
        <p className="text-zinc-600 leading-relaxed md:text-lg font-serif mb-16 text-justify md:text-center">
          From sophisticated formals that command attention to relaxed casuals designed for everyday comfort, our diverse range ensures that you look and feel your absolute best in every setting. We prioritize premium materials, sustainable practices, and innovative designs to bring you apparel that not only looks stunning but stands the test of time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-200 border-y border-zinc-200 py-12">
          <div className="flex flex-col items-center px-4">
            <h3 className="text-3xl font-black text-zinc-900 mb-2">10K+</h3>
            <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Happy Customers</p>
          </div>
          <div className="flex flex-col items-center px-4 pt-8 md:pt-0">
            <h3 className="text-3xl font-black text-zinc-900 mb-2">Exclusive</h3>
            <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Curated Collections</p>
          </div>
          <div className="flex flex-col items-center px-4 pt-8 md:pt-0">
            <h3 className="text-3xl font-black text-zinc-900 mb-2">Premium</h3>
            <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Quality Materials</p>
          </div>
        </div>

        <div className="mt-16">
          <Link href="/" className="inline-block px-10 py-4 bg-zinc-900 text-white text-xs font-bold tracking-widest uppercase hover:bg-black hover:scale-105 transition-all duration-300">
            Explore Collections
          </Link>
        </div>
      </section>
    </div>
  );
}
