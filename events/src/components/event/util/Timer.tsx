import useTimer from "../../../state/hooks/useTimer";

export default function Timer({ duration }: { duration: number }) {
  const { active, paused, time, start, pause, resume, reset } =
    useTimer(duration);

  return (
    <div className="timer-container">
      <div style={{ fontSize: "15vw", fontWeight: 500 }}> {time()} </div>
      <div style={{ display: "flex", gap: "2rem" }}>
        {!active && <TimerButton text="Start" onClick={start} color="blue" />}
        {active && !paused && (
          <TimerButton text="Pause" onClick={pause} color="orange" />
        )}
        {paused && <TimerButton text="Reset" onClick={reset} color="red" />}
        {paused && <TimerButton text="Resume" onClick={resume} color="blue" />}
      </div>
    </div>
  );
}

function TimerButton({
  text,
  color,
  onClick,
}: {
  text: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button className={color} onClick={onClick} style={{ fontSize: "2rem" }}>
      {text}
    </button>
  );
}
