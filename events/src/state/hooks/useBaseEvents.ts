import axios from "axios";
import { useEffect, useState } from "react";
import { BaseEvent } from "../types";

export default () => {
  const [events, set] = useState<BaseEvent[]>([]);
  useEffect(() => {
    axios({ method: "get", url: "http://localhost:3030/api/events" }).then(
      ({ data }) => set(data)
    );
  }, []);
  return events
}