import { ScoreFields, TeamScore } from "@ethics-olympiad/types";
import { Range } from "react-range";
import ScoreExplainer from "../team_score/subcomponents/ScoreExplainer";

export default function ScoreSlider({
  label,
  description,
  max,
  value,
  onChange,
}: {
  label: keyof ScoreFields;
  description: string;
  value: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div style={{ display: "grid", gap: "0.5rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          placeItems: "center start",
        }}
      >
        <ScoreExplainer label={label} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 5rem",
            placeItems: "center end",
            width: "100%",
          }}
        >
          <Slider {...{ max, value, onChange }} />
          <div style={{ fontSize: "1.25rem" }}>
            {value} / {max}
          </div>
        </div>
      </div>
      <div style={{ opacity: 0.5 }}> {description} </div>
    </div>
  );
}

function Slider({
  max,
  value,
  onChange,
}: {
  max: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <Range
      step={0.5}
      min={0}
      max={max}
      values={[value]}
      onChange={(v) => onChange(v[0])}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "0.25rem",
            width: "100%",
            backgroundColor: "black",
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "1.25rem",
            width: "1.25rem",
            borderRadius: "100%",
            backgroundColor: "rgba(126, 189, 194, 1)",
            outline: "none",
          }}
        />
      )}
    />
  );
}
