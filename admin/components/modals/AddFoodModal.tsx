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

export const AddFoodModal = ({
  targetCat,
  onClose,
  onSave,
  loading,
}: Props) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const handleSubmit = async () => {
    if (name && price && image) {
      await onSave(name, price, targetCat.id, description, image);
    } else {
      alert("Нэр, үнэ болон зургийн линкийг заавал оруулна уу!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 font-sans text-gray-800">
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
            className="p-2 hover:bg-gray-100 rounded-full transition"
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
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-red-400 outline-none"
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
              placeholder="0.00"
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
              Image URL *
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
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {image && (
              <div className="mt-2 h-24 w-full rounded-lg border overflow-hidden">
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
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !name || !price || !image}
          className="w-full bg-red-500 text-white rounded-xl py-4 mt-8 font-bold hover:bg-red-600 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Dish"}
        </button>
      </div>
    </div>
  );
};
