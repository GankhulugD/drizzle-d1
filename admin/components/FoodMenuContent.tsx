"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Category, Food } from "../types";
import { CategoryFilterBar } from "./CategoryFilterBar";
import { FoodCard } from "./FoodCard";
import { AddCategoryModal } from "./modals/AddCategoryModal";
import { AddFoodModal } from "./modals/AddFoodModal";
import { EditFoodModal } from "./modals/EditFoodModal";

export const FoodMenuContent = () => {
  // Өгөгдлийн State
  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  // Төлөвийн State
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal-уудын State
  const [showAddCat, setShowAddCat] = useState(false);
  const [targetCat, setTargetCat] = useState<Category | null>(null);
  const [editFood, setEditFood] = useState<Food | null>(null);

  // Бүх өгөгдлийг татах
  const fetchAll = async () => {
    setFetching(true);
    setError(null);
    try {
      const [catRes, foodRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/foods"),
      ]);
      const catText = await catRes.text();
      const foodText = await foodRes.text();
      const catData = catText ? JSON.parse(catText) : {};
      const foodData = foodText ? JSON.parse(foodText) : {};

      setCategories(
        Array.isArray(catData) ? catData : (catData.categories ?? []),
      );
      setFoods(Array.isArray(foodData) ? foodData : (foodData.foods ?? []));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Category нэмэх
  const handleAddCategory = async (name: string) => {
    setLoading(true);
    try {
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      setShowAddCat(false);
      await fetchAll();
    } finally {
      setLoading(false);
    }
  };

  // Хоол нэмэх (Хэрэв AddFoodModal-аас description, image ирвэл хүлээж авах боломжтойгоор бичив)
  const handleAddFood = async (
    name: string,
    price: string,
    categoryId: number,
    description?: string,
    image?: string,
  ) => {
    setLoading(true);
    try {
      await fetch("/api/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: String(price),
          foodCategoryId: categoryId,
          description: description || "",
          image: image || "",
        }),
      });
      setTargetCat(null);
      await fetchAll();
    } finally {
      setLoading(false);
    }
  };

  // Хоол засах
  const handleEditFood = async (
    id: number,
    name: string,
    price: string,
    description: string,
    image: string,
    categoryId: number,
  ) => {
    setLoading(true);
    try {
      await fetch(`/api/foods/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: String(price),
          description,
          image,
          foodCategoryId: categoryId,
        }),
      });
      setEditFood(null);
      await fetchAll();
    } finally {
      setLoading(false);
    }
  };

  // Хоол устгах
  const handleDeleteFood = async (id: number) => {
    if (!confirm("Энэ хоолыг устгах уу?")) return;
    try {
      await fetch(`/api/foods/${id}`, { method: "DELETE" });
      setEditFood(null); // Устгасны дараа модалыг автоматаар хаана
      await fetchAll();
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  const visibleCategories =
    activeCategory === null
      ? categories
      : categories.filter((c) => c.id === activeCategory);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <CategoryFilterBar
        categories={categories}
        foods={foods}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onAddCategory={() => setShowAddCat(true)}
        error={error}
      />

      {fetching && (
        <div className="text-center py-10 text-gray-400 text-sm">
          Уншиж байна...
        </div>
      )}

      {/* Food sections */}
      {!fetching &&
        visibleCategories.map((cat) => {
          const catFoods = foods.filter((f) => f.foodCategoryId === cat.id);
          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl p-5 mb-5 shadow-sm border border-blue-100"
            >
              <h3 className="text-lg font-bold mb-4">
                {cat.name}{" "}
                <span className="text-gray-400 font-normal text-base">
                  ({catFoods.length})
                </span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Add Button Placeholder */}
                <button
                  onClick={() => setTargetCat(cat)}
                  className="border-2 border-dashed border-red-300 rounded-xl flex flex-col items-center justify-center gap-2 p-6 hover:bg-red-50 transition min-h-50"
                >
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                    <Plus size={20} className="text-white" />
                  </div>
                  <span className="text-center text-sm text-gray-400">
                    Add new Dish to {cat.name}
                  </span>
                </button>

                {/* Foods */}
                {catFoods.map((food) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    onEdit={setEditFood}
                    onDelete={handleDeleteFood}
                  />
                ))}
              </div>
            </div>
          );
        })}

      {!fetching && categories.length === 0 && !error && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg mb-2">Category байхгүй байна</p>
          <p className="text-sm">Дээрх + товчоор category нэм</p>
        </div>
      )}

      {/* Modals */}
      {showAddCat && (
        <AddCategoryModal
          onClose={() => setShowAddCat(false)}
          onSave={handleAddCategory}
          loading={loading}
        />
      )}

      {targetCat && (
        <AddFoodModal
          targetCat={targetCat}
          onClose={() => setTargetCat(null)}
          onSave={handleAddFood}
          loading={loading}
        />
      )}

      {editFood && (
        <EditFoodModal
          editFood={editFood}
          categories={categories}
          onClose={() => setEditFood(null)}
          onSave={handleEditFood}
          onDelete={handleDeleteFood}
          loading={loading}
        />
      )}
    </div>
  );
};
