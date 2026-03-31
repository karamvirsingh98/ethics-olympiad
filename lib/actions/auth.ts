"use server";

import { createInsertSchema } from "drizzle-zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

import { db } from "../db";
import { hmac, sign_jwt } from "../jwt";
import { passwordsTable } from "../schema/passwords";
import { usersTable } from "../schema/users";
import { baseActionClient } from ".";

export const LOGIN_ACTION = baseActionClient
  .inputSchema(z.object({ email: z.string(), password: z.string() }))
  .action(async ({ parsedInput }) => {
    const user = await db.query.usersTable.findFirst({
      where: (table, { eq }) => eq(table.email, parsedInput.email),
      with: { password: true },
    });
    if (!user) throw new Error("User not found");

    const hash = Buffer.from(await hmac(parsedInput.password)).toString("hex");
    if (user.password.hash !== hash) throw new Error("Invalid password");

    const jwt = await sign_jwt({ id: user.id });
    (await cookies()).set("jwt", jwt);

    return redirect("/");
  });

export const SIGNUP_ACTION = baseActionClient
  .inputSchema(createInsertSchema(usersTable).extend({ password: z.string() }))
  .action(async ({ parsedInput }) => {
    const { password, ...input } = parsedInput;

    const [user] = await db.insert(usersTable).values(input).returning();

    const hash = Buffer.from(await hmac(password)).toString("hex");

    await db.insert(passwordsTable).values({ userId: user.id, hash });

    const jwt = await sign_jwt({ id: user.id });
    (await cookies()).set("jwt", jwt);

    return redirect("/");
  });

export const LOGOUT_ACTION = baseActionClient.action(async () => {
  (await cookies()).delete("jwt");
  return redirect("/login");
});
