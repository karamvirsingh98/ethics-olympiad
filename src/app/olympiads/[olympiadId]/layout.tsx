import { LoginJudge } from "@/components/login-judge";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default async function OlympiadLayout({
  children,
  params: { olympiadId },
}: {
  children: ReactNode;
  params: { olympiadId: string };
}) {
  try {
    const stored = cookies().get("authenticated-events")?.value;
    if (!stored) throw new Error();

    const parsed = JSON.parse(stored) as number[];
    if (!parsed.includes(Number(olympiadId))) throw new Error();

    return <>{children}</>;
  } catch {
    return (
      <div className="h-[50vh] grid place-items-center">
        <LoginJudge eventId={Number(olympiadId)} />
      </div>
    );
  }
}
