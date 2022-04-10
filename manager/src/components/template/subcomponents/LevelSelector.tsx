import { Levels } from "@ethics-olympiad/types";
import { useState } from "react";

export default function LevelSelector({
  selected,
  onSelect,
}: {
  selected: Levels | "";
  onSelect: (level: Levels) => void;
}) {
  const [show, setShow] = useState(false);
  const levels: Levels[] = ["junior", "middle", "senior", "tertiary"];

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
        {selected || "Select A Level"}
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
          {levels.map((level, i) => (
            <button
              key={i}
              onClick={() => {
                onSelect(level);
                setShow(false);
              }}
              className="blue"
              style={{
                borderRadius: "0",
                border: "none",
                width: "100%",
                fontSize: "1rem",
              }}
            >
              {level}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
