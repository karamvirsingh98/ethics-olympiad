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
      <div>
        Timers
      <button className="add-item"> Save </button>
      </div>
      {timers.map((time, i) => (
        <TimeInput
          key={i}
          time={time}
          label={LABELS[i]}
          onChange={(value) => {
            timers.splice(i, 1, Number(value))
            set([ ...timers ])
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
      <div> {label}: </div>
      <input
        className="input"
        style={{ width: '3rem' }}
        type="number"
        defaultValue={time.toString()}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      <div>
        min
      </div>
    </div>
  );
}
