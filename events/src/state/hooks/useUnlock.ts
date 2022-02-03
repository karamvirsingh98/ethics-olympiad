import axios from "axios";
import { useEffect, useState } from "react";
import { Case, Event } from "../types";

export default (eventID: string) => {
  return {
    unlocked: window.localStorage.getItem(`event_${eventID}`) ? true : false,
    unlock: (eventID: string, password: string) =>
      window.localStorage.setItem(`event_${eventID}`, password),
  };
};

export function useUnlockedEvent(eventID: string) {
  const [event, setEvent] = useState<Event>();
  const [cases, setCases] = useState<Case[]>();

  useEffect(() => {
    if (event) {
      const caseIDs = event.heats
        .map((heat) => [heat.case1, heat.case2])
        .flat();
      const cases = getAllCases(caseIDs).then(setCases as any);
    }
  }, [event]);

  useEffect(() => {
    if (!event) {
      try {
        const password = window.localStorage.getItem(`event_${eventID}`);
        axios({
          method: "post",
          url: "http://localhost:3030/api/unlock",
          data: { id: eventID, password },
        }).then(({ data }) => setEvent(data));
      } catch {}
    }
  }, []);

  return { event, cases, setEvent };
}

async function getAllCases(caseIDs: string[]) {
  return await Promise.all(
    caseIDs.map(
      async (id) =>
        (await axios({ url: `http://localhost:3030/api/cases/${id}`, method: "get" })).data
    )
  );
}


