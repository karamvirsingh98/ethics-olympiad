import { useEffect, useState } from "react";
import { client } from "..";
import { arrToKeyedObject } from "../util/helpers";
import { Case, Collection, Event, User } from "./types";

export function useAppState() {
  const { user, login, logout } = useAuth();
  const [events, setEvents] = useCollection<Event>("events", {
    query: { owner: user ? user._id : undefined },
  });
  const [cases, setCases] = useCollection<Case>("cases");

  const state = {
    user,
    login,
    logout,
    events,
    setEvents,
    cases,
    setCases,
  };

  return state;
}

export function useAuth() {
  const [user, setUser] = useState<User | false>();
  useEffect(() => {
    reAuth();
  }, []);

  const reAuth = async () => {
    try {
      const res = await client.reAuthenticate();
      setUser(res.user);
    } catch {
      setUser(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await client.authenticate({
        strategy: "local",
        email,
        password,
      });
      setUser(res.user);
    } catch {
      setUser(false);
    }
  };

  const logout = async () => {
    await client.logout();
    setUser(false);
  };

  return { user, login, logout };
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
      [id]: item,
    });
  }

  return [items, set, setOne];
}
