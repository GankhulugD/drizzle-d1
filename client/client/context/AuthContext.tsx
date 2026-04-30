"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { AuthUser } from "@/types";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, phoneNumber: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("nomnom_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("nomnom_user");
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || "Нэвтрэхэд алдаа гарлаа" };
      }

      setUser(data.user);
      localStorage.setItem("nomnom_user", JSON.stringify(data.user));
      return { success: true };
    } catch {
      return { success: false, error: "Сервертэй холбогдоход алдаа гарлаа" };
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, phoneNumber: string) => {
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, phoneNumber }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || "Бүртгүүлэхэд алдаа гарлаа" };
      }

      return { success: true };
    } catch {
      return { success: false, error: "Сервертэй холбогдоход алдаа гарлаа" };
    }
  }, []);

  const signOut = useCallback(async () => {
    await fetch("/api/auth/sign-out", { method: "POST", credentials: "include" });
    setUser(null);
    localStorage.removeItem("nomnom_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
