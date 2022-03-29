import { useEffect, useState } from "react";
import { client } from "../../main";
import { arrToKeyedObject, filterOutFromObj } from "../../util/helpers";
import { Collection } from "../types";
import { atom, useAtom } from "jotai";
import { User } from "@ethics-olympiad/types";

export type SetCollection<T> = (collection: Collection<T>) => void;
export type SetOne<T> = (id: string, item: T) => void;
export type SetOneField<T> = (id: string, field: keyof T, item: any) => void;
export type RemoveOne = (id: string) => void;

interface CollectionFunctions<T> {
  set: SetCollection<T>;
  setOne: SetOne<T>;
  setOneField: SetOneField<T>;
  removeOne: RemoveOne;
}

type UseCollection<T, P> = (
  user: User
) => [items: Collection<T>, functions: CollectionFunctions<T>];

export function createUseCollection<T, P = any>(
  service: string
): UseCollection<T, P> {
  const collection = atom<Collection<T>>({});
  return (user: User) => {
    const [items, set] = useAtom(collection);

    useEffect(() => {
      client
        .service(`api/${service}`)
        .find({ query: { owner: user._id } })
        .then((res: T[]) => {
          set(arrToKeyedObject(res, "_id"));
        });
    }, []);

    const setOne = (id: string, item: T) => {
      set({
        ...items,
        [id]: item,
      });
    };
    const setOneField = (id: string, field: keyof T, item: any) => {
      set({
        ...items,
        [id]: { ...items![id], [field]: item },
      });
    };
    const removeOne = (id: string) => {
      set(filterOutFromObj(items, [id]));
    };
    return [items, { set, setOne, setOneField, removeOne }];
  };
}

export default function useCollection<T, P = any>(
  service: string,
  params?: P
): [items: Collection<T> | undefined, functions: CollectionFunctions<T>] {
  const [items, set] = useState<Collection<T>>();

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
