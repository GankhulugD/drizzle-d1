"use client";

import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { Food } from "@/types";
import { convertImgbbUrl, formatPrice } from "@/lib/utils";

interface FoodCardProps {
  food: Food;
  isInCart: boolean;
  onAdd: (food: Food) => void;
}

export default function FoodCard({ food, isInCart, onAdd }: FoodCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl cursor-pointer group hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
      onClick={() => onAdd(food)}
    >
      {/* Image wrapper with padding so rounded corners are visible */}
      <div className="relative p-2" style={{ aspectRatio: "16/11" }}>
        <div className="w-full h-full overflow-hidden rounded-lg">
          {!imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={convertImgbbUrl(food.image)}
              alt={food.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-5xl">🍽️</span>
            </div>
          )}
        </div>

        {/* + button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd(food);
          }}
          className={`absolute bottom-5 right-5 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 ${
            isInCart
              ? "bg-green-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {isInCart ? (
            <Check size={18} strokeWidth={2.5} />
          ) : (
            <Plus size={20} strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Info */}
      <div className="px-4 pt-1 pb-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-[#E63946] font-bold text-xl leading-tight line-clamp-1">
            {food.name}
          </h3>
          <span className="text-gray-900 font-bold text-lg shrink-0">
            {formatPrice(food.price)}
          </span>
        </div>
        {food.description && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {food.description}
          </p>
        )}
      </div>
    </div>
  );
}
