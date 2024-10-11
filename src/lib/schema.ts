import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  zOlympiadHeats,
  zOlympiadLevel,
  zOlympiadScore,
  zUserRole,
} from "./entities";

// Users
export const UsersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: zUserRole.options }).default("Manager"),
});

// Cases
export const CasesTable = sqliteTable("cases", {
  id: integer("id").primaryKey(),
  userId: integer("userId").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  level: text("level", { enum: zOlympiadLevel.options }).notNull(),
});

// Questions
export const QuestionsTable = sqliteTable("questions", {
  id: integer("id").primaryKey(),
  userId: integer("userId").notNull(),
  caseId: integer("caseId").notNull(),
  text: text("text").notNull(),
});

//  Templates
export const TemplatesTable = sqliteTable("templates", {
  id: integer("id").primaryKey(),
  userId: integer("userId").notNull(),
  title: text("title").notNull(),
  heats: text("heats", { mode: "json" }).$type<zOlympiadHeats>().notNull(),
  level: text("level", { enum: zOlympiadLevel.options }).notNull(),
});

// Events
export const EventsTable = sqliteTable("events", {
  id: integer("id").primaryKey(),
  templateId: integer("templateId").notNull(),
  title: text("title").notNull(),
  password: text("password").notNull(),
  teams: text("teams", { mode: "json" }).$type<string[]>().notNull(),
  timers: text("timers", { mode: "json" }).$type<number[]>().notNull(),
});

// Judge Results
export const ResultsTable = sqliteTable("results", {
  id: integer("id").primaryKey(),
  eventId: integer("eventId").notNull(),
  heat: integer("heat").notNull(),
  judge: text("judge").notNull(),
  team: text("team").notNull(),
  honorable: integer("honorable", { mode: "boolean" }).notNull(),
  score: text("score", { mode: "json" }).$type<zOlympiadScore>().notNull(),
});
