import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ANTIGRAVITY | Future of Fashion",
  description: "Premium clothing brand built for the future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-zinc-900 min-h-screen relative overflow-x-hidden`}
      >

        <WishlistProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Toaster 
                position="top-center" 
                toastOptions={{
                  style: {
                    background: '#18181b', // zinc-900
                    color: '#fff',
                    borderRadius: '0px',
                    padding: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    border: '1px solid #27272a' // zinc-800
                  },
                  success: {
                    iconTheme: {
                      primary: '#fff',
                      secondary: '#18181b',
                    },
                  },
                }}
              />
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
