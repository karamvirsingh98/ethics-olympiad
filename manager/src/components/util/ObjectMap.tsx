export default function ObjectMap<T>({
  object,
  map,
  filter,
}: {
  object: T;
  map: (key: string, index: number, array: string[]) => void;
  filter?: (value: string, index: number, array: string[]) => void;
}) {
  if (filter) return <>{Object.keys(object).filter(filter).map(map)}</>;
  return <>{Object.keys(object).map(map)}</>;
}
