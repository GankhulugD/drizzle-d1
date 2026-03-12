import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1"; // 1. Үүнийг нэм
import { eq } from "drizzle-orm";
import { users } from "./db/schema"; // 2. Үүнийг нэм (замаа шалгаарай)

// 3. Датабэйсийн төрлийг тодорхойлно
type Bindings = {
  my_db: D1Database;
};

// 4. Hono-доо Bindings-ээ дамжуулна
const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// List users
app.get("/users", async (c) => {
  console.log("hi");
  const db = drizzle(c.env.my_db);
  const all = await db.select().from(users);
  return c.json(all);
});

// Шинэ хэрэглэгч нэмэх (POST хүсэлт)
app.post("/users", async (c) => {
  const db = drizzle(c.env.my_db);

  // Postman-аас ирэх JSON өгөгдлийг унших
  const body = await c.req.json();

  // Датабэйс рүү хийх
  const result = await db
    .insert(users)
    .values({
      name: body.name,
      email: body.email,
    })
    .returning(); // Нэмэгдсэн өгөгдлийг буцааж харуулна

  return c.json(result, 201); // 201 бол "Created" гэсэн статус код
});

export default app;
