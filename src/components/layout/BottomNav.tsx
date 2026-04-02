"use client";

import React from "react";
import { Sparkles, UtensilsCrossed, ShoppingBag, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

interface BottomNavProps {
  onOpenCart?: () => void;
}

const navItems = [
  { icon: Sparkles, label: "Gallery", href: "/#gallery" },
  { icon: UtensilsCrossed, label: "Menu", href: "/#menu" },
  { icon: ShoppingBag, label: "Cart", isCart: true },
  { icon: MessageSquare, label: "Contact", href: "/#contact" },
];

export const BottomNav = ({ onOpenCart }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-center pb-6 px-6 pointer-events-none">
      <div className="bg-surface/90 backdrop-blur-2xl rounded-full px-4 py-2 border border-surface-container shadow-2xl flex items-end gap-2 pointer-events-auto">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          
          if (item.isCart) {
            return (
              <motion.button
                key={idx}
                onClick={onOpenCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center bg-primary text-on-primary rounded-full p-4 mb-2 shadow-lg shadow-primary/30 min-w-[70px]"
              >
                <Icon className="w-6 h-6" />
                <span className="text-[9px] font-bold uppercase tracking-widest mt-1">
                  {item.label}
                </span>
              </motion.button>
            );
          }

          return (
            <Link
              key={idx}
              href={item.href || "#"}
              className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary p-3 transition-colors group min-w-[64px]"
            >
              <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold uppercase tracking-widest mt-1">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
