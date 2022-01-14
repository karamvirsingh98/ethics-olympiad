import { useState } from "react";

const LABELS = [
  "First Conference",
  "Presentation",
  "Second Conference",
  "Commentary",
  "Third Conference",
  "Response",
  "Judge's Questions",
];

export default function Timers({ _timers }: { _timers: number[] }) {
  const [timers, set] = useState(_timers);

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
        <button className={timers !== _timers ?  "green" : "grey"} style={{ placeSelf: "center end" }}> Save </button>
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
