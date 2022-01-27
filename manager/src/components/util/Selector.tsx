import { useState } from "react";
import { Cases } from "../../state/types";

export default function CaseSelector({ cases, selected, onSelect }: { cases: Cases, selected: string, onSelect: (id: string) => void }) {
  const [show, setShow] = useState(false);

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
        className="blue hover"
        onClick={() => setShow(!show)}
        style={{ width: "100%", textAlign: "start" }}
      >
        {selected === "" ? "No Case Selected" : cases[selected].title}
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
            backgroundColor: "black",
          }}
        >
          {Object.keys(cases).map((id) => (
            <button
              onClick={() => {
                onSelect(id);
              }}
              className="blue"
              style={{
                borderRadius: "0",
                border: "none",
                width: "100%",
                fontSize: "1rem",
              }}
            >
              {cases[id].title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
