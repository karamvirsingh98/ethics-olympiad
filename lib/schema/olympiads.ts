import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { olympiadLevels } from "../enums";
import { eventsTable } from "./events";
import { usersTable } from "./users";

export type OlympiadHeat = {
  case1: number | null;
  case2: number | null;
};

export const olympiadsTable = sqliteTable("olympiads", {
  id: integer("id").primaryKey(),

  name: text("name").notNull(),

  level: text("level", { enum: olympiadLevels }).notNull(),

  heats: text("heats", { mode: "json" }).notNull().$type<OlympiadHeat[]>(),

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

export const olympiadsRelations = relations(
  olympiadsTable,
  ({ many, one }) => ({
    owner: one(usersTable, {
      fields: [olympiadsTable.ownerId],
      references: [usersTable.id],
    }),
    events: many(eventsTable),
  })
);

export type InsertOlympiad = Omit<
  typeof olympiadsTable.$inferInsert,
  "ownerId"
>;
export type SelectOlympiad = typeof olympiadsTable.$inferSelect;
