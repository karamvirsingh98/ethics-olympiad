import { db } from "@/lib/db";
import { parseTokenFromCookies } from "@/lib/server-utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  try {
    parseTokenFromCookies();
    redirect("/manager");
  } catch {}

  const olympiads = await db.query.EventsTable.findMany({
    columns: { id: true, title: true },
    with: { template: { columns: { title: true, level: true } } },
  });

  return (
    <>
      <h1 className="px-4 text-5xl font-bold">
        Welcome to the Ethics Olympiad App!
      </h1>
      <div className="grid lg:grid-cols-3 gap-4">
        {olympiads.map((olympiad) => (
          <Link
            key={olympiad.id}
            href={`/olympiads/${olympiad.id}`}
            className="p-4 border rounded-md hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all"
          >
            <p className="mb-4 text-lg font-bold">{olympiad.title}</p>
            <p className="text-sm text-muted-foreground">
              {olympiad.template.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {olympiad.template.level} Level
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
