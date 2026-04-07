"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserHeader = () => {
  const [userEmail, setUserEmail] = useState<string>("Loading...");
  const [userInitial, setUserInitial] = useState<string>("U");

  useEffect(() => {
    const email = Cookies.get("user-email");
    if (email) {
      setUserEmail(email);
      setUserInitial(email[0].toUpperCase());
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("auth-token", { path: "/" });
    Cookies.remove("user-email", { path: "/" });

    localStorage.clear();
    window.location.replace("/auth/login");
  };

  return (
    <header className="w-full bg-white rounded-2xl py-3 px-6 flex items-center justify-between shadow-sm top-0 z-40 mb-8 border border-gray-100">
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-gray-800">{userEmail}</span>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="focus:outline-none transition-transform active:scale-95">
              <Avatar className="h-10 w-10 border-2 border-red-50 hover:border-red-200">
                <AvatarFallback className="bg-red-500 text-white font-bold">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-64 mt-2 p-2" align="end">
            <DropdownMenuLabel className="font-normal p-2">
              <p className="text-sm text-black font-bold">{userEmail}</p>
            </DropdownMenuLabel>
            <div className="h-px bg-gray-100 my-2" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:bg-red-50 rounded-lg py-2 font-bold"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Гарах
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
