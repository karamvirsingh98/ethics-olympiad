import { useState } from "react";
import { Cases, Event } from "../../state/types";
import Heats from "./subcomponents/Heats";
import Timers from "./subcomponents/Timers";

export default function EventCompnent({
  event,
  cases,
}: {
  event: Event;
  cases: Cases;
}) {
  const [_event, setEvent] = useState(event);

  console.log(_event);

  return (
    <div className="event">
      <Heats
        cases={cases}
        heats={_event.heats}
        onAdd={() =>
          setEvent({
            ..._event,
            heats: [..._event.heats, { case1: "", case2: "" }],
          })
        }
      />
      <div
        style={{
          borderLeft: "solid 1px",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Timers />
      </div>
    </div>
  );
}
