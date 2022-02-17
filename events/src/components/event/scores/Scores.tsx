import { useState } from "react";

export default function Scores() {
  const [selected, set] = useState<{ [key: string]: number }>({
    haboda: 0,
    skeepoda: 0,
  });

  return (
    <div className="scores">
      <div style={{ display: "grid", gap: "1rem" }}>
        {Object.keys(selected).map((k) => (
          <ScoreDots
            key={k}
            label={k}
            numDots={5}
            selected={selected[k]}
            onSelect={(s) => set({ ...selected, [k]: s })}
          />
        ))}
      </div>
    </div>
  );
}

function ScoreDots({
  label,
  numDots,
  selected,
  onSelect,
}: {
  label: string;
  numDots: number;
  selected: number;
  onSelect: (selected: number) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {label}
      <div style={{ display: "flex", gap: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div onClick={() => onSelect(0)} style={{ cursor: "pointer" }}>
            {" "}
            X{" "}
          </div>
          {Array.from(new Array(numDots)).map((_, i) => (
            <div
              style={{
                cursor: "pointer",
                width: "1rem",
                height: "1rem",
                borderRadius: "100%",
                backgroundColor: selected >= i + 1 ? "#C297B8" : "grey",
                transition: "background-color 250ms ease-in-out",
                // border: "solid 0.25rem #C297B8",
              }}
              onClick={() => onSelect(i + 1)}
            />
          ))}
        </div>
        <div> {selected} </div>
      </div>
    </div>
  );
}
