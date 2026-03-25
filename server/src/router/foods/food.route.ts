import { createFood } from "../../controller/foods/post-food";
import { getFoods } from "../../controller/foods/get-food";
import { patchFood } from "../../controller/foods/patch-food";
import { deleteFood } from "../../controller/foods/delete-food";

import { App } from "../../types";

export const foodRouter = (app: App) => {
  app.get("/foods", getFoods);
  app.post("/foods", createFood);
  app.patch("/foods/:id", patchFood); // PATCH :id нэмсэн
  app.delete("/foods/:id", deleteFood); // DELETE :id нэмсэн
};
