"use client";

import Image from "next/image";

interface OrderSuccessModalProps {
  onClose: () => void;
}

export default function OrderSuccessModal({ onClose }: OrderSuccessModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-3xl px-10 pt-10 pb-8 max-w-sm w-full shadow-2xl text-center flex flex-col items-center">
        <h2 className="text-xl font-bold text-gray-900 mb-6 leading-snug">
          Your order has been successfully placed !
        </h2>

        <Image
          src="/OrderSuccessModal.png"
          alt="Order success"
          width={180}
          height={200}
          className="object-contain mb-6"
        />

        <button
          onClick={onClose}
          className="border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium px-10 py-2.5 rounded-full transition text-sm"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}
