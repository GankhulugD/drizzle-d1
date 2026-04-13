"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const SignUpForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (loading) return;

    // Нууц үг шалгах
    if (form.password !== form.confirmPassword) {
      setError("Нууц үг хоорондоо таарахгүй байна!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Proxy API руу хандана
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          phoneNumber: form.phoneNumber,
          address: form.address,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Бүртгүүлсний дараа имэйлийг нь күүкид хадгалж өгвөл нэвтрэх хэсэгт автоматаар бөглөгдөхөд амар байдаг
        Cookies.set("user-email", form.email, { expires: 7 });

        alert("Бүртгэл амжилттай! Одоо нэвтэрнэ үү.");
        router.push("/auth/sign-in");
      } else {
        setError(data.error || "Бүртгэл хийхэд алдаа гарлаа.");
      }
    } catch (err) {
      setError("Сервертэй холбогдоход алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 w-full max-w-md border border-gray-100">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Бүртгүүлэх
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Мэдээллээ оруулж шинэ бүртгэл үүсгэнэ үү
          </p>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-2xl mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
            {error}
          </div>
        )}

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              Имэйл хаяг
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-gray-100 focus:border-gray-400 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Утасны дугаар
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="88******"
                required
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-gray-100 focus:border-gray-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
              Гэрийн хаяг
            </label>
            <input
              type="text"
              name="address"
              placeholder="Улаанбаатар, ..."
              required
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-gray-100 focus:border-gray-400 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Нууц үг
              </label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-gray-100 focus:border-gray-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                Давтax
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-gray-100 focus:border-gray-400 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-2xl py-3.5 font-bold text-sm hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-40 mt-4 shadow-xl shadow-black/5"
          >
            {loading ? "Түр хүлээнэ үү..." : "Бүртгүүлэх"}
          </button>

          <p className="text-center text-sm text-gray-500 pt-4">
            Бүртгэлтэй юу?{" "}
            <a
              href="/auth/login"
              className="font-bold text-gray-900 hover:underline"
            >
              Нэвтрэх
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
