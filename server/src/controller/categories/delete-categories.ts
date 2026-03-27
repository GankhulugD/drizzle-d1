import { eq } from "drizzle-orm";
import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";
import { foodCategory } from "../../db/schema";

export const deleteCategory = async (c: AppContext) => {
  const db = await drizzleProvider(c.env.new_food_delivery);
  const id = Number(c.req.param("id"));

  try {
    await db.delete(foodCategory).where(eq(foodCategory.id, id));
    return c.json({ success: true, message: "Category deleted" });
  } catch (err) {
    return c.json(
      { error: "Энэ категорид хоол холбоотой байгаа тул устгах боломжгүй." },
      400,
    );
  }
};
