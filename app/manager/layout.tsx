import { redirect } from "next/navigation";

import { Navbar } from "@/components/navbar";
import { getUserFromCookies } from "@/lib/user";

export default async function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromCookies();
  if (!user) redirect("/login");
  if (user.role === "judge") redirect("/events");

  return (
    <>
      <Navbar
        base="/manager"
        user={user}
        links={[
          { label: "Home", href: "/manager" },
          { label: "Olympiads", href: "/manager/olympiads" },
          { label: "Cases", href: "/manager/cases" },
        ]}
      />
      <div className="container mx-auto px-4 py-8">{children}</div>
    </>
  );
}
