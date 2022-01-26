import Conditional from "./Conditional";
import Input from "./Input";

export default function ToggleInput({
  text,
  editing,
  onEdit,
}: {
  text: string;
  editing: boolean;
  onEdit: (value: string) => void;
}) {
  return (
    <Conditional
      condition={editing}
      showTrue={
        <Input
          onChange={onEdit}
          style={{
            borderBottom: "solid 0.25rem transparent",
            fontSize: "1rem",
          }}
        />
      }
      showFalse={<div style={{ fontSize: "1rem" }}> {text} </div>}
    />
  );
}
