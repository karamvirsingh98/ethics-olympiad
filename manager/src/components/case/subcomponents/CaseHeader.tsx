import TitleButtons from "../../event/subcomponents/TitleButtons";
import ToggleInput from "../../util/ToggleInput";

export default function CaseHeader({
  editing,
  title,
  onRename,
  toggleEditing,
  onDelete,
  onSave,
  onCancel,
}: {
  editing: boolean;
  title: string;
  onRename: (title: string) => void;
  toggleEditing: () => void;
  onDelete: () => void;
  onSave: () => void;
  onCancel: () => void
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
      <TitleButtons
        editing={editing}
        toggleEditing={toggleEditing}
        onDelete={onDelete}
        onSave={onSave}
        onCancel={onCancel}
      />
    </div>
  );
}

