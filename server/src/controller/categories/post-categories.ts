import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";
import { foodCategory } from "../../db/schema";

export const createCategory = async (c: AppContext) => {
  const db = await drizzleProvider(c.env.new_food_delivery);
  const { name } = await c.req.json();

  const result = await db.insert(foodCategory).values({ name }).returning();
  return c.json({ success: true, data: result[0] });
};
