import TitleButtons from "../../event/subcomponents/TitleButtons";
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
      <TitleButtons
        editing={editing}
        toggleEditing={onEdit}
        onDelete={deleteEvent}
        onSave={saveEdits}
        onCancel={cancelEdits}
      />
    </div>
  );
}

