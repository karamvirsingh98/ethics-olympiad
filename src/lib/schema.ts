import {
  integer,
  //   primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

// Users
export const UsersTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: text("role", { enum: ["Admin", "Manager"] }).default("Manager"),
});

// Cases
export const CasesTable = sqliteTable("cases", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
});

// Questions
export const QuestionsTable = sqliteTable("questions", {
  id: integer("id").primaryKey(),
  caseId: integer("caseId").notNull(),
  userId: integer("userId").notNull(),
  text: text("text").notNull(),
});

//  Templates
export const TemplatesTable = sqliteTable("templates", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  caseIds: text("caseIds", { mode: "json" }).$type<number[]>().notNull(),
});

// export const TemplateCasesTable = sqliteTable(
//   "template-cases",
//   {
//     tempalteId: integer("templateId").notNull(),
//     caseId: integer("caseId").notNull(),
//   },
//   (table) => ({ pk: primaryKey({ columns: [table.tempalteId, table.caseId] }) })
// );

// Events
export const EventsTable = sqliteTable("events", {
  id: integer("id").primaryKey(),
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
  total: integer("total").notNull(),
});
