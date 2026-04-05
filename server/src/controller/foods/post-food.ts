import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";
import { food } from "../../db/schema";

export const createFood = async (c: AppContext) => {
  const d1 = c.env.new_food_delivery;

  const db = await drizzleProvider(d1);

  const { name, price, foodCategoryId, description, image } =
    await c.req.json();

  console.log("body: ", name, price, foodCategoryId, description, image);

  try {
    const result = await db
      .insert(food)
      .values({
        name: name,
        price: String(price),
        foodCategoryId: Number(foodCategoryId),
        description: description || "",
        image: image || "",
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
