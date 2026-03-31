"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { FoodMenuContent } from "./FoodMenuContent";
import { OrdersContent } from "./OrdersContent";

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
