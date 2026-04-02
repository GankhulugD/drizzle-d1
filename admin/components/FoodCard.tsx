import { Pencil, Trash2 } from "lucide-react"; // Trash2 нэмсэн
import { Food } from "../types";

type Props = {
  food: Food;
  onEdit: (food: Food) => void;
  onDelete: (id: number) => void; // onDelete нэмсэн
};

export const FoodCard = ({ food, onEdit, onDelete }: Props) => {
  return (
    <div className="border rounded-xl overflow-hidden bg-white shadow-sm flex flex-col group">
      <div className="relative">
        <img
          src={food.image || "/placeholder.jpg"}
          className="w-full h-36 object-cover"
        />

        {/* Засах болон Устгах товчлуурууд */}
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
          <p className="text-sm font-bold">${food.price}</p>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2">{food.description}</p>
      </div>
    </div>
  );
};
