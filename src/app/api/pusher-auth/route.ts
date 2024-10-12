import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data = await req.formData();

  const socket_id = data.get("socket_id")?.toString();
  const channel_name = data.get("channel_name")?.toString();

  const hash = await crypto.subtle.sign(
    "HMAC",
    await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(process.env.PUSHER_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      true,
      ["sign"]
    ),
    new TextEncoder().encode(`${socket_id}:${channel_name}`)
  );

  const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
  const signature = Buffer.from(hash).toString("hex");

  return NextResponse.json({ auth: `${key}:${signature}` });
};
