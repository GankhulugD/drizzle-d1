import { eq } from "drizzle-orm";
import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";
import { food } from "../../db/schema";

export const deleteFood = async (c: AppContext) => {
  const d1 = c.env.new_food_delivery;
  const db = await drizzleProvider(d1);
  const id = Number(c.req.param("id"));

  try {
    const result = await db.delete(food).where(eq(food.id, id)).returning();

    if (result.length === 0) {
      return c.json({ error: "Устгах хоол олдсонгүй" }, 404);
    }

    return c.json({ success: true, message: "Амжилттай устлаа" });
  } catch (err) {
    return c.json({ error: "Устгахад алдаа гарлаа" }, 500);
  }
};
