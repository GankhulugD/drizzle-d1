import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./db/schema";

type Bindings = {
  my_db: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// 2. Categories read
app.get("/categories", async (c) => {
  const db = drizzle(c.env.my_db, { schema });
  const result = await db.query.foodCategory.findMany();

  return c.json(result, 201);
});

// 2. Categories creat
app.post("/categories", async (c) => {
  const db = drizzle(c.env.my_db, { schema });
  const body = await c.req.json();
  const result = await db
    .insert(schema.foodCategory)
    .values({
      name: body.name,
    })
    .returning();
  return c.json(result, 201);
});

// 1. Foods read
app.get("/foods", async (c) => {
  const db = drizzle(c.env.my_db, { schema });
  const result = await db.query.food.findMany({
    with: {
      category: true,
    },
  });
  return c.json(result);
});

// Foods creat
app.post("/foods", async (c) => {
  const db = drizzle(c.env.my_db, { schema });
  const body = await c.req.json();
  const result = await db
    .insert(schema.food)
    .values({
      name: body.name,
      price: body.price,
      foodCategoryId: body.categoryId,
    })
    .returning();
  return c.json(result, 201);
});

export default app;
