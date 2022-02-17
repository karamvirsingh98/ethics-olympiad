import { Case, Event, User } from "@ethics-olympiad/types";
import useCollection from "./useCollection";

export function useAppState(user: User) {
  const events = useCollection<Event>("events", { query: { owner: user._id } });
  const cases = useCollection<Case>("cases", { query: { owner: user._id } });

  return { events, cases };
}
