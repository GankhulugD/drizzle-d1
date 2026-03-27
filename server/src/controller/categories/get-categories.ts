import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";

export const getCategories = async (c: AppContext) => {
  const db = await drizzleProvider(c.env.new_food_delivery);
  const categories = await db.query.foodCategory.findMany();
  return c.json({ categories });
};
