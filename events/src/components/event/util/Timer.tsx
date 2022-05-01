import { useEffect } from "react";
import useTimer from "../../../state/hooks/useTimer";
import IfElse from "../../util/IfElse";

export default function Timer({ duration }: { duration: number }) {
  const { active, paused, time, start, pause, resume, reset, rawTime } =
    useTimer(duration);

  const timeNotUp = time() !== "Time's Up!";

  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  osc.frequency.value = 440;
  const filter = ctx.createBiquadFilter();
  filter.frequency.value = 330;
  filter.type = "lowpass";
  const gain = ctx.createGain();
  gain.gain.value = 0.3;
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  rawTime === 0 && osc.start();
  rawTime === 0 &&
    setInterval(() => {
      osc.stop();
    }, 500);

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
