import { parseTokenFromCookies } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  try {
    const { role } = parseTokenFromCookies();
    if (role !== "Admin") throw new Error("user is not admin");
    return <>{children}</>;
  } catch {
    redirect("/login");
  }
}
