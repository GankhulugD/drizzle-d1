import { App } from "../../types";
import { getCategories } from "../../controller/categories/get-categories";
import { createCategory } from "../../controller/categories/post-categories";
import { patchCategory } from "../../controller/categories/patch-categories";
import { deleteCategory } from "../../controller/categories/delete-categories";

export const categoryRouter = (app: App) => {
  app.get("/categories", getCategories);
  app.post("/categories", createCategory);
  app.patch("/categories/:id", patchCategory);
  app.delete("/categories/:id", deleteCategory);
};
