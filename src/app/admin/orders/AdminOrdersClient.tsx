"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, Package, AlertCircle } from "lucide-react";

const ORDER_STATUSES = [
  { value: "pending", label: "⏳ Pending" },
  { value: "confirmed", label: "✅ Confirmed" },
  { value: "baking", label: "🍰 Baking" },
  { value: "out_for_delivery", label: "🚚 Out for Delivery" },
  { value: "delivered", label: "🌟 Delivered" },
  { value: "cancelled", label: "❌ Cancelled" }
];

const PAYMENT_STATUSES = [
  { value: "unpaid", label: "🔴 Unpaid" },
  { value: "paid", label: "🟢 Paid" }
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        // Production Readiness: Hard redirect for unauthenticated users
        router.push("/");
        return;
      }

      setUser(user);
      await fetchOrders();
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Fetch Error:", error);
      return;
    }
    setOrders(data);
  };

  const updateStatus = async (order: any, field: string, value: string) => {
    const { data: updatedOrder, error } = await supabase
      .from('orders')
      .update({ [field]: value })
      .eq('id', order.id)
      .select()
      .single();

    if (error) {
      console.error("Update Error:", error);
      return;
    }

    // Refresh local state
    setOrders(prev => prev.map(o => o.id === order.id ? updatedOrder : o));

    // Production Logging & Notification Sync
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: "status_update", 
          data: updatedOrder 
        })
      });
    } catch (err) {
      console.warn("Notification non-critical failure:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="font-headline text-4xl italic font-bold">Patisserie Command Center</h1>
          <p className="text-stone-500 mt-2 font-medium italic opacity-70">Real-time order management & operations</p>
        </div>
        <div className="flex items-center gap-4 bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                Operator: {user?.email}
            </span>
        </div>
      </div>

      <div className="grid gap-8">
        {orders.length === 0 ? (
           <div className="p-24 text-center bg-stone-50 rounded-[3rem] border-2 border-dashed border-stone-200">
             <Package className="w-16 h-16 text-stone-200 mx-auto mb-6" />
             <p className="text-stone-400 font-bold uppercase tracking-widest text-sm">No active orders found.</p>
           </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white p-10 rounded-[3rem] shadow-premium border border-stone-100 flex flex-col lg:flex-row lg:items-start gap-12 group hover:border-primary/30 transition-all duration-500 hover:shadow-2xl">
              
              {/* Left Column: Order Data */}
              <div className="flex-grow space-y-8">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/5">Order #{order.id.slice(0, 8)}</span>
                    <span className="text-stone-400 text-xs font-bold uppercase tracking-widest opacity-60">Received: {new Date(order.created_at).toLocaleString()}</span>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <h3 className="font-headline text-3xl italic font-extrabold text-on-surface">{order.customer_name}</h3>
                        <div className="space-y-3">
                            <p className="flex items-center gap-3 text-sm font-bold text-stone-600 italic">
                                <span className="material-symbols-outlined text-primary text-xl">call</span>
                                {order.phone}
                            </p>
                            <p className="flex items-start gap-3 text-sm font-bold text-stone-600 italic leading-relaxed">
                                <span className="material-symbols-outlined text-primary text-xl shrink-0">pin_drop</span>
                                {order.address}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4 bg-stone-50/50 p-6 rounded-2xl border border-stone-100">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Preferred Slot</span>
                            <span className="text-xs font-bold text-primary italic uppercase tracking-widest">{order.delivery_time}</span>
                        </div>
                        <div className="h-px bg-stone-200/50" />
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-2">Internal Notes</span>
                            <p className="text-xs font-medium italic text-stone-600 leading-relaxed">
                                {order.notes || "No special instructions provided by customer."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Items Breakdown (JSON Display) */}
                <div className="pt-4">
                   <div className="flex items-center gap-4 mb-6">
                        <span className="h-px bg-stone-200 flex-grow" />
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Cart Breakdown</span>
                        <span className="h-px bg-stone-200 flex-grow" />
                   </div>
                   <div className="grid gap-3">
                       {Array.isArray(order.items) && order.items.map((item: any, idx: number) => (
                           <div key={idx} className="flex items-center justify-between text-sm py-2 px-4 hover:bg-stone-50 rounded-xl transition-colors">
                               <div className="flex items-center gap-4">
                                   <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary">{item.qty}x</span>
                                   <span className="font-bold text-on-surface-variant italic">{item.name}</span>
                               </div>
                               <span className="font-bold text-stone-400">₹{item.price * item.qty}</span>
                           </div>
                       ))}
                   </div>
                </div>
              </div>

              {/* Right Column: Workflow Control */}
              <div className="lg:w-[280px] shrink-0 flex flex-col gap-6">
                <div className="flex flex-col gap-2 p-8 bg-surface-container-high rounded-3xl border border-stone-100 shadow-inner">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 text-center">Total Receivable</span>
                    <span className="font-headline text-4xl font-black text-primary text-center italic underline underline-offset-8 decoration-primary/20">₹{order.total_amount}</span>
                </div>
                
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-4">Order Life Cycle</label>
                        <select 
                            value={order.order_status} 
                            onChange={(e) => updateStatus(order, 'order_status', e.target.value)}
                            className="w-full bg-white border-2 border-stone-100 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all underline-offset-4 outline-none cursor-pointer hover:bg-stone-50"
                        >
                            {ORDER_STATUSES.map(s => (
                                <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-4">Finances</label>
                        <select 
                            value={order.payment_status} 
                            onChange={(e) => updateStatus(order, 'payment_status', e.target.value)}
                            className="w-full bg-white border-2 border-stone-100 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all underline-offset-4 outline-none cursor-pointer hover:bg-stone-50"
                        >
                            {PAYMENT_STATUSES.map(s => (
                                <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="p-6 bg-green-50 rounded-2xl border border-green-100 flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined text-green-600 text-xl font-bold">verified</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-green-700">Verified Submission</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
