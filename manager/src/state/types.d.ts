import { useAppState } from "./hooks/useAppState";
import { Event, Case } from "@ethics-olympiad/types"

export type AppState = ReturnType<typeof useAppState>

export type Events = Collection<Event>;
export type Cases = Collection<Case>;
export type Users = Collection<Users>;

export interface Collection<T> {
  [id: string]: T
}
