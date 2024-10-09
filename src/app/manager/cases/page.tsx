import { LevelSelector } from "@/components/level-selector";
import { NewCase } from "@/components/new-case";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/db";
import { zOlympiadLevel } from "@/lib/entities";
import { redirect } from "next/navigation";

export default async function CasesPage({
  searchParams: { level },
}: {
  searchParams: { level?: zOlympiadLevel };
}) {
  const cases = await db.query.CasesTable.findMany({
    where: (table, { eq }) => (level ? eq(table.level, level) : undefined),
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold">Cases</h1>
        <div className="flex gap-4">
          <NewCase />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {cases.map((c) => (
          <Dialog key={c.id}>
            <DialogTrigger className="p-4 border rounded-md flex flex-col items-start justify-between gap-4">
              <div className="text-lg font-bold text-start">{c.title}</div>
              <p className="text-sm text-muted-foreground">{c.level} Level</p>
            </DialogTrigger>
            <DialogContent className="max-w-[60vw]">
              <DialogHeader>
                <DialogTitle>Case Details</DialogTitle>
              </DialogHeader>
              <div className="py-8 flex flex-col gap-4">
                <p className="px-2 text-2xl">{c.title}</p>
                <div className="p-2 pl-4 border rounded-md bg-border/50">
                  <Textarea
                    className="text-lg h-[40vh] overflow-y-scroll border-none p-0 pr-4"
                    defaultValue={c.content}
                  />
                </div>

                <div>
                  <p className="pl-2 text-muted-foreground">Question: </p>
                  <Input />
                </div>
              </div>
              <DialogFooter>
                <Button>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </>
  );
}
