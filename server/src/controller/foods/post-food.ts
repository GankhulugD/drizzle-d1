import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";
import { food } from "../../db/schema";

export const createFood = async (c: AppContext) => {
  const d1 = c.env.my_db;

  // 1. db-г await хийж бодит объект болгож авна
  const db = await drizzleProvider(d1);

  const { name, price, foodCategoryId } = await c.req.json();

  console.log("body: ", name, price, foodCategoryId);

  try {
    const result = await db
      .insert(food)
      .values({
        name: name,
        price: String(price),
        foodCategoryId: Number(foodCategoryId),
      })
      .returning();

    console.log("Нэмэгдсэн өгөгдөл: ", result);

    return c.json({ success: "Success", data: result });
  } catch (err) {
    console.log("Алдаа гарлаа:");
    console.log(err);
    return c.json({ error: "Failed to create food" }, 500);
  }
};
