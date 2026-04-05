import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";
import { food, foodOrder, foodOrderItem } from "../../db/schema";
import { inArray } from "drizzle-orm";

export const createOrder = async (c: AppContext) => {
  const db = await drizzleProvider(c.env.new_food_delivery);

  // (foodId, quantity) ирнэ
  const { userId, items } = await c.req.json();

  try {
    // 1. Сонгосон бүх хоолнуудын ID-г салгаж авах
    const foodIds = items.map((i: any) => i.foodId);

    // 2. Датабэйсээс эдгээр хоолнуудын бодит үнийг татаж авах
    const dbFoods = await db
      .select()
      .from(food)
      .where(inArray(food.id, foodIds));

    // 3. Нийт үнийг backend дээр тооцоолох
    let calculatedTotal = 0;
    const orderItemsData: any[] = [];

    for (const item of items) {
      const targetFood = dbFoods.find((f) => f.id === item.foodId);

      if (targetFood) {
        const itemPrice = Number(targetFood.price);
        calculatedTotal += itemPrice * item.quantity;

        // Дараа нь insert хийхэд зориулж бэлдэх
        orderItemsData.push({
          foodId: item.foodId,
          quantity: item.quantity,
          // Хэрэв таны схем дээр foodOrderItem-д тухайн үеийн үнийг
          // хадгалах price багана байгаа бол энд нэмж болно
        });
      }
    }

    // 4. Үндсэн захиалгыг (FoodOrder) үүсгэх
    const newOrder = await db
      .insert(foodOrder)
      .values({
        userId: userId,
        totalPrice: String(calculatedTotal), // Backend дээр бодсон үнэ
        status: "Pending",
        deliveryAddress: items[0]?.deliveryAddress || "",
      })
      .returning();

    const orderId = newOrder[0].id;

    // 5. Захиалгын хоол бүрийг (FoodOrderItem) бүртгэх
    const finalItems = orderItemsData.map((item) => ({
      ...item,
      foodOrderId: orderId,
    }));

    await db.insert(foodOrderItem).values(finalItems);

    return c.json({
      success: true,
      message: "Захиалга амжилттай бүртгэгдлээ",
      totalPrice: calculatedTotal,
      orderId: orderId,
    });
  } catch (err) {
    console.log(err);
    return c.json({ error: "Захиалга тооцоолоход алдаа гарлаа" }, 500);
  }
};
