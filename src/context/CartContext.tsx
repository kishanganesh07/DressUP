"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
  cartItemId: string; // Unique ID combining _id + size + color
};

type CartContextType = {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: Omit<CartItem, "quantity" | "cartItemId">) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setIsCartOpen: (isOpen: boolean) => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

  // Load from API if logged in, otherwise empty (or we could keep local storage for guests, but user requested "by user based")
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch("/api/user/cart", {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
            setCartItems(data.cart);
          }
        } catch (error) {
          console.error("Failed to fetch cart");
        }
      }
    };
    fetchCart();
  }, []);

  // Sync to API on changes
  const syncCart = async (newCart: CartItem[]) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await fetch("/api/user/cart", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
          },
          body: JSON.stringify({ cart: newCart }),
        });
      } catch (error) {
        console.error("Failed to sync cart", error);
      }
    }
  };

  const requireAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to use the cart");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event('openAuthModal'));
      }
      return false;
    }
    return true;
  };

  const addToCart = (item: Omit<CartItem, "quantity" | "cartItemId">) => {
    if (!requireAuth()) return;

    const cartItemId = `${item._id}-${item.size || "default"}-${item.color || "default"}`;
    
    setCartItems((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      let newCart;
      if (existing) {
        newCart = prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newCart = [...prev, { ...item, quantity: 1, cartItemId }];
      }
      syncCart(newCart);
      return newCart;
    });
    toast.success("Added to cart");
  };

  const removeFromCart = (cartItemId: string) => {
    if (!requireAuth()) return;
    setCartItems((prev) => {
      const newCart = prev.filter((i) => i.cartItemId !== cartItemId);
      syncCart(newCart);
      return newCart;
    });
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (!requireAuth()) return;
    if (quantity < 1) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) => {
      const newCart = prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i));
      syncCart(newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    if (!requireAuth()) return;
    setCartItems([]);
    syncCart([]);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        setIsCartOpen,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
