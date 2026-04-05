import { useState } from "react";
import { X, Trash2, Link as LinkIcon } from "lucide-react";
import { Category, Food } from "../../types";

interface Props {
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
  ) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  loading: boolean;
}

const convertImgbbUrl = (url: string | null | undefined): string => {
  if (!url) return "";

  if (url.includes("ibb.co")) {
    if (url.includes("/image/") || url.includes("/th/")) {
      return url;
    }
    
    if (url.match(/ibb\.co\/\w+$/)) {
      return url.replace("ibb.co/", "ibb.co/image/");
    }
  }
  
  return url;
};

export const EditFoodModal = ({
  editFood,
  categories,
  onClose,
  onSave,
  onDelete,
  loading,
}: Props) => {
  const [name, setName] = useState(editFood.name);
  const [price, setPrice] = useState(editFood.price);
  const [description, setDescription] = useState(editFood.description || "");
  const [image, setImage] = useState(editFood.image || "");
  const [categoryId, setCategoryId] = useState(editFood.foodCategoryId);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Food</h2>
          <button
            onClick={() => onDelete(editFood.id)}
            className="p-2 text-gray-400 hover:text-red-500 transition"
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-xl p-3"
            placeholder="Name"
          />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-xl p-3"
            placeholder="Price"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-xl p-3 h-20"
            placeholder="Description"
          />
          <div className="relative">
            <LinkIcon
              className="absolute left-3 top-3.5 text-gray-400"
              size={18}
            />
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border rounded-xl p-3 pl-10"
              placeholder="Image Link"
            />
          </div>
          {image && (
            <div className="h-24 w-full rounded-lg border overflow-hidden">
              <img
                src={convertImgbbUrl(image)}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://via.placeholder.com/150?text=Invalid+Link")
                }
              />
            </div>
          )}
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="w-full border rounded-xl p-3 bg-white"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-4 font-bold text-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onSave(editFood.id, name, price, description, image, categoryId)
            }
            className="flex-1 bg-black text-white rounded-xl py-4 font-bold"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};
