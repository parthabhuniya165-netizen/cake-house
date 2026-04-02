"use client";

import React from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface HeaderProps {
  onOpenCart?: () => void;
}

export const Header = ({ onOpenCart }: HeaderProps) => {
  const { totalCount } = useCart();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 px-6 py-4 transition-all duration-300",
        isScrolled
          ? "bg-surface/80 backdrop-blur-xl shadow-sm border-b border-surface-container"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button className="p-2 -ml-2 text-on-surface hover:bg-surface-container rounded-full transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-2xl font-headline italic tracking-tight text-primary leading-none">
            The Artisanal Pâtissier
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenCart}
            className="p-2 -mr-2 text-primary hover:bg-primary/5 rounded-full transition-colors relative"
          >
            <ShoppingBag className="w-6 h-6" />
            {totalCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-[10px] flex items-center justify-center font-bold text-on-primary rounded-full ring-2 ring-surface">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
