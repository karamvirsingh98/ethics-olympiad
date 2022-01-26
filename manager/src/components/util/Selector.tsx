import { useState } from "react";
import { Case, Cases } from "../../state/types";

export default function CaseSelector({ cases, onSelect }: { cases: Cases, onSelect: (id: string) => void }) {
  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: "absolute", width: "fit-content", boxSizing: "border-box" }}>
      <button onClick={() => setShow(!show)}>
        {selected === "" ? "No Case Selected" : cases[selected].title}
      </button>
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: "0",
          marginTop: "1rem",
          display: "grid",
          width: "100%"
        }}
      >
        {Object.keys(cases).map((id) => (
          <button
            onClick={() => setSelected(id)}
            className="blue"
            style={{ borderRadius: 0, border: "none" }}
          >
            {cases[selected].title}
          </button>
        ))}
      </div>
    </div>
  );
}
