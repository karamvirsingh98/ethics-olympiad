import { useEffect, useState } from "react";
import { client } from "..";
import { arrToKeyedObject } from "../util/helpers";
import { Case, Collection, Event } from "./types";

export function useAppState() {
  const [events, setEvents] = useCollection<Event>("events");
  const [cases, setCases] = useCollection<Case>("cases");

  const state = {
    events,
    setEvents,
    cases,
    setCases,
  };

  return state;
}

export function useCollection<T, P = any>(
  service: string,
  params?: P
): [
  items: Collection<T> | undefined,
  set: (collection: Collection<T>) => void
] {
  const [items, set] = useState<Collection<T>>();

  useEffect(() => {
    client
      .service(`/api/${service}`)
      .find(params)
      .then((res: T[]) => {
        set(arrToKeyedObject(res, "_id"));
      });
  }, []);

  return [items, set];
}
