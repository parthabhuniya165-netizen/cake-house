"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  flavor?: string;
  customMessage?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  total: number;
  deliveryFee: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  showToast: boolean;
  setShowToast: (show: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const deliveryFee = 45; // Default delivery fee

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...newItem, quantity: 1 }];
    });
    
    // Show fast micro-feedback
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    
    // Automatically open cart when adding item (optional, keeping it as is)
    // setIsCartOpen(true); 
  };

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((current) =>
      current
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const totalCount = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  const total = useMemo(() => (subtotal > 0 ? subtotal + deliveryFee : 0), [
    subtotal,
    deliveryFee,
  ]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        total,
        deliveryFee,
        isCartOpen,
        setIsCartOpen,
        showToast,
        setShowToast,
      }}
    >
      {children}
      {/* Global Toast */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[3000] bg-on-surface text-surface py-3 px-6 rounded-2xl shadow-2xl flex items-center gap-3 animate-toast-in border border-stone-100/10 backdrop-blur-md">
          <span className="material-symbols-outlined text-primary">shopping_cart</span>
          <span className="font-bold text-sm tracking-wide">🛒 Item added to your order</span>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
