"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const FoodMenuContent = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Хоолны цэс</h2>
    <div className="grid grid-cols-3 gap-4">
      <div className="border p-4 rounded-xl bg-white shadow-sm">Пицца</div>
      <div className="border p-4 rounded-xl bg-white shadow-sm">Бургер</div>
    </div>
  </div>
);

const OrdersContent = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Захиалгууд</h2>
    <div className="border rounded-xl bg-white overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Захиалагч</th>
            <th className="p-3">Төлөв</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3">#101</td>
            <td className="p-3">Ганхуяг</td>
            <td className="p-3 text-green-500 font-medium">Хүргэгдсэн</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export function AdminLayout() {
  const [activeTab, setActiveTab] = useState<"menu" | "orders">("menu");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        {/* Sidebar-т setActiveTab-ийг дамжуулж өгнө */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <SidebarInset className="flex-1">
          {/* Төлөвөөс хамаарч контентыг солих хэсэг */}
          {activeTab === "menu" ? <FoodMenuContent /> : <OrdersContent />}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
