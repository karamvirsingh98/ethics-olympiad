"use server";

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
import { zOlympiadHeats, zOlympiadScore } from "./entities";

const unauthenticated = createSafeActionClient();
const authenticated = createSafeActionClient();

// ==================== AUTH ====================

export const CreateUserAction = unauthenticated
  .schema(createInsertSchema(UsersTable))
  .action(async ({ parsedInput }) => {
    await db.insert(UsersTable).values(parsedInput);
    // sign some jwt and add it to cookies
    redirect("/manager");
  });

export const LoginAction = unauthenticated
  .schema(createSelectSchema(UsersTable).pick({ email: true, password: true }))
  .action(async ({ parsedInput: { email, password } }) => {
    const user = await db.query.UsersTable.findFirst({
      where: (table, { eq }) => eq(table.email, email),
    });

    if (!user) throw new Error("user not found");
    if (user.password !== password) throw new Error("incorrect password");

    // sign some jwt

    redirect("/manager");
  });

// ==================== CASES ====================

export const AddOrUpdateCaseAction = authenticated
  .schema(createInsertSchema(CasesTable))
  .action(async ({ parsedInput }) => {
    await db
      .insert(CasesTable)
      .values(parsedInput)
      .onConflictDoUpdate({
        target: CasesTable.id,
        set: { content: parsedInput.content },
      });
    revalidatePath("/cases");
  });

export const DeleteCaseAction = authenticated
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput }) => {
    await db.delete(CasesTable).where(eq(CasesTable.id, parsedInput.id));
    revalidatePath("/cases");
  });

// ==================== QUESTIONS ====================

export const AddOrUpdateQuestion = authenticated
  .schema(createInsertSchema(QuestionsTable))
  .action(async ({ parsedInput }) => {
    await db
      .insert(QuestionsTable)
      .values(parsedInput)
      .onConflictDoUpdate({
        target: QuestionsTable.id,
        set: { text: parsedInput.text },
      });
    revalidatePath("/cases");
  });

// ==================== TEMPLATES ====================
export const CreateTemplateAction = authenticated
  .schema(createInsertSchema(TemplatesTable, { heats: zOlympiadHeats }))
  .action(async ({ parsedInput }) => {
    await db.insert(TemplatesTable).values(parsedInput);
    revalidatePath("/templates");
  });

export const UpdateTemplateAction = authenticated
  .schema(
    createSelectSchema(TemplatesTable, { heats: zOlympiadHeats })
      .partial()
      .required({ id: true })
  )
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
      .partial()
      .required({ id: true })
  )
  .action(async ({ parsedInput }) => {
    await db
      .update(EventsTable)
      .set(parsedInput)
      .where(eq(EventsTable.id, parsedInput.id));
    revalidatePath("/manager/events");
  });

export const DeleteEventAction = authenticated
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput }) => {
    await db.delete(EventsTable).where(eq(EventsTable.id, parsedInput.id));
    revalidatePath("/events");
  });

// ==================== RESULTS ====================
export const SubmitResultsAction = authenticated
  .schema(z.array(createInsertSchema(ResultsTable, { score: zOlympiadScore })))
  .action(async ({ parsedInput }) => {
    await db.insert(ResultsTable).values(parsedInput);
    revalidatePath("/olympiads");
  });

// export const UpdateResultAction = authenticated
//   .schema(createSelectSchema(ResultsTable))
//   .action(async ({ parsedInput }) => {
//     await db
//       .update(ResultsTable)
//       .set(parsedInput)
//       .where(eq(ResultsTable.id, parsedInput.id));
//     revalidatePath("/results");
//   });

export const DeleteResultAction = authenticated
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput }) => {
    await db.delete(ResultsTable).where(eq(ResultsTable.id, parsedInput.id));
    revalidatePath("/results");
  });
