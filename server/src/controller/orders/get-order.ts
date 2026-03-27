import { eq } from "drizzle-orm";
import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";
import { foodOrder } from "../../db/schema";

export const getOrders = async (c: AppContext) => {
  const db = await drizzleProvider(c.env.new_food_delivery);
  const userId = Number(c.req.param("userId"));

  const orders = await db.query.foodOrder.findMany({
    where: eq(foodOrder.userId, userId),
    with: {
      foodOrderItems: {
        with: {
          food: true,
        },
      },
    },
  });

  return c.json({ orders });
};
