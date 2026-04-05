import { App } from "../../types";
import { createOrder } from "../../controller/orders/post-order";
import { getOrders } from "../../controller/orders/get-order";
import { patchOrder } from "../../controller/orders/patch-order";

export const orderRouter = (app: App) => {
  app.post("/orders", createOrder);
  app.get("/orders", getOrders); // Бүх захиалгууд (admin dashboard)
  app.get("/orders/:userId", getOrders); // Тодорхой хэрэглэгчийн захиалгууд
  app.patch("/orders/:orderId", patchOrder); // Захиалгын статус шинэчлэх
};
