import { App } from "../../types";
import { authMiddleware } from "../../lib/auth-middleware";
import { getCategories } from "../../controller/categories/get-categories";
import { createCategory } from "../../controller/categories/post-categories";
import { patchCategory } from "../../controller/categories/patch-categories";
import { deleteCategory } from "../../controller/categories/delete-categories";

export const categoryRouter = (app: App) => {
  app.get("/categories", authMiddleware, getCategories);
  app.post("/categories", authMiddleware, createCategory);
  app.patch("/categories/:id", authMiddleware, patchCategory);
  app.delete("/categories/:id", authMiddleware, deleteCategory);
};
