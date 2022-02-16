import { useEffect, useState } from "react";
import { client } from "../../main";
import { BaseEvent } from "../types";

export default function useBaseEvents() {
  const [events, set] = useState<BaseEvent[]>([]);
  useEffect(() => {
    client.service("api/events").find().then(set)
  }, []);
  return events
}