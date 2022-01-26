import { useEffect, useState } from "react";
import { client } from "../..";
import { arrToKeyedObject, filterOutFromObj } from "../../util/helpers";
import { Collection } from "../types";

export type SetCollection<T> = (collection: Collection<T>) => void;
export type SetOne<T> = (id: string, item: T) => void;
export type SetOneField<T> = (id: string, field: keyof T, item: any) => void;
export type RemoveOne = (id: string) => void;

export interface CollectionFunctions<T> {
  set: SetCollection<T>;
  setOne: SetOne<T>;
  setOneField: SetOneField<T>;
  removeOne: RemoveOne;
}

export default function useCollection<T, P = any>(
  service: string,
  params?: P
): [items: Collection<T> | undefined, functions: CollectionFunctions<T>] {
  const [items, set] = useState<Collection<T>>();

  useEffect(() => {
    client
      .service(`api/${service}`)
      .find(params)
      .then((res: T[]) => {
        set(arrToKeyedObject(res, "_id"));
      });
  }, []);

  return [
    items,
    {
      set,
      setOne: (id, item) => {
        set({
          ...items,
          [id]: item,
        });
      },
      setOneField: (id: string, field: keyof T, item: any) => {
        set({
          ...items,
          [id]: { ...items![id], [field]: item },
        });
      },
      removeOne: (id: string) => {
        set(filterOutFromObj(items, [id]));
      },
    },
  ];
}
