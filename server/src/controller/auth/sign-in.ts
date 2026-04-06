import { compare } from "bcryptjs";
import { sign } from "hono/jwt";
import { eq } from "drizzle-orm";
import { users } from "../../db/schema";
import { AppContext } from "../../types";
import { drizzleProvider } from "../../provider";

const SECRET = "xK9#mP2$nQ8@vL5&wR3jH7!cF4*bN6^qT1";

export const signIn = async (c: AppContext) => {
  const db = await drizzleProvider(c.env.new_food_delivery);
  const { email, password } = await c.req.json();

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) return c.json({ error: "Хэрэглэгч олдсонгүй" }, 401);

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) return c.json({ error: "Нууц үг буруу байна" }, 401);

  const payload = {
    sub: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  };

  const token = await sign(payload, SECRET, "HS256");

  c.header(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}; SameSite=Strict`,
  );

  return c.json({
    message: "Амжилттай нэвтэрлээ",
    user: { id: user.id, email: user.email },
  });
};
