"use client";

import React from "react";
import { motion } from "framer-motion";

interface CheckoutFormProps {
  formData: {
    fullName: string;
    phone: string;
    address: string;
    deliverySlot: string;
    notes: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    fullName: string;
    phone: string;
    address: string;
    deliverySlot: string;
    notes: string;
  }>>;
}

export function CheckoutForm({ formData, setFormData }: CheckoutFormProps) {
  const slots = [
    { name: "Morning Bliss", time: "10 AM - 1 PM" },
    { name: "Sunset Treats", time: "4 PM - 8 PM" }
  ];

  return (
    <div className="space-y-10">
      <header>
        <h2 className="font-headline text-4xl text-on-surface mb-2 font-bold italic">Checkout</h2>
        <p className="text-on-surface-variant font-medium text-sm italic">Complete your order details to enjoy our handcrafted delights.</p>
      </header>

      {/* Delivery Details */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary">local_shipping</span>
          <h3 className="font-headline text-2xl font-bold italic underline decoration-primary/10 underline-offset-4">Delivery Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400 font-body px-1">Full Name</label>
            <input 
              type="text" 
              placeholder="Aanya Sharma"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              className="w-full bg-white border ring-1 ring-stone-100 focus:ring-2 focus:ring-primary/20 rounded-2xl py-4 px-6 text-on-surface font-medium placeholder:text-stone-300 transition-all border-0 shadow-sm" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400 font-body px-1">Phone Number</label>
            <input 
              type="tel" 
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full bg-white border ring-1 ring-stone-100 focus:ring-2 focus:ring-primary/20 rounded-2xl py-4 px-6 text-on-surface font-medium placeholder:text-stone-300 transition-all border-0 shadow-sm" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400 font-body px-1">Delivery Address</label>
          <textarea 
            rows={3}
            placeholder="Suite 402, Heritage Residency, Gokulam, Mysore"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            className="w-full bg-white border ring-1 ring-stone-100 focus:ring-2 focus:ring-primary/20 rounded-2xl py-4 px-6 text-on-surface font-medium placeholder:text-stone-300 transition-all border-0 shadow-sm"
          />
        </div>

        <div className="space-y-4">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400 font-body px-1">Preferred Delivery Slot</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {slots.map(slot => (
              <label 
                key={slot.name}
                className={`flex items-center gap-4 p-5 bg-white border-2 rounded-2xl cursor-pointer transition-all ${formData.deliverySlot === slot.name ? 'border-primary bg-primary/5 shadow-premium' : 'border-stone-100 hover:border-primary/20'}`}
              >
                <input 
                  type="radio" 
                  name="delivery_time"
                  checked={formData.deliverySlot === slot.name}
                  onChange={() => setFormData(prev => ({ ...prev, deliverySlot: slot.name }))}
                  className="w-5 h-5 text-primary focus:ring-primary bg-white border-stone-200" 
                />
                <div className="flex flex-col">
                  <span className="font-bold text-on-surface italic">{slot.name}</span>
                  <span className="text-xs font-black text-on-surface-variant uppercase tracking-widest">{slot.time}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Notes Section */}
      <section className="p-8 bg-surface-container-highest rounded-3xl space-y-4 border border-stone-100/50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-tertiary">edit_note</span>
          <h4 className="font-bold text-on-surface italic font-headline text-xl">Message for the Pâtissier</h4>
        </div>
        <textarea 
          placeholder="Any dietary preferences or a special message for the cake card?"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          className="w-full bg-white/50 border-0 ring-1 ring-stone-200 focus:ring-2 focus:ring-tertiary/20 rounded-2xl py-4 px-6 text-sm text-on-surface placeholder:text-stone-300"
        />
      </section>
    </div>
  );
}
