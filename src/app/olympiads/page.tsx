import { db } from "@/lib/db";
import Link from "next/link";

export default async function OlympiadsPage() {
  const olympiads = await db.query.EventsTable.findMany();

  return (
    <>
      <h1 className="text-5xl font-bold">Olympiads</h1>
      <div className="grid gap-4">
        {olympiads.map((olympiad) => (
          <Link
            key={olympiad.id}
            href={`/olympiads/${olympiad.id}`}
            className="p-4 border rounded-md"
          >
            {olympiad.title}
          </Link>
        ))}
      </div>
    </>
  );
}
