import { App } from "../../types";
import { authMiddleware } from "../../lib/auth-middleware";
import { createFood } from "../../controller/foods/post-food";
import { getFoods } from "../../controller/foods/get-food";
import { patchFood } from "../../controller/foods/patch-food";
import { deleteFood } from "../../controller/foods/delete-food";

export const foodRouter = (app: App) => {
  app.get("/foods", authMiddleware, getFoods);
  app.post("/foods", authMiddleware, createFood);
  app.patch("/foods/:id", authMiddleware, patchFood);
  app.delete("/foods/:id", authMiddleware, deleteFood);
};
