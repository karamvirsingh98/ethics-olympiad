import { ReactNode } from "react";

export default function TitleButtons({
  editing,
  extraText,
  toggleEditing,
  onSave,
  onDelete,
  onCancel,
  children,
}: {
  editing: boolean;
  extraText: string;
  toggleEditing: () => void;
  onSave: () => void;
  onDelete?: () => void;
  onCancel?: () => void;
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
      {onDelete && onCancel && (
        <button
          className={editing ? "orange" : "red"}
          onClick={editing ? onCancel : onDelete}
        >
          {editing ? `Cancel Changes` : `Delete ${extraText}`}
        </button>
      )}
      {children}
    </div>
  );
}
