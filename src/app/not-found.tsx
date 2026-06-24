import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-white flex flex-col md:flex-row items-center justify-center pt-20">
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-8xl md:text-9xl font-serif text-zinc-900 mb-4">404</h1>
        <h2 className="text-2xl md:text-4xl font-bold tracking-widest uppercase text-zinc-900 mb-6">Page Not Found</h2>
        <p className="text-zinc-500 font-medium mb-10 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back to the latest collection.
        </p>
        <Link 
          href="/"
          className="bg-black text-white px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-colors shadow-lg"
        >
          Return to Home
        </Link>
      </div>
      <div className="w-full md:w-1/2 h-[50vh] md:h-[80vh] bg-zinc-100 relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop" 
          alt="404 Fashion" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
