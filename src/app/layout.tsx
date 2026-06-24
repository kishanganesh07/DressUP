import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import LayoutWrapper from "@/Components/LayoutWrapper";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Toaster } from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader';
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dress UP! | Future of Fashion",
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
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#fdfcfb] text-zinc-900 min-h-screen relative overflow-x-hidden`}
      >
        <NextTopLoader 
          color="#171717"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #171717,0 0 5px #171717"
        />
        <WishlistProvider>
          <CartProvider>
            <LayoutWrapper>
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
              {children}
            </LayoutWrapper>
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
