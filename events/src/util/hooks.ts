import { Heat } from "@ethics-olympiad/types";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

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

export function useTheme(): [dark: boolean, toggle: () => void] {
  const [dark, set] = useLocalStorage(false, "ethics-olympiad-manager-dark");
  function toggle() {
    set(!dark);
  }
  return [dark, toggle];
}

export function useHeatNumber(heats: Heat[]) {
  const { heatNumber } = useParams();
  const n = heatNumber ? Number(heatNumber) : undefined;
  const caseIDs = heats[n! - 1];
  return caseIDs;
}

export function usePadQuestion() {
  const heightRef = useRef<HTMLDivElement>(null);

  const [pad, set] = useState(false);
  useEffect(() => {
    heightRef.current &&
      heightRef.current.scrollHeight > heightRef.current.clientHeight &&
      set(true);
  }, [heightRef.current]);

  return { heightRef, pad };
}
