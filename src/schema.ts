import { integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const contacts = sqliteTable("table", {
  id: integer("id").primaryKey({ autoIncrement: true }),
});
