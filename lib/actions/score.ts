"use server";

import { and, eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import z from "zod";

import { db } from "../db";
import { eventsTable } from "../schema/events";
import { judgesTable } from "../schema/judges";
import { insertScoreSchema, scoresTable } from "../schema/scores";
import { ActionError, judgeActionClient } from ".";

const scoreRowSchema = insertScoreSchema.omit({
  id: true,
  judgeId: true,
  createdAt: true,
  updatedAt: true,
});

// Build `excluded."<col>"` references for ON CONFLICT DO UPDATE so each
// conflicting row pulls its replacement values from the row we tried to
// insert (rather than every conflict resolving to the same static set).
const excluded = (column: string) => sql.raw(`excluded."${column}"`);

export const SUBMIT_SCORES_ACTION = judgeActionClient
  .inputSchema(z.array(scoreRowSchema))
  .action(async ({ ctx, parsedInput }) => {
    if (parsedInput.length === 0) {
      throw new ActionError("No scores to submit");
    }

    const eventId = parsedInput[0].eventId;

    // All rows must belong to the same event.
    if (parsedInput.some((row) => row.eventId !== eventId)) {
      throw new ActionError("All scores must belong to the same event");
    }

    // Caller must be assigned as a judge for this event.
    const [assignment] = await db
      .select({ eventId: judgesTable.eventId })
      .from(judgesTable)
      .where(
        and(
          eq(judgesTable.eventId, eventId),
          eq(judgesTable.judgeId, ctx.user.id)
        )
      )
      .limit(1);

    if (!assignment) {
      throw new ActionError("Not assigned to this event");
    }

    // Validate every team is part of the event's teams list.
    const [event] = await db
      .select({ teams: eventsTable.teams })
      .from(eventsTable)
      .where(eq(eventsTable.id, eventId))
      .limit(1);

    if (!event) throw new ActionError("Event not found");

    const validTeams = new Set(event.teams);
    if (parsedInput.some((row) => !validTeams.has(row.team))) {
      throw new ActionError("Invalid team");
    }

    // Hard-code judgeId from auth context; never trust input.
    await db
      .insert(scoresTable)
      .values(
        parsedInput.map((score) => ({
          ...score,
          judgeId: ctx.user.id,
        }))
      )
      .onConflictDoUpdate({
        target: [scoresTable.eventId, scoresTable.judgeId, scoresTable.team],
        set: {
          clarity: excluded("clarity"),
          centrality: excluded("centrality"),
          thoughtfulness: excluded("thoughtfulness"),
          response: excluded("response"),
          judgeqa: excluded("judgeqa"),
          commentary: excluded("commentary"),
          respectfulness: excluded("respectfulness"),
          honorable: excluded("honorable"),
          updatedAt: new Date(),
        },
      });

    return redirect(`/events/${eventId}`);
  });
