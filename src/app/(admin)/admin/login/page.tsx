"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, signOut } from "@/lib/auth-helpers";
import { Button } from "@/components/ui/button";
import { Loader2, Cake, Lock, User } from "lucide-react";

function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("error") === "unauthorized") {
      setError("Unauthorized access. Admin role required.");
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: signInError } = await signIn(email, password);

      if (signInError) {
        console.error("Login attempt failed:", signInError.message);
        throw signInError;
      }

      const user = data.user;
      const userRole = user?.user_metadata?.role;
      
      console.log("Login Attempt - User:", user);
      console.log("Login Attempt - Metadata:", user?.user_metadata);

      if (userRole !== "admin") {
        if (!userRole) {
          console.error("Login Failure: Missing role");
        } else {
          console.error("Login Failure: Invalid role");
        }
        
        await signOut();
        setError("Unauthorized access. Admin role required.");
        return;
      }

      console.log("Admin verified. Redirecting...");
      router.push("/admin/orders");
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF8F3] p-6">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-premium p-10 border border-stone-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <Cake className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-headline text-3xl font-bold italic text-on-surface">Pâtissier Admin</h1>
          <p className="text-sm text-stone-500 mt-2 font-medium italic opacity-70">Secure Gate for Artisanal Operations</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="password"
                placeholder="Secure Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-stone-50 border-2 border-stone-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-bold italic">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-primary text-white shadow-premium hover:scale-[1.01] active:scale-[0.98] transition-all font-bold uppercase tracking-widest text-xs"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto text-white/50" />
            ) : (
              "Sign In to Command Center"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FDF8F3]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}
