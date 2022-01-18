import { useEffect, useState } from "react";
import { client } from "..";
import { arrToKeyedObject } from "../util/helpers";
import { Case, Collection, Event, User } from "./types";

export function useAppState() {
  const {user, login} = useAuth()
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

export function useAuth() {
  const [user, set] = useState<User | false>()
  useEffect(() => {
    const res = client.reAuthenticate().then(console.log)
  }, [])

  const login = async (email: string, password: string) => {
    const res = await client.authenticate({ strategy: "local", email, password })
    
  }



  return {user, login}
}

export function useCollection<T, P = any>(
  service: string,
  params?: P
): [
  items: Collection<T> | undefined,
  set: (collection: Collection<T>) => void,
  setOne: (id: string, item: T) => void
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

  function setOne(id: string, item: T) {
    set({
      ...items,
      [id]: item
    })
  }

  return [items, set, setOne];
}
