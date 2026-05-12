import { redirect } from "next/navigation";

import { Navbar } from "@/components/navbar";
import { getUserFromCookies } from "@/lib/user";

export default async function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromCookies();
  if (!user) redirect("/login");

  return (
    <div className="flex flex-col h-full">
      <Navbar base="/events" user={user} links={[]} />
      <div className="container mx-auto px-4 py-8 flex-1 min-h-0">
        {children}
      </div>
    </div>
  );
}
