import { compare } from "bcryptjs";
import { sign } from "hono/jwt";
import { eq } from "drizzle-orm";
import { users } from "../../db/schema";
import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";

export const signIn = async (c: AppContext) => {
  const db = await drizzleProvider(c.env.new_food_delivery);
  const { email, password } = await c.req.json();

  // 1. Хэрэглэгчийг имэйлээр нь хайх
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    return c.json({ error: "Хэрэглэгч олдсонгүй" }, 401);
  }

  // 2. Нууц үг шалгах
  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    return c.json({ error: "Нууц үг буруу байна" }, 401);
  }

  // 3. JWT Token үүсгэх (Нууц түлхүүр: 'your-secret-key')
  // Бодит төсөл дээр үүнийг wrangler.jsonc доторх Environment Variable-д хадгалах хэрэгтэй
  const payload = {
    sub: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 цаг хүчинтэй
  };

  const token = await sign(payload, "your-secret-key");

  return c.json({
    message: "Амжилттай нэвтэрлээ",
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  });
};
