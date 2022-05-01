import { useEffect, useRef, useState } from "react";

export default function useTimer(duration: number) {
  const ctx = useRef<AudioContext>(new AudioContext()).current;
  const oscRef = useRef<OscillatorNode>(ctx.createOscillator());
  const timeRef: any = useRef(null);
  const [time, setTime] = useState<number | null>(duration * 60);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setTime(duration * 60);
    setActive(false);
    setPaused(false);
    return () => {
      clearInterval(timeRef.current);
    };
  }, [duration]);

  useEffect(() => {
    const listner = (e: KeyboardEvent) => {
      if (e.key === " ") {
        if (paused) resume();
        else if (active) pause();
        else if (!active && !paused) start();
      }
    };
    window.addEventListener("keydown", listner);
    return () => window.removeEventListener("keydown", listner);
  }, [active, paused, time]);

  const engage = () => {
    timeRef.current = setInterval(() => {
      setTime((timer) => {
        if (timer && timer > 0) return timer - 1;
        else {
          clearInterval(timeRef.current);
          return null;
        }
      });
    }, 1000);
  };

  const start = () => {
    setActive(true);
    engage();
  };

  const pause = () => {
    clearInterval(timeRef.current);
    setPaused(true);
  };

  const resume = () => {
    setPaused(false);
    engage();
  };

  const reset = () => {
    clearInterval(timeRef.current);
    setActive(false);
    setPaused(false);
    setTime(duration * 60);
  };

  const formatTime = () => {
    if (time) {
      const getSeconds = `0${time % 60}`.slice(-2);
      const minutes: any = `${Math.floor(time / 60)}`;
      const getMinutes = `${minutes % 60}`.slice(-2);

      return `${getMinutes} : ${getSeconds}`;
    } else return "Time's Up!";
  };

  if (time === 0) {
    oscRef.current = ctx.createOscillator();
    oscRef.current.frequency.value = 440;
    const filter = ctx.createBiquadFilter();
    filter.frequency.value = 330;
    filter.type = "lowpass";
    const gain = ctx.createGain();
    gain.gain.value = 0;
    oscRef.current.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    oscRef.current.start();
    gain.gain.value = 0.3;
    setTimeout(() => {
      gain.gain.value = 0;
    }, 500);
    setTimeout(() => {
      gain.gain.value = 0.3;
    }, 1000);
    setTimeout(() => {
      gain.gain.value = 0;
      oscRef.current.stop();
    }, 1500);
  }

  return { active, paused, time: formatTime(), start, pause, resume, reset };
}
