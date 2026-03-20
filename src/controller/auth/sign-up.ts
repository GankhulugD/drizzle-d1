import { hash } from "bcryptjs";
import { users } from "../../db/schema";
import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";

export const signUp = async (c: AppContext) => {
  const db = await drizzleProvider(c.env.my_db);
  const { email, password, phoneNumber, age, address, role } =
    await c.req.json();

  const hashedPassword = await hash(password, 10);

  try {
    const newUser = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        phoneNumber,
        age: age ? Number(age) : null,
        address: address || "",
        role: role || "USER",
        isVerified: false,
      })
      .returning();

    const { password: _, ...userWithoutPassword } = newUser[0];

    return c.json({
      message: "Амжилттай бүртгүүллээ",
      user: userWithoutPassword,
    });
  } catch (e) {
    console.log(e);
    return c.json(
      {
        error: "Алдаа гарлаа.",
      },
      400,
    );
  }
};
