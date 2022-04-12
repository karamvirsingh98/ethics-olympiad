import { ScoreFields } from "@ethics-olympiad/types";
import ScoreExplainer from "../team_score/subcomponents/ScoreExplainer";

export default function ScoreDots({
  label,
  description,
  numDots,
  selected,
  onSelect,
}: {
  label: keyof ScoreFields;
  description: string;
  numDots: number;
  selected: number;
  onSelect: (selected: number) => void;
}) {
  return (
    <div style={{ display: "grid", gap: "0.5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ScoreExplainer label={label} />
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {Array.from(new Array(numDots)).map((_, i) => (
              <div
                key={i}
                style={{
                  cursor: "pointer",
                  width: "1rem",
                  height: "1rem",
                  borderRadius: "100%",
                  backgroundColor: selected >= i + 1 ? "#C297B8" : "grey",
                  transition: "background-color 250ms ease-in-out",
                }}
                onClick={() => onSelect(i + 1)}
              />
            ))}
          </div>
          <div style={{ fontSize: "1.25rem" }}>
            {selected} / {numDots}
          </div>
        </div>
      </div>
      <div style={{ opacity: 0.5 }}> {description} </div>
    </div>
  );
}
