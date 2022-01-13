import { useState } from "react";

export function useLocalStorage<T>(
  defaultStore: T,
  key: string
): [T, (arg: T) => void] {
  const toStore = window.localStorage.getItem(key);
  const [stored, setStore] = useState(
    toStore ? (JSON.parse(toStore) as T) : defaultStore
  );
  return [
    stored,
    (newStore: T) => {
      setStore(newStore);
      window.localStorage.setItem(key, JSON.stringify(newStore));
    },
  ];
}
