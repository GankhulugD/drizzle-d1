"use client";

import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
  mode: "login" | "signup";
  onClose: () => void;
  onSwitchMode: (mode: "login" | "signup") => void;
}

export default function AuthModal({ mode, onClose, onSwitchMode }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        const result = await signIn(email, password);
        if (result.success) {
          onClose();
        } else {
          setError(result.error || "Нэвтрэхэд алдаа гарлаа");
        }
      } else {
        if (!phoneNumber.trim()) {
          setError("Утасны дугаар оруулна уу");
          setLoading(false);
          return;
        }
        const result = await signUp(email, password, phoneNumber);
        if (result.success) {
          onSwitchMode("login");
          setError("Бүртгэл амжилттай! Нэвтрэнэ үү.");
        } else {
          setError(result.error || "Бүртгүүлэхэд алдаа гарлаа");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
        >
          <X size={16} />
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-[#E63946] rounded-full flex items-center justify-center mb-3">
            <span className="text-white font-black text-lg">NN</span>
          </div>
          <h2 className="text-2xl font-black text-gray-800">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {mode === "login" ? "Sign in to your account" : "Sign up to get started"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-[#E63946] transition"
            />
          </div>

          {/* Phone (signup only) */}
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+976 99001234"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-[#E63946] transition"
              />
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm text-gray-800 placeholder:text-gray-300 outline-none focus:border-[#E63946] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className={`text-xs px-3 py-2 rounded-lg ${
              error.includes("амжилттай") ? "text-green-600 bg-green-50" : "text-[#E63946] bg-red-50"
            }`}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E63946] hover:bg-[#c62a35] disabled:bg-gray-200 text-white font-bold py-3.5 rounded-xl transition text-sm mt-2"
          >
            {loading ? "Processing..." : mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => onSwitchMode("signup")}
                className="text-[#E63946] font-semibold hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => onSwitchMode("login")}
                className="text-[#E63946] font-semibold hover:underline"
              >
                Log in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
