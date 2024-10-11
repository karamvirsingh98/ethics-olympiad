/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

export const sign_jwt = async (input: any) => {
  const header = JSON.stringify({ alg: "HS256", typ: "JWT" });
  const h = Buffer.from(header).toString("base64url");

  const payload = JSON.stringify(input ?? {});
  const p = Buffer.from(payload).toString("base64url");

  const signature = await hash(`${h}.${p}`);
  const s = Buffer.from(signature).toString("base64url");

  return [h, p, s].join(".");
};

export const verify_jwt = async (jwt: string | undefined) => {
  if (!jwt) return false;

  const [header, payload, secret] = jwt.split(".");
  if (!header || !payload || !secret) return false;

  const hashed = await hash(`${header}.${payload}`);
  return Buffer.from(hashed).toString("base64url") === secret;
};

export const parse_jwt_payload = <T>(jwt: string) => {
  const [_, payload, __] = jwt.split(".");
  return JSON.parse(Buffer.from(payload, "base64url").toString()) as T;
};

const hash = async (input: string) =>
  await crypto.subtle.sign(
    "HMAC",
    await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(process.env.JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      true,
      ["sign"]
    ),
    new TextEncoder().encode(input)
  );
