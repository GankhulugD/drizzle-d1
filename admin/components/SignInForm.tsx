"use client";

import { useState } from "react";

export const SignInForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
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
        window.location.href = "/home";
      } else {
        setError(data.error || "Имэйл эсвэл нууц үг буруу байна!");
      }
    } catch {
      setError("Сервертэй холбогдоход алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Login to your account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter your email below to login to your account
          </p>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="m@example.com"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition"
              >
                Forgot your password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition"
            />
          </div>

          <button
            type="button"
            onClick={onSubmit}
            disabled={loading || !form.email || !form.password}
            className="w-full bg-black text-white rounded-xl py-3 font-semibold text-sm hover:bg-gray-800 transition disabled:opacity-50 mt-2"
          >
            {loading ? "Нэвтэрч байна..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-500 pt-2">
            Don&apos;t have an account?{" "}
            <a
              href="./sign-up"
              className="font-semibold text-gray-900 hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
