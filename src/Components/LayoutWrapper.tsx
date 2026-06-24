"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/admin";

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "453870428200-e5hhnmt1mi0b0ncdi5s5ojkj2m28qb0s.apps.googleusercontent.com"}>
      <div className="flex flex-col min-h-screen">
        {!isAuthPage && <Navbar />}
        <AnimatePresence mode="wait">
          <motion.main 
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-grow"
          >
            {children}
          </motion.main>
        </AnimatePresence>
        {!isAuthPage && <Footer />}
      </div>
    </GoogleOAuthProvider>
  );
}
