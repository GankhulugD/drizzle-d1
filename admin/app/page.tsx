import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sign } from "crypto";
import { SignUp } from "./auth/sign-up/page";

export default function Home() {
  return (
    // <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    //   <div className="w-full max-w-sm">
    //     <div className="flex flex-col items-center justify-center">
    //       <Card className="p-6">
    //         <Link
    //           className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
    //           href="./auth/login"
    //           rel="noopener noreferrer"
    //         >
    //           Login
    //         </Link>
    //         <Link
    //           className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
    //           href="./auth/sign-up"
    //           rel="noopener noreferrer"
    //         >
    //           Sign Up
    //         </Link>
    //       </Card>
    //     </div>
    //   </div>
    // </div>
    <SignUp />
  );
}
