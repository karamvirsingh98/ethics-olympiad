"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PauseIcon, PlayIcon, ResetIcon } from "@radix-ui/react-icons";

export const OlympiadCountdown = ({ duration }: { duration: number }) => {
  const [time, setTime] = useState(duration);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) {
      const interval = setInterval(() => {
        if (time) setTime((t) => t - 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [started, time]);

  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return (
    <div className="max-w-[500px]">
      <div className="text-[12em] flex items-center justify-end leading-[1]">
        <p className="w-36 text-right">{minutes}</p>
        <p>:</p>
        <p className="w-64 text-right">
          {seconds < 10 ? "0" + seconds : seconds}
        </p>
      </div>
      <div className="flex gap-4 justify-end px-8">
        {started && (
          <Button variant="secondary" onClick={() => setStarted(false)}>
            Pause <PauseIcon className="w-4 ml-4" />
          </Button>
        )}
        {!started && (
          <Button variant="secondary" onClick={() => setStarted(true)}>
            Start <PlayIcon className="w-4 ml-4" />
          </Button>
        )}
        {!started && time !== duration && (
          <Button variant="secondary" onClick={() => setTime(duration)}>
            Reset <ResetIcon className="w-4 ml-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
