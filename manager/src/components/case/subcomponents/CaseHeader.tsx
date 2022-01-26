import ToggleInput from "../../util/ToggleInput";

export default function CaseHeader({
  editing,
  title,
  onRename,
  onEdit,
  onDelete,
}: {
  editing: boolean;
  title: string;
  onRename: (title: string) => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ToggleInput text={title} editing={editing} onEdit={onRename} />
      <div style={{ display: "flex", gap: "1rem" }}>
        <button className="blue" onClick={onEdit}>
          Edit
        </button>
        <button className="red" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}