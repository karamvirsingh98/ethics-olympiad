/* eslint-disable @typescript-eslint/no-explicit-any */

const JWT_EXP_SECONDS = 60 * 60 * 24 * 7; // 7 days

type JwtHeader = { alg: string; typ?: string };

export const sign_jwt = async (input: Record<string, any>) => {
  const header = JSON.stringify({ alg: "HS256", typ: "JWT" });
  const h = Buffer.from(header).toString("base64url");

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + JWT_EXP_SECONDS;

  const payload = JSON.stringify({ ...(input ?? {}), iat, exp });
  const p = Buffer.from(payload).toString("base64url");

  const signature = await hmac(`${h}.${p}`);
  const s = Buffer.from(signature).toString("base64url");

  return [h, p, s].join(".");
};

export const verify_jwt = async (jwt: string) => {
  const [header, payload, signature] = jwt.split(".");
  if (!header || !payload || !signature) return false;

  // Validate header alg
  let parsedHeader: JwtHeader;
  try {
    parsedHeader = JSON.parse(
      Buffer.from(header, "base64url").toString()
    ) as JwtHeader;
  } catch {
    return false;
  }
  if (parsedHeader.alg !== "HS256") return false;

  // Constant-time signature compare
  const expected = Buffer.from(await hmac(`${header}.${payload}`));
  let provided: Buffer;
  try {
    provided = Buffer.from(signature, "base64url");
  } catch {
    return false;
  }
  if (expected.length !== provided.length) return false;
  const { timingSafeEqual } = await import("node:crypto");
  if (!timingSafeEqual(expected, provided)) return false;

  // Validate exp
  let parsedPayload: { exp?: number };
  try {
    parsedPayload = JSON.parse(
      Buffer.from(payload, "base64url").toString()
    ) as { exp?: number };
  } catch {
    return false;
  }
  if (typeof parsedPayload.exp !== "number") return false;
  if (parsedPayload.exp <= Math.floor(Date.now() / 1000)) return false;

  return true;
};

/**
 * HMAC-SHA256 helper. Used by JWT signing and by the Ably auth route
 * (which signs with a different secret). Do NOT use this for password
 * hashing — use scrypt-based helpers in `lib/passwords.ts` instead.
 */
export const hmac = async (input: string, secret?: string) =>
  await crypto.subtle.sign(
    "HMAC",
    await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret ?? process.env.JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      true,
      ["sign"]
    ),
    new TextEncoder().encode(input)
  );
