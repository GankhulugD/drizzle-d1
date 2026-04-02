"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { OrdersContent } from "./OrdersContent";

const FoodMenuContent = dynamic(
  () =>
    import("./FoodMenuContent").then((m) => ({ default: m.FoodMenuContent })),
  {
    ssr: false,
    loading: () => (
      <div className="p-6 text-gray-400 text-sm">Уншиж байна...</div>
    ),
  },
);

export function AdminLayout() {
  const [activeTab, setActiveTab] = useState<"menu" | "orders">("menu");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <SidebarInset className="flex-1">
          {activeTab === "menu" ? <FoodMenuContent /> : <OrdersContent />}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
