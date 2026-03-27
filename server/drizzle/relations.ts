import { relations } from "drizzle-orm/relations";
import { user, foodOrder, foodOrderItem, food, foodCategory } from "./schema";

export const foodOrderRelations = relations(foodOrder, ({one, many}) => ({
	user: one(user, {
		fields: [foodOrder.userId],
		references: [user.id]
	}),
	foodOrderItems: many(foodOrderItem),
}));

export const userRelations = relations(user, ({many}) => ({
	foodOrders: many(foodOrder),
}));

export const foodOrderItemRelations = relations(foodOrderItem, ({one}) => ({
	foodOrder: one(foodOrder, {
		fields: [foodOrderItem.foodOrderId],
		references: [foodOrder.id]
	}),
	food: one(food, {
		fields: [foodOrderItem.foodId],
		references: [food.id]
	}),
}));

export const foodRelations = relations(food, ({one, many}) => ({
	foodOrderItems: many(foodOrderItem),
	foodCategory: one(foodCategory, {
		fields: [food.foodCategoryId],
		references: [foodCategory.id]
	}),
}));

export const foodCategoryRelations = relations(foodCategory, ({many}) => ({
	foods: many(food),
}));