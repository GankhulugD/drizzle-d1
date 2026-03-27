import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";

export const getFoods = async (c: AppContext) => {
  const d1 = c.env.new_food_delivery;

  const db = await drizzleProvider(d1);

  try {
    const foods = await db.query.food.findMany({});

    return c.json({
      foods: foods,
    });
  } catch (error) {
    return c.json({ message: `Internal Server Error`, error: error }, 500);
  }
};
