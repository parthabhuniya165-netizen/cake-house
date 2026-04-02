"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Star, PartyPopper, Heart, Palette, Cake } from "lucide-react";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const categories = [
    { icon: PartyPopper, title: "Birthday", color: "bg-secondary-container text-secondary" },
    { icon: Heart, title: "Wedding", color: "bg-[#fbcdbf] text-[#7f5c51]" },
    { icon: Palette, title: "Custom", color: "bg-tertiary-container text-tertiary" },
    { icon: Cake, title: "Cupcakes", color: "bg-primary-container/20 text-primary" },
  ];

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <section className="px-6 py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-10 md:flex-row-reverse md:items-center">
          <div className="relative w-full aspect-[4/5] md:aspect-square md:w-1/2">
            <motion.div
              initial={{ rotateY: -12, rotateX: 8, translateZ: 20, opacity: 0 }}
              animate={{ rotateY: -8, rotateX: 5, translateZ: 30, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full h-full bg-surface-container-highest rounded-xl overflow-visible shadow-2xl"
            >
              <Image
                src="/images/products/hero_wedding_cake.png"
                alt="Luxury Wedding Cake"
                fill
                className="object-cover rounded-xl"
                priority
              />
              <div className="absolute -bottom-6 -right-4 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-stone-100">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
                  <Star className="w-5 h-5 text-white fill-current" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Bestseller</p>
                  <p className="font-headline italic text-primary">Velvet Rose</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6 md:w-1/2">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-headline text-5xl md:text-7xl italic leading-tight text-on-surface tracking-tight"
            >
              Handcrafted Cakes for Every Occasion
            </motion.h1>
            <p className="text-on-surface-variant leading-relaxed max-w-md text-lg">
              From Mysore's finest kitchens to your special moments. We blend tradition with contemporary artistry.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full" asChild>
                <Link href="#chef-signature">
                  View Menu
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <Link href="#testimonials">
                  Our Story
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-6 py-16 bg-surface-container-low rounded-t-[3rem] -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-primary font-bold text-xs uppercase tracking-widest">Collections</span>
              <h2 className="font-headline text-4xl italic">Curated Delights</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
              <CategoryCard key={idx} icon={cat.icon} title={cat.title} colorClass={cat.color} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-16 pl-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center pr-6 mb-10">
            <h2 className="font-headline text-4xl italic">Chef's Signature</h2>
            <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              Explore all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex overflow-x-auto gap-6 pr-6 no-scrollbar pb-4">
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
      <section id="testimonials" className="px-6 py-16">
        <div className="max-w-4xl mx-auto bg-surface-container-highest/30 p-10 rounded-[2rem] relative overflow-hidden">
          <span className="font-serif text-[180px] leading-none absolute -top-12 -left-4 text-primary/5 select-none font-bold">
            "
          </span>
          <div className="relative z-10 text-center space-y-8">
            <h2 className="font-headline text-3xl italic">What our Patrons say</h2>
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
                <p className="italic text-on-surface-variant text-lg leading-relaxed mb-6">
                  "The wedding cake was more than just a dessert; it was a centerpiece that reflected our story. The flavors were divine."
                </p>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-secondary-container mb-2" />
                  <p className="text-sm font-bold">Ananya R.</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Wedding in Hebbal, Mysore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 py-10 mb-10">
        <div className="max-w-7xl mx-auto bg-secondary p-12 rounded-[2rem] text-on-secondary flex flex-col items-center text-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-10 -mb-10" />
          
          <h2 className="font-headline text-4xl md:text-6xl italic leading-tight relative z-10">
            Bring Home the <br/> Art of Baking
          </h2>
          <p className="text-white/80 text-lg max-w-md relative z-10">
            Schedule a tasting session for your grand events or order a treat for tonight.
          </p>
          <div className="flex flex-col md:flex-row gap-4 relative z-10 w-full max-w-sm">
            <Button size="lg" className="w-full bg-white text-secondary hover:bg-white/90" asChild>
              <Link href="/#tasting">
                Schedule Tasting
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full border-white/40 text-white hover:bg-white/10" asChild>
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
