import { verify } from "hono/jwt";
import { Next } from "hono";
import { AppContext } from "../types";

const SECRET = "xK9#mP2$nQ8@vL5&wR3jH7!cF4*bN6^qT1";

export const authMiddleware = async (c: AppContext, next: Next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = (await verify(token, SECRET, "HS256")) as {
      sub: number;
      email: string;
      exp: number;
    };
    c.set("user", payload);
    await next();
  } catch {
    return c.json({ error: "Invalid or expired token" }, 401);
  }
};
