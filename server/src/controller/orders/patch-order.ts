import { eq } from "drizzle-orm";
import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";
import { foodOrder } from "../../db/schema";

export const patchOrder = async (c: AppContext) => {
  const db = await drizzleProvider(c.env.new_food_delivery);
  const orderId = Number(c.req.param("orderId"));
  const body = await c.req.json();
  const { status } = body;

  try {
    const result = await db
      .update(foodOrder)
      .set({
        ...(status && { status: status }),
      })
      .where(eq(foodOrder.id, orderId))
      .returning();

    if (result.length === 0) {
      return c.json({ error: "Захиалга олдсонгүй" }, 404);
    }

    return c.json({ success: true, data: result[0] });
  } catch (err) {
    return c.json({ error: "Захиалгыг шинэчлэхэд алдаа гарлаа" }, 500);
  }
};
