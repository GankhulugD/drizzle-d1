import { eq } from "drizzle-orm";
import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";
import { foodOrder } from "../../db/schema";

export const getOrders = async (c: AppContext) => {
  const db = await drizzleProvider(c.env.new_food_delivery);
  const userId = c.req.param("userId");

  try {
    let orders;

    if (userId) {
      // Тодорхой хэрэглэгчийн захиалгууд
      orders = await db.query.foodOrder.findMany({
        where: eq(foodOrder.userId, Number(userId)),
        with: {
          foodOrderItems: {
            with: {
              food: true,
            },
          },
          user: true,
        },
      });
    } else {
      // Бүх захиалгууд (админ дашбоард)
      orders = await db.query.foodOrder.findMany({
        with: {
          foodOrderItems: {
            with: {
              food: true,
            },
          },
          user: true,
        },
      });
    }

    return c.json({ orders });
  } catch (err) {
    console.log("Order fetch error:", err);
    return c.json({ error: "Захиалга татахад алдаа гарлаа" }, 500);
  }
};
