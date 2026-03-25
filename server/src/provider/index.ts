import { drizzle } from "drizzle-orm/d1";
import * as foodSchema from "../db/schema";

export const drizzleProvider = async (d1: D1Database) => {
  return drizzle(d1, { schema: foodSchema });
};
