import { relations } from "drizzle-orm";
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { eventsTable } from "./events";
import { usersTable } from "./users";

export const scoresTable = sqliteTable(
  "scores",
  {
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
  },
  (table) => [
    unique("scores_event_judge_team_unique").on(
      table.eventId,
      table.judgeId,
      table.team
    ),
  ]
);

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

export const insertScoreSchema = createInsertSchema(scoresTable);
export const selectScoreSchema = createSelectSchema(scoresTable);

export type InsertScore = typeof scoresTable.$inferInsert;
export type SelectScore = typeof scoresTable.$inferSelect;
