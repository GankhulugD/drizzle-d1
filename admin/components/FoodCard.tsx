import { Pencil, Trash2 } from "lucide-react";
import { Food } from "../types";

type Props = {
  food: Food;
  onEdit: (food: Food) => void;
  onDelete: (id: number) => void;
};

const getDisplayImage = (url: string | null | undefined): string => {
  if (!url) return "https://placehold.co/400x300?text=No+Image";

  if (url.includes("i.ibb.co")) return url;

  if (url.includes("ibb.co") && !url.includes("i.ibb.co")) {
    return "https://placehold.co/400x300?text=Use+Direct+Link";
  }

  return url;
};

export const FoodCard = ({ food, onEdit, onDelete }: Props) => {
  return (
    <div className="border rounded-xl overflow-hidden bg-white shadow-sm flex flex-col group">
      <div className="relative">
        <img
          src={getDisplayImage(food.image)}
          alt={food.name}
          className="w-full h-70 object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/400x300?text=No+Image";
          }}
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => onEdit(food)}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow hover:bg-gray-100"
          >
            <Pencil size={14} className="text-blue-500" />
          </button>
          <button
            onClick={() => onDelete(food.id)}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow hover:bg-red-50"
          >
            <Trash2 size={14} className="text-red-500" />
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <p className="text-red-500 font-semibold text-sm">{food.name}</p>
          <p className="text-sm font-bold">₮{food.price}</p>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2">{food.description}</p>
      </div>
    </div>
  );
};
