import { redirect } from "next/navigation";
import { Suspense, use } from "react";

import { EmbeddedVideo } from "@/components/embedded-video";
import {
  CaseDialog,
  DeleteCaseDialog,
} from "@/components/manager/case-dialogs";
import { RoutedOlympiadLevelSelector } from "@/components/manager/olympiad-level-selector";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { OlympiadLevel } from "@/lib/enums";
import { SelectCase, SelectQuestion } from "@/lib/schema";
import { getUserFromCookies } from "@/lib/user";

export default async function CasesPage({
  searchParams,
}: {
  searchParams: Promise<{ level: OlympiadLevel }>;
}) {
  const { level } = await searchParams;

  const user = await getUserFromCookies();
  if (!user) return redirect("/login");

  const cases = db.query.casesTable.findMany({
    where: (table, { eq, and }) =>
      and(
        eq(table.ownerId, user.id),
        level ? eq(table.level, level) : undefined
      ),
    with: {
      questions: { where: (table, { eq }) => eq(table.ownerId, user.id) },
    },
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Cases</h1>
        <div className="flex items-center gap-4">
          <RoutedOlympiadLevelSelector />
          <CaseDialog />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <Suspense
          key={level}
          fallback={Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-96" />
          ))}
        >
          <CaseList cases={cases} />
        </Suspense>
      </div>
    </>
  );
}

const CaseList = ({
  cases,
}: {
  cases: Promise<(SelectCase & { questions: SelectQuestion[] })[]>;
}) =>
  use(cases).map((caseData) => (
    <Card key={caseData.id}>
      <CardHeader>
        <CardTitle className="line-clamp-1">{caseData.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {caseData.isVideo ? (
          <EmbeddedVideo url={caseData.bodytext} />
        ) : (
          <CardDescription className="aspect-video line-clamp-12 whitespace-pre-line">
            {caseData.bodytext}
          </CardDescription>
        )}
      </CardContent>
      <CardFooter className="mt-4 grid grid-cols-2 gap-4">
        <DeleteCaseDialog caseData={caseData} />
        <CaseDialog caseData={caseData} />
      </CardFooter>
    </Card>
  ));
