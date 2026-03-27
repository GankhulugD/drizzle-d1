import { eq } from "drizzle-orm";
import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";
import { foodCategory } from "../../db/schema";

export const patchCategory = async (c: AppContext) => {
  const db = await drizzleProvider(c.env.new_food_delivery);
  const id = Number(c.req.param("id"));
  const { name } = await c.req.json();

  const result = await db
    .update(foodCategory)
    .set({ name })
    .where(eq(foodCategory.id, id))
    .returning();

  return c.json({ success: true, data: result[0] });
};
