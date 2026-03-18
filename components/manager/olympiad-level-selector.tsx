"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OlympiadLevel, olympiadLevels } from "@/lib/enums";

const levelOptions: { label: string; value: OlympiadLevel | null }[] =
  olympiadLevels.map((level) => ({
    label: level.charAt(0).toUpperCase() + level.slice(1),
    value: level,
  }));

export const OlympiadLevelSelector = ({
  level,
  onChange,
  disabled,
  allowAll,
}: {
  level: OlympiadLevel | null;
  onChange: (level: OlympiadLevel | null) => void;
  disabled?: boolean;
  allowAll?: boolean;
}) => {
  return (
    <Select
      value={level}
      onValueChange={onChange}
      items={levelOptions}
      disabled={disabled}
    >
      <SelectTrigger className="w-48">
        <SelectValue
          placeholder={allowAll ? "Filter by level" : "Select a level"}
        />
      </SelectTrigger>
      <SelectContent>
        {allowAll && <SelectItem value={null}>All Levels</SelectItem>}
        {levelOptions.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const RoutedOlympiadLevelSelector = () => {
  const router = useRouter();
  const path = usePathname();
  const level = useSearchParams().get("level") as OlympiadLevel | undefined;

  return (
    <OlympiadLevelSelector
      allowAll
      level={level || null}
      onChange={(level) => {
        if (level === null) router.push(path);
        else router.push(`${path}?level=${level}`);
      }}
    />
  );
};
