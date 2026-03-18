import { createSafeActionClient } from "next-safe-action";

import { UserRole } from "../enums";
import { getUserFromCookies } from "../user";

export const baseActionClient = createSafeActionClient();

export const authentictedActionClient = baseActionClient.use(
  async ({ ctx, next }) => {
    const user = await getUserFromCookies();
    if (!user) throw new Error("Unauthorized");
    return next({ ctx: { ...ctx, user } });
  }
);

const createRoleBasedActionClient = (role: UserRole) =>
  authentictedActionClient.use(async ({ ctx, next }) => {
    if (ctx.user.role !== role) throw new Error("Invalid Role");
    return next({ ctx });
  });

export const adminActionClient = createRoleBasedActionClient("admin");
export const managerActionClient = createRoleBasedActionClient("manager");
export const judgeActionClient = createRoleBasedActionClient("judge");
