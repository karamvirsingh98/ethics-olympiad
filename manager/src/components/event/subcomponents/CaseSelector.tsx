import { CustomQuestion, Levels, User } from "@ethics-olympiad/types";
import { useEffect, useState } from "react";
import { client } from "../../../main";
import { Cases } from "../../../state/types";

export default function CaseSelector({
  cases,
  caseID,
  level,
  hasQuestion,
  onSelect,
}: {
  cases: Cases;
  caseID: string;
  level: Levels;
  hasQuestion: boolean;
  onSelect: (id: string) => void;
}) {
  const [show, setShow] = useState(false);
  const toShow = Object.keys(cases).filter((id) => cases[id].level === level);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        boxSizing: "border-box",
        placeSelf: "center",
      }}
    >
      <button
        className="blue"
        onClick={() => setShow(!show)}
        style={{
          width: "100%",
          textAlign: "start",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {cases[caseID] ? cases[caseID].title : "No Case Selected"}
        {!hasQuestion && <p style={{ color: "red" }}> ! </p>}
      </button>
      {show && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 0.5rem)",
            left: "0",
            display: "grid",
            width: "100%",
            alignSelf: "center",
            zIndex: 2,
            borderRadius: "0.25rem",
            overflow: "hidden",
          }}
          className="light"
        >
          {toShow.map((id) => (
            <button
              key={id}
              onClick={() => {
                onSelect(id);
                setShow(false);
              }}
              className="blue"
              style={{
                borderRadius: "0",
                border: "none",
                width: "100%",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                textAlign: "left",
              }}
            >
              {cases[id].title}
              {!hasQuestion && <p style={{ color: "red" }}> ! </p>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
