"use server";

import { createInsertSchema } from "drizzle-zod";
import { redirect } from "next/navigation";
import z from "zod";

import { db } from "../db";
import { scoresTable } from "../schema/scores";
import { judgeActionClient } from ".";

export const SUBMIT_SCORES_ACTION = judgeActionClient
  .inputSchema(z.array(createInsertSchema(scoresTable).omit({ judgeId: true })))
  .action(async ({ ctx, parsedInput }) => {
    await db.insert(scoresTable).values(
      parsedInput.map((score) => ({
        ...score,
        judgeId: ctx.user.id,
      }))
    );
    return redirect(`/events/${parsedInput[0].eventId}`);
  });
