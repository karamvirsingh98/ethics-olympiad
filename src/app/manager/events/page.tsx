import { NewTemplate } from "@/components/template/new-template";
import { db } from "@/lib/db";
import { parse_jwt_payload } from "@/lib/jwt";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ManagerEventsPage() {
  const token = cookies().get("auth-token")?.value;
  if (!token) redirect("/");
  const { userId } = parse_jwt_payload<{ userId: number }>(token);

  const templates = await db.query.TemplatesTable.findMany({
    where: (table, { eq }) => eq(table.userId, userId),
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold">Templates</h1>
        <NewTemplate />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {templates.map((t) => (
          <Link
            key={t.id}
            href={"/manager/events/" + t.id}
            className="p-4 border rounded-md hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all"
          >
            <p className="text-lg font-semibold mb-4">{t.title}</p>
            <p className="text-sm text-muted-foreground">{t.level} Level</p>
            <p className="text-sm text-muted-foreground">
              {t.heats.length} Heats
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
