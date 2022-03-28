import { useEffect, useRef, useState } from "react";

export default function useTimer(duration: number) {
  const [time, setTime] = useState<number | null>(duration * 60);
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const ref: any = useRef(null);

  useEffect(() => {
    clearInterval(ref.current);
    setTime(duration * 60);
    setActive(false);
    setPaused(false);
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

  const start = () => {
    setActive(true);
    ref.current = setInterval(() => {
      setTime((timer) => {
        
      });
    }, 1000);
  };

  const pause = () => {
    clearInterval(ref.current);
    setPaused(true);
  };

  const resume = () => {
    setPaused(false);
    ref.current = setInterval(() => {
      if (ref.current) setTime((timer) => timer - 1);
    }, 1000);
  };

  const reset = () => {
    clearInterval(ref.current);
    setActive(false);
    setPaused(false);
    setTime(duration * 60);
  };

  const formatTime = () => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes: any = `${Math.floor(time / 60)}`;
    const getMinutes = `${minutes % 60}`.slice(-2);

    return `${getMinutes} : ${getSeconds}`;
  };

  return { active, paused, time: formatTime, start, pause, resume, reset };
}
