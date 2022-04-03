import useTimer from "../../../state/hooks/useTimer";
import IfElse from "../../util/IfElse";

export default function Timer({ duration }: { duration: number }) {
  const { active, paused, time, start, pause, resume, reset } =
    useTimer(duration);

  const timeNotUp = time() !== "Time's Up!";

  return (
    <div className="timer-container">
      <div style={{ fontSize: timeNotUp ? "15vw" : "7.5vw", fontWeight: 500 }}>
        {time()}
      </div>
      <IfElse
        showIf={timeNotUp}
        showTrue={
          <div style={{ display: "flex", gap: "2rem" }}>
            {!active && (
              <TimerButton text="Start" onClick={start} color="blue" />
            )}
            {active && !paused && (
              <TimerButton text="Pause" onClick={pause} color="orange" />
            )}
            {paused && <TimerButton text="Reset" onClick={reset} color="red" />}
            {paused && (
              <TimerButton text="Resume" onClick={resume} color="blue" />
            )}
          </div>
        }
        showFalse={null}
      />
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
