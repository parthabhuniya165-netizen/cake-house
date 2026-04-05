"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, Package, ChevronDown, ChevronUp, User, MapPin, Phone, Clock, FileText } from "lucide-react";

const ORDER_STATUSES = [
  { value: "pending", label: "⏳ Pending" },
  { value: "preparing", label: "🍰 Preparing" },
  { value: "completed", label: "✅ Completed" }
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        router.push("/admin/login");
        return;
      }

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

  const updateStatus = async (id: string, value: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ order_status: value })
      .eq('id', id);

    if (error) {
       console.error("Update Error:", error);
       return;
    }

    // Local update for instant feedback
    setOrders(prev => prev.map(o => o.id === id ? { ...o, order_status: value } : o));
  };

  const toggleExpand = (id: string) => {
    setExpandedOrders(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF8F3]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="font-headline text-3xl font-bold italic text-on-surface">Order Management</h1>
        <p className="text-sm text-stone-500 mt-1 font-medium italic opacity-70">Track and fulfill your artisanal creations</p>
      </div>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="bg-white p-16 text-center rounded-3xl border border-stone-100 shadow-sm">
            <Package className="w-12 h-12 text-stone-200 mx-auto mb-4" />
            <p className="text-stone-400 font-bold italic uppercase tracking-widest text-xs">No orders yet for today.</p>
          </div>
        ) : (
          orders.map((order) => {
            const isExpanded = expandedOrders.has(order.id);
            return (
              <div key={order.id} className="bg-white border border-stone-100 rounded-3xl shadow-premium overflow-hidden transition-all duration-300 hover:border-primary/20">
                {/* Summary View */}
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center shrink-0">
                       <User className="w-5 h-5 text-stone-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface italic text-lg">{order.customer_name}</h3>
                      <p className="text-xs text-stone-400 font-medium tracking-wide">
                        Order #{order.id.slice(0, 5).toUpperCase()} • {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-30 block">Total Price</span>
                      <span className="font-bold text-primary italic">₹{order.total_amount}</span>
                    </div>

                    <div className="space-y-1">
                       <span className="text-[10px] font-black uppercase tracking-widest opacity-30 block ml-1">Status</span>
                       <select 
                         value={(order.order_status || 'pending').toLowerCase()} 
                         onChange={(e) => updateStatus(order.id, e.target.value)}
                         className="bg-stone-50 border border-stone-100 rounded-xl px-4 py-2 text-xs font-bold focus:ring-4 focus:ring-primary/10 transition-all outline-none cursor-pointer italic"
                       >
                         {ORDER_STATUSES.map(s => (
                           <option key={s.value} value={s.value}>{s.label}</option>
                         ))}
                       </select>
                    </div>

                    <button 
                      onClick={() => toggleExpand(order.id)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isExpanded ? 'bg-primary text-white' : 'bg-stone-50 text-stone-400 hover:text-primary'}`}
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Status Indicator Bar */}
                <div className="h-1 bg-stone-50 flex">
                   <div 
                     className={`h-full bg-primary transition-all duration-700 ${
                       order.order_status === 'preparing' ? 'w-1/2' : 
                       order.order_status === 'completed' ? 'w-full' : 'w-12'
                     }`} 
                   />
                </div>

                {/* Details View */}
                {isExpanded && (
                  <div className="p-8 bg-stone-50/30 border-t border-stone-50 grid md:grid-cols-2 gap-10">
                    {/* Items */}
                    <div className="space-y-6">
                       <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                          <Package className="w-3 h-3" /> Bakery Manifest
                       </h4>
                       <div className="space-y-3">
                          {Array.isArray(order.items) && order.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
                               <div className="flex items-center gap-3">
                                  <span className="w-6 h-6 rounded-lg bg-white border border-stone-100 flex items-center justify-center text-[10px] font-black text-primary">{item.qty}x</span>
                                  <span className="text-sm font-bold text-stone-600 italic">{item.name}</span>
                               </div>
                               <span className="text-sm font-bold text-stone-400">₹{item.price * item.qty}</span>
                            </div>
                          ))}
                       </div>

                       <div className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-30 flex items-center gap-2">
                             <FileText className="w-3 h-3" /> Special Instructions
                          </span>
                          <p className="text-xs text-stone-500 italic font-medium leading-relaxed">
                            {order.notes || "No special requests."}
                          </p>
                       </div>
                    </div>

                    {/* Customer Info */}
                    <div className="space-y-6">
                       <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                          <User className="w-3 h-3" /> Fulfillment Details
                       </h4>
                       <div className="space-y-5">
                          <div className="flex items-start gap-4">
                             <div className="w-9 h-9 rounded-xl bg-white border border-stone-100 flex items-center justify-center shrink-0 shadow-sm">
                                <MapPin className="w-4 h-4 text-primary" />
                             </div>
                             <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-30 block">Address</span>
                                <p className="text-sm font-bold text-stone-600 italic leading-relaxed">{order.address}</p>
                             </div>
                          </div>

                          <div className="flex items-center gap-4">
                             <div className="w-9 h-9 rounded-xl bg-white border border-stone-100 flex items-center justify-center shrink-0 shadow-sm">
                                <Phone className="w-4 h-4 text-primary" />
                             </div>
                             <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-30 block">Contact</span>
                                <p className="text-sm font-bold text-stone-600 italic">{order.phone}</p>
                             </div>
                          </div>

                          <div className="flex items-center gap-4">
                             <div className="w-9 h-9 rounded-xl bg-white border border-stone-100 flex items-center justify-center shrink-0 shadow-sm">
                                <Clock className="w-4 h-4 text-primary" />
                             </div>
                             <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-30 block">Delivery Slot</span>
                                <p className="text-sm font-bold text-stone-600 italic">{order.delivery_time}</p>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
