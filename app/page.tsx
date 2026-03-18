import { redirect } from "next/navigation";

import { UsersTable } from "@/components/admin/users-table";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { getUserFromCookies } from "@/lib/user";

export default async function Page() {
  const user = await getUserFromCookies();
  if (!user) return redirect("/login");

  if (user.role === "manager") return redirect("/manager");
  if (user.role === "judge") return redirect("/events");

  const users = await db.query.usersTable.findMany();

  return (
    <div className="flex flex-col h-full">
      <Navbar base="/" links={[]} />
      <div className="container mx-auto px-4 py-8 flex-1 min-h-0">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <UsersTable users={users} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
