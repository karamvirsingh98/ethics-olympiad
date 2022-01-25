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
    <div style={{ display: "grid", gridAutoFlow: "column", placeSelf: "center end", gap: "1rem" }}>
      {!editing && (
        <Fragment>
          <button className="blue" onClick={toggleEditing}>
            Edit
          </button>
          <button className="red" onClick={onDelete}>
            Delete
          </button>
        </Fragment>
      )}
      {editing && (
        <Fragment>
          <button className="green" onClick={onSave}>
            Save
          </button>
          <button className="orange" onClick={onCancel}>
            Cancel
          </button>
        </Fragment>
      )}
    </div>
  );
}
