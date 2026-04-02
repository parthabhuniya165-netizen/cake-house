"use client";

import React, { useState } from "react";
import { StickyCartBar } from "@/components/cart/StickyCartBar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import Link from "next/link";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-primary">menu</button>
          <Link href="/">
            <h1 className="font-headline italic text-xl tracking-tight text-primary">The Artisanal Pâtissier</h1>
          </Link>
        </div>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="material-symbols-outlined text-primary"
        >
          shopping_bag
        </button>
      </header>

      <main className="flex-grow pt-20">
        {children}
      </main>

      <footer className="w-full px-8 py-12 flex flex-col items-center gap-6 text-center bg-stone-50 mt-12 pb-32">
        <div className="font-headline text-lg text-stone-900">The Artisanal Pâtissier</div>
        <div className="flex gap-6 flex-wrap justify-center text-xs text-stone-500 font-medium tracking-wide">
          <a href="#">Our Story</a>
          <a href="#">Ingredients</a>
          <a href="#">Sustainability</a>
          <a href="#">Contact</a>
        </div>
        <div className="text-stone-400 text-[10px] uppercase tracking-widest font-bold">© 2024 The Artisanal Pâtissier Mysore</div>
      </footer>

      <StickyCartBar onOpenDrawer={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
