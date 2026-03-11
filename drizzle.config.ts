import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts", // Саяны үүсгэсэн файл
  out: "./drizzle", // Migration файлууд хадгалагдах газар
  dialect: "sqlite",
  driver: "d1-http",
});
