import { useState } from "react";
import { X, ImageIcon } from "lucide-react";
import { Category } from "../../types";

type Props = {
  targetCat: Category;
  onClose: () => void;
  onSave: (name: string, price: string, categoryId: number) => void;
  loading: boolean;
};

export const AddFoodModal = ({
  targetCat,
  onClose,
  onSave,
  loading,
}: Props) => {
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");

  const handleSave = () => {
    if (foodName.trim() && foodPrice.trim()) {
      onSave(foodName, foodPrice, targetCat.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold">
            Add new Dish to{" "}
            <span className="text-red-500">{targetCat.name}</span>
          </h3>
          <button onClick={onClose}>
            <X size={20} className="text-gray-400 hover:text-black" />
          </button>
        </div>
        <div className="flex gap-3 mb-3">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Food name</label>
            <input
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="Type food name"
              autoFocus
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Food price</label>
            <input
              value={foodPrice}
              onChange={(e) => setFoodPrice(e.target.value)}
              placeholder="Enter price..."
              type="number"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Food image</label>
          <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 flex flex-col items-center justify-center bg-blue-50 text-gray-400 gap-2">
            <ImageIcon size={24} />
            <span className="text-sm">
              Choose a file or drag & drop it here
            </span>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={loading || !foodName.trim() || !foodPrice.trim()}
          className="w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-40"
        >
          {loading ? "Нэмж байна..." : "Add Dish"}
        </button>
      </div>
    </div>
  );
};
