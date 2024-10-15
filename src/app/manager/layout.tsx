import { LoginManager } from "@/components/login/login-manager";
import { verify_jwt } from "@/lib/jwt";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const token = cookies().get("auth-token")?.value;
  const authenticated = await verify_jwt(token);

  if (!authenticated)
    return (
      <div className="h-[50vh] grid place-items-center">
        <LoginManager />
      </div>
    );

  return <>{children}</>;
}
