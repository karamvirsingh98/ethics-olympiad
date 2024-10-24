import { cookies } from "next/headers";
import { zUserRole } from "./entities";
import { parse_jwt_payload, sign_jwt, verify_jwt } from "./jwt";

export const parseTokenFromCookies = () => {
  const token = cookies().get("auth-token")?.value;
  if (!token) throw new Error("no token found");

  const verified = verify_jwt(token);
  if (!verified) throw new Error("token not verified");

  return parse_jwt_payload<{ userId: number; role: zUserRole }>(token);
};

export const signJwtAndSetCookie = async (userId: number, role: zUserRole) => {
  const token = await sign_jwt({ userId, role });
  cookies().set("auth-token", token);
};
