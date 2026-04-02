import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/AdminLayout";

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/auth/sign-in");
  }

  return <AdminLayout />;
}
