import { cookies } from "next/headers";
import { cache } from "react";

import { db } from "./db";
import { verify_jwt } from "./jwt";

const parse_jwt_payload = <T>(jwt: string) => {
  const [, payload] = jwt.split(".");
  return JSON.parse(Buffer.from(payload, "base64url").toString()) as T;
};

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
