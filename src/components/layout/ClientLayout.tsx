"use client";

import React from "react";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { StickyCartBar } from "../cart/StickyCartBar";
import { CartDrawer } from "../cart/CartDrawer";
import { CartProvider, useCart } from "@/context/CartContext";

function AppContent({ children }: { children: React.ReactNode }) {
  const { isCartOpen, setIsCartOpen } = useCart();

  return (
    <>
      <Header onOpenCart={() => setIsCartOpen(true)} />
      <main className="flex-1 pt-20 pb-32">{children}</main>
      <BottomNav onOpenCart={() => setIsCartOpen(true)} />
      <StickyCartBar onOpenDrawer={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <AppContent>{children}</AppContent>
    </CartProvider>
  );
}
