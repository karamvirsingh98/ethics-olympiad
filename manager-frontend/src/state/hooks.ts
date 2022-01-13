import { useEffect, useState } from "react";
import { client } from "..";
import { arrToKeyedObject } from "../util/helpers";

export function useAppState() {
  const [events, setEvents] = useGenericFind('events')
  const [cases, setCases] = useGenericFind('cases')

  const state = {
    events, 
    setEvents, 
    cases,
    setCases
  }
  
  return state
}

export function useGenericFind(service: string, params?: any) {
  const [items, set] = useState()

  useEffect(() => {
    async function getEvents() {
      const events = await client.service(`/api/${service}`).find(params)
      set(arrToKeyedObject(events, "_id"))
    }
    getEvents()
  }, [])

  return [items, set]
}