import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";
import { food } from "../../db/schema";

export const createFood = async (c: AppContext) => {
  const d1 = c.env.my_db;
  const db = drizzleProvider(d1);
  const { name, price, foodCategoryId } = await c.req.json();
  console.log("===============1===============");

  console.log("body: ", name, price, foodCategoryId);
  console.log("===============2===============");
  try {
    console.log("===============3===============");
    (await db)
      .insert(food)
      .values({
        name: name,
        price: price,
        foodCategoryId: foodCategoryId,
      })
      .returning();

    console.log("===============4===============");

    return c.json({ success: "Success" });
  } catch (err) {
    console.log("===============5===============");
    console.log(err);
  }
};
