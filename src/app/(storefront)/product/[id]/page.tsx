"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Star, Clock, Sprout, Receipt, ShoppingBag } from "lucide-react";
import { products } from "@/lib/products";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { useCart } from "@/context/CartContext";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem, updateQuantity, items, setIsCartOpen } = useCart();
  
  const product = useMemo(() => products.find((p) => p.id === id) || products[0], [id]);
  const cartItem = items.find((item) => item.id === product.id);

  const [size, setSize] = useState("0.5 kg");
  const [flavor, setFlavor] = useState(product.flavor);
  const [message, setMessage] = useState("");

  const sizes = ["0.5 kg", "1.0 kg", "2.0 kg"];
  const flavors = [
    { name: "Chocolate", color: "#3d1a11" },
    { name: "Vanilla", color: "#fdf5e6" },
    { name: "Red Velvet", color: "#8b0000" }
  ];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      size,
      flavor,
      customMessage: message
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-32 pt-10">
      
      {/* Left: Product Image Gallery */}
      <section className="lg:col-span-7 space-y-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="aspect-square rounded-3xl overflow-hidden shadow-2xl group relative"
        >
          <Image 
            src={product.image} 
            alt={product.title} 
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary shadow-sm">
            Chef's Special
          </div>
        </motion.div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
          {[1, 2, 3, 4].map(idx => (
            <div key={idx} className={`relative w-24 h-24 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${idx === 1 ? 'border-primary ring-4 ring-primary/10' : 'border-stone-100 opacity-60 hover:opacity-100'}`}>
              <Image src={product.image} alt="Thumbnail" fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Right: Selection Details */}
      <section className="lg:col-span-5 space-y-10">
        <header className="space-y-4">
          <h2 className="font-headline text-5xl font-bold italic leading-tight text-on-surface">{product.title}</h2>
          <div className="flex items-center gap-4">
            <div className="flex text-primary">
              {[1, 2, 3, 4].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              <Star className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 font-body">(124 Reviews)</span>
          </div>
          <p className="text-on-surface-variant font-medium leading-relaxed italic text-lg">
            {product.longDescription}
          </p>
        </header>

        <div className="space-y-8">
          {/* Size Selector */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400">Select Weight</label>
            <div className="flex gap-3">
              {sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "flex-1 py-4 px-4 rounded-xl font-bold transition-all border",
                    size === s ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/20' : 'bg-white text-on-surface-variant border-stone-100 hover:border-primary/20'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Flavor Selector */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400">Base Flavor</label>
            <div className="flex flex-wrap gap-3">
              {flavors.map(f => (
                <button
                  key={f.name}
                  onClick={() => setFlavor(f.name)}
                  className={cn(
                    "flex items-center gap-3 py-3 px-6 rounded-xl font-bold transition-all border",
                    flavor === f.name ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/20' : 'bg-white text-on-surface-variant border-stone-100 hover:border-primary/20'
                  )}
                >
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: f.color }} />
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400">Message on Cake (Max 25 chars)</label>
            <div className="relative group">
              <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g., Happy Birthday!"
                className="w-full py-4 px-6 rounded-xl bg-surface-container border-0 focus:ring-2 focus:ring-primary/20 transition-all font-body font-medium italic placeholder:text-stone-400 outline-none" 
              />
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-surface-container rounded-xl flex items-center gap-3 border border-stone-100/50">
              <Clock className="w-5 h-5 text-primary" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Prep Time</span>
                <span className="text-xs font-black">4-6 Hours</span>
              </div>
            </div>
            <div className="p-4 bg-surface-container rounded-xl flex items-center gap-3 border border-stone-100/50">
              <Sprout className="w-5 h-5 text-primary" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Dietary</span>
                <span className="text-xs font-black">Eggless Option</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-4">
           {cartItem ? (
             <div className="flex flex-grow gap-4">
               <QuantitySelector 
                 quantity={cartItem.quantity} 
                 onAdd={() => updateQuantity(cartItem.id, 1)} 
                 onRemove={() => updateQuantity(cartItem.id, -1)}
                 className="flex-grow rounded-xl h-16 py-4"
               />
               <Button onClick={() => setIsCartOpen(true)} variant="outline" size="xl" className="rounded-xl px-6">
                  <Receipt className="w-6 h-6" />
               </Button>
             </div>
           ) : (
              <Button 
                onClick={handleAddToCart}
                size="xl" 
                className="w-full rounded-xl h-16 flex items-center justify-between px-8 shadow-2xl"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold uppercase tracking-widest text-sm">Add to Basket</span>
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="font-headline text-3xl font-bold italic">₹{product.price}</span>
              </Button>
           )}
        </div>
      </section>

    </div>
  );
}
