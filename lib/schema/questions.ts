import { relations } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

import { casesTable } from "./cases";
import { usersTable } from "./users";

export const questionsTable = sqliteTable(
  "questions",
  {
    text: text("text").notNull(),

    caseId: integer("case_id")
      .references(() => casesTable.id, { onDelete: "cascade" })
      .notNull(),

    ownerId: integer("owner_id")
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),

    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(new Date()),

    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .notNull()
      .default(new Date()),
  },
  (table) => [primaryKey({ columns: [table.caseId, table.ownerId] })]
);

export const questionsRelations = relations(questionsTable, ({ one }) => ({
  owner: one(usersTable, {
    fields: [questionsTable.ownerId],
    references: [usersTable.id],
  }),
  case: one(casesTable, {
    fields: [questionsTable.caseId],
    references: [casesTable.id],
  }),
}));

export type InsertQuestion = Omit<
  typeof questionsTable.$inferInsert,
  "ownerId"
>;
export type SelectQuestion = typeof questionsTable.$inferSelect;
