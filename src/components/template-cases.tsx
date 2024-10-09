"use client";

import { zOlympiadHeats } from "@/lib/entities";
import { CasesTable } from "@/lib/schema";
import { InferSelectModel } from "drizzle-orm";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useAction } from "next-safe-action/hooks";
import { UpdateTemplateAction } from "@/lib/actions";

export const TemplateCases = ({
  templateId,
  heats,
  cases,
}: {
  templateId: number;
  heats: zOlympiadHeats;
  cases: InferSelectModel<typeof CasesTable>[];
}) => {
  const { execute, isPending } = useAction(UpdateTemplateAction);

  return (
    <div className="p-4 border rounded-md flex flex-col gap-8 h-fit w-[500px] shrink-0">
      <div className="flex items-center justify-between">
        <p className="text-3xl font-bold mb-4">Cases</p>
        <div className="flex gap-4">
          <Button
            onClick={() =>
              execute({
                id: templateId,
                heats: [...heats, { case1: 0, case2: 0 }],
              })
            }
          >
            Add Heat
          </Button>
        </div>
      </div>
      {heats.map((heat, i) => {
        return (
          <div
            key={heat.case1 + "-" + heat.case2}
            className="flex flex-col gap-4 p-4 border rounded-md"
          >
            <p className="text-lg">Heat {i + 1}</p>
            <CaseSelector
              cases={cases}
              selected={heat.case1}
              onSelect={(case1) => {
                const updated = [...heats];
                updated[i].case1 = case1;
                execute({ id: templateId, heats });
              }}
              disabled={isPending}
            />
            <CaseSelector
              cases={cases}
              selected={heat.case2}
              onSelect={(case2) => {
                const updated = [...heats];
                updated[i].case2 = case2;
                execute({ id: templateId, heats });
              }}
              disabled={isPending}
            />
          </div>
        );
      })}
    </div>
  );
};

const CaseSelector = ({
  cases,
  selected,
  onSelect,
  disabled,
}: {
  cases: InferSelectModel<typeof CasesTable>[];
  selected: number;
  onSelect: (id: number) => void;
  disabled: boolean;
}) => (
  <Select
    value={selected.toString()}
    onValueChange={(id) => onSelect(Number(id))}
    disabled={disabled}
  >
    <SelectTrigger>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {cases.map((c) => (
        <SelectItem key={c.id} value={c.id.toString()}>
          {c.title}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
