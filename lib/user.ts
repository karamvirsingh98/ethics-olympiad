import { cookies } from "next/headers";
import { cache } from "react";

import { db } from "./db";
import { parse_jwt_payload, verify_jwt } from "./jwt";

export const getUserFromCookies = cache(async () => {
  const jwt = (await cookies()).get("jwt")?.value;

  if (!jwt) return null;

  if (!(await verify_jwt(jwt))) return null;

  const { id } = parse_jwt_payload<{ id: number }>(jwt);

  const user = await db.query.usersTable.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  });

  return user;
});
