import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../main";
import { Olympiad } from "../types";

export default function useUnlock(eventID: string) {
  return {
    unlocked: window.localStorage.getItem(`event_${eventID}`) ? true : false,
    unlock: (password: string) =>
      window.localStorage.setItem(`event_${eventID}`, password),
  };
}

export function useFullEvent(eventID: string) {
  const [olympiad, set] = useState<Olympiad>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!olympiad) {
      const password = window.localStorage.getItem(`event_${eventID}`);
      client
        .service("api/unlock")
        .create({ id: eventID, password })
        .then(set)
        .catch((e: any) => e.code === 404 && navigate("/"));
    }
  }, [eventID]);

  return { olympiad, set };
}

// function useOlympiad(eventID: string) {
//   const [olympiad, set] = useState<Olympiad>()

//   useEffect(() => {
//     if (!olympiad) return
//   })

//   const unlock = (password?: string) => {
//     try {
//       const p = password ? password : window.localStorage.getItem(`event_${eventID}`)
//     }
//     catch {}
//   }
// }
