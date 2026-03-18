import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";
import * as schema from "../../db/schema";

export const getFoods = async (c: AppContext) => {
  const d1 = c.env.my_db;

  const db = await drizzleProvider(d1);

  try {
    const foods = await db.query.food.findMany({});

    return c.json({
      foods: foods,
    });
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
};
