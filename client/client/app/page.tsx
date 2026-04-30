"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Food, Category } from "@/types";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import CartSidebar from "@/components/CartSidebar";
import FoodDetailModal from "@/components/FoodDetailModal";
import AuthModal from "@/components/AuthModal";
import LoginAlertModal from "@/components/LoginAlertModal";
import OrderSuccessModal from "@/components/OrderSuccessModal";
import Footer from "@/components/Footer";

export default function Home() {
  const { user, isLoading: authLoading } = useAuth();
  const { items, addItem, openCart } = useCart();

  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [addedToast, setAddedToast] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const cartFoodIds = new Set(items.map((i) => i.food.id));

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [foodsRes, catsRes] = await Promise.all([
        fetch("/api/foods", { credentials: "include" }),
        fetch("/api/categories", { credentials: "include" }),
      ]);

      if (foodsRes.ok) {
        const data = await foodsRes.json();
        setFoods(Array.isArray(data.foods) ? data.foods : []);
      }
      if (catsRes.ok) {
        const data = await catsRes.json();
        setCategories(Array.isArray(data.categories) ? data.categories : []);
      }
    } catch (e) {
      console.error("Data fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showAddToast = () => {
    setAddedToast(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setAddedToast(false), 2500);
  };

  const requireAuth = (cb: () => void) => {
    if (authLoading) return;
    if (!user) { setShowLoginAlert(true); return; }
    cb();
  };

  const handleFoodClick = (food: Food) => {
    requireAuth(() => setSelectedFood(food));
  };

  const handleAddToCart = (food: Food, quantity = 1) => {
    addItem(food, quantity);
    showAddToast();
  };

  const handleQuickAdd = (food: Food) => {
    requireAuth(() => { addItem(food); showAddToast(); });
  };

  const groupedFoods = categories
    .map((cat) => ({
      category: cat,
      foods: foods.filter((f) => f.foodCategoryId === cat.id),
    }))
    .filter((g) => g.foods.length > 0);

  const uncategorized = foods.filter(
    (f) => !categories.some((c) => c.id === f.foodCategoryId),
  );

  return (
    <div className="min-h-screen bg-[#404040]">
      <Navbar
        onOpenAuth={setAuthMode}
        deliveryAddress={deliveryAddress}
        onOpenDeliveryInput={() => {
          openCart();
        }}
        addedToast={addedToast}
      />

      <HeroSection />

      {/* Menu */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#E63946] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {groupedFoods.map(({ category, foods: categoryFoods }) => (
              <MenuSection
                key={category.id}
                categoryName={category.name}
                foods={categoryFoods}
                cartFoodIds={cartFoodIds}
                onAddFood={handleFoodClick}
              />
            ))}
            {uncategorized.length > 0 && (
              <MenuSection
                categoryName="Other"
                foods={uncategorized}
                cartFoodIds={cartFoodIds}
                onAddFood={handleQuickAdd}
              />
            )}
            {foods.length === 0 && (
              <div className="text-center py-20 text-gray-500">
                <p className="text-lg">No menu items available</p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      {/* Cart Sidebar */}
      <CartSidebar
        deliveryAddress={deliveryAddress}
        onDeliveryAddressChange={setDeliveryAddress}
        onCheckoutSuccess={() => setShowOrderSuccess(true)}
        onNeedLogin={() => setShowLoginAlert(true)}
      />

      {/* Food Detail Modal */}
      {selectedFood && (
        <FoodDetailModal
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Login Alert */}
      {showLoginAlert && (
        <LoginAlertModal
          onClose={() => setShowLoginAlert(false)}
          onLogin={() => {
            setShowLoginAlert(false);
            setAuthMode("login");
          }}
          onSignUp={() => {
            setShowLoginAlert(false);
            setAuthMode("signup");
          }}
        />
      )}

      {/* Auth Modal */}
      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSwitchMode={setAuthMode}
        />
      )}

      {/* Order Success */}
      {showOrderSuccess && (
        <OrderSuccessModal onClose={() => setShowOrderSuccess(false)} />
      )}
    </div>
  );
}
