import { Plus } from "lucide-react";
import { Category, Food } from "../types";

type Props = {
  categories: Category[];
  foods: Food[];
  activeCategory: number | null;
  setActiveCategory: (id: number | null) => void;
  onAddCategory: () => void;
  error: string | null;
};

export const CategoryFilterBar = ({
  categories,
  foods,
  activeCategory,
  setActiveCategory,
  onAddCategory,
  error,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Dishes category</h2>

      {error && (
        <div className="mb-3 text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setActiveCategory(null)}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition ${
            activeCategory === null
              ? "border-red-400 text-black"
              : "border-gray-200 text-gray-600"
          }`}
        >
          All Dishes
          <span className="bg-gray-900 text-white text-xs px-1.5 py-0.5 rounded-full">
            {foods.length}
          </span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition ${
              activeCategory === cat.id
                ? "border-red-400 text-black"
                : "border-gray-200 text-gray-600"
            }`}
          >
            {cat.name}
            <span className="bg-gray-900 text-white text-xs px-1.5 py-0.5 rounded-full">
              {foods.filter((f) => f.foodCategoryId === cat.id).length}
            </span>
          </button>
        ))}

        <button
          onClick={onAddCategory}
          className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};
