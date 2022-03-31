import { Event, Case, Template } from "@ethics-olympiad/types";

export type Templates = Collection<Template>;
export type Events = Collection<Event>;
export type Cases = Collection<Case>;
export type Users = Collection<Users>;

export interface Collection<T> {
  [id: string]: T;
}
