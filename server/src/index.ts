import { Hono } from "hono";
import { cors } from "hono/cors";
import { foodRouter } from "./router/foods/food.route";
import { categoryRouter } from "./router/categories/category.route";
import { authRouter } from "./router/auth/auth.route";
import { orderRouter } from "./router/order/order.route";
import { Bindings, Variables } from "./types";

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use("*", async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`);
  await next();
});

app.use(
  cors({
    origin: [
      "https://my-app.gankhulug12345.workers.dev",
      "http://localhost:3000",
    ],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  }),
);

// Auth routes — middleware хэрэггүй
authRouter(app as any);

// Protected routes — middleware дотроо байна
foodRouter(app as any);
categoryRouter(app as any);
orderRouter(app as any);

app.get("/", (c) => {
  return c.json({
    message: "Food API is good 👍",
    status: "online",
    timestamp: new Date().toISOString(),
  });
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ error: "Internal Server Error", message: err.message }, 500);
});

export default app;
