import { useEffect, useState } from "react";
import { client } from "../..";
import { arrToKeyedObject, filterOutFromObj } from "../../util/helpers";
import { Collection } from "../types";

export interface CollectionFunctions<T> {
  set: (collection: Collection<T>) => void;
  setOne: (id: string, item: T) => void;
  setOneField: (id: string, field: string, item: any) => void;
  removeOne: (id: string) => void;
} 

export default function useCollection<T, P = any>(
  service: string,
  params?: P
): [
  items: Collection<T> | undefined,
  functions: CollectionFunctions<T>
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

  function setOneField(id: string, field: string, item: any) {
    set({ 
      ...items,
      [id]: { ...items![id], [field]: item }
    })
  }

  function removeOne(id: string) {
    set(filterOutFromObj(items, [id]));
  }

  const functions = {
    set,
    setOne,
    setOneField,
    removeOne,
  };

  return [items, functions];
}
