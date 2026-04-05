import { eq } from "drizzle-orm";
import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";
import { food } from "../../db/schema";

export const patchFood = async (c: AppContext) => {
  const d1 = c.env.new_food_delivery;
  const db = await drizzleProvider(d1);
  const id = Number(c.req.param("id")); // URL-аас ID-г авна
  const body = await c.req.json();

  try {
    const result = await db
      .update(food)
      .set({
        ...(body.name && { name: body.name }),
        ...(body.price && { price: String(body.price) }),
        ...(body.foodCategoryId && {
          foodCategoryId: Number(body.foodCategoryId),
        }),
        ...(body.description !== undefined && {
          description: body.description,
        }),
        ...(body.image !== undefined && { image: body.image }),
      })
      .where(eq(food.id, id))
      .returning();

    if (result.length === 0) {
      return c.json({ error: "Хоол олдсонгүй" }, 404);
    }

    return c.json({ success: true, data: result[0] });
  } catch (err) {
    return c.json({ error: "Шинэчлэхэд алдаа гарлаа" }, 500);
  }
};
