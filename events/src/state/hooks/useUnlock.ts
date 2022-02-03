import axios from "axios";
import { useEffect, useState } from "react";
import { Event } from "../types";

export default (eventID: string) => {
  return {
    unlocked:
      window.localStorage.getItem(`event_${eventID}`) === "unlocked"
        ? true
        : false,
    unlock: (eventID: string, password: string) =>
      window.localStorage.setItem(`event_${eventID}`, password),
  };
};

export function useUnlockedEvent(eventID: string) {
  const [event, set] = useState<Event>();

  useEffect(() => {
    if (!event) {
      const password = window.localStorage.getItem(`event_${eventID}`);
      axios({
        method: "post",
        url: "http://localhost:3030/api/unlock",
        data: { id: eventID, password },
      }).then(({ data }) => set(data));
    }
  }, []);

  return { event, set };
}
