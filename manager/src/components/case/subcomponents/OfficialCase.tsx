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
  const [loading, setLoading] = useState(true);
  const [customQ, setCustomQ] = useState<CustomQuestion>();
  const [editing, setEditing] = useState(false);

  const { title, isVideo, videoURL, bodyText } = _case;

  useEffect(() => {
    client
      .service("api/questions")
      .find({ query: { caseID: _case._id, userID: user._id } })
      .then(async (questions: CustomQuestion[]) => {
        if (!questions.length) {
          const question = await client
            .service("api/questions")
            .create({ caseID: _case._id, userID: user._id });
          setCustomQ(question);
        } else setCustomQ(questions[0]);
        setLoading(false);
      });
  }, [editing]);

  const onSave = async () => {
    try {
      await client.service("api/questions").update(customQ?._id, customQ);
      setEditing(false);
    } catch (e) {
      console.log("Error Saving Custom Question -> ", e);
    }
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
        <div style={{ display: "flex", gap: "1rem" }}>
          <TitleButtons
            editing={editing}
            extraText="Question"
            toggleEditing={toggleEditing}
            onSave={onSave}
          />
        </div>
      </div>

      {editing && (
        <>
          <div style={{ display: "flex", fontSize: "1rem", gap: "1rem" }}>
            <div style={{ borderBottom: "solid 0.25rem transparent" }}>
              Question:
            </div>
            <Conditional
              condition={loading}
              showTrue={<div> Loading... </div>}
              showFalse={
                <ToggleInput
                  placeholder="Question"
                  value={customQ?.question}
                  editing={editing}
                  onEdit={(question) =>
                    setCustomQ({
                      ...customQ!,
                      question,
                    })
                  }
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
