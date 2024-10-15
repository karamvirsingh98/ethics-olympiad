import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import {
  zOlympiadHeats,
  zOlympiadLevel,
  zOlympiadScore,
  zUserRole,
} from "./entities";
import { relations } from "drizzle-orm";

// Users
export const UsersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: zUserRole.options }).default("Manager"),
  createdAt: integer({ mode: "timestamp_ms" }).default(new Date()).notNull(),
});

export const UserRelations = relations(UsersTable, ({ many }) => ({
  cases: many(CasesTable),
  questions: many(QuestionsTable),
  events: many(EventsTable),
  templates: many(TemplatesTable),
}));

// Cases
export const CasesTable = sqliteTable("cases", {
  id: integer("id").primaryKey(),
  userId: integer("userId").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  level: text("level", { enum: zOlympiadLevel.options }).notNull(),
  createdAt: integer({ mode: "timestamp_ms" }).default(new Date()).notNull(),
  published: integer("published", { mode: "boolean" }).default(false).notNull(),
});

export const CasesRelations = relations(CasesTable, ({ one, many }) => ({
  questions: many(QuestionsTable),
  user: one(UsersTable, {
    fields: [CasesTable.userId],
    references: [UsersTable.id],
  }),
}));

// Questions
export const QuestionsTable = sqliteTable(
  "questions",
  {
    // id: integer("id").primaryKey(),
    userId: integer("userId").notNull(),
    caseId: integer("caseId").notNull(),
    text: text("text").notNull(),
  },
  (table) => ({ pk: primaryKey({ columns: [table.userId, table.caseId] }) })
);

export const QuestionsRelations = relations(QuestionsTable, ({ one }) => ({
  case: one(CasesTable, {
    fields: [QuestionsTable.caseId],
    references: [CasesTable.id],
  }),
  user: one(UsersTable, {
    fields: [QuestionsTable.userId],
    references: [UsersTable.id],
  }),
}));

//  Templates
export const TemplatesTable = sqliteTable("templates", {
  id: integer("id").primaryKey(),
  userId: integer("userId").notNull(),
  title: text("title").notNull(),
  heats: text("heats", { mode: "json" }).$type<zOlympiadHeats>().notNull(),
  level: text("level", { enum: zOlympiadLevel.options }).notNull(),
  createdAt: integer({ mode: "timestamp_ms" }).default(new Date()).notNull(),
});

export const TemplateRelations = relations(TemplatesTable, ({ one, many }) => ({
  events: many(EventsTable),
  user: one(UsersTable, {
    fields: [TemplatesTable.userId],
    references: [UsersTable.id],
  }),
}));

// Events
export const EventsTable = sqliteTable("events", {
  id: integer("id").primaryKey(),
  templateId: integer("templateId").notNull(),
  date: integer("date", { mode: "timestamp_ms" }).notNull(),
  title: text("title").notNull(),
  password: text("password").notNull(),
  teams: text("teams", { mode: "json" }).$type<string[]>().notNull(),
  timers: text("timers", { mode: "json" }).$type<number[]>().notNull(),
  createdAt: integer({ mode: "timestamp_ms" }).default(new Date()).notNull(),
});

export const EventsRelations = relations(EventsTable, ({ one, many }) => ({
  results: many(ResultsTable),
  template: one(TemplatesTable, {
    fields: [EventsTable.templateId],
    references: [TemplatesTable.id],
  }),
}));

// Judge Results
export const ResultsTable = sqliteTable("results", {
  id: integer("id").primaryKey(),
  eventId: integer("eventId").notNull(),
  heat: integer("heat").notNull(),
  judge: text("judge").notNull(),
  team: text("team").notNull(),
  honorable: integer("honorable", { mode: "boolean" }).notNull(),
  score: text("score", { mode: "json" }).$type<zOlympiadScore>().notNull(),
  createdAt: integer({ mode: "timestamp_ms" }).default(new Date()).notNull(),
});

export const ResultsRelations = relations(ResultsTable, ({ one }) => ({
  event: one(EventsTable, {
    fields: [ResultsTable.eventId],
    references: [EventsTable.id],
  }),
}));
