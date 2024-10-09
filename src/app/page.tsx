import { db } from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const templates = await db.query.TemplatesTable.findMany();
  const olympiads = await db.query.EventsTable.findMany();

  return (
    <>
      <h1 className="text-5xl font-bold">
        Welcome to the Ethics Olympiad app!
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {olympiads.map((olympiad) => {
          const template = templates.find((t) => t.id === olympiad.templateId);
          return (
            <Link
              key={olympiad.id}
              href={`/olympiads/${olympiad.id}`}
              className="p-4 border rounded-md"
            >
              <p className="mb-4 text-lg font-bold">{olympiad.title}</p>
              <p className="text-sm text-muted-foreground">{template?.title}</p>
              <p className="text-sm text-muted-foreground">
                {template?.level} Level
              </p>
            </Link>
          );
        })}
      </div>
    </>
  );
}
