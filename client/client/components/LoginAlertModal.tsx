"use client";

import { X } from "lucide-react";

interface LoginAlertModalProps {
  onClose: () => void;
  onLogin: () => void;
  onSignUp: () => void;
}

export default function LoginAlertModal({ onClose, onLogin, onSignUp }: LoginAlertModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
        >
          <X size={16} />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          You need to log in first
        </h2>

        <div className="flex gap-3">
          <button
            onClick={onLogin}
            className="flex-1 bg-gray-900 hover:bg-gray-700 text-white font-bold py-3 rounded-full transition text-sm"
          >
            Log in
          </button>
          <button
            onClick={onSignUp}
            className="flex-1 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold py-3 rounded-full transition text-sm"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
