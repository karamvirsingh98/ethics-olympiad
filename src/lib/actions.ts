import { createSafeActionClient } from "next-safe-action";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import {
  CasesTable,
  EventsTable,
  QuestionsTable,
  ResultsTable,
  TemplatesTable,
  UsersTable,
} from "./schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

const unauthenticated = createSafeActionClient();
const authenticated = createSafeActionClient();

export const LoginAction = unauthenticated
  .schema(createSelectSchema(UsersTable))
  .action(async () => {});

// ==================== CASES ====================
export const CreateCaseAction = authenticated
  .schema(createInsertSchema(CasesTable))
  .action(async ({ parsedInput }) => {
    await db.insert(CasesTable).values(parsedInput);
    revalidatePath("/cases");
  });

export const UpdateCaseAction = authenticated
  .schema(createSelectSchema(CasesTable))
  .action(async ({ parsedInput }) => {
    await db
      .update(CasesTable)
      .set(parsedInput)
      .where(eq(CasesTable.id, parsedInput.id));
    revalidatePath("/cases");
  });

export const DeleteCaseAction = authenticated
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput }) => {
    await db.delete(CasesTable).where(eq(CasesTable.id, parsedInput.id));
    revalidatePath("/cases");
  });

// ==================== QUESTIONS ====================
export const CreateQuestionAction = authenticated
  .schema(createInsertSchema(QuestionsTable))
  .action(async ({ parsedInput }) => {
    await db.insert(QuestionsTable).values(parsedInput);
    revalidatePath("/cases");
  });

export const UpdateQuestionAction = authenticated
  .schema(createSelectSchema(QuestionsTable))
  .action(async ({ parsedInput }) => {
    await db
      .update(QuestionsTable)
      .set(parsedInput)
      .where(eq(QuestionsTable.id, parsedInput.id));
    revalidatePath("/cases");
  });

export const DeleteQuestionAction = authenticated
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput }) => {
    await db
      .delete(QuestionsTable)
      .where(eq(QuestionsTable.id, parsedInput.id));
    revalidatePath("/cases");
  });

// ==================== EVENTS ====================
export const CreateTemplateAction = authenticated
  .schema(createInsertSchema(TemplatesTable, { caseIds: z.array(z.number()) }))
  .action(async ({ parsedInput }) => {
    await db.insert(TemplatesTable).values(parsedInput);
    revalidatePath("/templates");
  });

export const UpdateTemplateAction = authenticated
  .schema(createSelectSchema(TemplatesTable, { caseIds: z.array(z.number()) }))
  .action(async ({ parsedInput }) => {
    await db
      .update(TemplatesTable)
      .set(parsedInput)
      .where(eq(TemplatesTable.id, parsedInput.id));
    revalidatePath("/templates/" + TemplatesTable.id);
  });

export const DeleteTemplateAction = authenticated
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput }) => {
    await db.delete(EventsTable).where(eq(EventsTable.id, parsedInput.id));
    revalidatePath("/templates");
    redirect("/templates");
  });

// ==================== EVENTS ====================
export const CreateEventAction = authenticated
  .schema(
    createInsertSchema(EventsTable, {
      teams: z.array(z.string()),
      timers: z.array(z.number()),
    })
  )
  .action(async ({ parsedInput }) => {
    await db.insert(EventsTable).values(parsedInput);
    revalidatePath("/events");
  });

export const UpdateEventAction = authenticated
  .schema(
    createSelectSchema(EventsTable, {
      teams: z.array(z.string()),
      timers: z.array(z.number()),
    })
  )
  .action(async ({ parsedInput }) => {
    await db
      .update(EventsTable)
      .set(parsedInput)
      .where(eq(EventsTable.id, parsedInput.id));
    revalidatePath("/events");
  });

export const DeleteEventAction = authenticated
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput }) => {
    await db.delete(EventsTable).where(eq(EventsTable.id, parsedInput.id));
    revalidatePath("/events");
  });

// ==================== RESULTS ====================
export const CreateResultAction = authenticated
  .schema(createInsertSchema(ResultsTable))
  .action(async ({ parsedInput }) => {
    await db.insert(ResultsTable).values(parsedInput);
    revalidatePath("/results");
  });

export const UpdateResultAction = authenticated
  .schema(createSelectSchema(ResultsTable))
  .action(async ({ parsedInput }) => {
    await db
      .update(ResultsTable)
      .set(parsedInput)
      .where(eq(ResultsTable.id, parsedInput.id));
    revalidatePath("/results");
  });

export const DeleteResultAction = authenticated
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput }) => {
    await db.delete(ResultsTable).where(eq(ResultsTable.id, parsedInput.id));
    revalidatePath("/results");
  });
