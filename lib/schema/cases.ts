import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { olympiadLevels } from "../enums";
import { questionsTable } from "./questions";
import { usersTable } from "./users";

export const casesTable = sqliteTable("cases", {
  id: integer("id").primaryKey(),

  name: text("name").notNull(),

  bodytext: text("bodytext").notNull(),

  level: text("level", { enum: olympiadLevels }).notNull(),

  isVideo: integer("video", { mode: "boolean" }).notNull().default(false),

  isPublic: integer("public", { mode: "boolean" }).notNull().default(false),

  ownerId: integer("owner_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),

  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date()),

  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date()),
});

export const casesRelations = relations(casesTable, ({ one, many }) => ({
  owner: one(usersTable, {
    fields: [casesTable.ownerId],
    references: [usersTable.id],
  }),
  questions: many(questionsTable),
}));

export type InsertCase = Omit<typeof casesTable.$inferInsert, "ownerId">;
export type SelectCase = typeof casesTable.$inferSelect;
