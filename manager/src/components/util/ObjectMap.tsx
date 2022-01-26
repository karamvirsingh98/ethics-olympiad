import { Fragment } from "react";

export default function ObjectMap<T>({
  object,
  map,
}: {
  object: T;
  map: (key: string, index: number, array: string[]) => void;
}) {
  return <Fragment>{Object.keys(object).map(map)}</Fragment>;
}
