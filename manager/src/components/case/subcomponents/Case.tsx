import { useState } from "react";
import { client } from "../../..";
import { RemoveOne, SetOneField } from "../../../state/hooks/useCollection";
import { Case } from "../../../state/types";
import ToggleInput from "../../util/ToggleInput";
import CaseHeader from "./CaseHeader";

export default function CaseComponent({
  Case,
  setOneField,
  removeOne,
}: {
  Case: Case;
  setOneField: SetOneField<Case>;
  removeOne: RemoveOne;
}) {
  const { _id, title, question, isVideo, videoURL, bodyText } = Case;
  const [editing, setEditing] = useState(false);

  const deleteCase = (id: string) => async () => {
    await client.service("api/cases").remove(id);
    removeOne(id);
  };

  return (
    <div style={{ display: "grid" }}>
      <CaseHeader
        title={title}
        editing={editing}
        onEdit={() => setEditing(!editing)}
        onRename={(title) => setOneField(_id!, "title", title)}
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
