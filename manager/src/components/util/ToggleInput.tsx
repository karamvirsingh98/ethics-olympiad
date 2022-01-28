import Conditional from "./Conditional";
import Input from "./Input";

export default function ToggleInput({
  value,
  editing,
  fontSize = "1rem",
  placeholder,
  autofocus,
  id,
  onEdit,
}: {
  editing: boolean;
  value: string | undefined;
  fontSize?: string | number;
  placeholder?: string;
  autofocus?: boolean;
  id?: string;
  onEdit: (value: string) => void;
}) {
  return (
    <Conditional
      condition={editing}
      showTrue={
        <Input
          id={id}
          autofocus={autofocus}
          value={value}
          onChange={onEdit}
          placeholder={placeholder}
          style={{
            fontSize: fontSize,
          }}
        />
      }
      showFalse={
        <div
          style={{
            fontSize: fontSize,
            borderBottom: "solid 0.25rem transparent",
          }}
        >
          {value}
        </div>
      }
    />
  );
}
