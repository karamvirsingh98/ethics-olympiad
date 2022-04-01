import { Fragment } from "react";

export default function TitleButtons({
  editing,
  toggleEditing,
  onDelete,
  onSave,
  onCancel,
}: {
  editing: boolean;
  toggleEditing: () => void;
  onDelete: () => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridAutoFlow: "column",
        placeSelf: "center end",
        gap: "1rem",
      }}
    >
      <button
        className={editing ? "green" : "blue"}
        onClick={editing ? onSave : toggleEditing}
      >
        {editing ? "Save" : "Edit"}
      </button>
      <button
        className={editing ? "orange" : "red"}
        onClick={editing ? onCancel : onDelete}
      >
        {editing ? "Cancel" : "Delete"}
      </button>
    </div>
  );
}
