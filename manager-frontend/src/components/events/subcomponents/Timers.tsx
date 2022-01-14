import { useState } from "react";

const DEFAULT_TIMERS = [2, 5, 1, 3, 1, 3, 7];

const LABELS = [
  "First Conference",
  "Presentation",
  "Second Conference",
  "Commentary",
  "Third Conference",
  "Response",
  "Judge's Questions",
];

export default function Timers() {
  const [timers, set] = useState(DEFAULT_TIMERS);

  return (
    <div className="timers">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          placeItems: "center",
          fontSize: "1.5rem",
        }}
      >
        <div style={{ placeSelf: "center start", borderBottom: "solid 0.25rem", width: "75%" }}>Timers</div>
        <button className="add-item"> Save </button>
      </div>
      {timers.map((time, i) => (
        <TimeInput
          key={i}
          time={time}
          label={LABELS[i]}
          onChange={(value) => {
            timers.splice(i, 1, Number(value));
            set([...timers]);
          }}
        />
      ))}
    </div>
  );
}

function TimeInput({
  time,
  label,
  onChange,
}: {
  time: number;
  label: string;
  onChange: (input: string) => void;
}) {
  return (
    <div className="timer-input">
      <div style={{ placeSelf: "start" }}> {label}: </div>
      <div style={{ placeSelf: "end" }}>
        <input
          style={{ width: "2rem" }}
          defaultValue={time.toString()}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
        min
      </div>
    </div>
  );
}
