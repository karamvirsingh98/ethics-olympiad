"use server";

import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { revalidatePath } from "next/cache";
import z from "zod";

import { db } from "../db";
import { casesTable, questionsTable } from "../schema";
import { managerActionClient } from ".";

export const UPSERT_CASE_ACTION = managerActionClient
  .inputSchema(
    z.object({
      case: createInsertSchema(casesTable)
        .omit({ ownerId: true })
        .extend({ id: z.number().optional() }),
      question: createInsertSchema(questionsTable)
        .omit({
          ownerId: true,
          caseId: true,
        })
        .extend({ id: z.number().optional() }),
    })
  )
  .action(async ({ ctx, parsedInput }) => {
    const [{ id }] = await db
      .insert(casesTable)
      .values({ ...parsedInput.case, ownerId: ctx.user.id })
      .onConflictDoUpdate({
        target: casesTable.id,
        set: {
          ...parsedInput.case,
          updatedAt: new Date(),
        },
      })
      .returning({ id: casesTable.id });

    await db
      .insert(questionsTable)
      .values({
        ...parsedInput.question,
        caseId: id,
        ownerId: ctx.user.id,
      })
      .onConflictDoUpdate({
        target: [questionsTable.caseId, questionsTable.ownerId],
        set: {
          ...parsedInput.question,
          updatedAt: new Date(),
        },
      });

    return revalidatePath("/manager/cases");
  });

export const DELETE_CASE_ACTION = managerActionClient
  .inputSchema(z.object({ id: z.number() }))
  .action(async ({ parsedInput }) => {
    await db.delete(casesTable).where(eq(casesTable.id, parsedInput.id));
    return revalidatePath("/manager/cases");
  });
