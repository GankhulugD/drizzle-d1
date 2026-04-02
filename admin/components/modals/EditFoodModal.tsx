import { useState, useEffect, useRef } from "react";
import { X, Trash2 } from "lucide-react";
import { Food, Category } from "../../types";

type Props = {
  editFood: Food;
  categories: Category[];
  onClose: () => void;
  onSave: (
    id: number,
    name: string,
    price: string,
    description: string,
    image: string,
    categoryId: number,
  ) => void;
  onDelete: (id: number) => void;
  loading: boolean;
};

export const EditFoodModal = ({
  editFood,
  categories,
  onClose,
  onSave,
  onDelete,
  loading,
}: Props) => {
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editCatId, setEditCatId] = useState<number>(0);
  const [editImage, setEditImage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditName(editFood.name);
    setEditPrice(editFood.price);
    setEditDesc(editFood.description || "");
    setEditCatId(editFood.foodCategoryId);
    setEditImage(editFood.image || "");
  }, [editFood]);

  const handleSave = () => {
    if (editName.trim() && editPrice.trim()) {
      onSave(editFood.id, editName, editPrice, editDesc, editImage, editCatId);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Зургийг Base64 болгож унших (Backend рүү илгээхэд эсвэл харуулахад хялбар)
      const reader = new FileReader();
      reader.onloadend = () => setEditImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Dishes info</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Dish name */}
          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <label className="text-sm font-medium text-gray-600">
              Dish name
            </label>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-300"
            />
          </div>

          {/* Dish category */}
          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <label className="text-sm font-medium text-gray-600">
              Dish category
            </label>
            <select
              value={editCatId}
              onChange={(e) => setEditCatId(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-300 bg-white"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Ingredients */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="text-sm font-medium text-gray-600 mt-2">
              Ingredients
            </label>
            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              placeholder="Fluffy pancakes stacked with fruits..."
              className="w-full border rounded-lg px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:border-red-300"
            />
          </div>

          {/* Price */}
          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <label className="text-sm font-medium text-gray-600">Price</label>
            <input
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              type="number"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-300"
            />
          </div>

          {/* Image */}
          <div className="grid grid-cols-[120px_1fr] items-start gap-4">
            <label className="text-sm font-medium text-gray-600 mt-2">
              Image
            </label>
            <div>
              {editImage ? (
                <div className="relative w-40 h-24 rounded-lg border overflow-hidden">
                  <img
                    src={editImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setEditImage("")}
                    className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105"
                  >
                    <X size={14} className="text-gray-700" />
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg w-full py-4 text-sm text-gray-500 hover:bg-gray-50 transition"
                  >
                    Зураг оруулах
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t">
          <button
            onClick={() => onDelete(editFood.id)}
            className="w-10 h-10 flex items-center justify-center border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition"
            title="Устгах"
          >
            <Trash2 size={18} />
          </button>

          <button
            onClick={handleSave}
            disabled={loading || !editName.trim() || !editPrice.trim()}
            className="bg-black text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-800 transition disabled:opacity-40"
          >
            {loading ? "Хадгалж байна..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
};
