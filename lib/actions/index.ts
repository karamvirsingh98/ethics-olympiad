import { eq } from "drizzle-orm";
import type { SQLiteColumn, SQLiteTable } from "drizzle-orm/sqlite-core";
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";

import { db } from "../db";
import { UserRole } from "../enums";
import { getUserFromCookies } from "../user";

export class ActionError extends Error {}

export const baseActionClient = createSafeActionClient({
  handleServerError: (e) => {
    console.error(e);
    return e instanceof ActionError ? e.message : DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

export const authenticatedActionClient = baseActionClient.use(
  async ({ ctx, next }) => {
    const user = await getUserFromCookies();
    if (!user) throw new Error("Unauthorized");
    return next({ ctx: { ...ctx, user } });
  }
);

const createRoleBasedActionClient = (role: UserRole) =>
  authenticatedActionClient.use(async ({ ctx, next }) => {
    if (ctx.user.role !== role) throw new Error("Invalid Role");
    return next({ ctx });
  });

export const adminActionClient = createRoleBasedActionClient("admin");
export const managerActionClient = createRoleBasedActionClient("manager");
export const judgeActionClient = createRoleBasedActionClient("judge");

// Ownership assertion helper: throws ActionError when a row is missing
// or owned by a different user. Use before any mutation that should be
// gated by ownership of an `ownerId`-bearing table.
export async function assertOwns<
  T extends SQLiteTable & { id: SQLiteColumn; ownerId: SQLiteColumn },
>(table: T, rowId: number, userId: number): Promise<void> {
  const [row] = await db
    .select({ ownerId: table.ownerId })
    .from(table)
    .where(eq(table.id, rowId))
    .limit(1);

  if (!row) throw new ActionError("Not found");
  if (row.ownerId !== userId) throw new ActionError("Forbidden");
}
