import { useEffect, useState } from "react";
import { client } from "../..";
import { Olympaid } from "../types";

export default function useUnlock(eventID: string) {
  return {
    unlocked: window.localStorage.getItem(`event_${eventID}`) ? true : false,
    unlock: (eventID: string, password: string) =>
      window.localStorage.setItem(`event_${eventID}`, password),
  };
};

export function useFullEvent(eventID: string) {
  const [olympiad, set] = useState<Olympaid>();

  useEffect(() => {
    if (!olympiad) {
      try {
        const password = window.localStorage.getItem(`event_${eventID}`);
        client.service('api/unlock').create({ id: eventID, password }).then(set)
      } catch {}
    }
  }, [eventID]);

  return { olympiad, set };
}


