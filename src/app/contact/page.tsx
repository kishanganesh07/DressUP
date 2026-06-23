import React from 'react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Header Section */}
      <section className="w-full bg-zinc-50 py-16 text-center border-b border-zinc-200">
        <h1 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-[0.1em] uppercase mb-4">
          Contact Us
        </h1>
        <p className="text-sm md:text-base text-zinc-500 font-medium tracking-widest uppercase">
          We&apos;d love to hear from you
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Information */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-extrabold text-zinc-900 tracking-widest uppercase mb-8">
              Get In Touch
            </h2>
            <div className="w-16 h-1 bg-zinc-900 mb-10 rounded-full"></div>
            
            <p className="text-zinc-600 leading-relaxed font-serif mb-10">
              Whether you have a question about our collections, need styling advice, or require assistance with your order, our dedicated team is here to help. Reach out to us through any of the channels below.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0 text-zinc-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-widest text-zinc-900 uppercase mb-1">Our Studio</h3>
                  <p className="text-zinc-500 text-sm font-serif leading-relaxed">
                    123 Fashion Avenue, Style District<br/>
                    Metropolis, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0 text-zinc-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-widest text-zinc-900 uppercase mb-1">Email Us</h3>
                  <p className="text-zinc-500 text-sm font-serif">support@dressup.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0 text-zinc-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-widest text-zinc-900 uppercase mb-1">Call Us</h3>
                  <p className="text-zinc-500 text-sm font-serif">+1 (800) 123-4567</p>
                  <p className="text-zinc-400 text-xs mt-1">Mon-Fri from 9am to 6pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-50 p-8 md:p-10 border border-zinc-100 shadow-sm rounded-sm">
            <h3 className="text-lg font-bold tracking-widest text-zinc-900 uppercase mb-8 text-center">
              Send a Message
            </h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-white border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-white border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full bg-white border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full bg-white border border-zinc-300 px-4 py-3 text-sm focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button 
                type="button" 
                className="w-full bg-zinc-900 text-white text-xs font-bold tracking-widest uppercase py-4 hover:bg-black hover:scale-[1.02] transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
          
        </div>
      </section>
    </div>
  );
}
