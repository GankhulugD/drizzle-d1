"use client";

import { useState, useRef, useEffect } from "react";
import { ShoppingCart, MapPin, User, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

interface NavbarProps {
  onOpenAuth: (mode: "login" | "signup") => void;
  deliveryAddress: string;
  onOpenDeliveryInput: () => void;
  addedToast: boolean;
}

export default function Navbar({
  onOpenAuth,
  deliveryAddress,
  onOpenDeliveryInput,
  addedToast,
}: NavbarProps) {
  const { user, signOut } = useAuth();
  const { totalItems, openCart } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-[#1a1a1a] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-[#E63946] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">NN</span>
          </div>
          <div className="leading-tight">
            <div className="text-white font-bold text-sm">NomNom</div>
            <div className="text-gray-400 text-xs">Swift delivery</div>
          </div>
        </div>

        {/* Toast */}
        <div
          className={`hidden md:flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm text-gray-800 shadow transition-all duration-300 ${
            addedToast ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <span className="text-green-500">✓</span>
          Food is being added to the cart!
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Delivery address */}
          <button
            onClick={onOpenDeliveryInput}
            className="hidden sm:flex items-center gap-1.5 border border-white/20 rounded-full px-3 py-1.5 text-xs text-white hover:bg-white/10 transition"
          >
            <MapPin size={12} className="text-[#E63946]" />
            <span>Delivery address:</span>
            <span className="text-gray-400 max-w-24 truncate">
              {deliveryAddress || "Add Location"}
            </span>
            <ChevronRight size={12} className="text-gray-400" />
          </button>

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <ShoppingCart size={16} className="text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E63946] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>

          {/* User */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-9 h-9 rounded-full bg-[#E63946] flex items-center justify-center text-white font-bold text-sm hover:bg-[#c62a35] transition"
              >
                {user.email[0].toUpperCase()}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-xl p-4 z-50 border border-gray-100">
                  <p className="text-sm font-semibold text-gray-800 truncate mb-3">{user.email}</p>
                  <button
                    onClick={() => {
                      signOut();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left text-sm text-gray-600 hover:text-[#E63946] transition font-medium"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth("login")}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <User size={16} className="text-white" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
