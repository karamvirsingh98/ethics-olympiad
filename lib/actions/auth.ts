"use server";

import { createInsertSchema } from "drizzle-zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

import { db } from "../db";
import { sign_jwt } from "../jwt";
import {
  DUMMY_PASSWORD_HASH,
  hash_password,
  verify_password,
} from "../passwords";
import { passwordsTable } from "../schema/passwords";
import { usersTable } from "../schema/users";
import { baseActionClient } from ".";

const JWT_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

export const LOGIN_ACTION = baseActionClient
  .inputSchema(z.object({ email: z.string(), password: z.string() }))
  .action(async ({ parsedInput }) => {
    const user = await db.query.usersTable.findFirst({
      where: (table, { eq }) => eq(table.email, parsedInput.email),
      with: { password: true },
    });

    // Always run scrypt — even on missing user — so response time doesn't
    // leak whether the email exists.
    const storedHash = user?.password?.hash ?? DUMMY_PASSWORD_HASH;
    const ok = await verify_password(parsedInput.password, storedHash);

    if (!user || !ok) throw new Error("Invalid credentials");

    const jwt = await sign_jwt({ id: user.id });
    (await cookies()).set("jwt", jwt, JWT_COOKIE_OPTIONS);

    return redirect("/");
  });

export const SIGNUP_ACTION = baseActionClient
  .inputSchema(
    createInsertSchema(usersTable)
      .omit({ id: true, role: true, createdAt: true, updatedAt: true })
      .extend({ password: z.string() })
  )
  .action(async ({ parsedInput }) => {
    const { password, ...input } = parsedInput;

    const [user] = await db
      .insert(usersTable)
      .values({ ...input, role: "manager" })
      .returning();

    const hash = await hash_password(password);

    await db.insert(passwordsTable).values({ userId: user.id, hash });

    const jwt = await sign_jwt({ id: user.id });
    (await cookies()).set("jwt", jwt, JWT_COOKIE_OPTIONS);

    return redirect("/");
  });

export const LOGOUT_ACTION = baseActionClient.action(async () => {
  (await cookies()).delete({ name: "jwt", path: "/" });
  return redirect("/login");
});
