"use client";

import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { PUSHER_FORMATS } from "./utils";
import Pusher from "pusher-js";

const pusher_atom = atom(
  new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    authEndpoint: "/api/pusher-auth",
    authTransport: "ajax",
    auth: { headers: { Accept: "application/json", Authorization: "Bearer " } },
  })
);

export const usePusher = (eventId: number) => {
  const [pusher] = useAtom(pusher_atom);

  useEffect(() => {
    pusher.subscribe(PUSHER_FORMATS.OLYMPIAD_CHANNEL(eventId));
    return () => {
      pusher.unsubscribe(PUSHER_FORMATS.OLYMPIAD_CHANNEL(eventId));
    };
  }, [pusher, eventId]);

  return pusher;
};
