"use client";

import React from "react";
import Image from "next/image";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  className?: string;
}

export const ProductCard = ({
  id,
  title,
  price,
  image,
  description,
  className,
}: ProductCardProps) => {
  const { addItem } = useCart();

  const handleOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      title,
      price,
      image,
    });
  };

  const handleDetails = (e: React.MouseEvent) => {
    // Let the parent Link handle navigation, but ensure no bubbling issues
    e.stopPropagation();
  };

  return (
    <Link href={`/product/${id}`} className="block group/card">
      <motion.div
        whileHover={{ y: -12 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "group min-w-[300px] md:min-w-[320px] bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-premium transition-all duration-500 border border-surface-container-highest/30 cursor-pointer relative",
          className
        )}
      >
        <div className="relative h-72 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover/card:scale-110 transition-transform duration-1000 ease-out"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-white/50">
              <Star className="w-3.5 h-3.5 text-primary fill-current" />
              <span className="text-[10px] font-bold text-on-surface">4.8</span>
              <span className="text-[10px] text-on-surface-variant font-medium">(127)</span>
            </div>
            {id === "1" || id === "4" ? (
              <div className="bg-primary/95 text-white px-3 py-1 rounded-full shadow-sm text-[10px] font-bold uppercase tracking-widest border border-primary-dim">
                Best Seller
              </div>
            ) : null}
          </div>

          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/80 backdrop-blur-xl flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-on-primary transition-all z-10 border border-white/50 group-hover/card:scale-110"
          >
            <Heart className="w-5 h-5 transition-transform group-active:scale-90" />
          </button>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-7 space-y-4">
          <div className="space-y-1">
            <h3 className="font-headline text-2xl italic text-on-surface leading-tight font-bold group-hover/card:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-on-surface-variant text-sm line-clamp-2 leading-relaxed opacity-70 italic font-medium">
              {description}
            </p>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">From</span>
            <span className="font-headline text-3xl font-extrabold text-primary">₹{price.toLocaleString()}</span>
          </div>

          <div className="pt-2 flex justify-between items-center gap-3">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleDetails}
              className="flex-1 rounded-2xl h-12 text-[10px] uppercase font-black tracking-[0.2em] border-stone-100 hover:border-primary/20 hover:bg-primary/5 transition-all"
            >
              Details
            </Button>
            <motion.div whileTap={{ scale: 0.95 }} className="flex-[1.5]">
              <Button 
                variant="default" 
                size="lg" 
                onClick={handleOrder}
                className="w-full rounded-2xl h-12 px-6 uppercase font-black tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 bg-gradient-to-br from-primary to-primary-dim shadow-lg shadow-primary/20"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Order
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
