"use client";

import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import Pusher from "pusher-js";

const pusher_atom = atom(
  new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  })
);

export const usePusherListener = () => {
  const [pusher] = useAtom(pusher_atom);

  useEffect(() => {
    pusher.subscribe("ethics-olympiad");
    return () => {
      pusher.unsubscribe("ethics-olympiad");
    };
  }, [pusher]);

  return pusher;
};
