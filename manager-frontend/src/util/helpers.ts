import { Collection } from "../state/types";

export function arrToKeyedObject<T>(arr: T[], idField = "_id"): Collection<T> {
  return Object.fromEntries(arr.map((obj: any) => [obj[idField], obj]));
}

export function filterOutFromObj<T>(
  obj: T,
  idsToFilterOut: string[]
) {
  return Object.fromEntries(
    Object.entries(obj).filter((entry) => {
      return !stringIn(entry[0], idsToFilterOut);
    })
  );
}

export function stringIn(str: string, ar: any[]) {
  return ar.includes(str);
}

