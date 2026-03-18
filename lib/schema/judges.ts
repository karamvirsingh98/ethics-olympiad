import { relations } from "drizzle-orm";
import { integer, primaryKey, sqliteTable } from "drizzle-orm/sqlite-core";

import { eventsTable } from "./events";
import { usersTable } from "./users";

export const judgesTable = sqliteTable(
  "judges",
  {
    eventId: integer("event_id")
      .references(() => eventsTable.id, { onDelete: "cascade" })
      .notNull(),

    judgeId: integer("judge_id")
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),

    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(new Date()),
  },
  (table) => [primaryKey({ columns: [table.eventId, table.judgeId] })]
);

export const judgesRelations = relations(judgesTable, ({ one }) => ({
  event: one(eventsTable, {
    fields: [judgesTable.eventId],
    references: [eventsTable.id],
  }),
  judge: one(usersTable, {
    fields: [judgesTable.judgeId],
    references: [usersTable.id],
  }),
}));

export type SelectJudge = typeof judgesTable.$inferSelect;
export type InsertJudge = typeof judgesTable.$inferInsert;
