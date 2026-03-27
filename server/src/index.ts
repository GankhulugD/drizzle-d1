import { Hono } from "hono";
import { cors } from "hono/cors";
import { foodRouter } from "./router/foods/food.route";
import { categoryRouter } from "./router/categories/category.route";
import { authRouter } from "./router/auth/auth.route";
import { orderRouter } from "./router/order/order.route";
import { Bindings, App } from "./types";

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`);
  await next();
});

app.use(cors());

app.use(
  "/api3/*",
  cors({
    origin: [
      "https://my-app.gankhulug12345.workers.dev",
      "http://localhost:3000",
    ],
  }),
);

foodRouter(app);
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
