import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// 1. Хэрэглэгчдийн хүснэгт
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").unique(),
});

// 2. Постуудын хүснэгт
export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  // Энэ багана нь 'users' хүснэгтийн 'id'-тай холбогдож байна
  userId: integer("userId")
    .notNull()
    .references(() => users.id),
});
