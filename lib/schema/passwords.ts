import { relations } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

import { usersTable } from "./users";

export const passwordsTable = sqliteTable(
  "passwords",
  {
    userId: integer("user_id")
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),

    hash: text("hash").notNull(),

    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(new Date()),

    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .notNull()
      .default(new Date()),
  },
  (table) => [primaryKey({ columns: [table.userId] })]
);

export const passwordsRelations = relations(passwordsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [passwordsTable.userId],
    references: [usersTable.id],
  }),
}));

export type InsertPassword = typeof passwordsTable.$inferInsert;
export type SelectPassword = typeof passwordsTable.$inferSelect;
