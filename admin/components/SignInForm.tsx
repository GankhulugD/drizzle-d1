"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // npm install js-cookie заавал хийсэн байх

export const SignInForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Токен болон Хэрэглэгчийн имэйлийг күүкид хадгалах
        // Expires: 7 гэвэл 7 хоногийн дараа автоматаар гарна
        Cookies.set("auth-token", data.token, { expires: 7 });
        Cookies.set("user-email", form.email, { expires: 7 });

        // 2. Амжилттай болвол шилжих
        router.push("/home");
        router.refresh();
      } else {
        setError(data.error || "Имэйл эсвэл нууц үг буруу байна!");
      }
    } catch (err) {
      setError("Сервертэй холбогдоход алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 w-full max-w-md border border-gray-100">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Тавтай морил
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Системд нэвтрэхийн тулд имэйл хаягаа оруулна уу
          </p>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-2xl mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
            {error}
          </div>
        )}

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
              Имэйл хаяг
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-gray-100 focus:border-gray-400 transition-all placeholder:text-gray-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2 ml-1">
              <label className="text-sm font-semibold text-gray-700">
                Нууц үг
              </label>
              <a
                href="#"
                className="text-xs font-medium text-gray-400 hover:text-gray-900 transition"
              >
                Нууц үг мартсан уу?
              </a>
            </div>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-gray-100 focus:border-gray-400 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !form.email || !form.password}
            className="w-full bg-black text-white rounded-2xl py-3.5 font-bold text-sm hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none mt-4 shadow-xl shadow-black/5"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Түр хүлээнэ үү...
              </div>
            ) : (
              "Нэвтрэх"
            )}
          </button>

          <p className="text-center text-sm text-gray-500 pt-4">
            Бүртгэлгүй юу?{" "}
            <a
              href="/auth/sign-up"
              className="font-bold text-gray-900 hover:underline underline-offset-4"
            >
              Бүртгүүлэх
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
