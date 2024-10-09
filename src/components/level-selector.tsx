import { zOlympiadLevel } from "@/lib/entities";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const LevelSelector = ({
  value,
  onChange,
}: {
  value: zOlympiadLevel | undefined;
  onChange: (level: zOlympiadLevel) => void;
}) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger>
      <SelectValue placeholder="Select Level" />
    </SelectTrigger>
    <SelectContent>
      {zOlympiadLevel.options.map((level) => (
        <SelectItem key={level} value={level}>
          {level}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
