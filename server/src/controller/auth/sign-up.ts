import { hash } from "bcryptjs";
import { users } from "../../db/schema";
import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";

export const signUp = async (c: AppContext) => {
  const db = await drizzleProvider(c.env.new_food_delivery);

  const { email, password, phoneNumber, address } = await c.req.json();

  const hashedPassword = await hash(password, 10);

  try {
    const newUser = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        phoneNumber,
        address: address || "",
        isVerified: false,
      })
      .returning();

    console.log("newUser: ", newUser);

    const { password: _, ...userWithoutPassword } = newUser[0];

    return c.json({
      message: "Амжилттай бүртгүүллээ",
      user: userWithoutPassword,
    });
  } catch (e) {
    console.log(e);
    return c.json(
      {
        error: e,
      },
      400,
    );
  }
};
