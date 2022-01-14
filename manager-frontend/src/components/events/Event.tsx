import { useState } from "react";
import { Cases, Event } from "../../state/types";
import AssignedCases from "./subcomponents/AssignedCases";
import HeatsAndPassword from "./subcomponents/HeatsAndPassword";
import Timers from "./subcomponents/Timers";

export default function EventCompnent({
  event,
  cases,
}: {
  event: Event;
  cases: Cases;
}) {
  const [_event, setEvent] = useState(event)


  return (
    <div className="event">
      <AssignedCases cases={cases} heats={_event.heats} />
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
