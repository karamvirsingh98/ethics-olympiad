import { Case, User } from "../types";
import useCollection from "./useCollection";

export function useAppState(user: User) {
  const [events, setEvents] = useCollection<Event>("events", {
    query: { owner: user._id },
  });
  const [cases, setCases] = useCollection<Case>("cases");

  const state = {
    events,
    setEvents,
    cases,
    setCases,
  };

  return state;
}
