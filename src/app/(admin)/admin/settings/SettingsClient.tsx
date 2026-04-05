"use client";

import React from "react";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  HelpCircle,
  Mail,
  Smartphone,
  MapPin,
  Clock,
  Save,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsClient() {
  const sections = [
    { title: "General", icon: Settings, desc: "Manage your storefront basic info" },
    { title: "Account", icon: User, desc: "Update your admin profile" },
    { title: "Branding", icon: Palette, desc: "Customize colors and logos" },
    { title: "Notifications", icon: Bell, desc: "Control how you get order alerts" },
    { title: "Security", icon: Shield, desc: "Update passwords and access" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-8 py-12 pb-32">
      <div className="mb-12">
        <h1 className="font-headline text-4xl font-bold italic text-on-surface">Settings</h1>
        <p className="text-stone-500 mt-2 font-medium italic opacity-70">Configure your digital pâtisserie ecosystem</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Navigation */}
        <div className="lg:col-span-1 space-y-2">
          {sections.map((s, i) => (
            <button 
              key={i} 
              className={`w-full group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left ${
                i === 0 ? 'bg-primary text-white shadow-premium' : 'hover:bg-stone-50 text-stone-500 hover:text-on-surface'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                i === 0 ? 'bg-white/20' : 'bg-stone-50 group-hover:bg-white border border-stone-100'
              }`}>
                <s.icon className={`w-5 h-5 ${i === 0 ? 'text-white' : 'text-stone-400 group-hover:text-primary'}`} />
              </div>
              <div>
                 <span className="text-sm font-bold italic tracking-wide block">{s.title}</span>
                 <p className={`text-[10px] font-medium leading-tight ${i === 0 ? 'text-white/60' : 'text-stone-400 opacity-60'}`}>
                    {s.desc}
                 </p>
              </div>
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="lg:col-span-3 space-y-10">
          <div className="bg-white border border-stone-100 rounded-[3rem] p-12 shadow-premium space-y-12">
             <div className="space-y-10 pb-10 border-b border-stone-50">
                <h3 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-primary">
                  <Globe className="w-4 h-4" /> Storefront Basics
                </h3>

                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-30 ml-1">Bakery Name</label>
                      <input 
                        type="text" 
                        defaultValue="The Cake House"
                        className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 font-bold text-on-surface focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Contact Email</label>
                      <div className="relative">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input 
                          type="email" 
                          defaultValue="orders@cakehouse.com"
                          className="w-full bg-stone-50 border border-stone-100 rounded-2xl pl-14 pr-6 py-4 font-bold text-on-surface focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                        />
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Support Phone</label>
                      <div className="relative">
                        <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input 
                          type="text" 
                          defaultValue="+91 80951 11111"
                          className="w-full bg-stone-50 border border-stone-100 rounded-2xl pl-14 pr-6 py-4 font-bold text-on-surface focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                        />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input 
                          type="text" 
                          defaultValue="Hebbal, Mysore"
                          className="w-full bg-stone-50 border border-stone-100 rounded-2xl pl-14 pr-6 py-4 font-bold text-on-surface focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                        />
                      </div>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-1">Operating Hours</label>
                   <div className="flex items-center gap-4 bg-stone-50 p-6 rounded-2xl border border-stone-100">
                      <Clock className="w-5 h-5 text-primary" />
                      <p className="text-sm font-bold text-stone-600 italic">Open Daily from 10:00 AM to 9:00 PM</p>
                      <button className="ml-auto text-primary text-xs font-black uppercase tracking-widest hover:underline">Revise Hours</button>
                   </div>
                </div>
             </div>

             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full border border-primary/10">
                   <CheckCircle2 className="w-4 h-4 text-primary" />
                   <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Latest Sync Successful</span>
                </div>
                <button className="flex items-center gap-3 bg-stone-900 text-white px-10 py-5 rounded-3xl font-bold text-sm shadow-premium hover:shadow-2xl transition-all active:scale-95">
                   <Save className="w-5 h-5" /> Save Reflections
                </button>
             </div>
          </div>

          <div className="bg-rose-50 border border-rose-100 rounded-3xl p-8 flex items-start gap-6">
             <div className="w-12 h-12 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-rose-200">
                <AlertCircle className="w-6 h-6 text-rose-500" />
             </div>
             <div>
                <h4 className="font-bold text-rose-800 text-lg italic">Danger Zone</h4>
                <p className="text-rose-600/70 text-sm italic font-medium mt-1 mb-6">
                   Deleting data is permanent and cannot be reversed. Proceed with absolute caution.
                </p>
                <button className="px-6 py-3 bg-white border border-rose-200 text-rose-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                   Reset Pâtisserie Database
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
