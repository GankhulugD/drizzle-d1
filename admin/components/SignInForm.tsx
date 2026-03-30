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
import Cookies from "js-cookie";

type Form = {
  email: string;
  password: string;
};

export const SignInForm = () => {
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (
    event,
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  console.log(JSON.stringify(form));

  const onSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8787/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        Cookies.set("token", data.token, { expires: 7 });
        if (data.user.role === 2) {
          window.location.href = "/home";
        } else {
          window.location.href = "/home";
        }

        console.log("Амжилттай нэвтэрлээ:", data.message);
      } else {
        alert(data.message || "Имэйл эсвэл нууц үг буруу байна!");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Сервертэй холбогдоход алдаа гарлаа.");
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <Button type="button" onClick={onSubmit}>
                  Login
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="./sign-up">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
