import { Range } from "react-range";

export default function ScoreSlider({
  label,
  description,
  max,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: number;
  max: number;
  onChange: (value: number) => void;
}) {
  function capitalise(s: string) {
    return s[0].toUpperCase() + s.slice(1);
  }

  return (
    <div style={{ display: "grid", gap: "0.5rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          placeItems: "center start",
        }}
      >
        <div style={{ fontSize: "1.25rem" }}> {capitalise(label)} </div>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr 5rem", placeItems: "center end", width: "100%"}}>
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
          className="grey-flat"
          style={{
            ...props.style,
            height: "0.5rem",
            width: "100%",
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
            height: "1.5rem",
            width: "1.5rem",
            borderRadius: "100%",
            backgroundColor: "rgba(126, 189, 194, 1)",
            outline: "none",
          }}
        />
      )}
    />
  );
}
