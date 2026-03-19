import { Hono } from "hono";
import { foodRouter } from "./router/foods/food.route";
import { categoryRouter } from "./router/categories/category.route"; // Category роутерийн зам
import { Bindings, App } from "./types";

// 1. Hono аппликейшнээ Bindings-тэй нь үүсгэх
const app = new Hono<{ Bindings: Bindings }>();

// 2. Middleware (Дурын нэмэлт тохиргоо, жишээ нь Logger)
app.use("*", async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`);
  await next();
});

// 3. Роутерүүдээ бүртгэх
// 'app' объектыг App төрөл рүү хөрвүүлж дамжуулна (types/index.ts-д тодорхойлсон бол)
foodRouter(app as unknown as App);
categoryRouter(app as unknown as App);

// 4. Үндсэн (Root) зам дээр мэндчилгээ эсвэл статус харуулах
app.get("/", (c) => {
  return c.json({
    message: "Food API is running!",
    status: "online",
    timestamp: new Date().toISOString(),
  });
});

// 5. Алдаа баригч (Global Error Handler)
app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ error: "Internal Server Error", message: err.message }, 500);
});

export default app;
