"use server";

import { createInsertSchema } from "drizzle-zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

import { db } from "../db";
import { scoresTable } from "../schema/scores";
import { ActionError, judgeActionClient } from ".";

export const SUBMIT_SCORES_ACTION = judgeActionClient
  .inputSchema(z.array(createInsertSchema(scoresTable).omit({ judgeId: true })))
  .action(async ({ ctx, parsedInput }) => {
    if (parsedInput.length === 0) {
      throw new ActionError("No scores submitted");
    }

    const eventId = parsedInput[0].eventId;

    const event = await db.query.eventsTable.findFirst({
      where: (table, { eq }) => eq(table.id, eventId),
      columns: { id: true, olympiadId: true },
    });

    if (!event) throw new ActionError("Event not found");

    await db.insert(scoresTable).values(
      parsedInput.map((score) => ({
        ...score,
        judgeId: ctx.user.id,
      }))
    );

    revalidatePath(`/manager/olympiads/${event.olympiadId}/${event.id}`);
    revalidatePath(`/events/${event.id}`);

    return redirect(`/events/${event.id}`);
  });
