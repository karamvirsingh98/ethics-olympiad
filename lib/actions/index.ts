import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";

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
