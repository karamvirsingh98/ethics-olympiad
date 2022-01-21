import { useEffect, useState } from "react";
import { client } from "..";
import { arrToKeyedObject } from "../util/helpers";
import { Case, Collection, Event, User } from "./types";

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

export function useAuth() {
  const [user, setUser] = useState<User | false>();
   
  useEffect(() => {
    try {
      client.reAuthenticate().then(({ user }) => setUser(user))
    } catch {
      setUser(false)
    }
  }, []);

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
      window.alert("Invalid Login Credentials");
    }
  };

  const logout = async () => {
    await client.logout();
    setUser(false);
  };

  const createUser = async (
    credentials: { name: string; email: string; password: string },
    inviteKey: string
  ) => {
    try {
      const user = await client
        .service("api/users")
        .create({ ...credentials, inviteKey });
      setUser(user);
    } catch (err: any) {
      setUser(false);
      window.alert(err.message);
    }
  };

  return { user, login, logout, createUser };
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
      .service(`api/${service}`)
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
