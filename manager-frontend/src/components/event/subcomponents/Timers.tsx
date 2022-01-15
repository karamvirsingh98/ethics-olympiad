import Input from "../../util/Input";

const LABELS = [
  "First Conference",
  "Presentation",
  "Second Conference",
  "Commentary",
  "Third Conference",
  "Response",
  "Judge's Questions",
];

export default function Timers({
  timers,
  onConfirm,
}: {
  timers: number[];
  onConfirm: (value: string, index: number) => void;
}) {
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
        <div
          style={{
            placeSelf: "center start",
            borderBottom: "solid 0.25rem",
            width: "5rem",
          }}
        >
          Timers
        </div>
      </div>
      {timers.map((time, i) => (
        <TimeInput
          key={i}
          time={time}
          index={i}
          label={LABELS[i]}
          onConfirm={onConfirm}
        />
      ))}
    </div>
  );
}

function TimeInput({
  time,
  index,
  label,
  onConfirm,
}: {
  time: number;
  index: number;
  label: string;
  onConfirm: (value: string, index: number) => void;
}) {
  return (
    <div className="timer-input">
      <div style={{ placeSelf: "start" }}> {label}: </div>
      <div style={{ placeSelf: "end" }}>
        <Input
          style={{ width: "2rem" }}
          defaultValue={time.toString()}
          onConfirm={(value) => onConfirm(value, index)}
        />
        min
      </div>
    </div>
  );
}
