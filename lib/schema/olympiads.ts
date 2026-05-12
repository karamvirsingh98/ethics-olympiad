import { relations, sql } from "drizzle-orm";
import { check, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { olympiadLevels } from "../enums";
import { eventsTable } from "./events";
import { usersTable } from "./users";

export type OlympiadHeat = {
  case1: number | null;
  case2: number | null;
};

export const olympiadsTable = sqliteTable(
  "olympiads",
  {
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
  },
  (table) => [
    check(
      "olympiads_level_check",
      sql`${table.level} IN (${sql.join(
        olympiadLevels.map((l) => sql`${l}`),
        sql`, `
      )})`
    ),
  ]
);

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

export const insertOlympiadSchema = createInsertSchema(olympiadsTable);
export const selectOlympiadSchema = createSelectSchema(olympiadsTable);

export type InsertOlympiad = Omit<
  typeof olympiadsTable.$inferInsert,
  "ownerId"
>;
export type SelectOlympiad = typeof olympiadsTable.$inferSelect;
