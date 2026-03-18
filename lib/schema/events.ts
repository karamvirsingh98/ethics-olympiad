import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { judgesTable } from "./judges";
import { olympiadsTable } from "./olympiads";
import { scoresTable } from "./scores";

export const eventsTable = sqliteTable("events", {
  id: integer("id").primaryKey(),

  name: text("name").notNull(),

  teams: text("teams", { mode: "json" }).notNull().$type<string[]>(),

  happensAt: integer("happens_at", { mode: "timestamp_ms" }).notNull(),

  olympiadId: integer("olympiad_id")
    .references(() => olympiadsTable.id, { onDelete: "cascade" })
    .notNull(),

  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date()),

  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date()),
});

export const eventsRelations = relations(eventsTable, ({ one, many }) => ({
  olympiad: one(olympiadsTable, {
    fields: [eventsTable.olympiadId],
    references: [olympiadsTable.id],
  }),
  judges: many(judgesTable),
  scores: many(scoresTable),
}));

export type InsertEvent = typeof eventsTable.$inferInsert;
export type SelectEvent = typeof eventsTable.$inferSelect;
