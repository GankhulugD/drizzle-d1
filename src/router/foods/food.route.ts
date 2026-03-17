import { createFood } from "../../controller/foods/create-food";
import { getFoods } from "../../controller/foods/get-foods";
import { App } from "../../types";

export const foodRouter = (app: App) => {
  app.get("/foods", getFoods);
  app.post("/foods", createFood);
};
