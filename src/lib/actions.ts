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
import { zJudgeUpdate, zOlympiadHeats, zOlympiadScore } from "./entities";
import Pusher from "pusher";
import { cookies } from "next/headers";
import { parse_jwt_payload, sign_jwt, verify_jwt } from "./jwt";

const unauthenticated_action_builder = createSafeActionClient();
const authenticated_action_builder = unauthenticated_action_builder.use(
  async ({ next }) => {
    const token = cookies().get("auth-token")?.value;
    if (!token) throw new Error();

    const verified = await verify_jwt(token);
    if (!verified) throw new Error();

    const { userId } = parse_jwt_payload<{ userId: number }>(token);

    return next({ ctx: { userId } });
  }
);

const PusherSender = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  secret: process.env.PUSHER_SECRET,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
});

// ==================== AUTH ====================
export const CreateUserAction = unauthenticated_action_builder
  .schema(createInsertSchema(UsersTable))
  .action(async ({ parsedInput }) => {
    const [{ id }] = await db
      .insert(UsersTable)
      .values(parsedInput)
      .returning();

    cookies().set("auth-token", await sign_jwt({ userId: id }));

    redirect("/manager");
  });

export const LoginManagerAction = unauthenticated_action_builder
  .schema(createSelectSchema(UsersTable).pick({ email: true, password: true }))
  .action(async ({ parsedInput: { email, password } }) => {
    const user = await db.query.UsersTable.findFirst({
      where: (table, { eq }) => eq(table.email, email),
    });

    if (!user) throw new Error("user not found");
    if (user.password !== password) throw new Error("incorrect password");

    cookies().set("auth-token", await sign_jwt({ userId: user.id }));
    redirect("/manager");
  });

export const LogoutManagerAction = unauthenticated_action_builder.action(
  async () => {
    cookies().delete("auth-token");
    redirect("/");
  }
);

export const LoginJudgeAction = unauthenticated_action_builder
  .schema(
    z.object({ eventId: z.number(), name: z.string(), password: z.string() })
  )
  .action(async ({ parsedInput: { eventId, name, password } }) => {
    const event = await db.query.EventsTable.findFirst({
      where: (table, { eq }) => eq(table.id, eventId),
    });

    if (!event || event.password !== password) throw new Error();

    const stored = cookies().get("authenticated-events")?.value || "[]";
    const parsed = JSON.parse(stored) as number[];

    cookies().set("judge-name", name);
    cookies().set("authenticated-events", JSON.stringify([...parsed, eventId]));

    redirect(`/olympiads/${eventId}`);
  });

// ==================== CASES ====================
export const AddOrUpdateCaseAction = authenticated_action_builder
  .schema(createInsertSchema(CasesTable).omit({ userId: true }))
  .outputSchema(z.object({ id: z.number() }))
  .action(async ({ parsedInput, ctx: { userId } }) => {
    const [{ id }] = await db
      .insert(CasesTable)
      .values({ ...parsedInput, userId })
      .onConflictDoUpdate({
        target: CasesTable.id,
        set: { content: parsedInput.content, title: parsedInput.title },
      })
      .returning();
    revalidatePath("/manager/cases");
    return { id };
  });

// export const DeleteCaseAction = authenticated_action_builder
//   .schema(z.object({ id: z.number() }))
//   .action(async ({ parsedInput, ctx: { userId } }) => {
//     const c = await db.query.CasesTable.findFirst({
//       where: (table, { eq }) => eq(table.id, parsedInput.id),
//     });
//     if (c?.userId !== userId) throw new Error("not allowed");
//     await db.delete(CasesTable).where(eq(CasesTable.id, parsedInput.id));
//     revalidatePath("/manager/cases");
//   });

