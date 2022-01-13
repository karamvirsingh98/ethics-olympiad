export function arrToKeyedObject(arr: any[], keyField: string) {
  return Object.fromEntries(arr.map((obj) => [obj[keyField], obj]));
}
