import { NextResponse } from "next/server";

import { hmac } from "@/lib/jwt";
import { getUserFromCookies } from "@/lib/user";

export const GET = async () => {
  const user = await getUserFromCookies();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.ABLY_API_KEY;
  if (!apiKey) {
    throw new Error("ABLY_API_KEY is not configured");
  }

  const token = await sign_ably_jwt({
    apiKey,
    clientId: user.id.toString(),
    expiresInSeconds: 3600,
  });

  return NextResponse.json({ token });
};

export type SignAblyJwtOptions = {
  /** Ably API key in format "key_name:key_secret" */
  apiKey: string;
  /** Trusted client ID  */
  clientId: string;
  /** JSON string for capabilities, e.g. '{"*":["*"]}' for full access */
  capability?: string;
  /** Token TTL in seconds (default: 3600) */
  expiresInSeconds?: number;
};

/**
 * Creates an Ably-compliant JWT per https://ably.com/docs/auth/token/jwt
 * Header: typ, alg, kid (API key name)
 * Claims: iat, exp, x-ably-capability, x-ably-clientId
 */
export const sign_ably_jwt = async (options: SignAblyJwtOptions) => {
  const [kid, keySecret] = options.apiKey.split(":");
  if (!kid || !keySecret) {
    throw new Error(
      "Invalid Ably API key format (expected key_name:key_secret)"
    );
  }

  const currentTime = Math.round(Date.now() / 1000);
  const expiresIn = options.expiresInSeconds ?? 3600;

  const header = JSON.stringify({ typ: "JWT", alg: "HS256", kid });
  const h = Buffer.from(header).toString("base64url");

  const claims: Record<string, string | number> = {
    iat: currentTime,
    exp: currentTime + expiresIn,
    "x-ably-capability": options.capability ?? '{"*":["*"]}',
  };
  if (options.clientId) {
    claims["x-ably-clientId"] = options.clientId;
  }

  const payload = JSON.stringify(claims);
  const p = Buffer.from(payload).toString("base64url");

  const signature = await hmac(`${h}.${p}`, keySecret);
  const s = Buffer.from(signature).toString("base64url");

  return [h, p, s].join(".");
};
