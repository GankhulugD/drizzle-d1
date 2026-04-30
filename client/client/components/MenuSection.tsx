"use client";

import { Food } from "@/types";
import FoodCard from "./FoodCard";

interface MenuSectionProps {
  categoryName: string;
  foods: Food[];
  cartFoodIds: Set<number>;
  onAddFood: (food: Food) => void;
}

export default function MenuSection({ categoryName, foods, cartFoodIds, onAddFood }: MenuSectionProps) {
  if (foods.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-white text-2xl font-bold mb-6">{categoryName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {foods.map((food) => (
          <FoodCard
            key={food.id}
            food={food}
            isInCart={cartFoodIds.has(food.id)}
            onAdd={onAddFood}
          />
        ))}
      </div>
    </section>
  );
}
