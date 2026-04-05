"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Star, PartyPopper, Heart, Palette, Cake } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { ProductCard } from "@/components/ui/ProductCard";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (data) setProducts(data.map(p => ({
        id: p.id,
        title: p.name,
        price: p.price,
        image: p.image_url,
        description: p.description
      })));
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const categories = [
    { icon: PartyPopper, title: "Birthday", color: "bg-secondary-container text-secondary" },
    { icon: Heart, title: "Wedding", color: "bg-[#fbcdbf] text-[#7f5c51]" },
    { icon: Palette, title: "Custom", color: "bg-tertiary-container text-tertiary" },
    { icon: Cake, title: "Cupcakes", color: "bg-primary-container/20 text-primary" },
  ];

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="px-6 pt-20 pb-32 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col gap-16 md:flex-row-reverse md:items-center relative z-10">
          <div className="relative w-full aspect-[4/5] md:aspect-square md:w-1/2">
            <motion.div
              initial={{ rotateY: -12, rotateX: 8, translateZ: 20, opacity: 0 }}
              animate={{ rotateY: -8, rotateX: 5, translateZ: 30, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full h-full bg-surface-container-highest rounded-3xl overflow-visible shadow-2xl border border-white/20"
            >
              <Image
                src="/images/products/hero_wedding_cake.png"
                alt="Luxury Wedding Cake"
                fill
                className="object-cover rounded-3xl"
                priority
              />
              <div className="absolute -bottom-8 -right-4 bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-2xl flex items-center gap-4 border border-stone-100/50">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <Star className="w-6 h-6 text-white fill-current" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Bestseller</p>
                  <p className="font-headline italic text-primary text-lg">Velvet Rose</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-8 md:w-1/2">
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest"
              >
                Mysore's Premier Pâtisserie
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-headline text-6xl md:text-8xl italic leading-[0.95] text-on-surface tracking-tighter"
              >
                Custom Cakes <br/> Delivered Across <br/> <span className="text-primary">Mysore 🎂</span>
              </motion.h1>
            </div>
            <p className="text-on-surface-variant leading-relaxed max-w-md text-xl font-medium italic opacity-80">
              Freshly baked for birthdays & special moments. Handcrafted with love and delivered to your doorstep.
            </p>
            <div className="pt-6 flex flex-wrap gap-5">
              <Button size="xl" className="rounded-full shadow-lg shadow-primary/20 transition-transform active:scale-95" asChild>
                <Link href="#products">
                  Order Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" className="rounded-full bg-white/50 backdrop-blur-sm border-stone-200 transition-transform active:scale-95" asChild>
                <Link href="#chef-signature">
                  View Cakes
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-6 py-24 bg-surface-container-low rounded-t-[4rem] -mt-12 relative z-10 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-bold text-xs uppercase tracking-widest">Collections</span>
              <h2 className="font-headline text-5xl italic mt-2">Curated Delights</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <CategoryCard key={idx} icon={cat.icon} title={cat.title} colorClass={cat.color} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-24 pl-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center pr-6 mb-12">
            <h2 className="font-headline text-5xl italic">Chef's Signature</h2>
            <button className="text-primary text-sm font-bold flex items-center gap-2 hover:underline group">
              Explore all <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <div className="flex overflow-x-auto gap-8 pr-6 no-scrollbar pb-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                description={product.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-6 py-24">
        <div className="max-w-4xl mx-auto bg-surface-container-highest/40 backdrop-blur-sm p-12 rounded-[3rem] relative overflow-hidden border border-white/20">
          <span className="font-serif text-[240px] leading-none absolute -top-16 -left-8 text-primary/5 select-none font-bold">
            "
          </span>
          <div className="relative z-10 text-center space-y-12">
            <h2 className="font-headline text-4xl italic">What our Patrons say</h2>
            <div className="space-y-8">
              <div className="bg-white/60 backdrop-blur-md p-10 rounded-3xl shadow-soft border border-white/40">
                <p className="italic text-on-surface-variant text-xl leading-relaxed mb-8">
                  "The wedding cake was more than just a dessert; it was a centerpiece that reflected our story. The flavors were divine."
                </p>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-secondary-container shadow-inner mb-2" />
                  <p className="text-lg font-bold">Ananya R.</p>
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest font-black opacity-60">Wedding in Hebbal, Mysore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 py-16 mb-20">
        <div className="max-w-7xl mx-auto bg-secondary p-16 rounded-[3rem] text-on-secondary flex flex-col items-center text-center gap-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-20 -mb-20 blur-3xl" />
          
          <h2 className="font-headline text-5xl md:text-7xl italic leading-tight relative z-10">
            Bring Home the <br/> Art of Baking
          </h2>
          <p className="text-white/80 text-xl max-w-lg relative z-10 italic font-medium">
            Schedule a tasting session for your grand events or order a treat for tonight.
          </p>
          <div className="flex flex-col md:flex-row gap-6 relative z-10 w-full max-w-md">
            <Button size="xl" className="w-full bg-white text-secondary hover:bg-white/90 shadow-xl transition-transform active:scale-95" asChild>
              <Link href="/#tasting">
                Schedule Tasting
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="w-full border-white/40 text-white hover:bg-white/10 transition-transform active:scale-95" asChild>
              <Link href="tel:+918095111111">
                Call Us Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
