"use client";

import { useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import { Food } from "@/types";
import { convertImgbbUrl, formatPrice } from "@/lib/utils";

interface FoodDetailModalProps {
  food: Food | null;
  onClose: () => void;
  onAddToCart: (food: Food, quantity: number) => void;
}

export default function FoodDetailModal({
  food,
  onClose,
  onAddToCart,
}: FoodDetailModalProps) {
  const [quantity, setQuantity] = useState(1);

  if (!food) return null;

  const handleAdd = () => {
    onAddToCart(food, quantity);
    onClose();
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl flex flex-col sm:flex-row">
        {/* Image */}
        <div className="w-full sm:w-1/2 aspect-square sm:aspect-auto p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={convertImgbbUrl(food.image)}
            alt={food.name}
            className="w-full h-full object-cover rounded-2xl"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <button
              onClick={onClose}
              className="absolute border-1 border-gray-300 text-gray-800 top-4 right-4 w-8 h-8 rounded-full hover:bg-gray-300 flex items-center justify-center transition"
            >
              <X size={16} />
            </button>

            <h2 className="text-2xl font-bold text-[#E63946] mb-3">
              {food.name}
            </h2>
            {food.description && (
              <p className="text-gray-500 text-sm leading-relaxed">
                {food.description}
              </p>
            )}
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Total price</p>
              <p className="text-2xl font-bold text-gray-800">
                {formatPrice(Number(food.price) * quantity)}
              </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 rounded-full border-1 border-gray-300 flex items-center justify-center hover:border-black transition text-gray-800"
              >
                <Minus size={16} />
              </button>
              <span className="text-xl font-bold text-gray-800 w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-full border-1 border-gray-300 flex items-center justify-center hover:border-black transition text-gray-800"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="w-full bg-gray-900 hover:bg-gray-700 text-white font-bold py-3.5 rounded-full transition text-sm"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
