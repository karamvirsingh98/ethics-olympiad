import { RoleSelector } from "@/components/role-selector";
import { SendInvitation } from "@/components/send-invitation";
import { db } from "@/lib/db";
import { zUserRole } from "@/lib/entities";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function AdminPage({
  searchParams: { role },
}: {
  searchParams: { role?: zUserRole };
}) {
  const users = await db.query.UsersTable.findMany({
    where: (table, { not, and, eq }) =>
      and(
        not(eq(table.role, "Admin")),
        role ? eq(table.role, role) : undefined
      ),
  });

  const invites = await db.query.InvitationsTable.findMany({
    where: (table, { eq }) => (role ? eq(table.role, role) : undefined),
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold">User Management</h1>
        <div className="flex gap-4">
          <Suspense key={role}>
            <RoleSelector
              value={role}
              onChange={async (role) => {
                "use server";
                redirect(`/admin${role !== "All" ? `?role=${role}` : ""}`);
              }}
              showAll
            />
          </Suspense>
          <SendInvitation />
        </div>
      </div>
      {!!invites.length && (
        <div>
          <p className="px-2 text-xl text-muted-foreground mb-2">
            Pending Invitations
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {invites.map((invite) => (
              <div key={invite.id} className="p-4 border rounded-md">
                <p className="mb-4">{invite.email}</p>
                <p className="text-sm text-muted-foreground">{invite.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <p className="px-2 text-xl text-muted-foreground mb-2">All Users</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="p-4 border rounded-md">
              <p className="mb-4">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground">{user.role}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
