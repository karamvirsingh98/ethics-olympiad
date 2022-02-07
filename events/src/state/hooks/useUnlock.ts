import axios from "axios";
import { useEffect, useState } from "react";
import { Olympaid } from "../types";

export default (eventID: string) => {
  return {
    unlocked: window.localStorage.getItem(`event_${eventID}`) ? true : false,
    unlock: (eventID: string, password: string) =>
      window.localStorage.setItem(`event_${eventID}`, password),
  };
};

export function useFullEvent(eventID: string) {
  const [olympiad, setOlympiad] = useState<Olympaid>();

  useEffect(() => {
    if (!olympiad) {
      try {
        const password = window.localStorage.getItem(`event_${eventID}`);
        axios({
          method: "post",
          url: "http://localhost:3030/api/unlock",
          data: { id: eventID, password },
        }).then(({ data }) => setOlympiad(data));
      } catch {}
    }
  }, []);

  return { olympiad, setOlympiad };
}


