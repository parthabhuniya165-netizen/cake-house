"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-helpers";
import { 
  Package, 
  ShoppingBag, 
  LogOut, 
  Cake, 
  LayoutDashboard,
  Settings,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Live Orders", icon: ShoppingBag, href: "/admin/orders" },
  { name: "Inventory", icon: Cake, href: "/admin/inventory" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
    router.push("/admin/login");
  };

  return (
    <div className="w-80 h-screen bg-white border-r border-stone-100 flex flex-col p-8 sticky top-0">
      {/* Brand */}
      <div className="flex items-center gap-4 mb-14 px-4">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Cake className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="font-headline text-xl font-black italic text-on-surface">Pâtissier</h2>
          <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-60">Admin Command</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow space-y-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between p-4 rounded-2xl transition-all duration-300",
                isActive 
                  ? "bg-primary text-white shadow-premium" 
                  : "hover:bg-stone-50 text-stone-500 hover:text-on-surface"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-stone-400 group-hover:text-primary")} />
                <span className="text-sm font-bold italic tracking-wide">{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-white/50" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout Footer */}
      <div className="mt-auto pt-8 border-t border-stone-50">
        <button
          onClick={handleSignOut}
          className="w-full group flex items-center gap-4 p-4 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all duration-300"
        >
          <div className="p-2 rounded-xl bg-rose-50 group-hover:bg-white transition-colors">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold italic">End Session</span>
        </button>
      </div>
    </div>
  );
}
