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
  editing,
  timers,
  onConfirm,
}: {
  editing: boolean;
  timers: number[];
  onConfirm: (value: string, index: number) => void;
}) {
  return (
    <div className="timers">
      <div
        style={{
          fontSize: "1.5rem",
          // borderBottom: "solid 0.25rem",
          width: "fit-content",
        }}
      >
        Timers
      </div>
      <div
        style={{
          display: "grid",
          gap: "0.5rem",
          borderTop: "solid 1px",
          borderBottom: "solid 1px",
          padding: "1rem 0rem ",
        }}
      >
        {timers.map((time, i) => (
          <TimeInput
            key={i * Math.random()}
            editing={editing}
            time={time}
            index={i}
            label={LABELS[i]}
            onConfirm={onConfirm}
          />
        ))}
      </div>
    </div>
  );
}

function TimeInput({
  editing,
  time,
  index,
  label,
  onConfirm,
}: {
  editing: boolean;
  time: number;
  index: number;
  label: string;
  onConfirm: (value: string, index: number) => void;
}) {
  return (
    <div className="timer-input">
      <div style={{ placeSelf: "start" }}> {label}: </div>
      <div
        style={{
          placeSelf: "end",
          borderBottom: editing ? undefined : "solid 0.25rem transparent",
          display: 'grid', 
          gap: "0.5rem",
          gridAutoFlow: "column"
        }}
      >
        {editing ? (
          <Input
            style={{ width: "2rem", textAlign: "right"}}
            defaultValue={time.toString()}
            onConfirm={(value) => onConfirm(value, index)}
          />
        ) : (
          <div>{time}</div>
        )}
        min
      </div>
    </div>
  );
}