// ==================== QUESTIONS ====================
export const AddOrUpdateQuestion = authenticated_action_builder
  .schema(createInsertSchema(QuestionsTable).omit({ userId: true }))
  .action(async ({ parsedInput, ctx: { userId } }) => {
    await db
      .insert(QuestionsTable)
      .values({ ...parsedInput, userId })
      .onConflictDoUpdate({
        target: QuestionsTable.id,
        set: { text: parsedInput.text },
      });
    revalidatePath("/manager/cases");
  });

// ==================== TEMPLATES ====================
export const CreateTemplateAction = authenticated_action_builder
  .schema(
    createInsertSchema(TemplatesTable, { heats: zOlympiadHeats }).omit({
      userId: true,
    })
  )
  .action(async ({ parsedInput, ctx: { userId } }) => {
    await db.insert(TemplatesTable).values({ ...parsedInput, userId });
    revalidatePath("/manager/events");
  });

export const UpdateTemplateAction = authenticated_action_builder
  .schema(
    createSelectSchema(TemplatesTable, { heats: zOlympiadHeats })
      .partial()
      .required({ id: true })
  )
  .action(async ({ parsedInput, ctx: { userId } }) => {
    const template = await db.query.TemplatesTable.findFirst({
      where: (table, { eq }) => eq(table.id, parsedInput.id),
    });

    if (template?.userId !== userId) throw new Error("not allowed");

    await db
      .update(TemplatesTable)
      .set(parsedInput)
      .where(eq(TemplatesTable.id, parsedInput.id));
    revalidatePath("/manager/events");
  });

// export const DeleteTemplateAction = authenticated_action_builder
//   .schema(z.object({ id: z.number() }))
//   .action(async ({ parsedInput }) => {
//     await db.delete(EventsTable).where(eq(EventsTable.id, parsedInput.id));
//     revalidatePath("/manager/events");
//     redirect("/templates");
//   });

// ==================== EVENTS ====================
export const CreateEventAction = authenticated_action_builder
  .schema(
    createInsertSchema(EventsTable, {
      teams: z.array(z.string()),
      timers: z.array(z.number()),
    })
  )
  .action(async ({ parsedInput }) => {
    await db.insert(EventsTable).values(parsedInput);
    revalidatePath(`/manager/events`);
  });

export const UpdateEventAction = authenticated_action_builder
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
    revalidatePath(`/manager/events`);
  });

// export const DeleteEventAction = authenticated_action_builder
//   .schema(z.object({ id: z.number() }))
//   .action(async ({ parsedInput }) => {
//     await db.delete(EventsTable).where(eq(EventsTable.id, parsedInput.id));
//     revalidatePath("/manager/events");
//   });

// ==================== RESULTS ====================
export const SubmitResultsAction = unauthenticated_action_builder
  .schema(z.array(createInsertSchema(ResultsTable, { score: zOlympiadScore })))
  .action(async ({ parsedInput }) => {
    const judge = cookies().get("judge-name")?.value;
    if (!judge) throw new Error("judge not found");

    const values = parsedInput.map((p) => ({ ...p, judge }));
    await db.insert(ResultsTable).values(values);

    const { eventId } = parsedInput[0];
    await PusherSender.trigger(
      "ethics-olympiad",
      `event-${eventId}-score-submission`,
      judge
    );

    revalidatePath("/olympiads");
  });

// export const DeleteResultAction = authenticated_action_builder
//   .schema(z.object({ id: z.number() }))
//   .action(async ({ parsedInput }) => {
//     await db.delete(ResultsTable).where(eq(ResultsTable.id, parsedInput.id));
//     revalidatePath("/results");
//   });

// ==================== PUSHER ====================
export const SendJudgeUpdateAction = unauthenticated_action_builder
  .schema(zJudgeUpdate.omit({ judge: true }).extend({ eventId: z.number() }))
  .action(async ({ parsedInput: { eventId, ...data } }) => {
    const judge = cookies().get("judge-name")?.value;
    if (!judge) return;
    await PusherSender.trigger(
      "ethics-olympiad",
      `event-${eventId}-judge-update`,
      { ...data, judge }
    );
  });
