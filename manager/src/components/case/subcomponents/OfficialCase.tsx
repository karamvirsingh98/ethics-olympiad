import { Case } from "@ethics-olympiad/types";
import { useState } from "react";
import Conditional from "../../util/Conditional";

export default function OfficialCase({ _case }: { _case: Case }) {
  const [show, set] = useState(false);

  const { title, question, isVideo, videoURL, bodyText } = _case;

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
      </div>

      {show && (
        <>
          <div style={{ display: "flex", fontSize: "1rem", gap: "1rem" }}>
            <div style={{ borderBottom: "solid 0.25rem transparent" }}>
              Question:
            </div>
            <div
              style={{
                fontSize: "1.25rem",
                borderBottom: "solid 0.25rem transparent",
              }}
            >
              {question}
            </div>
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
                <div style={{ whiteSpace: "pre-wrap", marginRight: "2rem" }}> {bodyText} </div>
              }
            />
          </div>
        </>
      )}
    </div>
  );
}
