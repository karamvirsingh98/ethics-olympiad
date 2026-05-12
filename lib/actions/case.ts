"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";

import { db } from "../db";
import {
  casesTable,
  insertCaseSchema,
  insertQuestionSchema,
  questionsTable,
} from "../schema";
import { ActionError, assertOwns, managerActionClient } from ".";

export const UPSERT_CASE_ACTION = managerActionClient
  .inputSchema(
    z.object({
      case: insertCaseSchema
        .omit({
          id: true,
          ownerId: true,
          createdAt: true,
          updatedAt: true,
        })
        .extend({ id: z.number().optional() }),
      question: insertQuestionSchema
        .omit({
          ownerId: true,
          caseId: true,
          createdAt: true,
          updatedAt: true,
        })
        .extend({ id: z.number().optional() }),
    })
  )
  .action(async ({ ctx, parsedInput }) => {
    if (parsedInput.case.id) {
      await assertOwns(casesTable, parsedInput.case.id, ctx.user.id);
    }

    await db.transaction(async (tx) => {
      const [{ id }] = await tx
        .insert(casesTable)
        .values({ ...parsedInput.case, ownerId: ctx.user.id })
        .onConflictDoUpdate({
          target: casesTable.id,
          set: {
            ...parsedInput.case,
            ownerId: ctx.user.id,
            updatedAt: new Date(),
          },
        })
        .returning({ id: casesTable.id });

      await tx
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
    });

    return revalidatePath("/manager/cases");
  });

export const DELETE_CASE_ACTION = managerActionClient
  .inputSchema(z.object({ id: z.number() }))
  .action(async ({ ctx, parsedInput }) => {
    const deleted = await db
      .delete(casesTable)
      .where(
        and(
          eq(casesTable.id, parsedInput.id),
          eq(casesTable.ownerId, ctx.user.id)
        )
      )
      .returning({ id: casesTable.id });

    if (deleted.length !== 1) {
      throw new ActionError("Not found or forbidden");
    }

    return revalidatePath("/manager/cases");
  });
