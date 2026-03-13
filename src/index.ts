import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { users } from "./db/schema";

// type
type Bindings = {
  my_db: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// Read
app.get("/users", async (c) => {
  const db = drizzle(c.env.my_db);
  const all = await db.select().from(users);
  return c.json(all);
});

//Create
app.post("/users", async (c) => {
  const db = drizzle(c.env.my_db);

  const body = await c.req.json();

  const result = await db
    .insert(users)
    .values({
      name: body.name,
      email: body.email,
    })
    .returning();

  return c.json(result, 201); //
});

export default app;
