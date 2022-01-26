import { useState } from "react";
import { client } from "../../..";
import {
  RemoveOne,
  SetOne,
  SetOneField,
} from "../../../state/hooks/useCollection";
import { Case } from "../../../state/types";
import Conditional from "../../util/Conditional";
import ToggleInput from "../../util/ToggleInput";
import CaseHeader from "./CaseHeader";
import TextArea from "./MultilineInput";

export default function CaseComponent({
  _case,
  setOne,
  setOneField,
  removeOne,
}: {
  _case: Case;
  setOne: SetOne<Case>;
  setOneField: SetOneField<Case>;
  removeOne: RemoveOne;
}) {
  const { _id, title, question, isVideo, videoURL, bodyText } = _case;
  const [editing, setEditing] = useState(false);

  const deleteCase = (id: string) => async () => {
    await client.service("api/cases").remove(id);
    removeOne(id);
  };

  const saveEdits = (id: string) => async () => {
    const updated = await client.service("/api/cases").update(id, _case);
    setOne(updated._id, updated);
    setEditing(false);
  };

  const cancelEdits = (id: string) => async () => {
    setOne(id, await client.service("/api/cases").get(id));
    setEditing(false);
  };

  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        padding: "1rem",
        borderRadius: "0.25rem",
      }}
      className="grey-flat"
    >
      <CaseHeader
        title={title}
        editing={editing}
        toggleEditing={() => setEditing(true)}
        onRename={(title) => setOneField(_id!, "title", title)}
        onSave={saveEdits(_id!)}
        onCancel={cancelEdits(_id!)}
        onDelete={deleteCase(_id!)}
      />
      <div style={{ display: "flex", fontSize: "1rem", gap: "1rem" }}>
        <div style={{ borderBottom: "solid 0.25rem transparent" }}>
          Question:
        </div>
        <ToggleInput
          placeholder="Question"
          value={question}
          editing={editing}
          onEdit={(question) => setOneField(_id!, "question", question)}
        />
      </div>
      {editing && (
        <div
          style={{
            display: "flex",
            fontSize: "1rem",
            gap: "1rem",
            width: "100%",
          }}
        >
          <div
            style={{
              borderBottom: "solid 0.25rem transparent",
              whiteSpace: "nowrap",
            }}
          >
            {isVideo ? "Video URL: " : "Case Body: "}
          </div>
          <Conditional
            condition={isVideo}
            showTrue={
              <ToggleInput
                placeholder="Video URL"
                editing={editing}
                value={videoURL}
                onEdit={() => {}}
              />
            }
            showFalse={
              <div> {bodyText} </div>
              // <TextArea
              //   value={bodyText}
              //   onChange={(bodyText) => setOneField(_id!, "bodyText", bodyText)}
              // />
            }
          />
        </div>
      )}
    </div>
  );
}
