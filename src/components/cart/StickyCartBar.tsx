"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function StickyCartBar({ onOpenDrawer }: { onOpenDrawer: () => void }) {
  const { totalCount, subtotal } = useCart();

  if (totalCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-4 right-4 z-[1001] md:bottom-8 md:left-auto md:right-8 md:w-96"
      >
        <Button
          onClick={onOpenDrawer}
          className="w-full flex items-center justify-between bg-primary text-on-primary rounded-2xl p-4 h-auto shadow- premium hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-on-primary/60">
                {totalCount} {totalCount === 1 ? "Item" : "Items"}
              </span>
              <span className="font-headline text-xl font-bold">
                ₹{subtotal.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold uppercase tracking-wider text-sm">View Cart</span>
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
          </div>
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}
