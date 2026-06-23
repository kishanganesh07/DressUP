import React from "react";
import Link from "next/link";

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-widest uppercase mb-4">Size Guide</h1>
          <p className="text-sm text-zinc-500 max-w-2xl mx-auto tracking-wide leading-relaxed">
            Find your perfect fit with our comprehensive sizing charts. Measurements are provided in inches and serve as a general guide to help you find the right size for our exclusive collections.
          </p>
        </div>

        {/* How to Measure Section */}
        <div className="bg-zinc-50 p-8 md:p-12 mb-16 border border-zinc-100">
          <h2 className="text-xl font-bold tracking-widest text-zinc-900 uppercase mb-8 text-center border-b border-zinc-200 pb-4">How to Measure</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-200 shadow-sm">
                <span className="text-xl font-black text-zinc-900">1</span>
              </div>
              <h3 className="font-bold text-sm tracking-widest uppercase mb-2">Chest / Bust</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Measure under your arms, around the fullest part of your chest or bust.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-200 shadow-sm">
                <span className="text-xl font-black text-zinc-900">2</span>
              </div>
              <h3 className="font-bold text-sm tracking-widest uppercase mb-2">Waist</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Measure around your natural waistline, keeping the tape comfortably loose.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-200 shadow-sm">
                <span className="text-xl font-black text-zinc-900">3</span>
              </div>
              <h3 className="font-bold text-sm tracking-widest uppercase mb-2">Hips</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Stand with your feet together and measure around the fullest part of your hips.</p>
            </div>
          </div>
        </div>

        {/* Men's Sizing */}
        <div className="mb-20">
          <h2 className="text-2xl font-black tracking-widest text-zinc-900 uppercase mb-8 border-l-4 border-zinc-900 pl-4">Men&apos;s Sizing</h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-bold tracking-widest text-zinc-500 uppercase mb-4">Tops (Shirts, T-Shirts, Polos)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead>
                    <tr className="bg-zinc-900 text-white uppercase tracking-widest text-xs">
                      <th className="py-4 px-6 font-bold">Size</th>
                      <th className="py-4 px-6 font-bold">Chest (Inches)</th>
                      <th className="py-4 px-6 font-bold">Length (Inches)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">S</td><td className="py-4 px-6 text-zinc-500">38&quot;</td><td className="py-4 px-6 text-zinc-500">27&quot;</td></tr>
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">M</td><td className="py-4 px-6 text-zinc-500">40&quot;</td><td className="py-4 px-6 text-zinc-500">28&quot;</td></tr>
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">L</td><td className="py-4 px-6 text-zinc-500">42&quot;</td><td className="py-4 px-6 text-zinc-500">29&quot;</td></tr>
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">XL</td><td className="py-4 px-6 text-zinc-500">44&quot;</td><td className="py-4 px-6 text-zinc-500">30&quot;</td></tr>
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">XXL</td><td className="py-4 px-6 text-zinc-500">46&quot;</td><td className="py-4 px-6 text-zinc-500">31&quot;</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold tracking-widest text-zinc-500 uppercase mb-4">Bottoms (Jeans, Trousers, Cargos)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead>
                    <tr className="bg-zinc-900 text-white uppercase tracking-widest text-xs">
                      <th className="py-4 px-6 font-bold">Size</th>
                      <th className="py-4 px-6 font-bold">Waist (Inches)</th>
                      <th className="py-4 px-6 font-bold">Inseam (Inches)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">28</td><td className="py-4 px-6 text-zinc-500">28&quot;</td><td className="py-4 px-6 text-zinc-500">30&quot;</td></tr>
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">30</td><td className="py-4 px-6 text-zinc-500">30&quot;</td><td className="py-4 px-6 text-zinc-500">31&quot;</td></tr>
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">32</td><td className="py-4 px-6 text-zinc-500">32&quot;</td><td className="py-4 px-6 text-zinc-500">32&quot;</td></tr>
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">34</td><td className="py-4 px-6 text-zinc-500">34&quot;</td><td className="py-4 px-6 text-zinc-500">32&quot;</td></tr>
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">36</td><td className="py-4 px-6 text-zinc-500">36&quot;</td><td className="py-4 px-6 text-zinc-500">32&quot;</td></tr>
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">38</td><td className="py-4 px-6 text-zinc-500">38&quot;</td><td className="py-4 px-6 text-zinc-500">32&quot;</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Women's Sizing */}
        <div className="mb-20">
          <h2 className="text-2xl font-black tracking-widest text-zinc-900 uppercase mb-8 border-l-4 border-zinc-900 pl-4">Women&apos;s Sizing</h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-bold tracking-widest text-zinc-500 uppercase mb-4">Tops & Dresses</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead>
                    <tr className="bg-zinc-900 text-white uppercase tracking-widest text-xs">
                      <th className="py-4 px-6 font-bold">Size</th>
                      <th className="py-4 px-6 font-bold">Bust (Inches)</th>
                      <th className="py-4 px-6 font-bold">Waist (Inches)</th>
                      <th className="py-4 px-6 font-bold">Hips (Inches)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">XS</td><td className="py-4 px-6 text-zinc-500">32&quot;</td><td className="py-4 px-6 text-zinc-500">24&quot;</td><td className="py-4 px-6 text-zinc-500">34&quot;</td></tr>
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">S</td><td className="py-4 px-6 text-zinc-500">34&quot;</td><td className="py-4 px-6 text-zinc-500">26&quot;</td><td className="py-4 px-6 text-zinc-500">36&quot;</td></tr>
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">M</td><td className="py-4 px-6 text-zinc-500">36&quot;</td><td className="py-4 px-6 text-zinc-500">28&quot;</td><td className="py-4 px-6 text-zinc-500">38&quot;</td></tr>
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">L</td><td className="py-4 px-6 text-zinc-500">38&quot;</td><td className="py-4 px-6 text-zinc-500">30&quot;</td><td className="py-4 px-6 text-zinc-500">40&quot;</td></tr>
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">XL</td><td className="py-4 px-6 text-zinc-500">40&quot;</td><td className="py-4 px-6 text-zinc-500">32&quot;</td><td className="py-4 px-6 text-zinc-500">42&quot;</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold tracking-widest text-zinc-500 uppercase mb-4">Bottoms (Jeans, Trousers)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead>
                    <tr className="bg-zinc-900 text-white uppercase tracking-widest text-xs">
                      <th className="py-4 px-6 font-bold">Size</th>
                      <th className="py-4 px-6 font-bold">Waist (Inches)</th>
                      <th className="py-4 px-6 font-bold">Hips (Inches)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">26</td><td className="py-4 px-6 text-zinc-500">26&quot;</td><td className="py-4 px-6 text-zinc-500">36&quot;</td></tr>
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">28</td><td className="py-4 px-6 text-zinc-500">28&quot;</td><td className="py-4 px-6 text-zinc-500">38&quot;</td></tr>
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">30</td><td className="py-4 px-6 text-zinc-500">30&quot;</td><td className="py-4 px-6 text-zinc-500">40&quot;</td></tr>
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">32</td><td className="py-4 px-6 text-zinc-500">32&quot;</td><td className="py-4 px-6 text-zinc-500">42&quot;</td></tr>
                    <tr className="hover:bg-zinc-50 transition-colors"><td className="py-4 px-6 font-medium text-zinc-900">34</td><td className="py-4 px-6 text-zinc-500">34&quot;</td><td className="py-4 px-6 text-zinc-500">44&quot;</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-12 border-t border-zinc-200">
          <Link href="/mens" className="px-8 py-4 bg-zinc-900 text-white text-xs font-bold tracking-widest uppercase hover:bg-black transition-colors w-full md:w-auto text-center">
            Shop Men
          </Link>
          <Link href="/womens" className="px-8 py-4 border border-zinc-900 text-zinc-900 text-xs font-bold tracking-widest uppercase hover:bg-zinc-50 transition-colors w-full md:w-auto text-center">
            Shop Women
          </Link>
        </div>

      </div>
    </div>
  );
}
