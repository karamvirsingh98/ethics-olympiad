import { useState } from "react";

export type ScoreOption = "Individual" | "Team"

export default function ScoreDropdown({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (option: ScoreOption) => void;
}) {
  const [show, setShow] = useState(false);
  const options: ScoreOption[] = ["Individual", "Team"];

  return (
    <div
      style={{
        position: "relative",
        width: "fit-content",
        boxSizing: "border-box",
        placeSelf: "center",
      }}
    >
      <button
        className="blue"
        onClick={() => setShow(!show)}
        style={{ width: "7rem", textAlign: "center" }}
      >
        {selected}
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
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
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
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
