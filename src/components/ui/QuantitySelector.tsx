"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function QuantitySelector({ 
  quantity, 
  onAdd, 
  onRemove, 
  className,
  size = "md" 
}: QuantitySelectorProps) {
  
  const isZero = quantity === 0;

  const sizeClasses = {
    sm: "h-8 px-2 text-xs",
    md: "h-10 px-3 text-sm",
    lg: "h-12 px-4 text-base"
  };

  return (
    <div className={cn(
      "inline-flex items-center justify-between rounded-lg font-bold transition-all border shadow-sm",
      isZero ? "bg-white border-primary/20 text-primary hover:bg-primary/5" : "bg-primary text-on-primary border-primary",
      sizeClasses[size],
      className
    )}>
      <AnimatePresence mode="wait">
        {isZero ? (
          <motion.button
            key="add-btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onAdd}
            className="w-full h-full flex items-center justify-between gap-4 uppercase tracking-wider"
          >
            <span>Add</span>
            <span className="material-symbols-outlined text-[18px]">add</span>
          </motion.button>
        ) : (
          <motion.div
            key="counter"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between w-full gap-3"
          >
            <button 
              onClick={onRemove}
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <span className="material-symbols-outlined text-[20px]">remove</span>
            </button>
            <span className="min-w-[1.5rem] text-center tabular-nums">{quantity}</span>
            <button 
              onClick={onAdd}
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
