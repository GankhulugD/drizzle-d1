import { useState } from "react";
import { X, Link as LinkIcon } from "lucide-react";
import { Category } from "../../types";

interface Props {
  targetCat: Category;
  onClose: () => void;
  onSave: (
    name: string,
    price: string,
    categoryId: number,
    description: string,
    image: string,
  ) => Promise<void>;
  loading: boolean;
}

const getPreviewImage = (url: string): string => {
  if (!url) return "";
  if (url.includes("i.ibb.co")) return url;
  if (url.includes("ibb.co") && !url.includes("i.ibb.co"))
    return "https://placehold.co/400x300?text=Use+Direct+Link";
  return url;
};

export const AddFoodModal = ({
  targetCat,
  onClose,
  onSave,
  loading,
}: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">Add New Dish</h2>
            <p className="text-sm text-gray-500 italic">
              to {targetCat.name} category
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Food Name *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-400"
              placeholder="e.g. Spicy Chicken"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Price (₮) *
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Description / Ingredients
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 h-20 resize-none outline-none"
              placeholder="What's inside?"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Image URL *{" "}
            </label>
            <div className="relative">
              <LinkIcon
                className="absolute left-3 top-3.5 text-gray-400"
                size={18}
              />
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3 pl-10 outline-none focus:border-red-400"
                placeholder="https://i.ibb.co/xxxxx/image.jpg"
              />
            </div>

            {image && (
              <div className="mt-2 h-24 w-full rounded-lg border overflow-hidden">
                <img
                  src={getPreviewImage(image)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/400x300?text=Invalid+URL")
                  }
                />
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => onSave(name, price, targetCat.id, description, image)}
          disabled={loading || !name || !price || !image}
          className="w-full bg-red-500 text-white rounded-xl py-4 mt-8 font-bold hover:bg-red-600 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Dish"}
        </button>
      </div>
    </div>
  );
};
