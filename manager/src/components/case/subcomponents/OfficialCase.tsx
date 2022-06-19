import { Case, CustomQuestion, User } from "@ethics-olympiad/types";
import { useEffect, useState } from "react";
import { client } from "../../../main";
import TitleButtons from "../../event/subcomponents/TitleButtons";
import Conditional from "../../util/Conditional";
import ToggleInput from "../../util/ToggleInput";

export default function OfficialCase({
  _case,
  user,
}: {
  _case: Case;
  user: User;
}) {
  const [show, set] = useState(false);
  const [customQ, setCustomQ] = useState<string>();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const { title, isVideo, videoURL, bodyText } = _case;

  useEffect(() => {
    client
      .service("api/questions")
      .find({ caseID: _case._id, userID: user._id })
      .then((question: CustomQuestion) =>
        setCustomQ(question ? question.question : "")
      );
  }, []);

  const onSave = async () => {
    setSaving(true);
    await client
      .service("api/questions")
      .update({ ..._case, question: customQ });
    setSaving(false);
  };

  const toggleEditing = () => setEditing(!editing);

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: "1.25rem",
            borderBottom: "solid 0.25rem transparent",
          }}
        >
          {title}
        </div>
        <button className={show ? "orange" : "blue"} onClick={() => set(!show)}>
          {show ? "Hide Details" : "Show Details"}
        </button>
        <TitleButtons
          editing={editing}
          extraText="Question"
          toggleEditing={toggleEditing}
          onSave={onSave}
        />
      </div>

      {show && (
        <>
          <div style={{ display: "flex", fontSize: "1rem", gap: "1rem" }}>
            <div style={{ borderBottom: "solid 0.25rem transparent" }}>
              Question:
            </div>
            <Conditional
              condition={saving}
              showTrue={<div> Loading... </div>}
              showFalse={
                <ToggleInput
                  placeholder="Question"
                  value={customQ}
                  editing={editing}
                  onEdit={(question) => setCustomQ(question)}
                />
              }
            />
          </div>
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
                <div
                  style={{
                    fontSize: "1.25rem",
                    borderBottom: "solid 0.25rem transparent",
                  }}
                >
                  {videoURL}
                </div>
              }
              showFalse={
                <div style={{ whiteSpace: "pre-wrap", marginRight: "2rem" }}>
                  {bodyText}
                </div>
              }
            />
          </div>
        </>
      )}
    </div>
  );
}
