import { relations, sql } from "drizzle-orm";
import { check, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { userRoles } from "../enums";
import { casesTable } from "./cases";
import { judgesTable } from "./judges";
import { olympiadsTable } from "./olympiads";
import { passwordsTable } from "./passwords";
import { questionsTable } from "./questions";
import { scoresTable } from "./scores";

export const usersTable = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),

    email: text("email").unique().notNull(),

    name: text("name").notNull(),

    role: text("role", { enum: userRoles }).notNull(),

    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(new Date()),

    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .notNull()
      .default(new Date()),
  },
  (table) => [
    check(
      "users_role_check",
      sql`${table.role} IN (${sql.join(
        userRoles.map((r) => sql`${r}`),
        sql`, `
      )})`
    ),
  ]
);

export const usersRelations = relations(usersTable, ({ one, many }) => ({
  password: one(passwordsTable, {
    fields: [usersTable.id],
    references: [passwordsTable.userId],
  }),
  cases: many(casesTable),
  questions: many(questionsTable),
  judges: many(judgesTable),
  olympiads: many(olympiadsTable),
  scores: many(scoresTable),
}));

export const insertUserSchema = createInsertSchema(usersTable);
export const selectUserSchema = createSelectSchema(usersTable);

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
