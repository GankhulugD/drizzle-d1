"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  activeTab: "menu" | "orders";
  setActiveTab: (tab: "menu" | "orders") => void;
}

export function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  return (
    <Sidebar className="border-2 bg-white">
      <SidebarHeader className="p-5 mt-4 flex items-center justify-center">
        <div className="flex justify-center items-center gap-2.5">
          <img
            src="/Screenshot 2024-12-17 at 18.02.18 1 (Traced).svg"
            alt="logo"
            className="w-9"
          />
          <div>
            <h2 className="font-semibold text-lg">NomNom</h2>
            <p className="text-xs text-gray-500">Swift delivery</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="mt-10 px-4 space-y-2">
        <SidebarMenuButton
          onClick={() => setActiveTab("menu")}
          className={cn(
            "rounded-2xl h-10 w-full justify-start gap-3 px-4 transition-none",
            activeTab === "menu"
              ? "bg-black text-white hover:bg-black"
              : "bg-gray-100",
          )}
        >
          <img
            src={
              activeTab === "menu"
                ? "/Navigation/menu-white.svg"
                : "/Navigation/menu-black.svg"
            }
            className="w-4"
          />
          <span>Food Menu</span>
        </SidebarMenuButton>

        <SidebarMenuButton
          onClick={() => setActiveTab("orders")}
          className={cn(
            "rounded-2xl h-10 w-full justify-start gap-3 px-4 transition-none",
            activeTab === "orders"
              ? "bg-black text-white hover:bg-black"
              : "bg-gray-100",
          )}
        >
          <img
            src={
              activeTab === "orders"
                ? "/Navigation/order-white.svg"
                : "/Navigation/order-black.svg"
            }
            className="w-4"
          />
          <span>Orders</span>
        </SidebarMenuButton>
      </SidebarContent>
    </Sidebar>
  );
}
