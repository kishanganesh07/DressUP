"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  // Load from API if logged in
  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch("/api/user/wishlist", {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
            setWishlistItems(data.wishlist);
          }
        } catch (error) {
          console.error("Failed to fetch wishlist");
        }
      }
    };
    fetchWishlist();
  }, []);

  // Sync to API on changes
  const syncWishlist = async (newWishlist: WishlistItem[]) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await fetch("/api/user/wishlist", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
          },
          body: JSON.stringify({ wishlist: newWishlist }),
        });
      } catch (error) {
        console.error("Failed to sync wishlist", error);
      }
    }
  };

  const requireAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to use the wishlist");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event('openAuthModal'));
      }
      return false;
    }
    return true;
  };

  const toggleWishlist = (item: WishlistItem) => {
    if (!requireAuth()) return;

    const exists = wishlistItems.some((i) => i._id === item._id);
    setWishlistItems((prev) => {
      let newWishlist;
      if (exists) {
        toast.success("Removed from wishlist", { id: `wishlist-${item._id}` });
        newWishlist = prev.filter((i) => i._id !== item._id);
      } else {
        toast.success("Added to wishlist", { id: `wishlist-${item._id}` });
        newWishlist = [...prev, item];
      }
      syncWishlist(newWishlist);
      return newWishlist;
    });
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
