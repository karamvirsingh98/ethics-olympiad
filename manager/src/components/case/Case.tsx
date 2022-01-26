import { useState } from "react";
import { client } from "../..";
import { RemoveOne, SetOneField } from "../../state/hooks/useCollection";
import { AppState, User, Case } from "../../state/types";
import Conditional from "../util/Conditional";
import Input from "../util/Input";
import ObjectMap from "../util/ObjectMap";

export default function Cases({ state }: { state: AppState }) {
  const {
    cases: [cases, { setOne, setOneField, removeOne }],
  } = state;

  return (
    <div>
      {cases && (
        <ObjectMap
          object={cases}
          map={(id) => (
            <CaseComponent
              Case={cases![id]}
              setOneField={setOneField}
              removeOne={removeOne}
            />
          )}
        />
      )}
    </div>
  );
}

function CaseComponent({
  Case,
  setOneField,
  removeOne,
}: {
  Case: Case;
  setOneField: SetOneField<Case>;
  removeOne: RemoveOne;
}) {
  const { _id, title, isVideo, videoURL, bodyText } = Case;
  const [editing, set] = useState(false);


  const deleteCase = (id: string) => async () => {
    await client.service("api/cases").remove(id);
    removeOne(id);
  };

  const renameCase = (id: string) => async (title: string) => {
    setOneField(id, "title", title)
  }

  return (
    <div style={{ display: "grid" }}>
      <CaseHeader
        title={title}
        editing={editing}
        onEdit={() => set(!editing)}
        onRename={() => {}}
        onDelete={deleteCase(_id!)}
      />
      <div style={{ display: "flex", fontSize: "1rem", gap: "1rem" }}>
        <div>
          Question
        </div>
        <ToggleInput text={title} editing={editing} onEdit={renameCase(_id!)} />
      </div>
      <div>
        <div> {isVideo ? "Video URL: " : "Case Body: "} </div>
        <div> {isVideo ? videoURL : bodyText} </div>
      </div>
    </div>
  );
}

function CaseHeader({
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

function ToggleInput({
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
