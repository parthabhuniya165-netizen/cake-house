"use client";

import React, { useState } from "react";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    deliverySlot: "Morning Bliss",
    notes: ""
  });

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20 pt-10">
      
      {/* Back Link */}
      <Link href="/" className="flex items-center gap-2 group mb-12">
        <ArrowLeft className="w-5 h-5 text-primary transition-transform group-hover:-translate-x-1" />
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400 group-hover:text-primary transition-colors">Continue Browsing</span>
      </Link>

      {/* Checkout Content: Grid Split on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7">
          <CheckoutForm formData={formData} setFormData={setFormData} />
        </div>
        
        <div className="lg:col-span-5">
          <OrderSummary formData={formData} />
        </div>
      </div>

    </div>
  );
}
