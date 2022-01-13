import { Collection } from "../state/types";

export function arrToKeyedObject<T>(arr: T[], idField = "_id"): Collection<T> {
  return Object.fromEntries(arr.map((obj: any) => [obj[idField], obj]));
}
