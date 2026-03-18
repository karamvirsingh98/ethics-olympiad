"use client";

import { Loader2, MinusCircle, PlusCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import { UPSERT_OLYMPIAD_ACTION } from "@/lib/actions/olympiads";
import { SelectCase, SelectOlympiad } from "@/lib/schema";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const OlympiadHeats = ({
  olympiad,
  cases,
}: {
  olympiad: SelectOlympiad;
  cases: SelectCase[];
}) => {
  const { execute, isExecuting } = useAction(UPSERT_OLYMPIAD_ACTION);

  return (
    <Card className="h-fit">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Heats</CardTitle>
        <Button
          size="xs"
          disabled={isExecuting}
          onClick={() => {
            execute({
              ...olympiad,
              heats: [...olympiad.heats, { case1: null, case2: null }],
            });
          }}
        >
          Add Heat
          {isExecuting ? <Loader2 className="animate-spin" /> : <PlusCircle />}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {olympiad.heats.map((heat, heatIndex) => (
          <div
            key={heatIndex}
            className="flex flex-col gap-2 pb-4 border-b last:border-b-0"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium"> Heat {heatIndex + 1}</p>
              <Button
                size="icon-xs"
                variant="destructive"
                onClick={() => {
                  execute({
                    ...olympiad,
                    heats: olympiad.heats.filter((_, j) => j !== heatIndex),
                  });
                }}
              >
                <MinusCircle />
              </Button>
            </div>
            <CaseSelector
              disabled={isExecuting}
              cases={cases}
              value={heat.case1}
              onValueChange={(caseId) => {
                execute({
                  ...olympiad,
                  heats: olympiad.heats.map((heat, i) =>
                    i === heatIndex ? { ...heat, case1: caseId } : heat
                  ),
                });
              }}
            />
            <CaseSelector
              disabled={isExecuting}
              cases={cases}
              value={heat.case2}
              onValueChange={(caseId) => {
                execute({
                  ...olympiad,
                  heats: olympiad.heats.map((heat, i) =>
                    i === heatIndex ? { ...heat, case2: caseId } : heat
                  ),
                });
              }}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const CaseSelector = ({
  cases,
  value,
  onValueChange,
  disabled,
}: {
  cases: SelectCase[];
  value: number | null;
  onValueChange: (caseId: number | null) => void;
  disabled: boolean;
}) => (
  <Select value={value} onValueChange={onValueChange} disabled={disabled}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select a case">
        {cases.find((c) => c.id === value)?.name}
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      {cases.map((caseData) => (
        <SelectItem key={caseData.id} value={caseData.id}>
          {caseData.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
