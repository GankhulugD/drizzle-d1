import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
  onSave: (name: string) => void;
  loading: boolean;
};

export const AddCategoryModal = ({ onClose, onSave, loading }: Props) => {
  const [catName, setCatName] = useState("");

  const handleSave = () => {
    if (catName.trim()) onSave(catName);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold">Add new category</h3>
          <button onClick={onClose}>
            <X size={20} className="text-gray-400 hover:text-black" />
          </button>
        </div>
        <label className="block text-sm font-medium mb-1">Category name</label>
        <input
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          placeholder="Type category name..."
          autoFocus
          className="w-full border rounded-lg px-3 py-2 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <button
          onClick={handleSave}
          disabled={loading || !catName.trim()}
          className="w-full bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-40"
        >
          {loading ? "Нэмж байна..." : "Add category"}
        </button>
      </div>
    </div>
  );
};
