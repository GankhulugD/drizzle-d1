import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";

export const getFoods = async (c: AppContext) => {
  const d1 = c.env.my_db;
  const db = drizzleProvider(d1);
  const foods = (await db).query.food.findMany({});
  return c.json({
    foods: foods,
  });
};
