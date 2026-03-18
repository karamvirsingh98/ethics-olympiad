import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { eventsTable } from "./events";
import { usersTable } from "./users";

export const scoresTable = sqliteTable("scores", {
  id: integer("id").primaryKey(),

  eventId: integer("event_id")
    .references(() => eventsTable.id, { onDelete: "cascade" })
    .notNull(),

  judgeId: integer("judge_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),

  team: text("team").notNull(),

  clarity: integer("clarity").notNull(),

  centrality: integer("centrality").notNull(),

  thoughtfulness: integer("thoughtfulness").notNull(),

  response: integer("response").notNull(),

  judgeqa: integer("judgeqa").notNull(),

  commentary: integer("commentary").notNull(),

  respectfulness: integer("respectfulness").notNull(),

  honorable: integer("honorable", { mode: "boolean" }).notNull(),

  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date()),

  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .default(new Date()),
});

export const scoresRelations = relations(scoresTable, ({ one }) => ({
  judge: one(usersTable, {
    fields: [scoresTable.judgeId],
    references: [usersTable.id],
  }),
  event: one(eventsTable, {
    fields: [scoresTable.eventId],
    references: [eventsTable.id],
  }),
}));

export type InsertScore = typeof scoresTable.$inferInsert;
export type SelectScore = typeof scoresTable.$inferSelect;
