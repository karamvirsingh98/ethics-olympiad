"use server";

import { and, eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "../db";
import { eventsTable, insertEventSchema } from "../schema/events";
import { judgesTable } from "../schema/judges";
import { insertOlympiadSchema, olympiadsTable } from "../schema/olympiads";
import { ActionError, assertOwns, managerActionClient } from ".";

export const UPSERT_OLYMPIAD_ACTION = managerActionClient
  .inputSchema(
    insertOlympiadSchema
      .omit({
        id: true,
        ownerId: true,
        createdAt: true,
        updatedAt: true,
      })
      .extend({ id: z.number().optional() })
  )
  .action(async ({ ctx, parsedInput }) => {
    if (parsedInput.id) {
      await assertOwns(olympiadsTable, parsedInput.id, ctx.user.id);
    }

    const [{ id }] = await db
      .insert(olympiadsTable)
      .values({ ...parsedInput, ownerId: ctx.user.id })
      .onConflictDoUpdate({
        target: olympiadsTable.id,
        set: {
          ...parsedInput,
          ownerId: ctx.user.id,
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
  .action(async ({ ctx, parsedInput }) => {
    const deleted = await db
      .delete(olympiadsTable)
      .where(
        and(
          eq(olympiadsTable.id, parsedInput.id),
          eq(olympiadsTable.ownerId, ctx.user.id)
        )
      )
      .returning({ id: olympiadsTable.id });

    if (deleted.length !== 1) {
      throw new ActionError("Not found or forbidden");
    }

    revalidatePath("/manager/olympiads");
    revalidatePath(`/manager/olympiads/${parsedInput.id}`);

    return redirect("/manager/olympiads");
  });

export const UPSERT_EVENT_ACTION = managerActionClient
  .inputSchema(
    insertEventSchema
      .omit({ id: true, createdAt: true, updatedAt: true })
      .extend({ id: z.number().optional() })
  )
  .action(async ({ ctx, parsedInput }) => {
    await assertOwns(olympiadsTable, parsedInput.olympiadId, ctx.user.id);

    if (parsedInput.id) {
      const [existing] = await db
        .select({ olympiadId: eventsTable.olympiadId })
        .from(eventsTable)
        .where(eq(eventsTable.id, parsedInput.id))
        .limit(1);

      if (!existing) throw new ActionError("Not found");
      if (existing.olympiadId !== parsedInput.olympiadId) {
        throw new ActionError("Forbidden");
      }
    }

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
  .action(async ({ ctx, parsedInput }) => {
    const [event] = await db
      .select({ olympiadId: eventsTable.olympiadId })
      .from(eventsTable)
      .where(eq(eventsTable.id, parsedInput.id))
      .limit(1);

    if (!event) throw new ActionError("Not found");

    await assertOwns(olympiadsTable, event.olympiadId, ctx.user.id);

    await db.delete(eventsTable).where(eq(eventsTable.id, parsedInput.id));

    revalidatePath(`/manager/olympiads/${event.olympiadId}`);
    revalidatePath(`/manager/olympiads/${event.olympiadId}/${parsedInput.id}`);
    revalidatePath(`/events/${parsedInput.id}`);

    return redirect(`/manager/olympiads/${event.olympiadId}`);
  });

export const UPDATE_JUDGE_ACTION = managerActionClient
  .inputSchema(
    z.object({
      eventId: z.number(),
      judgeIds: z.array(z.number()),
      direction: z.enum(["add", "remove"]),
    })
  )
  .action(async ({ ctx, parsedInput }) => {
    const event = await db.query.eventsTable.findFirst({
      where: (table, { eq }) => eq(table.id, parsedInput.eventId),
      with: { olympiad: { columns: { id: true } } },
    });

    if (!event) throw new ActionError("Not found");

    await assertOwns(olympiadsTable, event.olympiadId, ctx.user.id);

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
