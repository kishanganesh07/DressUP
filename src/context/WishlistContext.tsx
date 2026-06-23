"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import toast from "react-hot-toast";

export type WishlistItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

type WishlistContextType = {
  wishlistItems: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  wishlistCount: number;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist from local storage", e);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (item: WishlistItem) => {
    const exists = wishlistItems.some((i) => i._id === item._id);
    if (exists) {
      toast.success("Removed from wishlist", { id: `wishlist-${item._id}` });
      setWishlistItems((prev) => prev.filter((i) => i._id !== item._id));
    } else {
      toast.success("Added to wishlist", { id: `wishlist-${item._id}` });
      setWishlistItems((prev) => [...prev, item]);
    }
  };

  const isInWishlist = (id: string) => {
    return wishlistItems.some((item) => item._id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist, wishlistCount: wishlistItems.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
