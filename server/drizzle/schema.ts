import { sqliteTable, AnySQLiteColumn, integer, text, foreignKey, uniqueIndex } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const foodCategory = sqliteTable("FoodCategory", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	createdAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
	updatedAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
});

export const foodOrder = sqliteTable("FoodOrder", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	totalPrice: text().notNull(),
	status: text().default("PENDING").notNull(),
	userId: integer().references(() => user.id),
	createdAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
	updatedAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
});

export const foodOrderItem = sqliteTable("FoodOrderItem", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	quantity: integer().notNull(),
	foodId: integer().notNull().references(() => food.id),
	foodOrderId: integer().notNull().references(() => foodOrder.id),
	createdAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
	updatedAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
});

export const user = sqliteTable("User", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	email: text().notNull(),
	password: text().notNull(),
	age: integer(),
	phoneNumber: text().notNull(),
	address: text(),
	role: text().default("USER"),
	isVerified: integer().default(false),
	createdAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
	updatedAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
},
(table) => [
	uniqueIndex("User_email_unique").on(table.email),
]);

export const food = sqliteTable("Food", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	price: text().notNull(),
	foodCategoryId: integer().notNull().references(() => foodCategory.id),
	createdAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
	updatedAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
});

export const newFoodCategory = sqliteTable("__new_FoodCategory", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	createdAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
	updatedAt: text().default("sql`(CURRENT_TIMESTAMP)`"),
});

