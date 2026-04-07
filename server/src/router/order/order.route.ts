import { App } from "../../types";
import { authMiddleware } from "../../lib/auth-middleware";
import { createOrder } from "../../controller/orders/post-order";
import { getOrders } from "../../controller/orders/get-order";
import { patchOrder } from "../../controller/orders/patch-order";

export const orderRouter = (app: App) => {
  app.post("/orders", authMiddleware, createOrder);
  app.get("/orders", authMiddleware, getOrders);
  app.get("/orders/:userId", getOrders);
  app.patch("/orders/:orderId", patchOrder);
};
