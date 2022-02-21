import { Team } from "@ethics-olympiad/types";
import { useState } from "react";

export default function Selector({
  teams,
  selected,
  onSelect,
}: {
  teams: Team[];
  selected: string;
  onSelect: (name: string) => void;
}) {
  const [show, setShow] = useState(false);

  function f(name: string) {
    return teams[teams.findIndex(t => t.name === name)]
  }

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
        style={{ width: "100%", textAlign: "start" }}
      >
        {f(selected) ? f(selected) : "No Team Selected"}
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
          {teams.map(({ name }, i) => (
            <button
              key={name}
              onClick={() => {
                onSelect(name);
              }}
              className="blue"
              style={{
                borderRadius: "0",
                border: "none",
                width: "100%",
                fontSize: "1rem",
              }}
            >
              {teams[i].name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
