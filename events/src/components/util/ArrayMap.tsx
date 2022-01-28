import { Fragment, ReactNode } from "react";

export default function ArrayMap<T>({
  array,
  map,
}: {
  array: T[];
  map: (value: T, index: number, array: T[]) => ReactNode;
}) {
  return <Fragment>{array.map(map)}</Fragment>;
}
