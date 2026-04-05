"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { Category, Food } from "../types";
import { CategoryFilterBar } from "./CategoryFilterBar";
import { FoodCard } from "./FoodCard";
import { AddCategoryModal } from "./modals/AddCategoryModal";
import { AddFoodModal } from "./modals/AddFoodModal";
import { EditFoodModal } from "./modals/EditFoodModal";

export const FoodMenuContent = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [showAddCat, setShowAddCat] = useState<boolean>(false);
  const [targetCat, setTargetCat] = useState<Category | null>(null);
  const [editFood, setEditFood] = useState<Food | null>(null);

  const fetchAll = useCallback(async () => {
    setFetching(true);
    try {
      const [catRes, foodRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/foods"),
      ]);
      const cats = await catRes.json();
      const fds = await foodRes.json();
      setCategories(Array.isArray(cats) ? cats : cats.categories || []);
      setFoods(Array.isArray(fds) ? fds : fds.foods || []);
    } catch (e: unknown) {
      setError("Data татахад алдаа гарлаа.");
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleAddFood = async (
    name: string,
    price: string,
    categoryId: number,
    description: string,
    image: string,
  ) => {
    setLoading(true);
    try {
      await fetch("/api/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          foodCategoryId: categoryId,
          description,
          image,
        }),
      });
      setTargetCat(null);
      await fetchAll();
    } finally {
      setLoading(false);
    }
  };

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
          price,
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

  const handleDeleteFood = async (id: number) => {
    if (!confirm("Устгахдаа итгэлтэй байна уу?")) return;
    await fetch(`/api/foods/${id}`, { method: "DELETE" });
    setEditFood(null);
    await fetchAll();
  };

  const visibleCategories =
    activeCategory === null
      ? categories
      : categories.filter((c) => c.id === activeCategory);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <CategoryFilterBar
        categories={categories}
        foods={foods}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onAddCategory={() => setShowAddCat(true)}
        error={error}
      />

      {!fetching &&
        visibleCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100"
          >
            <h3 className="text-xl font-bold mb-5">{cat.name}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              <button
                onClick={() => setTargetCat(cat)}
                className="border-2 border-dashed border-red-200 rounded-2xl flex flex-col items-center justify-center p-6 hover:bg-red-50 transition min-h-[220px]"
              >
                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center mb-2 shadow-lg">
                  <Plus className="text-white" />
                </div>
                <span className="text-gray-500 font-medium text-sm">
                  Add New Food
                </span>
              </button>
              {foods
                .filter((f) => f.foodCategoryId === cat.id)
                .map((food) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    onEdit={setEditFood}
                    onDelete={handleDeleteFood}
                  />
                ))}
            </div>
          </div>
        ))}

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
      {showAddCat && (
        <AddCategoryModal
          onClose={() => setShowAddCat(false)}
          onSave={async (name) => {
            await fetch("/api/categories", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name }),
            });
            setShowAddCat(false);
            await fetchAll();
          }}
          loading={loading}
        />
      )}
    </div>
  );
};
