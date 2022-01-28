import { useEffect, useState } from "react";
import { BaseEvent } from "../../state/types";
import axios from "axios"
import ArrayMap from "../util/ArrayMap";
import BaseEventComponent from "../event/BaseEvent";

export default function Home() {
  const [allEvents, setEvents] = useState<BaseEvent[]>([]);
  useEffect(() => {
    axios({ method: "get", url: "http://localhost:3030/api/events" }).then(
      ({ data }) => setEvents(data)
    );
  }, []);

  return (
    <div>
      <ArrayMap
        array={allEvents}
        map={(event) => <BaseEventComponent event={event} />}
      />
    </div>
  );
}