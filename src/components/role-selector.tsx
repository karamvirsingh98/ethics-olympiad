import { zUserRole } from "@/lib/entities";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function RoleSelector<W = false>({
  value,
  showAll,
  onChange,
}: {
  value: zUserRole | undefined;
  showAll?: W;
  onChange: (level: W extends false ? zUserRole : zUserRole | "All") => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-36">
        <SelectValue placeholder={showAll ? "All Roles" : "Select Role"} />
      </SelectTrigger>
      <SelectContent>
        {showAll && <SelectItem value="All">All Roles</SelectItem>}
        {zUserRole.options.map((level) => (
          <SelectItem key={level} value={level}>
            {level}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
