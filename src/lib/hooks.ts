"use client";

import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import Pusher from "pusher-js";

const pusher_atom = atom(
  new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    authEndpoint: "/api/pusher-auth",
    authTransport: "ajax",
    auth: {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer ",
      },
    },
  })
);

export const usePusher = (eventId: number) => {
  const [pusher] = useAtom(pusher_atom);

  useEffect(() => {
    pusher.subscribe(`private-olympiad-${eventId}`);
    return () => {
      pusher.unsubscribe(`private-olympiad-${eventId}`);
    };
  }, [pusher, eventId]);

  return pusher;
};
