"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import Image from "next/image";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, subtotal, deliveryFee, total, updateQuantity } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[2000]"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[2001] bg-white rounded-t-[2.5rem] shadow-premium overflow-hidden"
          >
            {/* Handle Bar */}
            <div className="flex justify-center p-3">
              <div className="w-12 h-1.5 bg-stone-200 rounded-full" />
            </div>

            <div className="p-8 pb-10 space-y-8 max-h-[85vh] overflow-y-auto no-scrollbar">
              <div className="flex items-center justify-between">
                <h2 className="font-headline text-3xl font-bold">Your Basket</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <span className="material-symbols-outlined">close</span>
                </Button>
              </div>

              {items.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="flex justify-center">
                    <span className="material-symbols-outlined text-[64px] text-stone-200">
                      shopping_bag
                    </span>
                  </div>
                  <p className="text-on-surface-variant font-medium">Your basket is feeling light!</p>
                  <Button onClick={onClose} className="rounded-full">Start Shopping</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Cart Items List */}
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-stone-100">
                          <Image 
                            src={item.image} 
                            alt={item.title} 
                            fill
                            className="object-cover" 
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-headline text-lg leading-tight">{item.title}</h4>
                          <p className="text-xs text-on-surface-variant italic mb-2">
                            {item.size && `${item.size} • `}{item.flavor}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-rose-800">₹{item.price * item.quantity}</span>
                            <QuantitySelector
                              quantity={item.quantity}
                              onAdd={() => updateQuantity(item.id, 1)}
                              onRemove={() => updateQuantity(item.id, -1)}
                              size="sm"
                              className="h-8 min-w-[70px]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-stone-100" />

                  {/* Summary Details */}
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between text-sm text-on-surface-variant">
                      <span>Item Total</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm text-on-surface-variant">
                      <span>Delivery (Mysore City)</span>
                      <span>₹{deliveryFee}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2">
                      <span className="font-headline text-xl font-bold">Grand Total</span>
                      <span className="font-headline text-3xl font-extrabold text-primary">₹{total}</span>
                    </div>
                  </div>

                  {/* Checkout Actions */}
                  <Link href="/checkout" onClick={onClose} className="block group">
                    <Button 
                      size="xl" 
                      className="w-full h-16 text-lg rounded-2xl bg-gradient-to-br from-primary to-primary-dim hover:scale-[1.01] active:scale-[0.98] transition-all"
                    >
                      <span>Proceed to Checkout</span>
                      <span className="material-symbols-outlined text-[24px] transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </Button>
                  </Link>

                  <p className="text-[10px] text-center text-on-surface-variant uppercase tracking-widest pt-2">
                    Freshly baked to order • Delivery in 4-6 hours
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
