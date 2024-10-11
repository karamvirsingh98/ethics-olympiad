import { zOlympiadLevel } from "@/lib/entities";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function LevelSelector<W = false>({
  value,
  showAll,
  onChange,
}: {
  value: zOlympiadLevel | undefined;
  showAll?: W;
  onChange: (
    level: W extends false ? zOlympiadLevel : zOlympiadLevel | "All"
  ) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-36">
        <SelectValue placeholder={showAll ? "All Levels" : "Select Level"} />
      </SelectTrigger>
      <SelectContent>
        {showAll && <SelectItem value="All">All Levels</SelectItem>}
        {zOlympiadLevel.options.map((level) => (
          <SelectItem key={level} value={level}>
            {level}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
