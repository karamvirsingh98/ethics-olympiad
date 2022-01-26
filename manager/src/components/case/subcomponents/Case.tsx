import { useState } from "react";
import { client } from "../../..";
import { RemoveOne, SetOne, SetOneField } from "../../../state/hooks/useCollection";
import { Case } from "../../../state/types";
import ToggleInput from "../../util/ToggleInput";
import CaseHeader from "./CaseHeader";

export default function CaseComponent({
  _case,
  setOne,
  setOneField,
  removeOne,
}: {
  _case: Case;
  setOne: SetOne<Case>
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
    const updated = await client.service("/api/cases").update(_id, _case)
    setOne(updated._id, updated)
    setEditing(false)
  }

  const cancelEdits = (id: string) => async () => {
    setOne(id, await client.service("/api/events").get(id));
    setEditing(false);
  };

  return (
    <div style={{ display: "grid" }}>
      <CaseHeader
        title={title}
        editing={editing}
        toggleEditing={() => setEditing(!editing)}
        onRename={(title) => setOneField(_id!, "title", title)}
        onSave={saveEdits(_id!)}
        onCancel={cancelEdits(_id!)}
        onDelete={deleteCase(_id!)}
      />
      <div style={{ display: "flex", fontSize: "1rem", gap: "1rem" }}>
        <div>Question</div>
        <ToggleInput
          text={question}
          editing={editing}
          onEdit={(question) => setOneField(_id!, "question", question)}
        />
      </div>
      <div>
        <div> {isVideo ? "Video URL: " : "Case Body: "} </div>
        <div> {isVideo ? videoURL : bodyText} </div>
      </div>
    </div>
  );
}
