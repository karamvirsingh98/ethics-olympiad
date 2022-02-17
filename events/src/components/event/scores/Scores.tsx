import { Score } from "@ethics-olympiad/types";
import { useEffect, useState } from "react";
import { client } from "../../../main";
import { getDefaultScore } from "../../../util/defaults";
import { getScoreBounds, getTotalScore } from "../../../util/helpers";

export default function Scores() {
  const [score, set] = useState(getDefaultScore("kv"));

  return (
    <div className="scores">
      <div
        style={{
          display: "grid",
          gap: "1rem",
          placeSelf: "center stretch",
          height: "fit-content",
        }}
      >
        {Object.keys(score).map((k) => {
          if (k === "judgeName" || k === "total" ) return;
          else
            return (
              <ScoreDots
                key={k}
                label={k}
                numDots={getScoreBounds(k as keyof Score)}
                selected={score[k as keyof Score] as number}
                onSelect={(s) => set({ ...score, [k]: s })}
              />
            );
        })}

        <div>
          Total: {getTotalScore(score)}
        </div>
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
