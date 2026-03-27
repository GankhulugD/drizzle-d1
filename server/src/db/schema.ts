import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

// --- TABLES ---

enum Role {
  ADMIN,
  USER,
}

export const users = sqliteTable("User", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  phoneNumber: text("phoneNumber").notNull(),
  address: text("address"),
  role: text("role").$type<Role>().default(Role.USER),
  isVerified: integer("isVerified", { mode: "boolean" }).default(false),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt").default(sql`CURRENT_TIMESTAMP`),
});

export const foodCategory = sqliteTable("FoodCategory", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt").default(sql`CURRENT_TIMESTAMP`),
});

export const food = sqliteTable("Food", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  price: text("price").notNull(),
  foodCategoryId: integer("foodCategoryId")
    .notNull()
    .references(() => foodCategory.id),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt").default(sql`CURRENT_TIMESTAMP`),
});

export const foodOrder = sqliteTable("FoodOrder", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  totalPrice: text("totalPrice").notNull(),
  status: text("status").notNull().default("PENDING"),
  userId: integer("userId").references(() => users.id),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt").default(sql`CURRENT_TIMESTAMP`),
});

export const foodOrderItem = sqliteTable("FoodOrderItem", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  quantity: integer("quantity").notNull(),
  foodId: integer("foodId")
    .notNull()
    .references(() => food.id),
  foodOrderId: integer("foodOrderId")
    .notNull()
    .references(() => foodOrder.id),
  createdAt: text("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updatedAt").default(sql`CURRENT_TIMESTAMP`),
});

// --- RELATIONS ---

export const foodRelations = relations(food, ({ one, many }) => ({
  category: one(foodCategory, {
    fields: [food.foodCategoryId],
    references: [foodCategory.id],
  }),
  orderItems: many(foodOrderItem),
}));

export const foodCategoryRelations = relations(foodCategory, ({ many }) => ({
  foods: many(food),
}));

export const foodOrderRelations = relations(foodOrder, ({ many }) => ({
  foodOrderItems: many(foodOrderItem),
}));

export const foodOrderItemRelations = relations(foodOrderItem, ({ one }) => ({
  food: one(food, {
    fields: [foodOrderItem.foodId],
    references: [food.id],
  }),
  order: one(foodOrder, {
    fields: [foodOrderItem.foodOrderId],
    references: [foodOrder.id],
  }),
}));
