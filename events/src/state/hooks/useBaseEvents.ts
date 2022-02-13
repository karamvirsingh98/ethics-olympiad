import { useEffect, useState } from "react";
import { client } from "../..";
import { BaseEvent } from "../types";

export default () => {
  const [events, set] = useState<BaseEvent[]>([]);
  useEffect(() => {
    client.service("api/events").find().then(set)
  }, []);
  return events
}