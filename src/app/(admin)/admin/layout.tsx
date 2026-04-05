"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { isAdmin } from "@/lib/auth-helpers";
import { Loader2 } from "lucide-react";

import { Sidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip protection check for login page itself
    if (pathname === "/admin/login") {
      setAuthorized(true);
      return;
    }

    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      
      console.log("Admin Check - User:", user);
      console.log("Admin Check - Metadata:", user?.user_metadata);

      if (!user) {
        router.push("/admin/login");
        return;
      }

      // Strict email access control as per requirements
      if (user.email !== 'test-admin@cakehouse.com') {
        console.error("Admin Access Violation: Unauthorized email");
        await supabase.auth.signOut();
        router.push("/admin/login?error=unauthorized");
        return;
      }

      const role = user.user_metadata?.role;
      
      if (role !== "admin") {
        console.error("Admin Check Failure: Missing or invalid role");
        await supabase.auth.signOut();
        router.push("/admin/login?error=unauthorized");
        return;
      }

      setAuthorized(true);
    };

    checkAdmin();
  }, [router, pathname]);

  if (!authorized && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF8F3]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Login page layout (no sidebar)
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Dashboard layout with sidebar
  return (
    <div className="min-h-screen flex bg-stone-50/30 overflow-hidden">
      <Sidebar />
      <main className="flex-grow h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
        {children}
      </main>
    </div>
  );
}
