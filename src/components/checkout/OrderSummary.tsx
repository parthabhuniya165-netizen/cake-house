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

  const handlePlaceOrder = async () => {
    // 1. Strict Payload Validation
    if (!formData.fullName || !formData.phone || items.length === 0) {
        console.warn("Validation Failed: Missing required customer information or empty cart.");
        return;
    }

    // 2. Data Normalization (items: [{ name, qty, price }])
    const normalizedItems = items.map(item => ({
        name: item.title,
        qty: item.quantity,
        price: item.price
    }));

    const orderData = {
      customer_name: formData.fullName,
      phone: formData.phone,
      address: formData.address || 'N/A',
      delivery_time: formData.deliverySlot || 'N/A',
      items: normalizedItems,
      notes: formData.notes || 'No special instructions',
      subtotal,
      delivery_fee: deliveryFee,
      total_amount: total,
      order_status: 'pending',
      payment_status: 'unpaid'
    };

    // 3. Non-blocking Background Tasks: Save to Supabase and Notify
    (async () => {
        try {
            const { supabase } = await import("@/lib/supabase");
            
            // Insert into Supabase
            const { data: order, error } = await supabase
                .from('orders')
                .insert([orderData])
                .select()
                .single();

            if (error) throw error;

            // Trigger Internal Notification (Structured)
            await fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    type: "new_order", 
                    data: { ...orderData, id: order.id } 
                })
            });

        } catch (err) {
            // Requirement: Fail gracefully without breaking UI
            console.error("Backend Sync Error (Safe Skip):", err);
        }
    })();

    // 4. Prepare Order Message for WhatsApp (Immediate UX)
    const orderItemsString = items.map((item: CartItem) => (
      `🍰 *${item.title}*\n   Qty: ${item.quantity}\n   Size: ${item.size || 'N/A'}\n   Flavor: ${item.flavor}\n   Rate: ₹${item.price * item.quantity}`
    )).join('\n\n');

    const message = `
🌟 *NEW ORDER FROM THE ARTISANAL PÂTISSIER* 🌟

👤 *CUSTOMER DETAILS*
Name: ${orderData.customer_name}
Phone: ${orderData.phone}
Address: ${orderData.address}
Delivery Slot: ${orderData.delivery_time}

🍮 *ORDER SUMMARY*
${orderItemsString}

📝 *NOTES*
${orderData.notes}

💰 *BILLING DETAILS*
Subtotal: ₹${orderData.subtotal}
Delivery: ₹${orderData.delivery_fee}
*TOTAL PAYABLE: ₹${orderData.total_amount}*

_Order placed via Website • Secure UPI on Delivery_
`.trim();

    // 5. Encode and Redirect
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918095111111?text=${encodedMessage}`;
    
    // 6. Open in new tab
    window.open(whatsappUrl, '_blank');
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

          <div className="space-y-6">
            <div className="flex justify-between text-sm font-bold text-on-surface-variant uppercase tracking-widest italic opacity-60">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-on-surface-variant uppercase tracking-widest italic">
              <span>Delivery</span>
              <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            <div className="h-px bg-stone-100/50 my-4" />
            <div className="flex justify-between items-baseline pt-4 px-4 py-6 bg-primary/5 rounded-2xl border border-primary/10">
              <span className="font-headline text-2xl font-extrabold italic">Total Payable</span>
              <span className="font-headline text-4xl font-extrabold text-primary italic underline underline-offset-8 decoration-primary/20">₹{total}</span>
            </div>

            <div className="flex items-center gap-3 p-4 bg-surface-container-low rounded-2xl border border-stone-100">
              <span className="material-symbols-outlined text-secondary">schedule</span>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Estimated Delivery</span>
                <span className="text-xs font-bold text-on-surface italic">Today, by {formData.deliverySlot === 'Morning Bliss' ? '2 PM' : '9 PM'}</span>
              </div>
            </div>

            <Button 
              onClick={handlePlaceOrder}
              size="xl" 
              className="w-full h-16 mt-6 rounded-2xl bg-gradient-to-br from-primary to-primary-dim shadow-premium hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="material-symbols-outlined">chat</span>
              <span className="font-bold uppercase tracking-widest">Place Order via WhatsApp</span>
            </Button>
            
            <div className="space-y-3 pt-6">
              <p className="text-[10px] text-center text-on-surface-variant uppercase font-black tracking-[0.2em] opacity-60 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm text-green-600">verified_user</span>
                Cash on Delivery available
              </p>
              <p className="text-[10px] text-center text-on-surface-variant uppercase font-bold tracking-[0.2em] opacity-40">
                Secure Ordering • Pay via UPI on Delivery
              </p>
            </div>
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
