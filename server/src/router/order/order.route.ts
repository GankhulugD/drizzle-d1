import { App } from "../../types";
import { createOrder } from "../../controller/orders/post-order";
import { getOrders } from "../../controller/orders/get-order";

export const orderRouter = (app: App) => {
  app.post("/orders", createOrder);
  app.get("/orders/:userId", getOrders);
};
