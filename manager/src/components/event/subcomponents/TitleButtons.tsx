import { Fragment, ReactNode } from "react";

export default function TitleButtons({
  editing,
  extraText,
  toggleEditing,
  onDelete,
  onSave,
  onCancel,
  children,
}: {
  editing: boolean;
  extraText: string;
  toggleEditing: () => void;
  onDelete: () => void;
  onSave: () => void;
  onCancel: () => void;
  children?: ReactNode;
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
        {editing ? `Save ${extraText}` : `Edit ${extraText}`}
      </button>
      <button
        className={editing ? "orange" : "red"}
        onClick={editing ? onCancel : onDelete}
      >
        {editing ? `Cancel Changes` : `Delete ${extraText}`}
      </button>
      {children}
    </div>
  );
}
