"use server";

import { and, eq, inArray } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "../db";
import { eventsTable } from "../schema/events";
import { judgesTable } from "../schema/judges";
import { olympiadsTable } from "../schema/olympiads";
import { managerActionClient } from ".";

export const UPSERT_OLYMPIAD_ACTION = managerActionClient
  .inputSchema(
    createInsertSchema(olympiadsTable)
      .omit({ ownerId: true })
      .extend({ id: z.number().optional() })
  )
  .action(async ({ ctx, parsedInput }) => {
    const [{ id }] = await db
      .insert(olympiadsTable)
      .values({ ...parsedInput, ownerId: ctx.user.id })
      .onConflictDoUpdate({
        target: olympiadsTable.id,
        set: {
          ...parsedInput,
          updatedAt: new Date(),
        },
      })
      .returning({ id: olympiadsTable.id });

    revalidatePath("/manager/olympiads");
    revalidatePath(`/manager/olympiads/${id}`);

    if (!parsedInput.id) return redirect(`/manager/olympiads/${id}`);
  });

export const DELETE_OLYMPIAD_ACTION = managerActionClient
  .inputSchema(z.object({ id: z.number() }))
  .action(async ({ parsedInput }) => {
    await db
      .delete(olympiadsTable)
      .where(eq(olympiadsTable.id, parsedInput.id));

    revalidatePath("/manager/olympiads");
    revalidatePath(`/manager/olympiads/${parsedInput.id}`);

    return redirect("/manager/olympiads");
  });

export const UPSERT_EVENT_ACTION = managerActionClient
  .inputSchema(createInsertSchema(eventsTable))
  .action(async ({ parsedInput }) => {
    const [{ id }] = await db
      .insert(eventsTable)
      .values(parsedInput)
      .onConflictDoUpdate({
        target: eventsTable.id,
        set: {
          ...parsedInput,
          updatedAt: new Date(),
        },
      })
      .returning({ id: eventsTable.id });

    revalidatePath(`/manager/olympiads/${parsedInput.olympiadId}`);
    revalidatePath(`/manager/olympiads/${parsedInput.olympiadId}/${id}`);
    revalidatePath(`/events/${id}`);

    if (!parsedInput.id) {
      return redirect(`/manager/olympiads/${parsedInput.olympiadId}/${id}`);
    }
  });

export const DELETE_EVENT_ACTION = managerActionClient
  .inputSchema(z.object({ id: z.number() }))
  .action(async ({ parsedInput }) => {
    const [{ olympiadId }] = await db
      .delete(eventsTable)
      .where(eq(eventsTable.id, parsedInput.id))
      .returning({ olympiadId: eventsTable.olympiadId });

    revalidatePath(`/manager/olympiads/${olympiadId}`);
    revalidatePath(`/manager/olympiads/${olympiadId}/${parsedInput.id}`);
    revalidatePath(`/events/${parsedInput.id}`);

    return redirect(`/manager/olympiads/${olympiadId}`);
  });

export const UPDATE_JUDGE_ACTION = managerActionClient
  .inputSchema(
    z.object({
      eventId: z.number(),
      judgeIds: z.array(z.number()),
      direction: z.enum(["add", "remove"]),
    })
  )
  .action(async ({ parsedInput }) => {
    const event = await db.query.eventsTable.findFirst({
      where: (table, { eq }) => eq(table.id, parsedInput.eventId),
      with: { olympiad: { columns: { id: true } } },
    });

    if (!event) throw new Error("event not found");

    if (parsedInput.direction === "add") {
      await db.insert(judgesTable).values(
        parsedInput.judgeIds.map((judgeId) => ({
          eventId: parsedInput.eventId,
          judgeId,
        }))
      );
    } else {
      await db
        .delete(judgesTable)
        .where(
          and(
            eq(judgesTable.eventId, parsedInput.eventId),
            inArray(judgesTable.judgeId, parsedInput.judgeIds)
          )
        );
    }

    revalidatePath(
      `/manager/olympiads/${event.olympiadId}/${parsedInput.eventId}`
    );
    revalidatePath(`/events/${parsedInput.eventId}`);
  });
