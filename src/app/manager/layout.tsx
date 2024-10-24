import { LoginManager } from "@/components/login/login-manager";
import { parseTokenFromCookies } from "@/lib/server-utils";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  try {
    const { role } = parseTokenFromCookies();
    if (role !== "Manager") throw new Error("user is not manager");
    return <>{children}</>;
  } catch {
    return (
      <div className="h-[50vh] grid place-items-center">
        <LoginManager />
      </div>
    );
  }
}
