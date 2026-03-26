import { Hono } from "hono";
import { cors } from "hono/cors";
import { foodRouter } from "./router/foods/food.route";
import { categoryRouter } from "./router/categories/category.route";
import { authRouter } from "./router/auth/auth.route";
import { orderRouter } from "./router/order/order.route";
import { Bindings, App } from "./types";

// 1. Hono аппликейшнээ Bindings-тэй нь үүсгэх
const app = new Hono<{ Bindings: Bindings }>();

// 2. Middleware (Дурын нэмэлт тохиргоо, жишээ нь Logger)
app.use("*", async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`);
  await next();
});

app.use(
  "/api/*",
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Client болон Admin-ий портууд
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

// 3. Роутерүүдээ бүртгэх
// 'app' объектыг App төрөл рүү хөрвүүлж дамжуулна (types/index.ts-д тодорхойлсон бол)
foodRouter(app as unknown as App);
categoryRouter(app as unknown as App);
authRouter(app as unknown as App);
orderRouter(app as unknown as App);

app.get("/", (c) => {
  return c.json({
    message: "Food API is good 👍",
    status: "online",
    timestamp: new Date().toISOString(),
  });
});

// 5. (Global Error Handler)
app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ error: "Internal Server Error", message: err.message }, 500);
});

export default app;
