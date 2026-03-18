"use client";

import { DataTable, SortHeader } from "@/components/ui/data-table";
import { SelectUser } from "@/lib/schema";

export const UsersTable = ({ users }: { users: SelectUser[] }) => {
  return (
    <DataTable
      data={users}
      columns={[
        {
          accessorKey: "name",
          header: (h) => <SortHeader column={h.column} title="Name" />,
        },
        {
          accessorKey: "email",
          header: (h) => <SortHeader column={h.column} title="Email" />,
        },
        {
          accessorKey: "role",
          header: (h) => <SortHeader column={h.column} title="Role" />,
        },
        {
          accessorKey: "createdAt",
          header: (h) => <SortHeader column={h.column} title="Created At" />,
          accessorFn: ({ createdAt }) =>
            new Date(createdAt).toLocaleDateString(),
        },
        {
          accessorKey: "updatedAt",
          header: (h) => <SortHeader column={h.column} title="Updated At" />,
          accessorFn: ({ updatedAt }) =>
            new Date(updatedAt).toLocaleDateString(),
        },
      ]}
    />
  );
};
