import { supabase } from "./supabase";
import { User } from "@supabase/supabase-js";

/**
 * Checks if a user has the admin role in their metadata.
 */
export const isAdmin = (user: User | null): boolean => {
  return user?.user_metadata?.role === "admin";
};

/**
 * Signs in a user with email and password and ensures session is synced for SSR.
 */
export const signIn = async (email: string, password: string) => {
  const result = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!result.error) {
    // This CRITICAL step ensures cookies are updated for Next.js SSR middleware
    await supabase.auth.getSession();
  }

  return result;
};

/**
 * Signs out the current user and clears cookies.
 */
export const signOut = async () => {
  const result = await supabase.auth.signOut();
  return result;
};
