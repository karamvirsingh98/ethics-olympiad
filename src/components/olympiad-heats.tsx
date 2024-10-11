import { zOlympiadHeats } from "@/lib/entities";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  StarIcon,
  CaretRightIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { InferSelectModel } from "drizzle-orm";
import { CasesTable, ResultsTable } from "@/lib/schema";

export const OlympaidHeats = ({
  olympiadId,
  heats,
  cases,
  results,
}: {
  olympiadId: number;
  heats: zOlympiadHeats;
  cases: InferSelectModel<typeof CasesTable>[];
  results: InferSelectModel<typeof ResultsTable>[];
}) => (
  <div className="flex gap-4">
    {heats.map((heat, i) => {
      const scored = results.some((r) => r.heat === i + 1);
      return (
        <div key={i} className="p-4 border rounded-md flex flex-col gap-2 ">
          <p className="text-xl font-semibold mb-4">Heat {i + 1}</p>
          <div className="w-96 overflow-ellipsis line-clamp-1">
            Case 1: {cases.find((c) => c.id === heat.case1)?.title}
          </div>
          <div className="w-96 overflow-ellipsis line-clamp-1">
            Case 2: {cases.find((c) => c.id === heat.case2)?.title}
          </div>
          <div className="mt-4 flex gap-4 justify-end">
            <Link
              href={`/olympiads/${olympiadId}?heat=${i + 1}&round=3`}
              className={cn(scored && "pointer-events-none cursor-not-allowed")}
            >
              <Button variant="outline" disabled={scored}>
                {scored ? "Scores Submitted" : "Submit Scores"}
                {scored ? (
                  <StarFilledIcon className="w-4 ml-4 text-yellow-500" />
                ) : (
                  <StarIcon className="w-4 ml-4" />
                )}
              </Button>
            </Link>
            <Link href={`/olympiads/${olympiadId}?heat=${i + 1}&round=1`}>
              <Button>
                Start <CaretRightIcon className="w-4 ml-4" />
              </Button>
            </Link>
          </div>
        </div>
      );
    })}
  </div>
);
