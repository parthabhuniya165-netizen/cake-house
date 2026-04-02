"use client";

import React from "react";
import Image from "next/image";
import { useCart, CartItem } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";

interface OrderSummaryProps {
  formData: {
    fullName: string;
    phone: string;
    address: string;
    deliverySlot: string;
    notes: string;
  };
}

export function OrderSummary({ formData }: OrderSummaryProps) {
  const { items, subtotal, deliveryFee, total, updateQuantity } = useCart();

  const handlePlaceOrder = () => {
    // 1. Prepare Order Message
    const orderItemsString = items.map((item: CartItem) => (
      `🍰 *${item.title}*\n   Qty: ${item.quantity}\n   Size: ${item.size || 'N/A'}\n   Flavor: ${item.flavor}\n   Rate: ₹${item.price * item.quantity}`
    )).join('\n\n');

    const message = `
🌟 *NEW ORDER FROM THE ARTISANAL PÂTISSIER* 🌟

👤 *CUSTOMER DETAILS*
Name: ${formData.fullName || 'N/A'}
Phone: ${formData.phone || 'N/A'}
Address: ${formData.address || 'N/A'}
Delivery Slot: ${formData.deliverySlot || 'N/A'}

🍮 *ORDER SUMMARY*
${orderItemsString}

📝 *NOTES*
${formData.notes || 'No special instructions'}

💰 *BILLING DETAILS*
Subtotal: ₹${subtotal}
Delivery: ₹${deliveryFee}
*TOTAL PAYABLE: ₹${total}*

_Order placed via Website • Secure UPI on Delivery_
`.trim();

    // 2. Encode and Redirect
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918095111111?text=${encodedMessage}`; // Realistic Mysore number placeholder
    
    // 3. Open in new tab
    window.open(whatsappUrl, '_blank');
    
    // Note: Future payment logic (Razorpay/Stripe) will go here.
    console.log("Future Payment Integration Point", {
        items,
        total,
        customer: formData
    });
  };

  return (
    <aside className="lg:col-span-1 space-y-6">
      <div className="sticky top-24 space-y-6">
        {/* Cart Items Summary */}
        <section className="bg-white rounded-3xl p-8 shadow-premium border border-stone-100/50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline text-2xl font-bold italic">Your Selection</h3>
            <span className="text-[10px] font-bold text-primary px-3 py-1.5 bg-primary/10 rounded-full uppercase tracking-widest">{items.length} Items</span>
          </div>
          
          <div className="space-y-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center group">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-stone-100">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-headline text-lg italic leading-tight group-hover:text-primary transition-colors underline decoration-transparent group-hover:decoration-primary/20">{item.title}</h4>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2 italic">{item.size && `${item.size} • `}{item.flavor}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-800">₹{item.price * item.quantity}</span>
                    <QuantitySelector 
                        quantity={item.quantity} 
                        onAdd={() => updateQuantity(item.id, 1)} 
                        onRemove={() => updateQuantity(item.id, -1)}
                        size="sm"
                        className="h-8 py-0 min-w-[70px] border-stone-100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-px bg-stone-100/50 my-8" />

          <div className="space-y-4">
            <div className="flex justify-between text-sm font-bold text-on-surface-variant uppercase tracking-widest italic">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-on-surface-variant uppercase tracking-widest italic">
              <span>Delivery</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="h-px bg-stone-100/50 my-4" />
            <div className="flex justify-between items-baseline">
              <span className="font-headline text-2xl font-extrabold italic">Total</span>
              <span className="font-headline text-4xl font-extrabold text-primary italic underline decoration-primary/10">₹{total}</span>
            </div>

            <Button 
              onClick={handlePlaceOrder}
              size="xl" 
              className="w-full h-16 mt-6 rounded-2xl bg-gradient-to-br from-primary to-primary-dim shadow-premium hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined">chat</span>
              <span className="font-bold uppercase tracking-widest">Place Order via WhatsApp</span>
            </Button>
            
            <p className="text-[10px] text-center text-on-surface-variant uppercase font-bold tracking-[0.2em] pt-4 opacity-60">
              Secure Ordering • Pay via UPI on Delivery
            </p>
          </div>
        </section>

        {/* Security Badges */}
        <div className="flex justify-center gap-10 py-4 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
           {['workspace_premium', 'eco', 'contactless'].map(icon => (
              <span key={icon} className="material-symbols-outlined text-stone-600 text-3xl">{icon}</span>
           ))}
        </div>
      </div>
    </aside>
  );
}
