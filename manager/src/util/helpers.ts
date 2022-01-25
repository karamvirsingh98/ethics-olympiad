import feathers from "@feathersjs/feathers";
import rest from "@feathersjs/rest-client";
import auth from "@feathersjs/authentication-client";
import { Collection } from "../state/types";

export function arrToKeyedObject<T>(arr: T[], idField = "_id"): Collection<T> {
  return Object.fromEntries(arr.map((obj: any) => [obj[idField], obj]));
}

export function filterOutFromObj<T>(obj: T, idsToFilterOut: string[]) {
  return Object.fromEntries(
    Object.entries(obj).filter((entry) => {
      return !stringIn(entry[0], idsToFilterOut);
    })
  );
}

export function stringIn(str: string, ar: any[]) {
  return ar.includes(str);
}

export function setupClient(baseURL: string) {
  const client = feathers();
  const restClient = rest(baseURL);
  client.configure(restClient.fetch(window.fetch));
  client.configure(auth());
  return client
}
