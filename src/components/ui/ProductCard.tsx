"use client";

import React from "react";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
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
    <Link href={`/product/${id}`} className="block">
      <motion.div
        whileHover={{ y: -8 }}
        className={cn(
          "group min-w-[280px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-surface-container-highest/20 cursor-pointer",
          className
        )}
      >
        <div className="relative h-64 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-on-primary transition-all z-10"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-headline text-xl italic text-on-surface leading-tight font-bold">
              {title}
            </h3>
            <span className="font-headline text-xl text-secondary">
              ₹{price.toLocaleString()}
            </span>
          </div>
          <p className="text-on-surface-variant text-sm line-clamp-2">
            {description}
          </p>
          <div className="pt-4 flex justify-between items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDetails}
              className="flex-1 rounded-full h-10 text-[10px] uppercase tracking-widest border-surface-container font-bold text-on-surface-variant"
            >
              Details
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleOrder}
              className="flex-[1.5] rounded-full h-10 px-4 uppercase tracking-widest text-[10px] flex items-center gap-2"
            >
              <ShoppingBag className="w-3 h-3" />
              Order
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
