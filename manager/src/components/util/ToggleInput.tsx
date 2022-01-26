import Conditional from "./Conditional";
import Input from "./Input";

export default function ToggleInput({
  text,
  editing,
  fontSize = "1rem",
  onEdit,
}: {
  text: string;
  editing: boolean;
  fontSize?: string | number;
  onEdit: (value: string) => void;
}) {
  return (
    <Conditional
      condition={editing}
      showTrue={
        <Input
          value={text}
          onChange={onEdit}
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
          {text}
        </div>
      }
    />
  );
}
