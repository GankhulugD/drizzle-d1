"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChangeEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Нууц үг хоорондоо таарахгүй байна!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8787/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          phoneNumber: form.phoneNumber,
          address: form.address,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Бүртгэл амжилттай! Одоо нэвтэрнэ үү.");
        router.push("/auth/sign-in");
      } else {
        alert(data.message || "Бүртгэл хийхэд алдаа гарлаа.");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert("Сервертэй холбогдож чадсангүй.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={form.email}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
              <Input
                name="phoneNumber"
                type="text"
                placeholder="88******"
                required
                value={form.phoneNumber}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                name="address"
                type="text"
                placeholder="Ulaanbaatar, ..."
                required
                value={form.address}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input
                name="confirmPassword"
                type="password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </Field>

            <div className="flex flex-col gap-2 pt-4">
              <Button type="button" onClick={onSubmit} className="w-full">
                Create Account
              </Button>
              <p className="text-sm text-center text-gray-500">
                Already have an account?{" "}
                <a href="/auth/login" className="text-black underline">
                  Sign in
                </a>
              </p>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
